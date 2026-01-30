from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def list_users():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print(' LISTANDO USUÁRIOS REAIS DO BANCO:')
    
    users = []
    async for user in db.users.find({}):
        users.append(user)
    
    print(f' TOTAL USUÁRIOS: {len(users)}')
    
    for user in users:
        email = user.get('email', 'SEM_EMAIL')
        nome = user.get('nome', 'SEM_NOME')
        tipo = user.get('tipo', 'SEM_TIPO')
        unidade = user.get('unidade_id', 'NONE')
        curso = user.get('curso_id', 'NONE')
        
        print(f' {email} | {nome} | {tipo}')
        print(f'   Unidade: {unidade}')
        print(f'   Curso: {curso}')
        print('-' * 50)
    
    client.close()

asyncio.run(list_users())
