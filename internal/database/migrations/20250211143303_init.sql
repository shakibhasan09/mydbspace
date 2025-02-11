-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS databases (
  uuid text NOT NULL PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  host text NOT NULL,
  port int NOT NULL,
  username text NOT NULL,
  password text NOT NULL,
  database text NOT NULL,
  sslmode text NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER IF NOT EXISTS update_databases_updated_at
BEFORE UPDATE ON databases
FOR EACH ROW
BEGIN
  UPDATE databases
  SET updated_at = CURRENT_TIMESTAMP
  WHERE uuid = OLD.uuid;
END;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS databases;
DROP TRIGGER IF EXISTS update_databases_updated_at;
-- +goose StatementEnd
