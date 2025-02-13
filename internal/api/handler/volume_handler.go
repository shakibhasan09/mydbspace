package handler

import "github.com/gofiber/fiber/v2"

func GetVolumes(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func CreateVolume(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func DeleteVolume(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func UpdateVolume(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func GetVolume(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
