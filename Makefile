# Globify - Makefile
# Quick commands for Docker management

.PHONY: help build up down restart logs clean rebuild test setup

# Default target
help:
	@echo "Globify - Available commands:"
	@echo ""
	@echo "  make setup      - Initial setup (create config.local.js from template)"
	@echo "  make build      - Build Docker image"
	@echo "  make up         - Start the application"
	@echo "  make down       - Stop the application"
	@echo "  make restart    - Restart the application"
	@echo "  make rebuild    - Rebuild and restart"
	@echo "  make logs       - Show application logs"
	@echo "  make clean      - Stop and remove containers, images, and volumes"
	@echo "  make test       - Test if the app is running"
	@echo ""
	@echo "Quick start:"
	@echo "  1. make setup"
	@echo "  2. Edit src/scripts/config.local.js with your Spotify Client ID"
	@echo "  3. make up"
	@echo "  4. Open http://127.0.0.1:8080"

# Initial setup
setup:
	@if [ ! -f src/scripts/config.local.js ]; then \
		cp src/scripts/config.local.example.js src/scripts/config.local.js; \
		echo "✅ Created config.local.js"; \
		echo "⚠️  IMPORTANT: Edit src/scripts/config.local.js and add your Spotify Client ID"; \
	else \
		echo "⚠️  config.local.js already exists"; \
	fi

# Build Docker image
build:
	@echo "🔨 Building Docker image..."
	docker-compose build

# Start application
up:
	@echo "🚀 Starting Globify..."
	docker-compose up -d
	@echo ""
	@echo "✅ Globify is running!"
	@echo "🌐 Open: http://127.0.0.1:8080"
	@echo "📋 Logs: make logs"
	@echo "🛑 Stop: make down"

# Stop application
down:
	@echo "🛑 Stopping Globify..."
	docker-compose down

# Restart application
restart: down up

# Rebuild and restart
rebuild:
	@echo "🔄 Rebuilding and restarting..."
	docker-compose down
	docker-compose build
	docker-compose up -d
	@echo "✅ Done!"

# Show logs
logs:
	docker-compose logs -f

# Clean everything
clean:
	@echo "🧹 Cleaning up..."
	docker-compose down -v
	docker rmi globant2-web 2>/dev/null || true
	@echo "✅ Cleanup complete"

# Test if running
test:
	@echo "🔍 Testing if Globify is running..."
	@curl -s http://127.0.0.1:8080 > /dev/null && echo "✅ App is running at http://127.0.0.1:8080" || echo "❌ App is not running. Try: make up"

# Development mode with logs
dev:
	@echo "🔧 Starting in development mode..."
	docker-compose up
