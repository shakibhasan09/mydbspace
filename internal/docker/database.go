package docker

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"strconv"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"github.com/shakibhasan09/mydbspace/internal/config"
	"github.com/shakibhasan09/mydbspace/internal/database"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
)

type EnvType struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func ProvisionDatabase(databaseInfo *models.Database) {
	log.Println("Provisioning databaseInfo...")

	ctx := context.Background()

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Printf("Error creating Docker client: %v", err)
		return
	}
	defer cli.Close()

	log.Printf("Provisioning databaseInfo: %v", databaseInfo)

	activeConfig := config.GetActiveDBConfig(databaseInfo)
	dockerImage := databaseInfo.ImageName + ":" + databaseInfo.ImageVersion

	pullResp, err := cli.ImagePull(ctx, dockerImage, image.PullOptions{})
	if err != nil {
		log.Printf("Error pulling image: %v", err)
		return
	}
	defer pullResp.Close()
	io.Copy(os.Stdout, pullResp)

	var parseEnv []EnvType
	if err := json.Unmarshal([]byte(databaseInfo.Environment), &parseEnv); err != nil {
		log.Printf("Parsing environment failed: %v", err)
		return
	}

	var env []string
	for _, e := range parseEnv {
		env = append(env, e.Key+"="+e.Value)
	}
	containerConfig := &container.Config{
		Image: dockerImage,
		Env:   env,
	}

	if databaseInfo.Domain != nil {
		if labelsConfig, ok := activeConfig["labels"].(map[string]interface{}); ok {
			labels := make(map[string]string)
			for k, v := range labelsConfig {
				labels[k] = fmt.Sprintf("%v", v)
			}
			containerConfig.Labels = labels
		}
	}

	log.Printf("env: %v", env)
	log.Printf("Labels: %v", containerConfig.Labels)

	hostConfig := &container.HostConfig{
		Binds: []string{
			databaseInfo.VolumeUuid + ":" + activeConfig["data"].(string),
		},
	}

	if databaseInfo.Port != nil {
		port, err := strconv.Atoi(activeConfig["internalPort"].(string))
		if err != nil {
			log.Printf("Converting port failed: %v", err)
			return
		}
		containerPort := nat.Port(fmt.Sprintf("%d/tcp", port))
		hostConfig.PortBindings = nat.PortMap{
			containerPort: []nat.PortBinding{
				{
					HostIP:   "0.0.0.0",
					HostPort: strconv.Itoa(*databaseInfo.Port),
				},
			},
		}
	}

	netConfig := &network.NetworkingConfig{
		EndpointsConfig: map[string]*network.EndpointSettings{
			"mydbspace_network": {},
		},
	}

	resp, err := cli.ContainerCreate(
		ctx,
		containerConfig,
		hostConfig,
		netConfig,
		nil,
		databaseInfo.Uuid,
	)
	if err != nil {
		log.Printf("Error creating container: %v", err)
		return
	}

	if err := cli.ContainerStart(ctx, resp.ID, container.StartOptions{}); err != nil {
		log.Printf("Error starting container: %v", err)
		return
	}

	log.Printf("Successfully started container %s\n", resp.ID)

	db := database.GetDB()
	if _, err := db.Exec("UPDATE databases SET status = ? WHERE uuid = ?", "running", databaseInfo.Uuid); err != nil {
		log.Printf("Error updating container id: %v", err)
		return
	}
}
