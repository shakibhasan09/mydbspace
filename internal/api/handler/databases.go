package handler

import "github.com/gofiber/fiber/v2"

func GetDatabases(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func CreateDatabase(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func DeleteDatabase(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func UpdateDatabase(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}

func GetDatabase(c *fiber.Ctx) error {
	return c.SendString("Hello, World!")
}
