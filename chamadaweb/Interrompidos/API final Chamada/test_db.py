import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

try:
    connection = psycopg2.connect(DATABASE_URL)
    print("Conexão bem-sucedida!")

    cursor = connection.cursor()
    cursor.execute("SELECT NOW();")
    print("Hora atual:", cursor.fetchone())

    cursor.close()
    connection.close()

except Exception as e:
    print(f"Erro na conexão: {e}")