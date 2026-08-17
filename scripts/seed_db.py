import asyncio
import os
import uuid
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text

# Assuming we have standard models setup in the backend
# We will use raw SQL for seeding if models aren't fully available yet
# to ensure the seed script works unconditionally.

DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql+asyncpg://agrimind:changeme@localhost:5432/agrimind"
)

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

async def seed():
    async with AsyncSessionLocal() as session:
        print("Starting database seed...")
        
        # 1. Create a User
        user_id = uuid.uuid4()
        await session.execute(
            text("""
            INSERT INTO users (id, email, hashed_password, full_name, is_active, created_at, updated_at)
            VALUES (:id, :email, :hashed_password, :full_name, true, :now, :now)
            ON CONFLICT (email) DO NOTHING
            """),
            {
                "id": user_id,
                "email": "testuser@agrimind.ai",
                "hashed_password": "hashed_dummy_password", # Replace with actual hash in prod
                "full_name": "Test Farmer",
                "now": datetime.now(timezone.utc)
            }
        )
        
        # Fetch user ID in case it already existed
        result = await session.execute(
            text("SELECT id FROM users WHERE email = :email"), 
            {"email": "testuser@agrimind.ai"}
        )
        user_id = result.scalar_one()

        # 2. Create a Farm
        farm_id = uuid.uuid4()
        await session.execute(
            text("""
            INSERT INTO farms (id, user_id, name, location_lat, location_lng, area_hectares, created_at, updated_at)
            VALUES (:id, :user_id, :name, :lat, :lng, :area, :now, :now)
            """),
            {
                "id": farm_id,
                "user_id": user_id,
                "name": "Sunny Ridge Farm",
                "lat": 34.0522,
                "lng": -118.2437,
                "area": 50.5,
                "now": datetime.now(timezone.utc)
            }
        )

        # 3. Create a Field
        field_id = uuid.uuid4()
        await session.execute(
            text("""
            INSERT INTO fields (id, farm_id, name, crop_type, area_hectares, boundaries, created_at, updated_at)
            VALUES (:id, :farm_id, :name, :crop_type, :area, :boundaries, :now, :now)
            """),
            {
                "id": field_id,
                "farm_id": farm_id,
                "name": "North Block - Corn",
                "crop_type": "Corn",
                "area": 20.0,
                "boundaries": '{"type": "Polygon", "coordinates": [[[-118.24, 34.05], [-118.25, 34.05], [-118.25, 34.06], [-118.24, 34.05]]]}',
                "now": datetime.now(timezone.utc)
            }
        )

        # 4. Add Sensor Data
        sensor_id = uuid.uuid4()
        await session.execute(
            text("""
            INSERT INTO sensors (id, field_id, type, status, last_reading_at, created_at)
            VALUES (:id, :field_id, :type, :status, :now, :now)
            """),
            {
                "id": sensor_id,
                "field_id": field_id,
                "type": "SOIL_MOISTURE",
                "status": "ACTIVE",
                "now": datetime.now(timezone.utc)
            }
        )

        await session.execute(
            text("""
            INSERT INTO sensor_readings (sensor_id, field_id, reading_type, value, unit, timestamp)
            VALUES (:sensor_id, :field_id, :type, :value, :unit, :now)
            """),
            {
                "sensor_id": sensor_id,
                "field_id": field_id,
                "type": "moisture",
                "value": 45.2,
                "unit": "percent",
                "now": datetime.now(timezone.utc)
            }
        )

        await session.commit()
        print("Database seed completed successfully!")

if __name__ == "__main__":
    asyncio.run(seed())
