from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def test_connection():
    try:
        client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
        
        # Testar conexão
        await client.admin.command('ping')
        print(' MONGODB CONECTADO')
        
        # Listar databases
        db_list = await client.list_database_names()
        print(f' DATABASES: {db_list}')
        
        # Testar database específico
        db = client['IOS-SISTEMA-CHAMADA']
        collections = await db.list_collection_names()
        print(f' COLLECTIONS EM IOS-SISTEMA-CHAMADA: {collections}')
        
        # Testar collection users
        if 'users' in collections:
            user_count = await db.users.count_documents({})
            print(f' USUÁRIOS NA COLLECTION users: {user_count}')
        
        # Testar outras collections
        for coll in collections:
            count = await db[coll].count_documents({})
            print(f' {coll}: {count} documentos')
        
        client.close()
        
    except Exception as e:
        print(f' ERRO CONEXÃO: {e}')

asyncio.run(test_connection())
