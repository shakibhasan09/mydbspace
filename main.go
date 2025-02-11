package main

import (
	"embed"
	"errors"
	"io/fs"
	"log"
	"net/http"
	"strings"

	"github.com/shakibhasan09/mydbspace/internal/api/middleware"
)

//go:embed web/dist/*
var dist embed.FS

func main() {
	spaFS, err := fs.Sub(dist, "web/dist")
	if err != nil {
		log.Fatal(err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/api/") {
			http.NotFound(w, r)
			return
		}

		_, err := fs.Stat(spaFS, strings.TrimPrefix(r.URL.Path, "/"))
		if errors.Is(err, fs.ErrNotExist) {
			r.URL.Path = "/"
		}

		http.FileServer(http.FS(spaFS)).ServeHTTP(w, r)

	})

	handler := middleware.LoggingMiddleware(middleware.AuthMiddleware(mux))

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
