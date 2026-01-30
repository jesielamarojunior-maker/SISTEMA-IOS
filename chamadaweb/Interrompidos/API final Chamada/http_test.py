# http_test.py
import requests
import os
from dotenv import load_dotenv

load_dotenv()

# Supabase API URL e chave
SUPABASE_URL = "https://ccaiygwzxjchfenbqtgx.supabase.co"
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYWl5Z3d6eGpjaGZlbmJxdGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MzY4NDQsImV4cCI6MjAyNDExMjg0NH0.OSMvK8Eql6vUeqcLeLuumzEk5sehJYVVXM1i8yaXI4s")

# Cabeçalhos para autenticação
headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}"
}

try:
    # Testar uma requisição simples
    response = requests.get(f"{SUPABASE_URL}/rest/v1/", headers=headers)
    print(f"Status code: {response.status_code}")
    print(f"Response: {response.text}")
    
    if response.status_code == 200:
        print("HTTP API connection successful!")
    else:
        print("HTTP API connection failed!")

except Exception as e:
    print(f"Error: {e}")