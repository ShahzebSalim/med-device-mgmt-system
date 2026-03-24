# med-device-mgmt-system

Medical Device Manufacturer Management System — SWAM Assignment (University of Florence).

## Tech stack (prototype)
- Backend: Java / Jakarta EE 10 (JAX-RS + JPA)
- Application Server: Payara Server (Community)
- DBMS: MySQL 8.x
- Frontend (optional): Angular + TypeScript

## Repository structure
- `docs/` — technical report sections (requirements, domain model, implementation notes)
- `backend/` — Jakarta EE backend module (WAR)

## Running the backend (Payara + MySQL)

### 1) Create the MySQL database and user
Run the following SQL (example values used by this prototype):
```sql
CREATE DATABASE mdms;
CREATE USER 'mdms_user'@'localhost' IDENTIFIED BY 'mdms_pass';
GRANT ALL PRIVILEGES ON mdms.* TO 'mdms_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2) Configure Payara JDBC datasource
In Payara Admin Console (`http://localhost:4848`):
1. Create a JDBC Connection Pool (MySQL driver)
2. Create a JDBC Resource named: `jdbc/mdmsDB`

The JPA configuration is in `backend/src/main/resources/META-INF/persistence.xml` and expects `jdbc/mdmsDB`.

### 3) Build and deploy
Build the WAR:
```bash
mvn -f backend/pom.xml clean package
```
Deploy the generated WAR (`backend/target/mdms-backend.war`) to Payara.

### 4) Test the REST API
Base URL (default context root = WAR name):
- `http://localhost:8080/mdms-backend/api`

Example endpoints (will be implemented in the prototype):
- `GET /devices`
- `POST /devices`
- `GET /personnel`
- `GET /reports/production`

## Notes
- Authentication is intentionally mocked / not implemented (per assignment instructions).