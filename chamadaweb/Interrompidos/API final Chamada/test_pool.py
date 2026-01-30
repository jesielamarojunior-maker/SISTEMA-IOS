# test_pool.py
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# Obtenha a URL original
DATABASE_URL = os.getenv("DATABASE_URL")

# Modifique para usar a porta 6543 (pooling)
if ":5432/" in DATABASE_URL:
    POOL_URL = DATABASE_URL.replace(":5432/", ":6543/")
else:
    POOL_URL = DATABASE_URL

print(f"Tentando conectar usando o pool: {POOL_URL}")

try:
    connection = psycopg2.connect(POOL_URL)
    print("Conexão bem-sucedida!")

    cursor = connection.cursor()
    cursor.execute("SELECT NOW();")
    print("Hora atual no servidor:", cursor.fetchone())

    cursor.close()
    connection.close()

except Exception as e:
    print(f"Erro na conexão: {e}")