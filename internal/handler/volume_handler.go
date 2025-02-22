package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/shakibhasan09/mydbspace/internal/database"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
	"github.com/shakibhasan09/mydbspace/internal/docker"
)

func GetVolumes(c *fiber.Ctx) error {
	db := database.GetDB()

	volumes := []models.Volume{}
	if err := db.Select(&volumes, "SELECT * FROM volumes ORDER BY created_at DESC"); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(volumes)
}

func CreateVolume(c *fiber.Ctx) error {
	db := database.GetDB()

	body := models.Volume{}
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	// TODO: Validate body

	volumeUuid := uuid.New().String()
	if _, err := db.NamedExec("INSERT INTO volumes (uuid, key, name) VALUES (:uuid, :key, :name)", &models.Volume{Uuid: volumeUuid, Key: body.Key, Name: body.Name}); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	go docker.ProvisionVolume(volumeUuid)

	return c.JSON(fiber.Map{"message": "Volume created successfully"})
}

func DeleteVolume(c *fiber.Ctx) error {
	db := database.GetDB()

	volume := models.Volume{}
	if err := db.Get(&volume, "SELECT * FROM volumes WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if _, err := db.Exec("DELETE FROM volumes WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{"message": "Volume deleted successfully"})
}

func UpdateVolume(c *fiber.Ctx) error {
	db := database.GetDB()

	body := models.Volume{}
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	// TODO: Validate body

	volume := models.Volume{}
	if err := db.Get(&volume, "SELECT * FROM volumes WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if _, err := db.Exec("UPDATE volumes SET key = ?, name = ? WHERE uuid = ?", body.Key, body.Name, c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{"message": "Volume updated successfully"})
}

func GetVolume(c *fiber.Ctx) error {
	db := database.GetDB()

	volume := models.Volume{}
	if err := db.Get(&volume, "SELECT * FROM volumes WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return c.JSON(volume)
}
