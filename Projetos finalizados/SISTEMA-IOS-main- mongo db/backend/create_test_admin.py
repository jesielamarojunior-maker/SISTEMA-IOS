import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus
from passlib.hash import bcrypt
import uuid

load_dotenv()

async def create_test_admin():
    # MongoDB connection
    username = quote_plus("jesielamarojunior_db_user")
    password = quote_plus("admin123")
    MONGO_URL = f"mongodb+srv://{username}:{password}@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority"
    client = AsyncIOMotorClient(MONGO_URL)
    db = client["IOS-SISTEMA-CHAMADA"]
    
    print("🔧 Criando usuário de teste...")
    
    # Check if test user already exists
    existing_user = await db.usuarios.find_one({"email": "test@ios.com"})
    if existing_user:
        print("⚠️ Usuário de teste já existe, deletando...")
        await db.usuarios.delete_one({"email": "test@ios.com"})
    
    # Create test admin user with known password
    test_user = {
        "id": str(uuid.uuid4()),
        "nome": "Usuário Teste",
        "email": "test@ios.com",
        "senha": bcrypt.hash("123456"),  # Simple password for testing
        "tipo": "admin",
        "ativo": True,
        "status": "ativo",
        "primeiro_acesso": False
    }
    
    await db.usuarios.insert_one(test_user)
    print("✅ Usuário de teste criado:")
    print(f"   Email: test@ios.com")
    print(f"   Senha: 123456")
    print(f"   Tipo: admin")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(create_test_admin())