package handler

import (
	"net/http"
)

func GetDatabases(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetDatabases"))
}

func CreateDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("CreateDatabase"))
}

func GetDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetDatabase"))
}

func UpdateDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("UpdateDatabase"))
}

func DeleteDatabase(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("DeleteDatabase"))
}
