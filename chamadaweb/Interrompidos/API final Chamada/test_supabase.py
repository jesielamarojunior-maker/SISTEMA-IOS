import os
import requests
from dotenv import load_dotenv

# Carrega as variáveis do arquivo .env
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

# Testa acessando a tabela "alunos"
url = f"{SUPABASE_URL}/rest/v1/alunos"

headers = {
    "apikey": SUPABASE_API_KEY,
    "Authorization": f"Bearer {SUPABASE_API_KEY}",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)

print("Status code:", response.status_code)
print("Response:", response.text)
