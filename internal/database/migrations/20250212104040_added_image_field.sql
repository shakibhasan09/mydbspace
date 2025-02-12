-- +goose Up
-- +goose StatementBegin
ALTER TABLE databases
ADD COLUMN image text NOT NULL;
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE databases
DROP COLUMN image;
-- +goose StatementEnd
