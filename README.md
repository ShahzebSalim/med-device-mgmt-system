
# Medical Device Management System (MDMS)

**SWAM Assignment - University of Florence**

A modern, full-stack web application for managing medical devices, personnel, teams, and certifications with professional UI, REST API, and Docker deployment.

---

## Overview

This project demonstrates a complete production-ready medical device management system built with:
- **Backend:** Java 11 + Jakarta EE 9.1.0 + JAX-RS + JPA
- **Application Server:** WildFly 25.0.1
- **Frontend:** Angular 21.2.3 + TypeScript + Tailwind CSS
- **Database:** H2 in-memory (development) / MySQL 8.x (production)
- **Deployment:** Docker + Docker Compose

## Quick Start (Docker)

### Prerequisites
- Docker & Docker Compose installed
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/ShahzebSalim/med-device-mgmt-system.git
cd med-device-mgmt-system

```

### 2. Start Backend & Database with Docker

```bash
docker-compose up --build -d
sleep 30  # Wait for WildFly to start

```

This starts:

* **WildFly 25** on `http://localhost:8080`
* **H2/MySQL Database**
* **Backend API** on `http://localhost:8080/mdms-backend/api`

### 3. Start Frontend (Development)

```bash
cd frontend
npm install
npm start

```

Access the application at `http://localhost:4200`

---

## Project Structure

```text
med-device-mgmt-system/
├── backend/                          # Jakarta EE Backend
│   ├── src/main/java/
│   │   └── com/unifi/swam/mdms/
│   │       ├── model/               # JPA Entities
│   │       ├── dtos/                # Data Transfer Objects
│   │       ├── rest/                # JAX-RS Resources
│   │       ├── services/            # Business Logic (CDI)
│   │       └── config/              # Configuration (CORS Filter)
│   ├── src/main/resources/
│   │   └── META-INF/persistence.xml # JPA Config
│   └── pom.xml                      # Maven Configuration
│
├── frontend/                         # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/               # Route Components
│   │   │   ├── services/            # HTTP Services
│   │   │   ├── models/              # TypeScript Models
│   │   │   └── app.routes.ts        # Route Configuration
│   │   ├── styles.css               # Tailwind + Print Styles
│   │   └── index.html
│   └── proxy.conf.json              # API Proxy Configuration
│
├── docker-compose.yml               # Docker Compose Setup
└── README.md

```

---

## Backend Development & API Architecture

### Build Backend Manually

```bash
cd backend
mvn clean package

```

### REST API Endpoints

```text
GET    /api/devices                    # List all devices
POST   /api/devices                    # Create device
GET    /api/devices/{id}               # Get device details
PUT    /api/devices/{id}               # Update device
DELETE /api/devices/{id}               # Delete device (cascades certifications)

GET    /api/devices/{id}/certifications    # List device certifications
POST   /api/devices/{id}/certifications    # Add certification
DELETE /api/certifications/{id}            # Delete certification

GET    /api/personnel                  # List personnel
POST   /api/personnel                  # Create personnel
DELETE /api/personnel/{id}             # Delete personnel

GET    /api/teams                      # List teams
POST   /api/teams                      # Create team
DELETE /api/teams/{id}                 # Delete team

```

### Key Components:

1. **Entities (JPA):** `MedicalDevice`, `Certification`, `Personnel`, `Team`
2. **DTOs (Data Transfer):** Prevents infinite JSON recursion across relationships.
3. **Services (CDI):** Handles `@Transactional` business logic.
4. **Cross-Origin Configuration:** `CorsFilter` enables frontend access from `localhost:4200`.

---

## Frontend Development

### Build for Production

```bash
cd frontend
npm run build

```

### Frontend Features

1. **Dashboard** (`/dashboard`): System statistics, allocations, and PDF report exports.
2. **Device Management** (`/devices`): Device CRUD, search, and certification mapping.
3. **Personnel Management** (`/personnel`): Role-based staff records.
4. **Team Management** (`/teams`): Engineering team creation and assignment.

**Styling:** Tailwind CSS 3.4.1 for responsive components and print-friendly audit reports.

---

## Database

### Development (H2 In-Memory)

Configured in `backend/src/main/resources/META-INF/persistence.xml` for zero-dependency local testing.

### Production (MySQL 8.x)

Deployed via Docker. The system initializes with `--lower-case-table-names=1` to guarantee schema deployment across differing host operating systems.

---

## Security

**Current Implementation:**

* **Mocked RBAC:** As per project specifications, authentication is bypassed. Role-Based Access Control is emulated at the UI level (Admin, QA, Executive) to demonstrate routing logic.
* **CORS Configured:** Securely maps frontend to backend.
* **SQL Protection:** Native JPA parameterized queries.

---

## Troubleshooting

### Port Already in Use

```bash
# Free port 8080 (WildFly)
lsof -i :8080
kill -9 <PID>

# Free port 4200 (Angular)
lsof -i :4200
kill -9 <PID>

```

### Docker Issues

```bash
# View logs
docker-compose logs wildfly

# Clean rebuild
docker-compose down -v
docker-compose up --build -d

```

### Frontend API Connection Failed

```bash
# Check backend is running
curl http://localhost:8080/mdms-backend/api/devices

# Verify proxy config
cat frontend/proxy.conf.json

```

---

## System Requirements

* **OS:** Windows, macOS, Linux
* **Java:** OpenJDK 11
* **Maven:** 3.6+
* **Node.js:** 18+
* **Docker:** 20.x+
* **RAM:** 4GB minimum, 8GB recommended

---

## Authors

**Shahzeb Salim**

* GitHub: [@ShahzebSalim](https://github.com/ShahzebSalim)
* University of Florence

**Aneeza Maroof**

* University of Florence
