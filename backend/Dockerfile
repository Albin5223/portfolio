# Étape 1 : build Maven pour dépendances
FROM maven:3.9.11-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:resolve

# Étape 2 : conteneur dev
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Monter le code local pour hot reload
VOLUME /app
EXPOSE 8080

# Installer Maven (pour mvn spring-boot:run)
RUN apt-get update && apt-get install -y maven

CMD ["mvn", "spring-boot:run"]

