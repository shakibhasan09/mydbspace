package docker

import (
	"context"
	"io"
	"log"
	"os"
	"strconv"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
)

func ProvisionDatabase(database *models.Database) {
	log.Println("Provisioning database...")

	ctx := context.Background()

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Printf("Error creating Docker client: %v", err)
		return
	}

	pullResp, err := cli.ImagePull(ctx, database.ImageName, image.PullOptions{})
	if err != nil {
		log.Printf("Error pulling image: %v", err)
		return
	}
	defer pullResp.Close()
	io.Copy(os.Stdout, pullResp)

	containerConfig := &container.Config{
		Image: database.ImageName,
		Env: []string{
			"POSTGRES_DB=" + database.Name,
		},
	}

	hostConfig := &container.HostConfig{
		PortBindings: nat.PortMap{
			"5432/tcp": []nat.PortBinding{
				{
					HostIP:   "0.0.0.0",
					HostPort: strconv.Itoa(*database.Port),
				},
			},
		},
		Binds: []string{
			database.VolumeUuid + ":/var/lib/postgresql/data",
		},
	}

	// Create the container
	resp, err := cli.ContainerCreate(
		ctx,
		containerConfig,
		hostConfig,
		nil,
		nil,
		database.Name,
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
}
