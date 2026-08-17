.PHONY: dev test lint migrate seed build clean

dev:
	cd infrastructure/docker && docker-compose up -d
	@echo "All services started. API: http://localhost:8000 | Web: http://localhost:3000"

dev-stop:
	cd infrastructure/docker && docker-compose down

test:
	pytest tests/unit/ tests/integration/ --cov=services --cov-report=term-missing

test-unit:
	pytest tests/unit/ -v

test-integration:
	pytest tests/integration/ -v

test-e2e:
	cd apps/web && npx playwright test

test-load:
	locust -f tests/load/locustfile.py --headless -u 100 -r 10 --run-time 60s

lint:
	ruff check services/ packages/ ml/
	mypy services/ --ignore-missing-imports
	cd apps/web && npx eslint src/

lint-fix:
	ruff check services/ packages/ ml/ --fix
	cd apps/web && npx eslint src/ --fix

migrate:
	alembic -c packages/database/alembic.ini upgrade head

migrate-create:
	@read -p "Migration name: " name; alembic -c packages/database/alembic.ini revision --autogenerate -m "$$name"

migrate-rollback:
	alembic -c packages/database/alembic.ini downgrade -1

seed:
	python scripts/seed_db.py

build:
	cd apps/web && npm run build

docker-build:
	docker build -f services/api/Dockerfile -t agrimind/api:latest .
	docker build -f services/ai/Dockerfile -t agrimind/ai:latest .
	docker build -f services/vision/Dockerfile -t agrimind/vision:latest .
	docker build -f services/iot/Dockerfile -t agrimind/iot:latest .

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -name "*.pyc" -delete
	find . -name ".pytest_cache" -exec rm -rf {} +

setup:
	copy .env.example .env
	pip install poetry
	poetry install
	cd apps/web && npm install
	@echo "Setup complete! Edit .env with your credentials, then run 'make dev'"
