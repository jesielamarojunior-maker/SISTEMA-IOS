from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def restore_usuarios_corretos():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print(' RESTAURAÇÃO COM EMAILS CORRETOS...')
    
    #  EMAILS CORRETOS DO BANCO
    updates = [
        # Fabiana já estava correta
        {'email': 'fabiana.coelho@ios.org.br', 'unidade_id': '4d752e46-e89d-44dc-a974-78adc8e46ae5', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'},
        
        # Marcus tem email diferente: marcus.dourado
        {'email': 'marcus.dourado@ios.org.br', 'unidade_id': '4d752e46-e89d-44dc-a974-78adc8e46ae5', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'},
        
        # Ione já foi restaurada mas vamos confirmar
        {'email': 'ione.almeida@ios.org.br', 'unidade_id': '5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff', 'curso_id': 'f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f'},
        
        # Gabrielle tem email diferente: gabrielle.nobile
        {'email': 'gabrielle.nobile@ios.org.br', 'unidade_id': '5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff', 'curso_id': 'f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f'},
        
        # Ermerson tem email diferente: ermerson.barros
        {'email': 'ermerson.barros@ios.org.br', 'unidade_id': '7fb8db70-1234-5678-9abc-def012345678', 'curso_id': '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'}
    ]
    
    total_updated = 0
    for update in updates:
        try:
            user = await db.usuarios.find_one({'email': update['email']})
            if user:
                # Verificar se precisa atualizar
                current_unidade = user.get('unidade_id')
                current_curso = user.get('curso_id')
                
                if current_unidade != update['unidade_id'] or current_curso != update['curso_id']:
                    user['unidade_id'] = update['unidade_id']
                    user['curso_id'] = update['curso_id']
                    
                    result = await db.usuarios.replace_one(
                        {'email': update['email']},
                        user
                    )
                    if result.modified_count > 0:
                        print(f' {update["email"]} - ATUALIZADO')
                        total_updated += 1
                    else:
                        print(f' {update["email"]} - FALHA AO ATUALIZAR')
                else:
                    print(f'ℹ {update["email"]} - JÁ CORRETO')
                    
            else:
                print(f' {update["email"]} - NÃO ENCONTRADO')
        except Exception as e:
            print(f' {update["email"]} - ERRO: {e}')
    
    print(f'\n TOTAL ATUALIZADOS: {total_updated}')
    
    # Verificação final completa
    print('\n ESTADO FINAL DOS USUÁRIOS:')
    for update in updates:
        user = await db.usuarios.find_one({'email': update['email']})
        if user:
            nome = user.get('nome', 'SEM_NOME')
            tipo = user.get('tipo', 'SEM_TIPO')
            unidade = user.get('unidade_id', 'NONE')
            curso = user.get('curso_id', 'NONE')
            
            unidade_short = unidade[:8] + '...' if unidade and unidade != 'NONE' else 'NONE'
            curso_short = curso[:8] + '...' if curso and curso != 'NONE' else 'NONE'
            
            print(f' {nome} ({tipo})')
            print(f'    {user["email"]}')
            print(f'    Unidade: {unidade_short}')
            print(f'    Curso: {curso_short}')
            print('-' * 50)
    
    client.close()

asyncio.run(restore_usuarios_corretos())
