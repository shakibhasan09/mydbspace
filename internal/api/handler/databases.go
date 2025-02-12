package handler

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/image"
	"github.com/docker/docker/client"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
)

func GetDatabases(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetDatabases"))
}

func CreateDatabase(w http.ResponseWriter, r *http.Request) {
	var db models.Database

	if err := json.NewDecoder(r.Body).Decode(&db); err != nil {
		log.Printf("Invalid request payload %v", err)
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	log.Printf("Received database: %+v", db)

	cli, err := client.NewClientWithOpts(client.FromEnv)
	if err != nil {
		log.Printf("Error creating Docker client: %v", err)
		http.Error(w, "Error creating Docker client:", http.StatusBadRequest)
		return
	}

	pullResp, err := cli.ImagePull(r.Context(), db.Image, image.PullOptions{})
	if err != nil {
		log.Printf("Error pulling image: %v", err)
		http.Error(w, "Error pulling image", http.StatusBadRequest)
		return
	}
	defer pullResp.Close()
	io.Copy(os.Stdout, pullResp)

	containerConfig := &container.Config{
		Image: db.Image,
		Labels: map[string]string{
			"traefik.enable":                                     "true",
			"traefik.tcp.routers.mydb.entrypoints":               "postgres",
			"traefik.tcp.routers.mydb.rule":                      "HostSNI(`mydb.nodeflare.dev`)",
			"traefik.tcp.routers.mydb.tls":                       "true",
			"traefik.tcp.routers.mydb.tls.certresolver":          "myresolver",
			"traefik.tcp.services.mydb.loadbalancer.server.port": "5432",
		},
		Env: []string{
			"POSTGRES_USER=postgres",
			"POSTGRES_PASSWORD=postgres",
			"POSTGRES_DB=postgres",
		},
	}

	resp, err := cli.ContainerCreate(r.Context(), containerConfig, &container.HostConfig{}, nil, nil, "postgresdb")
	if err != nil {
		log.Fatalf("Error creating container: %v", err)
	}

	if err := cli.ContainerStart(r.Context(), resp.ID, container.StartOptions{}); err != nil {
		log.Fatalf("Error starting container: %v", err)
	}

	response := map[string]string{
		"message": "Successfully started Postgres container ID: " + resp.ID,
	}

	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func GetDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetDatabase"))
}

func UpdateDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("UpdateDatabase"))
}

func DeleteDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("DeleteDatabase"))
}
