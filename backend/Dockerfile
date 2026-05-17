# STAGE 1: Build the application using Java 11
FROM maven:3.9-eclipse-temurin-11 AS build
WORKDIR /app

# Copy the pom.xml and source code into the container
COPY pom.xml .
COPY src ./src

# Compile the application and pack the war binary natively inside docker
RUN mvn clean package -DskipTests

# STAGE 2: Production runtime environment
FROM quay.io/wildfly/wildfly:latest

# Copy the generated war package and database driver from the build stage
COPY --from=build /app/target/mdms-backend-0.1.0-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/mdms-backend.war
COPY --from=build /app/target/mdms-backend-0.1.0-SNAPSHOT/WEB-INF/lib/mysql-connector-j-8.3.0.jar /opt/jboss/wildfly/standalone/deployments/mysql-connector-j.jar