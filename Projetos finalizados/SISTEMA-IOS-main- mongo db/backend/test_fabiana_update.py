import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_fabiana():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print('📋 ESTADO ATUAL DA FABIANA:')
    fabiana = await db.usuarios.find_one({'email': 'fabiana.coelho@ios.org.br'})
    if fabiana:
        print(f'Nome: {fabiana.get("nome")}')
        print(f'Email: {fabiana.get("email")}')
        print(f'Tipo: {fabiana.get("tipo")}')
        print(f'Unidade ID: {fabiana.get("unidade_id", "NONE")}')
        print(f'Curso ID: {fabiana.get("curso_id", "NONE")}')
        
        # Buscar nomes
        if fabiana.get('unidade_id'):
            unidade = await db.unidades.find_one({'id': fabiana.get('unidade_id')})
            if unidade:
                print(f'Unidade Nome: {unidade.get("nome")}')
        
        if fabiana.get('curso_id'):
            curso = await db.cursos.find_one({'id': fabiana.get('curso_id')})
            if curso:
                print(f'Curso Nome: {curso.get("nome")}')
    else:
        print('Fabiana não encontrada!')
    
    # Testar update para Santana
    print('\n🔧 ATUALIZANDO PARA SANTANA...')
    nova_unidade = "5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff"  # Santana
    novo_curso = "f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f"     # Gestão
    
    result = await db.usuarios.update_one(
        {'email': 'fabiana.coelho@ios.org.br'},
        {'$set': {'unidade_id': nova_unidade, 'curso_id': novo_curso}}
    )
    
    print(f'Documentos modificados: {result.modified_count}')
    
    # Verificar depois
    print('\n✅ DEPOIS DO UPDATE:')
    fabiana_new = await db.usuarios.find_one({'email': 'fabiana.coelho@ios.org.br'})
    if fabiana_new:
        print(f'Unidade ID: {fabiana_new.get("unidade_id", "NONE")}')
        print(f'Curso ID: {fabiana_new.get("curso_id", "NONE")}')
        
        # Buscar nomes
        if fabiana_new.get('unidade_id'):
            unidade = await db.unidades.find_one({'id': fabiana_new.get('unidade_id')})
            if unidade:
                print(f'Unidade Nome: {unidade.get("nome")}')
    
    client.close()

asyncio.run(check_fabiana())