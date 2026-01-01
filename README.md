# Docker-Compose Setup for Express-URL-Shortener

This project uses **Docker and Docker Compose** to manage and run the backend, frontend, reverse proxy, and MongoDB services in isolated containers. HTTPS is supported via a self-signed certificate, and Nginx caching can be reset using Docker volumes.

---

## Services

### Reverse Proxy

* Built from `./ReverseProxy` folder.
* Handles HTTPS termination for frontend and backend.
* Routes `/` to frontend and `/api/` to backend.
* Supports self-signed certificate creation for local development.

### Backend

* Built from `./Backend` folder.
* Exposes port `3333` internally.
* Connects to MongoDB using the internal Docker network.
* For detailed backend documentation, see [./Backend](./Backend/README.md).

### Frontend

* Built from `./Frontend` folder.
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

## Setup & Usage

1. Ensure **Docker** and **Docker Compose** are installed.
2. From the project root, build and start all services:

```bash
docker compose up -d --build
```

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

---

This setup provides a **ready-to-use development environment** with HTTPS support, easy cache management, and isolated containers for each service.
