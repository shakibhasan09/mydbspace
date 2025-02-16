package handler

import (
	"encoding/json"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/shakibhasan09/mydbspace/internal/database"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
	"github.com/shakibhasan09/mydbspace/internal/docker"
)

func GetDatabases(c *fiber.Ctx) error {
	db := database.GetDB()

	databases := []models.Database{}
	if err := db.Select(&databases, "SELECT * FROM databases ORDER BY created_at DESC"); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(databases)
}

type Environment struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

type DatabaseConfig struct {
	VolumeUuid   string         `json:"volume_uuid"`
	Name         string         `json:"name"`
	Type         string         `json:"type"`
	ImageName    string         `json:"image_name"`
	ImageVersion string         `json:"image_version"`
	Environment  *[]Environment `json:"environment"`
	Port         *int           `json:"port"`
	UseTLS       bool           `json:"usetls"`
	Domain       *string        `json:"domain"`
}

func CreateDatabase(c *fiber.Ctx) error {
	db := database.GetDB()

	var body DatabaseConfig
	if err := c.BodyParser(&body); err != nil {
		log.Println("Error parsing body:", err)
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	// TODO: Validate body

	envJSON, err := json.Marshal(body.Environment)
	if err != nil {
		log.Println("Error marshalling environment:", err)
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	volume := models.Volume{}
	if err := db.Get(&volume, "SELECT * FROM volumes WHERE uuid = ?", body.VolumeUuid); err != nil {
		log.Println("Error getting volume:", err)
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	database := models.Database{}
	if err := db.Get(&database, "SELECT * FROM databases WHERE volume_uuid = ?", body.VolumeUuid); err == nil {
		log.Println("Volume already has a database")
		return fiber.NewError(fiber.StatusNotFound, "Volume already has a database")
	}

	dbUuid := uuid.New().String()
	if _, err := db.NamedExec("INSERT INTO databases (uuid, volume_uuid, name, type, image_name, image_version, environment, domain, port, status) VALUES (:uuid, :volume_uuid, :name, :type, :image_name, :image_version, :environment, :domain, :port, :status)", &models.Database{
		Uuid:         dbUuid,
		VolumeUuid:   volume.Uuid,
		Name:         body.Name,
		Type:         body.Type,
		ImageName:    body.ImageName,
		ImageVersion: body.ImageVersion,
		Environment:  string(envJSON),
		Domain:       body.Domain,
		Port:         body.Port,
		Status:       "provisioning",
	}); err != nil {
		log.Println("Error inserting database:", err)
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	var insertedDatabase models.Database
	if err := db.Get(&insertedDatabase, "SELECT * FROM databases WHERE uuid = ?", dbUuid); err != nil {
		log.Println("Error getting database:", err)
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	// Provision database in the background
	go docker.ProvisionDatabase(&insertedDatabase)

	return c.JSON(fiber.Map{"message": "Database created successfully"})
}

func DeleteDatabase(c *fiber.Ctx) error {
	db := database.GetDB()

	database := models.Database{}
	if err := db.Get(&database, "SELECT * FROM databases WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if _, err := db.Exec("DELETE FROM databases WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{"message": "Database deleted successfully"})
}

type updateDatabase struct {
	Name string `json:"name"`
}

func UpdateDatabase(c *fiber.Ctx) error {
	db := database.GetDB()

	var body updateDatabase
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	// TODO: Validate body

	database := models.Database{}
	if err := db.Get(&database, "SELECT * FROM databases WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if _, err := db.Exec("UPDATE databases SET name = ? WHERE uuid = ?", body.Name, c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{"message": "Database updated successfully"})
}

func GetDatabase(c *fiber.Ctx) error {
	db := database.GetDB()

	database := models.Database{}
	if err := db.Get(&database, "SELECT * FROM databases WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return c.JSON(database)
}

func RestartDatabase(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "Database restarted successfully"})
}

func StopDatabase(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "Database stopped successfully"})
}
