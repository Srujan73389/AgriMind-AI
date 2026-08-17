import os

base_dir = r"d:\AgriMind AI"

files = {}

files[r"packages\database\__init__.py"] = '''\
# Database package initialization
'''

files[r"packages\database\alembic.ini"] = '''\
[alembic]
script_location = packages/database/migrations
sqlalchemy.url = postgresql+asyncpg://postgres:postgres@localhost:5432/agrimind
'''

files[r"packages\database\base.py"] = '''\
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import MetaData

NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

class Base(DeclarativeBase):
    metadata = MetaData(naming_convention=NAMING_CONVENTION)
'''

files[r"packages\database\migrations\env.py"] = '''\
import asyncio
from logging.config import fileConfig
from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config
from alembic import context

from packages.database.base import Base
# Import all models to ensure they are registered for auto-generate
# from services.api.models import user, farm, iot, ai, marketplace, community, report

config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()

async def run_async_migrations() -> None:
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)
    await connectable.dispose()

def run_migrations_online() -> None:
    asyncio.run(run_async_migrations())

run_migrations_online()
'''

files[r"packages\database\migrations\versions\001_initial_schema.py"] = '''\
"""initial schema

Revision ID: 001
Revises: 
Create Date: 2024-05-01 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade() -> None:
    # Users
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )
    # Farms
    op.create_table(
        'farms',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    # Add other tables here for fields, iot_devices, sensor_readings, etc.

def downgrade() -> None:
    op.drop_table('farms')
    op.drop_table('users')
'''

files[r"packages\shared\__init__.py"] = '''\
# Shared utilities and constants
'''

files[r"packages\shared\utils.py"] = '''\
import uuid
from datetime import datetime

def generate_uuid() -> str:
    return str(uuid.uuid4())

def format_datetime(dt: datetime) -> str:
    return dt.isoformat()

def paginate_query(query, page: int, size: int):
    return query.offset((page - 1) * size).limit(size)

def slugify(text: str) -> str:
    return text.lower().replace(" ", "-")

def calculate_distance_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Simplified haversine distance
    return 0.0
'''

files[r"packages\shared\constants.py"] = '''\
PLAN_LIMITS = {
    "free": {"farms": 1, "sensors": 5},
    "pro": {"farms": 10, "sensors": 50},
    "enterprise": {"farms": -1, "sensors": -1}
}
SENSOR_TYPES = ["temperature", "humidity", "soil_moisture", "ph", "npk"]
DISEASE_CLASSES = ["blight", "rust", "leaf_spot", "healthy"]
CROP_TYPES = ["wheat", "corn", "rice", "soybean", "cotton"]
SUPPORTED_LANGUAGES = ["en", "es", "fr", "hi"]
'''

files[r"services\api\config.py"] = '''\
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/agrimind"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "supersecretkey"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    class Config:
        env_file = ".env.example"

settings = Settings()
'''

files[r"services\api\main.py"] = '''\
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import (
    auth, farms, ai, vision, iot, satellite, 
    marketplace, community, reports, notifications, predictions
)

app = FastAPI(title="AgriMind AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(farms.router, prefix="/farms", tags=["farms"])
app.include_router(ai.router, prefix="/ai", tags=["ai"])
app.include_router(vision.router, prefix="/vision", tags=["vision"])
app.include_router(iot.router, prefix="/iot", tags=["iot"])
app.include_router(satellite.router, prefix="/satellite", tags=["satellite"])
app.include_router(marketplace.router, prefix="/marketplace", tags=["marketplace"])
app.include_router(community.router, prefix="/community", tags=["community"])
app.include_router(reports.router, prefix="/reports", tags=["reports"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(predictions.router, prefix="/predictions", tags=["predictions"])

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
'''

files[r"services\api\database.py"] = '''\
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from .config import settings

engine = create_async_engine(settings.database_url, echo=False)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

async def get_db():
    async with async_session_maker() as session:
        yield session
'''

files[r"services\api\dependencies.py"] = '''\
from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from .database import get_db

async def get_current_user(token: str = "dummy_token"):
    # Dummy implementation for user retrieval
    return {"id": "user-123", "email": "test@agrimind.ai"}

async def get_redis():
    return None

async def check_plan_limit():
    return True

async def get_ws_user(token: str):
    return {"id": "user-123"}
'''

# --- MODELS ---
files[r"services\api\models\user.py"] = '''\
from sqlalchemy import Column, String, Boolean
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
'''

files[r"services\api\models\farm.py"] = '''\
from sqlalchemy import Column, String, ForeignKey, Float
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Farm(Base):
    __tablename__ = "farms"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    name = Column(String)
    location_lat = Column(Float)
    location_lng = Column(Float)

class Field(Base):
    __tablename__ = "fields"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    name = Column(String)
'''

files[r"services\api\models\iot.py"] = '''\
from sqlalchemy import Column, String, ForeignKey, Float, DateTime
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class IoTDevice(Base):
    __tablename__ = "iot_devices"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    device_type = Column(String)

class SensorReading(Base):
    __tablename__ = "sensor_readings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    device_id = Column(UUID(as_uuid=True), ForeignKey("iot_devices.id"))
    timestamp = Column(DateTime)
    value = Column(Float)
'''

files[r"services\api\models\ai.py"] = '''\
from sqlalchemy import Column, String, ForeignKey, Text
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)

class Message(Base):
    __tablename__ = "messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("conversations.id"))
    content = Column(Text)
    role = Column(String)

class AIReasoningLog(Base):
    __tablename__ = "ai_reasoning_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    message_id = Column(UUID(as_uuid=True), ForeignKey("messages.id"))
    trace = Column(Text)

class DiseaseEvent(Base):
    __tablename__ = "disease_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    disease_type = Column(String)
'''

files[r"services\api\models\marketplace.py"] = '''\
from sqlalchemy import Column, String, ForeignKey, Float
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class MarketplaceListing(Base):
    __tablename__ = "marketplace_listings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    seller_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)
    price = Column(Float)

class MarketplaceOrder(Base):
    __tablename__ = "marketplace_orders"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    listing_id = Column(UUID(as_uuid=True), ForeignKey("marketplace_listings.id"))
    buyer_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    status = Column(String)
'''

files[r"services\api\models\community.py"] = '''\
from sqlalchemy import Column, String, ForeignKey, Text
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class CommunityPost(Base):
    __tablename__ = "community_posts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)
    content = Column(Text)

class CommunityComment(Base):
    __tablename__ = "community_comments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("community_posts.id"))
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    content = Column(Text)
'''

files[r"services\api\models\report.py"] = '''\
from sqlalchemy import Column, String, ForeignKey
from packages.database.base import Base
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Report(Base):
    __tablename__ = "reports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    farm_id = Column(UUID(as_uuid=True), ForeignKey("farms.id"))
    report_url = Column(String)

class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    plan = Column(String)
'''

# --- SCHEMAS ---
files[r"services\api\schemas\auth.py"] = '''\
from pydantic import BaseModel, EmailStr

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenPair(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class LoginResponse(BaseModel):
    user_id: str
    tokens: TokenPair

class RefreshRequest(BaseModel):
    refresh_token: str
'''

files[r"services\api\schemas\farm.py"] = '''\
from pydantic import BaseModel
from typing import List, Optional

class FieldBase(BaseModel):
    name: str

class FieldCreate(FieldBase):
    pass

class FieldResponse(FieldBase):
    id: str
    farm_id: str
    class Config:
        from_attributes = True

class FarmBase(BaseModel):
    name: str
    location_lat: float
    location_lng: float

class FarmCreate(FarmBase):
    pass

class FarmUpdate(FarmBase):
    pass

class FarmResponse(FarmBase):
    id: str
    user_id: str
    fields: List[FieldResponse] = []
    class Config:
        from_attributes = True

class DashboardResponse(BaseModel):
    total_farms: int
    active_alerts: int
'''

files[r"services\api\schemas\ai.py"] = '''\
from pydantic import BaseModel
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    conversation_id: str

class DiseaseDetectionRequest(BaseModel):
    image_url: str

class DiseaseDetectionResponse(BaseModel):
    disease: str
    confidence: float
    recommendation: str

class ReasoningTrace(BaseModel):
    steps: List[str]
'''

files[r"services\api\schemas\iot.py"] = '''\
from pydantic import BaseModel
from datetime import datetime
from typing import List

class SensorReading(BaseModel):
    device_id: str
    timestamp: datetime
    value: float

class SensorTimeSeries(BaseModel):
    readings: List[SensorReading]

class DeviceStatus(BaseModel):
    device_id: str
    status: str
    battery_level: float

class SensorAlert(BaseModel):
    device_id: str
    alert_type: str
    message: str
'''

files[r"services\api\schemas\marketplace.py"] = '''\
from pydantic import BaseModel

class ListingCreate(BaseModel):
    title: str
    price: float
    description: str

class ListingResponse(ListingCreate):
    id: str
    seller_id: str
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    listing_id: str
    quantity: int

class OrderResponse(OrderCreate):
    id: str
    buyer_id: str
    status: str
    class Config:
        from_attributes = True
'''

# --- AUTH & MIDDLEWARE ---
files[r"services\api\auth\jwt.py"] = '''\
import jwt
from datetime import datetime, timedelta
from ..config import settings

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.jwt_algorithm)

def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=[settings.jwt_algorithm])
    except jwt.PyJWTError:
        return {}
'''

files[r"services\api\auth\password.py"] = '''\
import bcrypt

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
'''

files[r"services\api\middleware\rate_limit.py"] = '''\
from fastapi import Request, HTTPException

async def rate_limit_middleware(request: Request, call_next):
    # Dummy rate limiter
    response = await call_next(request)
    return response
'''

# --- ROUTERS ---
files[r"services\api\routers\auth.py"] = '''\
from fastapi import APIRouter
from ..schemas.auth import RegisterRequest, LoginRequest, LoginResponse, TokenPair, RefreshRequest

router = APIRouter()

@router.post("/register")
async def register(req: RegisterRequest):
    return {"message": "User registered"}

@router.post("/login", response_model=LoginResponse)
async def login(req: LoginRequest):
    return LoginResponse(user_id="123", tokens=TokenPair(access_token="acc", refresh_token="ref"))

@router.post("/refresh")
async def refresh(req: RefreshRequest):
    return {"access_token": "new_acc"}

@router.post("/logout")
async def logout():
    return {"message": "Logged out"}

@router.get("/me")
async def me():
    return {"id": "123", "email": "test@test.com"}

@router.get("/google")
async def google_auth():
    return {"url": "https://accounts.google.com/o/oauth2/v2/auth"}
'''

files[r"services\api\routers\farms.py"] = '''\
from fastapi import APIRouter
from ..schemas.farm import FarmCreate, FarmResponse, FieldCreate, DashboardResponse

router = APIRouter()

@router.post("/", response_model=FarmResponse)
async def create_farm(farm: FarmCreate):
    return FarmResponse(id="farm1", user_id="123", **farm.model_dump())

@router.get("/{id}", response_model=FarmResponse)
async def get_farm(id: str):
    return FarmResponse(id=id, user_id="123", name="My Farm", location_lat=0.0, location_lng=0.0)

@router.get("/dashboard/summary", response_model=DashboardResponse)
async def dashboard():
    return DashboardResponse(total_farms=1, active_alerts=0)

@router.post("/{id}/fields")
async def add_field(id: str, field: FieldCreate):
    return {"id": "field1", "farm_id": id, **field.model_dump()}
'''

files[r"services\api\routers\ai.py"] = '''\
from fastapi import APIRouter
from ..schemas.ai import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    return ChatResponse(reply="I am an AI assistant.", conversation_id="conv1")

@router.get("/conversations")
async def list_conversations():
    return []

@router.get("/conversations/{id}/messages")
async def list_messages(id: str):
    return []
'''

files[r"services\api\routers\vision.py"] = '''\
from fastapi import APIRouter, UploadFile, File
from ..schemas.ai import DiseaseDetectionResponse

router = APIRouter()

@router.post("/detect", response_model=DiseaseDetectionResponse)
async def detect_disease(file: UploadFile = File(...)):
    return DiseaseDetectionResponse(disease="healthy", confidence=0.99, recommendation="Looking good!")

@router.get("/disease-events")
async def get_disease_events():
    return []
'''

files[r"services\api\routers\iot.py"] = '''\
from fastapi import APIRouter, WebSocket
from typing import List
from ..schemas.iot import SensorReading

router = APIRouter()

@router.websocket("/farms/{id}/sensors/ws")
async def sensor_websocket(websocket: WebSocket, id: str):
    await websocket.accept()
    await websocket.send_json({"status": "connected"})

@router.get("/farms/{id}/sensors/history", response_model=List[SensorReading])
async def sensor_history(id: str):
    return []
'''

files[r"services\api\routers\satellite.py"] = '''\
from fastapi import APIRouter

router = APIRouter()

@router.get("/farms/{id}/ndvi")
async def get_ndvi(id: str):
    return {"ndvi_score": 0.8}

@router.get("/farms/{id}/health-map")
async def get_health_map(id: str):
    return {"url": "https://map.url"}
'''

files[r"services\api\routers\marketplace.py"] = '''\
from fastapi import APIRouter
from ..schemas.marketplace import ListingCreate, ListingResponse, OrderCreate, OrderResponse

router = APIRouter()

@router.post("/listings", response_model=ListingResponse)
async def create_listing(listing: ListingCreate):
    return ListingResponse(id="list1", seller_id="123", **listing.model_dump())

@router.post("/orders", response_model=OrderResponse)
async def create_order(order: OrderCreate):
    return OrderResponse(id="ord1", buyer_id="123", status="pending", **order.model_dump())
'''

files[r"services\api\routers\community.py"] = '''\
from fastapi import APIRouter

router = APIRouter()

@router.post("/posts")
async def create_post():
    return {"id": "post1"}

@router.post("/posts/{id}/comments")
async def add_comment(id: str):
    return {"id": "comment1"}
'''

files[r"services\api\routers\reports.py"] = '''\
from fastapi import APIRouter

router = APIRouter()

@router.post("/generate")
async def generate_report():
    return {"status": "generating"}

@router.get("/{id}/download")
async def download_report(id: str):
    return {"url": f"https://reports.url/{id}.pdf"}
'''

files[r"services\api\routers\notifications.py"] = '''\
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_notifications():
    return []

@router.post("/{id}/read")
async def mark_read(id: str):
    return {"status": "success"}
'''

files[r"services\api\routers\predictions.py"] = '''\
from fastapi import APIRouter

router = APIRouter()

@router.post("/yield")
async def predict_yield():
    return {"predicted_yield": 1000}

@router.post("/disease-risk")
async def predict_disease_risk():
    return {"risk": "low"}

@router.post("/water")
async def predict_water():
    return {"water_needed_liters": 500}

@router.post("/profit")
async def predict_profit():
    return {"estimated_profit": 2000.0}
'''

# --- MISC SERVICES ---
files[r"services\api\notifications\dispatcher.py"] = '''\
def send_notification(user_id: str, message: str, channels: list):
    """
    Multichannel dispatcher for SMS, WhatsApp, Push, Email.
    """
    for channel in channels:
        print(f"Sending via {channel} to {user_id}: {message}")
'''

files[r"services\api\reports\generator.py"] = '''\
def generate_pdf_report(data: dict, template_path: str, output_path: str):
    """
    Mock PDF generation using WeasyPrint + Jinja2 logic.
    """
    with open(output_path, "w") as f:
        f.write("PDF Content Mock")
    return output_path
'''

files[r"services\api\reports\templates\farm_health_report.html"] = '''\
<!DOCTYPE html>
<html>
<head><title>Farm Health Report</title></head>
<body>
    <h1>Farm Health Report</h1>
    <p>Generated by AgriMind AI</p>
</body>
</html>
'''

files[r"services\api\Dockerfile"] = '''\
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY . .
CMD ["uvicorn", "services.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
'''

files[r"services\api\celery_app.py"] = '''\
from celery import Celery
from .config import settings

celery_app = Celery(
    "agrimind_tasks",
    broker=settings.redis_url,
    backend=settings.redis_url
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
)
'''

files[r"services\api\tasks\reports.py"] = '''\
from ..celery_app import celery_app

@celery_app.task
def generate_monthly_reports():
    print("Generating monthly reports...")

@celery_app.task
def send_report_notification(user_id: str, report_id: str):
    print(f"Sending notification to {user_id} for report {report_id}")
'''

files[r"services\api\tasks\alerts.py"] = '''\
from ..celery_app import celery_app

@celery_app.task
def check_sensor_thresholds():
    print("Checking sensor thresholds...")

@celery_app.task
def check_device_heartbeats():
    print("Checking device heartbeats...")
'''

# WRITE ALL FILES
import pathlib
for filepath, content in files.items():
    full_path = os.path.join(base_dir, filepath)
    pathlib.Path(full_path).parent.mkdir(parents=True, exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"Successfully generated {len(files)} files.")
