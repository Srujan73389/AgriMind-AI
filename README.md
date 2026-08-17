# AgriMind AI

An AI-powered smart farming SaaS platform.

## Architecture

```text
+-------------------+       +--------------------+       +------------------+
|                   |       |                    |       |                  |
|    Next.js Web    +<----->+    FastAPI Core    +<----->+  PostgreSQL (DB) |
|   (Frontend App)  |       |   (services/api)   |       |  + PostGIS       |
|                   |       |                    |       +------------------+
+-------------------+       +---------+----------+
                                      |
+-------------------+                 |                  +------------------+
|                   |                 |                  |                  |
|   MQTT Broker     +<----------------+----------------->+  Redis (Cache/   |
|   (Mosquitto)     |                 |                  |  Rate Limits)    |
|                   |                 |                  +------------------+
+---------+---------+       +---------v----------+
          ^                 |                    |       +------------------+
          |                 |    LangGraph AI    +<----->+  Qdrant (Vector  |
+---------+---------+       |    (services/ai)   |       |  DB)             |
|                   |       |                    |       +------------------+
|   IoT Sensors     |       +--------------------+
|                   |
+-------------------+
```

## Tech Stack
- **Backend:** Python 3.12, FastAPI, SQLAlchemy 2.0
- **Database:** PostgreSQL (TimescaleDB + PostGIS for spatial/time-series)
- **AI/ML:** LangGraph, LangChain, OpenAI
- **Cache/Queue:** Redis, Celery
- **IoT:** MQTT (Mosquitto)
- **Vector DB:** Qdrant

## Setup Instructions

### 1. Docker Environment
Run the complete stack using Docker Compose:

```bash
cd infrastructure/docker
docker-compose up -d
```

### 2. Local Python Setup
```bash
poetry install
poetry run uvicorn services.api.main:app --reload
```
