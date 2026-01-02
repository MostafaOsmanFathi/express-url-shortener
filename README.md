# Docker-Compose Setup for Express-URL-Shortener

This project uses **Docker and Docker Compose** to manage and run the backend, frontend, reverse proxy, and MongoDB services in isolated containers. HTTPS is supported via a self-signed certificate, and Nginx caching can be reset using Docker volumes.

---

## Services

### Reverse Proxy

* Built from `./ReverseProxy` folder (for local build) or pulled from GitHub Container Registry.
* Handles HTTPS termination for frontend and backend.
* Routes `/` to frontend and `/api/` to backend.
* Supports self-signed certificate creation for local development.

### Backend

* Built from `./Backend` folder (for local build) or pulled from GitHub Container Registry.
* Exposes port `3333` internally.
* Connects to MongoDB using the internal Docker network.
* For detailed backend documentation, see [./Backend](./Backend/README.md).

### Frontend

* Built from `./Frontend` folder (for local build) or pulled from GitHub Container Registry.
* Exposes port `80` internally.
* For detailed frontend documentation, see [./Frontend](./Frontend/README.md).

### MongoDB

* Uses the official `mongo:7` image.
* Stores data in a Docker volume (`mongo_data`).
* Accessible only by the backend container via the internal network.

---

## Docker Compose Network

* Services communicate internally through Docker networks.
* MongoDB is internal-only, enhancing security.
* Reverse proxy allows external HTTPS access to frontend and backend.

---

## Docker Compose Modes

This project supports **two ways to run the services**:

### 1. Pull prebuilt images from GitHub Container Registry

This mode uses images pushed to GHCR and does **not require building locally**. It's faster and useful to show registry/CI-CD workflow.

```bash
docker compose -f docker-compose.yml up -d
```

* Pulls images:

    * `ghcr.io/mostafaosmanfathi/express-url-shortener-reverse-proxy:v1.1`
    * `ghcr.io/mostafaosmanfathi/express-url-shortener-frontend:v1.1`
    * `ghcr.io/mostafaosmanfathi/express-url-shortener-backend:v1.1`

### 2. Build images locally

This mode builds the Docker images from the project folders. It’s useful to **demonstrate Dockerfile knowledge** or test local changes.

```bash
docker compose -f docker-compose.build.yml up -d --build
```

* Builds images from `./ReverseProxy`, `./Frontend`, and `./Backend` folders.

---

## Setup & Usage

1. Ensure **Docker** and **Docker Compose** are installed.
2. Run one of the Compose modes (see above) depending on whether you want to **pull images** or **build locally**.
3. Check running containers:

```bash
docker compose ps
```

4. To stop and remove containers:

```bash
docker compose down
```

---

## HTTPS Support

The reverse proxy supports HTTPS connections. A **dummy self-signed certificate** is provided for testing purposes, but it is recommended to generate and use your own certificate for development or production.

To generate a self-signed certificate for local testing:

```bash
openssl req -x509 -nodes -days 365 \
  -newkey rsa:2048 \
  -keyout ./ReverseProxy/certs/key.pem \
  -out ./ReverseProxy/certs/cert.pem \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"
```

Access the frontend at `https://localhost` and backend APIs via `https://localhost/api/...`.

---

## Resetting Nginx Cache

The reverse proxy uses a Docker volume (`express-url-shortener_reverse-proxy-cache`) for caching. To reset the cache:

```bash
docker volume rm express-url-shortener_reverse-proxy-cache
```

This ensures the reverse proxy serves fresh content and updated configuration.

---

## Resetting Mongo Database

The mongo database uses a Docker volume (`express-url-shortener_mongo_data`) for data. To reset the data:

```bash
docker volume rm express-url-shortener_mongo_data
```

---

## Notes

* Backend connects to MongoDB at `mongodb://mongo:27017/BackendProject`.
* Frontend should use relative API paths (`/api/...`) to work through the reverse proxy and avoid CORS issues.
* All services are isolated using Docker networks; MongoDB is not exposed to the host.
* Use **pull mode** to demonstrate GHCR usage, and **build mode** to demonstrate Dockerfile and local build skills.

---

This setup provides a **ready-to-use development environment** with HTTPS support, easy cache management, isolated containers for each service, and the flexibility to run either **prebuilt registry images** or **local builds**.
