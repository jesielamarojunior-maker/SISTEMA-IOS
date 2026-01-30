"""
Este script faz uma requisição HTTP à API REST do Supabase para acessar a tabela 'alunos'.
Certifique-se de:
1. Usar a anon key correta do Supabase.
2. Usar a URL correta do seu projeto Supabase.
3. O header da requisição conter os campos 'apikey' e 'Authorization' com a mesma chave anon.
4. As regras de acesso (RLS) da tabela permitirem SELECT para a role 'anon'.
"""

import os
import requests
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env
load_dotenv()

# URL do Supabase e chave anon (pública)
SUPABASE_URL = os.getenv("SUPABASE_URL")  # Exemplo: https://ccaiygwzxjchfenbqtgx.supabase.co
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")  # Chave anon

# Endpoint RESTful para acessar a tabela 'alunos'
url = f"{SUPABASE_URL}/rest/v1/alunos"

# Cabeçalhos obrigatórios
headers = {
    "apikey": SUPABASE_API_KEY,
    "Authorization": f"Bearer {SUPABASE_API_KEY}",
    "Content-Type": "application/json"
}

# Requisição GET para buscar todos os alunos
response = requests.get(url, headers=headers, params={"select": "*"})

# Exibe o status e a resposta da API
print("Status code:", response.status_code)
print("Response:", response.text)