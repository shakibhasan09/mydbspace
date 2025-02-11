package main

import (
	"embed"
	"errors"
	"io/fs"
	"log"
	"net/http"
	"strings"

	"github.com/shakibhasan09/mydbspace/internal/api/handler"
	"github.com/shakibhasan09/mydbspace/internal/api/middleware"
)

//go:embed web/dist/*
var dist embed.FS

func main() {
	mux := http.NewServeMux()

	// Databases routes
	mux.HandleFunc("GET /api/databases", handler.GetDatabases)
	mux.HandleFunc("POST /api/databases", handler.CreateDatabase)
	mux.HandleFunc("GET /api/databases/:database", handler.GetDatabase)
	mux.HandleFunc("PATCH /api/databases/:database", handler.UpdateDatabase)
	mux.HandleFunc("DELETE /api/databases/:database", handler.DeleteDatabase)

	// Auth routes
	mux.HandleFunc("POST /login", handler.Login)
	mux.HandleFunc("POST /logout", handler.Logout)
	mux.HandleFunc("POST /register", handler.Register)

	spaFS, err := fs.Sub(dist, "web/dist")
	if err != nil {
		log.Fatal(err)
	}

	// SPA routes
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

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", middleware.LoggingMiddleware(middleware.AuthMiddleware(mux))))
}
