import time
import hashlib
import re
from typing import Dict, Tuple

# In-memory storage for rate limiting (resets on function restart)
rate_limit_store = {}
session_store = {}
email_store = {}

def get_client_id(headers) -> str:
    """Create unique client identifier from IP and User-Agent"""
    ip = headers.get('x-forwarded-for', '').split(',')[0].strip()
    user_agent = headers.get('user-agent', '')
    client_string = f"{ip}:{user_agent}"
    return hashlib.md5(client_string.encode()).hexdigest()[:16]

def is_rate_limited(client_id: str, endpoint: str) -> Tuple[bool, str]:
    """
    Check rate limits:
    - Max 1 request per minute per endpoint
    - Max 5 total registrations per session
    """
    now = time.time()
    
    # Clean old entries (older than 1 hour)
    cleanup_old_entries(now)
    
    # Check per-endpoint rate limit (1 per minute)
    endpoint_key = f"{client_id}:{endpoint}"
    if endpoint_key in rate_limit_store:
        time_diff = now - rate_limit_store[endpoint_key]
        if time_diff < 60:  # 1 minute
            return True, f"Please wait {60 - int(time_diff)} seconds before submitting again"
    
    # Check session limit (5 total registrations)
    if client_id in session_store:
        if session_store[client_id]['count'] >= 5:
            return True, "Maximum 5 registrations allowed per session. Please refresh and try later."
    
    return False, ""

def record_request(client_id: str, endpoint: str, email: str) -> bool:
    """Record successful request"""
    now = time.time()
    
    # Check if email already registered today
    email_key = email.lower().strip()
    if email_key in email_store:
        time_diff = now - email_store[email_key]
        if time_diff < 86400:  # 24 hours
            return False
    
    # Record request
    rate_limit_store[f"{client_id}:{endpoint}"] = now
    email_store[email_key] = now
    
    # Update session count
    if client_id not in session_store:
        session_store[client_id] = {'count': 0, 'first_request': now}
    session_store[client_id]['count'] += 1
    
    return True

def cleanup_old_entries(now: float):
    """Clean entries older than 1 hour"""
    cutoff = now - 3600  # 1 hour
    
    # Clean rate limit store
    to_remove = [k for k, v in rate_limit_store.items() if v < cutoff]
    for k in to_remove:
        del rate_limit_store[k]
    
    # Clean session store
    to_remove = [k for k, v in session_store.items() if v['first_request'] < cutoff]
    for k in to_remove:
        del session_store[k]

def validate_input(data: dict, required_fields: list) -> Tuple[bool, str]:
    """Validate input data"""
    # Check required fields
    for field in required_fields:
        if not data.get(field) or not data[field].strip():
            return False, f"{field} is required"
    
    # Validate email format
    email = data.get('email', '').strip()
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        return False, "Invalid email format"
    
    # Validate phone number (basic)
    phone = data.get('contactNumber', '').strip()
    if not re.match(r'^[\d\s\+\-\(\)]{10,15}$', phone):
        return False, "Invalid phone number format"
    
    # Check field lengths
    if len(data.get('fullName', '')) > 100:
        return False, "Name too long (max 100 characters)"
    
    # Basic XSS prevention
    dangerous_chars = ['<', '>', 'script', 'javascript:', 'on']
    for field, value in data.items():
        if isinstance(value, str):
            value_lower = value.lower()
            if any(char in value_lower for char in dangerous_chars):
                return False, "Invalid characters detected"
    
    return True, ""
