package config

func GetActiveDBConfig(dbtype string) map[string]string {
	if dbtype == "postgresql" {
		return map[string]string{
			"internalPort": "5432",
			"data":         "/var/lib/postgresql/data",
			"entryPoint":   "postgres",
		}
	}

	if dbtype == "mysql" {
		return map[string]string{
			"internalPort": "3306",
			"data":         "/var/lib/mysql",
			"entryPoint":   "mysql",
		}
	}

	if dbtype == "mariadb" {
		return map[string]string{
			"internalPort": "3306",
			"data":         "/var/lib/mysql",
			"entryPoint":   "mysql",
		}
	}

	if dbtype == "redis" {
		return map[string]string{
			"internalPort": "6379",
			"data":         "/var/lib/redis",
			"entryPoint":   "redis",
		}
	}

	if dbtype == "mongodb" {
		return map[string]string{
			"internalPort": "27017",
			"data":         "/data/db",
			"entryPoint":   "mongo",
		}
	}

	return nil
}
