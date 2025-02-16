package config

import "github.com/shakibhasan09/mydbspace/internal/database/models"

func GetActiveDBConfig(database *models.Database) map[string]interface{} {
	if database.Type == "postgresql" {
		return map[string]interface{}{
			"internalPort": "5432",
			"data":         "/var/lib/postgresql/data",
			"entryPoint":   "postgres",
			"labels": map[string]interface{}{
				"traefik.enable": "true",
				"traefik.tcp.routers." + database.Uuid + ".entrypoints":               "postgres",
				"traefik.tcp.routers." + database.Uuid + ".rule":                      "HostSNI(`" + *database.Domain + "`)",
				"traefik.tcp.routers." + database.Uuid + ".tls":                       "true",
				"traefik.tcp.routers." + database.Uuid + ".tls.certresolver":          "cloudflare",
				"traefik.tcp.services." + database.Uuid + ".loadbalancer.server.port": "5432",
			},
		}
	}

	if database.Type == "mysql" {
		return map[string]interface{}{
			"internalPort": "3306",
			"data":         "/var/lib/mysql",
			"entryPoint":   "mysql",
			"labels":       map[string]interface{}{},
		}
	}

	if database.Type == "mariadb" {
		return map[string]interface{}{
			"internalPort": "3306",
			"data":         "/var/lib/mysql",
			"entryPoint":   "mysql",
			"labels":       map[string]interface{}{},
		}
	}

	if database.Type == "redis" {
		return map[string]interface{}{
			"internalPort": "6379",
			"data":         "/var/lib/redis",
			"entryPoint":   "redis",
			"labels":       map[string]interface{}{},
		}
	}

	if database.Type == "mongodb" {
		return map[string]interface{}{
			"internalPort": "27017",
			"data":         "/data/db",
			"entryPoint":   "mongo",
			"labels":       map[string]interface{}{},
		}
	}

	return nil
}
