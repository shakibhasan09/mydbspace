# MyDBSpace

MyDBSpace is a powerful tool that allows you to create and manage databases effortlessly through a user-friendly UI. It utilizes Docker and Traefik to provide an easy and secure way to set up databases on your VPS.

## Features

- Create and manage databases through a web UI
- Supports various database engines (MySQL, PostgreSQL, etc.)
- Uses Docker for containerized database instances
- Traefik for reverse proxy and automatic SSL management
- Easy setup with `docker-compose`

## Prerequisites

- A VPS with Docker and Docker Compose installed
- A domain or subdomain for accessing the UI
- Traefik configured as a reverse proxy
- Cloudflare DNS configured

## Installation

Follow these steps to set up MyDBSpace on your VPS.

### 1. Create docker network

Run the following command to create a docker network:

```sh
docker network create mydbspace_network
```

### 2. Use the Example `docker-compose.yaml`

Here is an example `docker-compose.yaml` file for setting up MyDBSpace with Traefik:

```yaml
services:
  traefik:
    image: "traefik:v3.3"
    container_name: "traefik"
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"

      - "--entryPoints.web.address=:80"
      - "--entryPoints.websecure.address=:443"
      - "--entryPoints.postgres.address=:5432"
      - "--entryPoints.mysql.address=:3306"
      - "--entryPoints.mongo.address=:27017"
      - "--entryPoints.redis.address=:6379"

      #- "--certificatesresolvers.cloudflare.acme.caserver=https://acme-staging-v02.api.letsencrypt.org/directory"

      - "--certificatesresolvers.cloudflare.acme.dnschallenge=true"
      - "--certificatesresolvers.cloudflare.acme.dnschallenge.provider=cloudflare"
      - "--certificatesresolvers.cloudflare.acme.email=user@example.com" # TODO: Add email
      - "--certificatesresolvers.cloudflare.acme.storage=/letsencrypt/acme.json"
      - "--certificatesresolvers.cloudflare.acme.dnschallenge.resolvers=1.1.1.1:53,1.0.0.1:53"
    ports:
      - "80:80"
      - "443:443"
      - "5432:5432"
      - "3306:3306"
      - "27017:27017"
      - "6379:6379"
    environment:
      CF_API_EMAIL: "user@example.com" # TODO: Add Cloudflare email
      CF_DNS_API_TOKEN: "" # TODO: Add Cloudflare API token; permissions: zone:read,zone-settings:read,dns:edit
    volumes:
      - "letsencrypt_data:/letsencrypt"
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
    networks:
      - mydbspace_network

  mydbspaceui:
    image: "sakibhasanme09/mydbspaceui"
    container_name: "mydbspaceui"
    environment:
      APP_USERNAME: "admin" # TODO: Add username
      APP_PASSWORD: "admin" # TODO: Add password
      APP_SECRET_KEY: "" # TODO: Add secret
      ALLOWED_ORIGINS: "https://example.com, https://mydbspace.example.com" # TODO: Add allowed origins
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.mydbspaceui.rule=Host(`mydbspace.example.com`)" # TODO: Add dashboard domain
      - "traefik.http.routers.mydbspaceui.tls=true"
      - "traefik.http.routers.mydbspaceui.tls.certresolver=cloudflare"
      - "traefik.http.routers.mydbspaceui.entrypoints=websecure"
      - "traefik.http.services.mydbspaceui.loadbalancer.server.port=3000"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "mydbspace_data:/var/lib/mydbspace"
    networks:
      - mydbspace_network

volumes:
  mydbspace_data:
  letsencrypt_data:

networks:
  mydbspace_network:
    external: true
```

### 3. Start the Services

Run the following command to start MyDBSpace:

```sh
docker-compose up -d
```

### 4. Access the UI

Once the setup is complete, visit `https://mydbspace.example.com` in your browser and log in with the admin credentials.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve MyDBSpace.

## License

This project is licensed under the MIT License.
