# ==============================================================================
# Multi-stage Dockerfile for Fusion3D Works Spring Boot Backend
# Optimized for Render, Railway, Fly.io, and Cloud Run deployment
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build & Automated Test Execution
# ------------------------------------------------------------------------------
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder

WORKDIR /build

# 1. Cache Maven dependencies first to optimize Docker layer caching
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 2. Copy application source code
COPY src ./src

# 3. Run automated tests (ensures quality gate before packaging)
RUN mvn test -B

# 4. Package executable Spring Boot jar
RUN mvn package -DskipTests -B

# ------------------------------------------------------------------------------
# Stage 2: Minimal, Hardened Production Runtime
# ------------------------------------------------------------------------------
FROM eclipse-temurin:17-jre-alpine AS runtime

# Install wget / curl for container health check probes
RUN apk --no-cache add curl wget

# Create a non-privileged user and group for enhanced container security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy the fat executable jar from the builder stage
COPY --from=builder /build/target/fusion3d-backend-*.jar /app/app.jar

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Container runtime optimization:
# MaxRAMPercentage dynamically tunes JVM heap size to container memory limits (vital for Render 512MB RAM tier)
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError -Djava.security.egd=file:/dev/./urandom"
ENV PORT=8080

# Default port documentation
EXPOSE 8080

# Container Healthcheck probe for Render / Docker orchestrators
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -q -O - http://localhost:${PORT}/api/health || exit 1

# Launch the Spring Boot application using environment PORT
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
