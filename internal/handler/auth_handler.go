package handler

import (
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	body := LoginRequest{}
	if err := c.BodyParser(&body); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}

	if body.Username != os.Getenv("APP_USERNAME") || body.Password != os.Getenv("APP_PASSWORD") {
		return fiber.NewError(fiber.StatusUnauthorized, "Invalid credentials")
	}

	claims := jwt.MapClaims{
		"name":  body.Username,
		"email": body.Username,
		"exp":   time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	t, err := token.SignedString([]byte(os.Getenv("APP_SECRET_KEY")))
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    t,
		HTTPOnly: true,
		Secure:   os.Getenv("ENV") != "DEV",
		SameSite: "lax",
		MaxAge:   86400,
	})

	return c.JSON(fiber.Map{"token": t})
}

func Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		HTTPOnly: true,
		Secure:   os.Getenv("ENV") != "DEV",
		SameSite: "Lax",
		Expires:  time.Now().Add(-time.Hour),
	})

	return c.JSON(fiber.Map{"message": "Logout successful"})
}

func Authorize(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "Authorized"})
}
