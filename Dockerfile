FROM node:20-alpine AS frontend-builder

RUN npm install -g pnpm

WORKDIR /app
COPY web/package.json web/pnpm-lock.yaml* ./web/
RUN cd web && pnpm install
COPY web ./web
RUN cd web && pnpm build

FROM golang:1.23-alpine AS go-builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server/main.go


FROM alpine:latest

WORKDIR /app
COPY --from=go-builder /app/server /app/server
COPY --from=frontend-builder /app/web/dist /app/web/dist

EXPOSE 3000

ENTRYPOINT ["/app/server"]