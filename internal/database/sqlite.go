package database

import (
	"log"
	"sync"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

var (
	db   *sqlx.DB
	once sync.Once
)

func GetDB() *sqlx.DB {
	once.Do(func() {
		var err error
		db, err = sqlx.Connect("sqlite3", "database.db")
		if err != nil {
			log.Fatal(err)
		}

		if err := db.Ping(); err != nil {
			log.Fatal(err)
		}
	})
	return db
}
