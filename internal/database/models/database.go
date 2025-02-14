package models

type Database struct {
	Uuid         string  `json:"uuid" db:"uuid"`
	VolumeUuid   string  `json:"volume_uuid" db:"volume_uuid"`
	Name         string  `json:"name" db:"name"`
	Type         string  `json:"type" db:"type"`
	ImageName    string  `json:"image_name" db:"image_name"`
	ImageVersion string  `json:"image_version" db:"image_version"`
	Environment  string  `json:"environment" db:"environment"`
	Domain       *string `json:"domain" db:"domain"`
	Port         *int    `json:"port" db:"port"`
	Status       string  `json:"status" db:"status"`
	CreatedAt    string  `json:"created_at" db:"created_at"`
	UpdatedAt    string  `json:"updated_at" db:"updated_at"`
}
