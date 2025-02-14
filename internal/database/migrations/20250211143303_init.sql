-- +goose Up
-- +goose StatementBegin
-- Databases
CREATE TABLE IF NOT EXISTS databases (
  uuid TEXT NOT NULL PRIMARY KEY,
  volume_uuid TEXT NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  image_name text NOT NULL,
  image_version text NOT NULL,
  environment text,
  domain text,
  port int,  
  status text NOT NULL,
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
CREATE INDEX IF NOT EXISTS idx_databases_volume_uuid ON databases (volume_uuid);

-- Volumes
CREATE TABLE IF NOT EXISTS volumes (
  uuid TEXT NOT NULL PRIMARY KEY,
  key TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER IF NOT EXISTS update_volumes_updated_at
BEFORE UPDATE ON volumes
FOR EACH ROW
BEGIN
  UPDATE volumes
  SET updated_at = CURRENT_TIMESTAMP
  WHERE uuid = OLD.uuid;
END;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS databases;
DROP TRIGGER IF EXISTS update_databases_updated_at;
DROP INDEX IF EXISTS idx_databases_volume_uuid;

DROP TABLE IF EXISTS volumes;
DROP TRIGGER IF EXISTS update_volumes_updated_at;
-- +goose StatementEnd
