import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
from urllib.parse import quote_plus

load_dotenv()

async def check_users():
    # MongoDB connection
    username = quote_plus("jesielamarojunior_db_user")
    password = quote_plus("admin123")
    MONGO_URL = f"mongodb+srv://{username}:{password}@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority"
    client = AsyncIOMotorClient(MONGO_URL)
    db = client["IOS-SISTEMA-CHAMADA"]
    
    print("🔍 Verificando usuários no banco...")
    
    # Get all users
    users = await db.usuarios.find({}).to_list(length=None)
    
    print(f"📊 Total de usuários: {len(users)}")
    print("\n👥 Lista de usuários:")
    
    for user in users:
        status = user.get('status', 'ativo')
        tipo = user.get('tipo', 'N/A')
        ativo = user.get('ativo', True)
        print(f"  • {user.get('email', 'N/A')} | Tipo: {tipo} | Status: {status} | Ativo: {ativo}")
    
    # Check if admin exists
    admin_users = [u for u in users if u.get('tipo') == 'admin']
    print(f"\n🔑 Usuários admin: {len(admin_users)}")
    
    if admin_users:
        for admin in admin_users:
            print(f"  📧 Admin: {admin['email']}")
    else:
        print("  ⚠️ Nenhum usuário admin encontrado!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(check_users())