from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def restore_users():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print(' USANDO REPLACE_ONE...')
    
    updates = [
        {'email': 'fabiana.coelho@ios.org.br', 'unidade_id': '4d752e46-e89d-44dc-a974-78adc8e46ae5', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'},
        {'email': 'marcus.vinicius@ios.org.br', 'unidade_id': '4d752e46-e89d-44dc-a974-78adc8e46ae5', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'},
    ]
    
    total_updated = 0
    for update in updates[:2]:  # Testar com 2 usuários primeiro
        try:
            # Buscar usuário existente
            user = await db.users.find_one({'email': update['email']})
            if user:
                # Manter dados existentes e atualizar campos específicos
                user['unidade_id'] = update['unidade_id']
                user['curso_id'] = update['curso_id']
                
                # Substituir documento completo
                result = await db.users.replace_one(
                    {'email': update['email']},
                    user
                )
                if result.modified_count > 0:
                    print(f' {update["email"]} - REPLACE OK')
                    total_updated += 1
                else:
                    print(f' {update["email"]} - REPLACE FALHOU')
            else:
                print(f' {update["email"]} - NÃO ENCONTRADO')
        except Exception as e:
            print(f' {update["email"]} - ERRO: {e}')
    
    print(f'\n TOTAL ATUALIZADOS: {total_updated}/2')
    
    # Verificação
    for update in updates[:2]:
        user = await db.users.find_one({'email': update['email']})
        if user:
            print(f' {user["email"]}: unidade={user.get("unidade_id", "NONE")[:8]}... curso={user.get("curso_id", "NONE")[:8]}...')
    
    client.close()

asyncio.run(restore_users())
