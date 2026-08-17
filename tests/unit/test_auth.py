import pytest
from datetime import datetime, timedelta, timezone
from agrimind.auth import create_access_token, verify_token, get_password_hash, verify_password

def test_password_hashing():
    password = "SuperSecretPassword123!"
    hashed = get_password_hash(password)
    assert hashed != password
    assert verify_password(password, hashed)
    assert not verify_password("WrongPassword!", hashed)

def test_jwt_creation_and_verification():
    data = {"sub": "user@example.com"}
    token = create_access_token(data, expires_delta=timedelta(minutes=15))
    
    assert isinstance(token, str)
    assert len(token) > 0
    
    payload = verify_token(token)
    assert payload["sub"] == "user@example.com"
    assert "exp" in payload

def test_jwt_expiration():
    data = {"sub": "user@example.com"}
    token = create_access_token(data, expires_delta=timedelta(seconds=-1))
    
    with pytest.raises(Exception) as excinfo:
        verify_token(token)
    assert "expired" in str(excinfo.value).lower()
