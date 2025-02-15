package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/basicauth"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/shakibhasan09/mydbspace/internal/handler"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{AllowOrigins: "http://localhost:5173"}))

	app.Use(logger.New())
	app.Use(helmet.New())
	app.Use(recover.New())

	app.Static("/", "web/dist")

	// Auth
	app.Post("/login", handler.Login)
	app.Post("/logout", handler.Logout)

	api := app.Group("/api")

	api.Use(basicauth.New(basicauth.Config{
		Users: map[string]string{
			"admin": "123456",
		},
	}))

	// Volumes
	api.Get("/volumes", handler.GetVolumes)
	api.Get("/volumes/:uuid", handler.GetVolume)
	api.Post("/volumes", handler.CreateVolume)
	api.Put("/volumes/:uuid", handler.UpdateVolume)
	api.Delete("/volumes/:uuid", handler.DeleteVolume)

	// Databases
	api.Get("/databases", handler.GetDatabases)
	api.Get("/databases/:uuid", handler.GetDatabase)
	api.Post("/databases", handler.CreateDatabase)
	api.Put("/databases/:uuid", handler.UpdateDatabase)
	api.Delete("/databases/:uuid", handler.DeleteDatabase)
	api.Get("/databases/:uuid/stop", handler.StopDatabase)
	api.Get("/databases/:uuid/restart", handler.RestartDatabase)

	app.Get("*", func(c *fiber.Ctx) error {
		return c.SendFile("web/dist/index.html")
	})

	app.Listen(":3000")
}
