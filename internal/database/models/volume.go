package models

type Volume struct {
	Uuid      string `json:"uuid" db:"uuid"`
	Key       string `json:"key" db:"key"`
	Name      string `json:"name" db:"name"`
	CreatedAt string `json:"created_at" db:"created_at"`
	UpdatedAt string `json:"updated_at" db:"updated_at"`
}
