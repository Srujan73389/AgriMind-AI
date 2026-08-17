import pytest
from httpx import AsyncClient
from typing import AsyncGenerator
from agrimind.main import app
from agrimind.database import get_db, Base, engine
from agrimind.dependencies import get_redis

@pytest.fixture
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def mock_redis(monkeypatch):
    class MockRedis:
        def __init__(self):
            self.data = {}
        async def get(self, key):
            return self.data.get(key)
        async def set(self, key, value, ex=None):
            self.data[key] = value
            return True
    
    mock_r = MockRedis()
    app.dependency_overrides[get_redis] = lambda: mock_r
    yield mock_r
    app.dependency_overrides.pop(get_redis, None)

@pytest.fixture
def test_user_factory(async_client):
    async def create_user(email="test@example.com", password="Password123!"):
        response = await async_client.post("/auth/register", json={
            "email": email,
            "password": password
        })
        return response.json()
    return create_user

@pytest.fixture
def test_farm_factory(async_client):
    async def create_farm(token, name="Test Farm"):
        response = await async_client.post("/farms", json={
            "name": name,
            "location": {"lat": 10.0, "lng": 20.0},
            "size_hectares": 5.0
        }, headers={"Authorization": f"Bearer {token}"})
        return response.json()
    return create_farm
