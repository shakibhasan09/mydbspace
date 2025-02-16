package docker

import (
	"context"
	"fmt"
	"log"

	"github.com/docker/docker/api/types/volume"
	"github.com/docker/docker/client"
)

func ProvisionVolume(volumeUuid string) {
	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Printf("Error creating Docker client: %v", err)
		return
	}

	vol, err := cli.VolumeCreate(context.Background(), volume.CreateOptions{
		Name: volumeUuid,
	})
	if err != nil {
		log.Printf("Error creating Docker client: %v", err)
		return
	}

	fmt.Printf("Volume %s created with driver %s\n", vol.Name, vol.Driver)
}
