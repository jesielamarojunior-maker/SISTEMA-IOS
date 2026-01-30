from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def restore_usuarios():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print(' RESTAURANDO COLLECTION USUARIOS (PORTUGUÊS)...')
    
    # Primeiro, listar usuários existentes
    print('\n USUÁRIOS EXISTENTES:')
    async for user in db.usuarios.find({}):
        email = user.get('email', 'SEM_EMAIL')
        nome = user.get('nome', 'SEM_NOME')
        tipo = user.get('tipo', 'SEM_TIPO')
        unidade = user.get('unidade_id', None)
        curso = user.get('curso_id', None)
        print(f' {email} | {nome} | {tipo} | Unidade:{unidade} | Curso:{curso}')
    
    print('\n INICIANDO RESTAURAÇÃO...')
    
    updates = [
        {'email': 'fabiana.coelho@ios.org.br', 'unidade_id': '4d752e46-e89d-44dc-a974-78adc8e46ae5', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'},
        {'email': 'marcus.vinicius@ios.org.br', 'unidade_id': '4d752e46-e89d-44dc-a974-78adc8e46ae5', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'},
        {'email': 'ione.almeida@ios.org.br', 'unidade_id': '5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff', 'curso_id': 'f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f'},
        {'email': 'gabrielle.santos@ios.org.br', 'unidade_id': '5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff', 'curso_id': 'f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f'},
        {'email': 'ermerson.silva@ios.org.br', 'unidade_id': '7fb8db70-1234-5678-9abc-def012345678', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'}
    ]
    
    total_updated = 0
    for update in updates:
        try:
            # Buscar usuário
            user = await db.usuarios.find_one({'email': update['email']})
            if user:
                # Atualizar usando replace_one
                user['unidade_id'] = update['unidade_id']
                user['curso_id'] = update['curso_id']
                
                result = await db.usuarios.replace_one(
                    {'email': update['email']},
                    user
                )
                if result.modified_count > 0:
                    print(f' {update["email"]} - RESTAURADO')
                    total_updated += 1
                else:
                    print(f' {update["email"]} - SEM MODIFICAÇÃO')
            else:
                print(f' {update["email"]} - NÃO ENCONTRADO')
        except Exception as e:
            print(f' {update["email"]} - ERRO: {e}')
    
    print(f'\n TOTAL RESTAURADOS: {total_updated}/5')
    
    # Verificação final
    print('\n VERIFICAÇÃO FINAL:')
    for update in updates:
        user = await db.usuarios.find_one({'email': update['email']})
        if user:
            unidade = user.get('unidade_id', 'NONE')[:8] if user.get('unidade_id') else 'NONE'
            curso = user.get('curso_id', 'NONE')[:8] if user.get('curso_id') else 'NONE'
            print(f' {user["email"]}: Unidade={unidade}... Curso={curso}...')
    
    client.close()

asyncio.run(restore_usuarios())
