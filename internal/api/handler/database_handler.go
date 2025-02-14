package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/shakibhasan09/mydbspace/internal/database"
	"github.com/shakibhasan09/mydbspace/internal/database/models"
)

func GetDatabases(c *fiber.Ctx) error {
	db := database.GetDB()

	databases := []models.Database{}
	if err := db.Select(&databases, "SELECT * FROM databases"); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	// time.Sleep(5 * time.Second)

	return c.JSON(databases)
}

func CreateDatabase(c *fiber.Ctx) error {
	db := database.GetDB()

	body := models.Database{}
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	volume := models.Volume{}
	if err := db.Get(&volume, "SELECT * FROM volumes WHERE uuid = ?", body.VolumeUuid); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	database := models.Database{}
	if err := db.Get(&database, "SELECT * FROM databases WHERE volume_uuid = ?", body.VolumeUuid); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}
	if len(database.Uuid) > 0 {
		return fiber.NewError(fiber.StatusConflict, "This volume already has a database")
	}

	// TODO: Validate body

	if _, err := db.NamedExec("INSERT INTO databases (uuid, volume_uuid, name, type, image_name, image_version, environment, domain, status) VALUES (:uuid, :volume_uuid, :name, :type, :image_name, :image_version, :environment, :domain, :status)", &models.Database{
		Uuid:         uuid.New().String(),
		VolumeUuid:   volume.Uuid,
		Name:         body.Name,
		Type:         body.Type,
		ImageName:    body.ImageName,
		ImageVersion: body.ImageVersion,
		Environment:  body.Environment,
		Domain:       body.Domain,
		Status:       "provisioning",
	}); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	// TODO: Provision database in the background

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

func UpdateDatabase(c *fiber.Ctx) error {
	db := database.GetDB()

	body := models.Database{}
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	// TODO: Validate body

	database := models.Database{}
	if err := db.Get(&database, "SELECT * FROM databases WHERE uuid = ?", c.Params("uuid")); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if _, err := db.Exec("UPDATE databases SET name = ?, environment = ?, domain = ? WHERE uuid = ?", body.Name, body.Environment, body.Domain, c.Params("uuid")); err != nil {
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
