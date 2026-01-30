import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_unidades():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print('🏢 UNIDADES NO SISTEMA:')
    async for unidade in db.unidades.find({}):
        print(f'ID: {unidade.get("id")}')
        print(f'Nome: {unidade.get("nome")}')
        print(f'Endereço: {unidade.get("endereco", "N/A")}')
        print('-' * 50)
    
    print('\n📚 CURSOS NO SISTEMA:')
    async for curso in db.cursos.find({}):
        print(f'ID: {curso.get("id")}')
        print(f'Nome: {curso.get("nome")}')
        print('-' * 30)
    
    client.close()

asyncio.run(check_unidades())