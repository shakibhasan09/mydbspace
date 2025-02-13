package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/shakibhasan09/mydbspace/internal/database"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
)

func GetVolumes(c *fiber.Ctx) error {
	db := database.GetDB()

	volumes := []models.Volume{}
	if err := db.Select(&volumes, "SELECT * FROM volumes"); err != nil {
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

	volume, err := db.NamedExec("INSERT INTO volumes (uuid, key, name) VALUES (:uuid, :key, :name)", &models.Volume{Uuid: uuid.New().String(), Key: body.Key, Name: body.Name})
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if _, err := volume.LastInsertId(); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{"message": "Volume created successfully"})
}

func DeleteVolume(c *fiber.Ctx) error {
	db := database.GetDB()

	if _, err := db.Exec("DELETE FROM volumes WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.JSON(fiber.Map{"message": "Volume deleted successfully"})
}

func UpdateVolume(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func GetVolume(c *fiber.Ctx) error {
	db := database.GetDB()

	volume := models.Volume{}
	if err := db.Get(&volume, "SELECT * FROM volumes WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	return c.JSON(volume)
}
