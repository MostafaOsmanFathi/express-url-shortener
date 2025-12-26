# Docker-Compose Setup for Express-URL-Shortener

This project uses **Docker and Docker Compose** to manage and run the backend, frontend, and MongoDB services in isolated containers.

---

## Services

### Backend

* Built from `./Backend` folder.
* Exposes port `3333` to the host.
* Connects to MongoDB using the internal Docker network.
* For detailed backend documentation, go to [./Backend](./Backend).

### Frontend

* Built from `./Frontend` folder.
* Exposes port `80` to the host.
* For detailed frontend documentation, go to [./Frontend](./Frontend).

### MongoDB

* Uses the official `mongo:7` image.
* Stores data in a Docker volume (`mongo_data`).
* Runs only on the internal Docker network (not exposed to host) for security.

---

## Docker Compose Network

* All services are attached to the same network (`express-url-shortener`) to communicate internally.
* MongoDB is accessible **only from backend** or other containers in the network.

---

## Setup & Usage

1. Make sure Docker and Docker Compose are installed.
2. From the project root, run:

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

## Notes

* The MongoDB container is **internal-only**, so you cannot access it from the host.
* Backend service can access MongoDB using `mongodb://mongo:27017/BackendProject`.
* No additional network tools like `ping` are included in MongoDB container.

---

This setup allows you to quickly spin up a full development environment without manually installing dependencies.
