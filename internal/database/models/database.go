package models

type Database struct {
	Uuid         string `json:"uuid"`
	VolumeUuid   string `json:"volume_uuid"`
	Name         string `json:"name"`
	Type         string `json:"type"`
	ImageName    string `json:"image_name"`
	ImageVersion string `json:"image_version"`
	Environment  string `json:"environment"`
	Domain       string `json:"domain"`
	Status       string `json:"status"`
	CreatedAt    string `json:"created_at"`
	UpdatedAt    string `json:"updated_at"`
}
