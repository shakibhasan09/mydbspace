FROM node:20-alpine AS frontend-builder

RUN npm install -g pnpm

WORKDIR /app
COPY web/package.json web/pnpm-lock.yaml* ./web/
RUN cd web && pnpm install
COPY web ./web
RUN cd web && pnpm build

FROM golang:1.23-alpine AS go-builder

RUN apk add --no-cache build-base

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go install github.com/pressly/goose/v3/cmd/goose@latest
RUN mkdir -p /var/lib/mydbspace
RUN GOOSE_DRIVER=sqlite3 GOOSE_DBSTRING=/var/lib/mydbspace/database.db GOOSE_MIGRATION_DIR=./internal/database/migrations goose up
RUN CGO_ENABLED=1 GOOS=linux go build -o /app/server ./cmd/server/main.go


FROM alpine:latest

WORKDIR /app
COPY --from=go-builder /app/server /app/server
COPY --from=frontend-builder /app/web/dist /app/web/dist
COPY --from=go-builder /var/lib/mydbspace/database.db /var/lib/mydbspace/database.db

ENV DATABASE_PATH="/var/lib/mydbspace/database.db"

EXPOSE 3000

VOLUME [ "/var/lib/mydbspace" ] 

ENTRYPOINT ["/app/server"]