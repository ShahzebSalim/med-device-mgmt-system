# STAGE 1: Build
FROM maven:3.9-eclipse-temurin-11 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# STAGE 2: Production runtime
# Using 26.1.3.Final as the stable bridge for Java 11 + Jakarta EE 9
FROM quay.io/wildfly/wildfly:latest
# Copy the WAR file
COPY --from=build /app/target/mdms-backend.war /opt/jboss/wildfly/standalone/deployments/mdms-backend.war

# Copy the MySQL driver from the local MAVEN repo inside the build container
# This path is standard for the maven:3.9 image
COPY --from=build /root/.m2/repository/com/mysql/mysql-connector-j/8.3.0/mysql-connector-j-8.3.0.jar /opt/jboss/wildfly/standalone/deployments/mysql-connector-j.jar