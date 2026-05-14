# Medical Device Manufacturer Management System

**SWAM Assignment - University of Florence**

A modern, full-stack web application for managing medical devices, personnel, teams, and certifications with professional UI, REST API, and Docker deployment.

## 🎯 Overview

This project demonstrates a complete production-ready medical device management system built with:
- **Backend:** Java 11 + Jakarta EE 9.1.0 + JAX-RS + JPA
- **Application Server:** WildFly 25
- **Frontend:** Angular 21.2.3 + TypeScript + Tailwind CSS
- **Database:** H2 in-memory (development) / MySQL 8.x (production)
- **Deployment:** Docker + Docker Compose

## 📋 Tech Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Backend Language** | Java | 11 (LTS) |
| **Jakarta EE** | JAX-RS, JPA, CDI, Bean Validation | 9.1.0 |
| **Application Server** | WildFly | 25.0.1 |
| **Database** | H2 (dev) / MySQL (prod) | 8.x |
| **Frontend Framework** | Angular | 21.2.3 |
| **Styling** | Tailwind CSS | 3.4.1 |
| **Package Manager** | npm | Latest |
| **Containerization** | Docker & Docker Compose | Latest |

## 🚀 Quick Start (Docker)

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
docker-compose up -d
sleep 30  # Wait for WildFly to start
```

This starts:
- **WildFly 25** on `http://localhost:8080`
- **H2 Database** in-memory
- **Backend API** on `http://localhost:8080/mdms-backend/api`

### 3. Start Frontend (Development)
```bash
cd frontend
npm install
npm start
```

Access the application at `http://localhost:4200`

### 4. Test the API
```bash
# Get all devices
curl http://localhost:8080/mdms-backend/api/devices

# Create a device
curl -X POST http://localhost:8080/mdms-backend/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Device X",
    "udi": "DEVICE-001",
    "version": "1.0",
    "status": "ACTIVE"
  }'
```

---

## 📁 Project Structure

```
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
│   └── pom.xml                      # Maven Configuration (Java 11, Jakarta 9.1.0)
│
├── frontend/                         # Angular Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── pages/               # Route Components
│   │   │   │   ├── dashboard/       # Statistics & Reports
│   │   │   │   ├── device-list/     # Device CRUD + Delete
│   │   │   │   ├── device-detail/   # Device Edit & Certifications
│   │   │   │   ├── personnel-list/  # Personnel Management
│   │   │   │   └── team-list/       # Team Management
│   │   │   ├── services/            # HTTP Services
│   │   │   ├── models/              # TypeScript Models
│   │   │   ├── app.html             # Navigation Bar
���   │   │   └── app.routes.ts        # Route Configuration
│   │   ├── styles.css               # Tailwind + Print Styles
│   │   └── index.html
│   ├── package.json
│   ├── angular.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── proxy.conf.json              # API Proxy Configuration
│
├── docker-compose.yml               # Docker Compose Setup
└── README.md
```

---

## 🔧 Backend Development

### Prerequisites
- Java 11 (JDK)
- Maven 3.6+

### Build Backend
```bash
cd backend
mvn clean package
```

Generates: `backend/target/mdms-backend-0.1.0-SNAPSHOT.war`

### Backend Architecture

**REST API Endpoints:**
```
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

**Key Components:**

1. **Entities (JPA):**
   - `MedicalDevice` - Medical device info with status tracking
   - `Certification` - Device certifications (many-to-one)
   - `Personnel` - R&D personnel with roles
   - `Team` - Team assignment groups

2. **DTOs (Data Transfer):**
   - `MedicalDeviceDTO` - Device data with nested certifications
   - `CertificationDTO` - Certification details
   - `PersonnelDTO` - Personnel info
   - `TeamDTO` - Team details

3. **Services (Business Logic):**
   - `MedicalDeviceService` - Device CRUD + filtering
   - `CertificationService` - Certification management
   - `PersonnelService` - Personnel management
   - `TeamService` - Team management

4. **REST Resources (JAX-RS):**
   - `MedicalDeviceResource` - `/api/devices` endpoints
   - `CertificationResource` - `/api/certifications` endpoints
   - `PersonnelResource` - `/api/personnel` endpoints
   - `TeamResource` - `/api/teams` endpoints

5. **Cross-Origin Configuration:**
   - `CorsFilter` - Enables frontend access from `http://localhost:4200`
   - Allows: GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD
   - Headers: Content-Type, Authorization, X-Requested-With

### Java 11 Compatibility
```xml
<!-- pom.xml -->
<maven.compiler.release>11</maven.compiler.release>
<jakarta.ee.version>9.1.0</jakarta.ee.version>
```

**Key Changes:**
- ✅ `Stream.toList()` → `collect(Collectors.toList())` (Java 16+ → Java 11)
- ✅ Jakarta EE 9.1.0 (supports Java 11 bytecode)
- ✅ WildFly 25 compatible

---

## 🎨 Frontend Development

### Prerequisites
- Node.js 18+ (or v25.8.1)
- npm 9+

### Install Dependencies
```bash
cd frontend
npm install
```

### Development Server
```bash
npm start
```

Starts at `http://localhost:4200` with hot reload.

### Build for Production
```bash
npm run build
```

Outputs to `frontend/dist/`

### Frontend Features

**Components:**

1. **Dashboard** (`/dashboard`)
   - System statistics (devices, personnel, teams)
   - Team resource allocation chart
   - Download PDF report functionality
   - Real-time data aggregation

2. **Device Management** (`/devices`)
   - List all devices with status badges
   - Search by name, UDI, version
   - Create new device (inline form)
   - Edit device (inline edit mode)
   - **Delete device with confirmation**
   - View device details & certifications

3. **Device Details** (`/devices/:id`)
   - Full device information
   - Inline edit mode
   - Manage certifications (CRUD)
   - Status tracking (ACTIVE/INACTIVE)

4. **Personnel Management** (`/personnel`)
   - List all personnel
   - Role badges (ADMIN, MANAGER, STANDARD_USER)
   - Team assignment display
   - Search functionality

5. **Team Management** (`/teams`)
   - Team list with card layout
   - Create/edit teams
   - Team member overview
   - Empty state handling

**Styling:**
- Tailwind CSS 3.4.1 for all components
- Responsive design (mobile, tablet, desktop)
- Professional color scheme (blue, green, red, purple)
- Status badges with color coding
- Print-friendly CSS for reports

**Services:**
- `DeviceService` - Device HTTP calls
- `PersonnelService` - Personnel HTTP calls
- `TeamService` - Team HTTP calls
- `CertificationService` - Certification HTTP calls
- Angular HttpClient with proxy configuration

---

## 🗄️ Database

### Development (H2 In-Memory)
```
JDBC URL: jdbc:h2:mem:mdms
Username: sa
Password: (empty)
Persistence: None (resets on restart)
```

**Configured in:**
- `docker-compose.yml` (WildFly datasource)
- `backend/src/main/resources/META-INF/persistence.xml`

### Production (MySQL 8.x)

**Setup:**
```sql
CREATE DATABASE mdms;
CREATE USER 'mdms_user'@'localhost' IDENTIFIED BY 'mdms_pass';
GRANT ALL PRIVILEGES ON mdms.* TO 'mdms_user'@'localhost';
FLUSH PRIVILEGES;
```

**Connection:**
```
URL: jdbc:mysql://localhost:3306/mdms
Username: mdms_user
Password: mdms_pass
```

**Tables:**
- `medical_devices` - Device records
- `certifications` - Device certifications
- `personnel` - Personnel records
- `teams` - Team records

---

## 🐳 Docker Deployment

### docker-compose.yml
```yaml
services:
  wildfly:
    image: quay.io/wildfly/wildfly:latest
    ports:
      - "8080:8080"
      - "9990:9990"
    volumes:
      - ./backend/target/mdms-backend-0.1.0-SNAPSHOT.war:/opt/jboss/wildfly/standalone/deployments/
    environment:
      - JAVA_OPTS=-Xms512m -Xmx1024m
```

### Deploy Backend
```bash
# Build WAR
mvn -f backend/pom.xml clean package

# Start WildFly with Docker
docker-compose up -d

# Configure H2 datasource (automatic in docker-compose)
```

### Access WildFly Admin Console
```
http://localhost:9990
Username: admin
Password: admin
```

---

## 📊 Features Overview

### ✅ Implemented

| Feature | Status | Details |
|---------|--------|---------|
| **Device CRUD** | ✅ Complete | Create, Read, Update, Delete devices |
| **Device Delete** | ✅ Complete | With confirmation dialog + cascading delete |
| **Certifications** | ✅ Complete | Manage device certifications |
| **Personnel Management** | ✅ Complete | Role-based personnel records |
| **Team Management** | ✅ Complete | Team creation & assignment |
| **Dashboard** | ✅ Complete | System statistics + analytics |
| **Print Report** | ✅ Complete | PDF export with professional layout |
| **Search & Filter** | ✅ Complete | Search devices, personnel |
| **Status Badges** | ✅ Complete | ACTIVE (green), INACTIVE (red) |
| **Responsive UI** | ✅ Complete | Mobile, tablet, desktop |
| **Tailwind CSS** | ✅ Complete | Professional styling |
| **REST API** | ✅ Complete | Full CRUD endpoints |
| **CORS Support** | ✅ Complete | Frontend ↔ Backend communication |
| **Docker Deploy** | ✅ Complete | One-command deployment |

### 🔄 Future Enhancements

- [ ] **Authentication/Authorization** - JWT-based user auth with role-based access control
- [ ] **Input Validation UI** - Real-time form validation feedback with error messages
- [ ] **Toast Notifications** - Success/error/warning alerts system
- [ ] **Advanced Filtering** - Date ranges, multi-select status filters
- [ ] **Export to Excel** - Excel report generation with charts
- [ ] **User Management** - Admin panel for user creation/permissions
- [ ] **Audit Logging** - Track all user actions and changes
- [ ] **Unit Tests** - Backend & Frontend comprehensive test suites
- [ ] **API Documentation** - Swagger/OpenAPI specification

---

## 🔐 Security

**Current State:**
- ✅ CORS configured for frontend access
- ✅ Input validation on backend (Bean Validation)
- ✅ SQL injection protection (JPA parameterized queries)
- ✅ HTTP methods properly implemented

**Future Security Enhancements:**
- [ ] JWT authentication
- [ ] Role-based access control (RBAC)
- [ ] HTTPS/TLS support
- [ ] Rate limiting
- [ ] CSRF protection

---

## 📝 API Examples

### Create Device
```bash
curl -X POST http://localhost:8080/mdms-backend/api/devices \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ventilator X3",
    "udi": "VENTX3-2024-001",
    "version": "2.1.0",
    "status": "ACTIVE"
  }'
```

### Update Device
```bash
curl -X PUT http://localhost:8080/mdms-backend/api/devices/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ventilator X3 Pro",
    "version": "2.2.0",
    "status": "ACTIVE"
  }'
```

### Delete Device
```bash
curl -X DELETE http://localhost:8080/mdms-backend/api/devices/1
```

### Get Device with Certifications
```bash
curl http://localhost:8080/mdms-backend/api/devices/1
```

---

## 🧪 Testing

### Manual Testing
1. Navigate to `http://localhost:4200`
2. Access each page: Dashboard, Devices, Personnel, Teams
3. Test CRUD operations
4. Test delete with confirmation
5. Test print report (Ctrl+P / Cmd+P)
6. Test search functionality

### API Testing (Postman/cURL)
```bash
# Health check
curl http://localhost:8080/mdms-backend/api/devices

# Create device
curl -X POST http://localhost:8080/mdms-backend/api/devices \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","udi":"TEST-001","version":"1.0","status":"ACTIVE"}'
```

---

## 📋 System Requirements

### Development
- **OS:** Windows, macOS, Linux
- **Java:** OpenJDK 11 (or later LTS)
- **Maven:** 3.6+
- **Node.js:** 18+
- **npm:** 9+
- **Docker:** 20.x+ (optional but recommended)
- **RAM:** 4GB minimum, 8GB recommended

### Production
- **OS:** Linux (CentOS, Ubuntu, Debian)
- **Java:** OpenJDK 11 (or later LTS)
- **WildFly:** 25.0.1
- **MySQL:** 8.x
- **Docker:** 20.x+
- **RAM:** 2GB minimum, 4GB+ recommended
- **Storage:** 10GB+ for database

---

## 🚨 Troubleshooting

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

# Restart services
docker-compose restart

# Clean rebuild
docker-compose down -v
docker-compose up -d
```

### Frontend API Connection Failed
```bash
# Check backend is running
curl http://localhost:8080/mdms-backend/api/devices

# Verify proxy config
cat frontend/proxy.conf.json

# Restart frontend
cd frontend
npm start
```

### H2 Database Connection Issues
```bash
# Verify datasource in WildFly
# Admin Console: http://localhost:9990
# Configuration > Subsystems > Datasources
```

---

## 📦 Dependencies

### Backend
- Jakarta EE 9.1.0 (JAX-RS, JPA, CDI, Bean Validation)
- H2 Database
- MySQL Connector Java

### Frontend
- Angular 21.2.3
- TypeScript 5.x
- Tailwind CSS 3.4.1
- RxJS 7.x

---

## 📄 License

This project is part of the **SWAM Assignment** for the University of Florence.

---

## 👥 Author

**Shahzeb Salim**
- GitHub: [@ShahzebSalim](https://github.com/ShahzebSalim)
- University: University of Florence

---

## 📚 References

- [Jakarta EE Documentation](https://jakarta.ee/)
- [WildFly Documentation](https://docs.wildfly.org/)
- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com/)

---

## ✨ Key Achievements

✅ Full-stack Java + Angular application  
✅ Professional REST API with CRUD operations  
✅ Modern responsive UI with Tailwind CSS  
✅ Dashboard with statistics & reporting  
✅ Docker containerization for easy deployment  
✅ Java 11 compatibility with Jakarta EE 9.1.0  
✅ CORS-enabled frontend integration  
✅ Production-ready code quality  
