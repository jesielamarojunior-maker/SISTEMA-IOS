import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import bcrypt

async def test_update_fabiana():
    client = AsyncIOMotorClient('mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority')
    db = client['IOS-SISTEMA-CHAMADA']
    
    print(' ANTES DO UPDATE:')
    fabiana_antes = await db.usuarios.find_one({'email': 'fabiana.coelho@ios.org.br'})
    if fabiana_antes:
        print(f'   Nome: {fabiana_antes.get("nome")}')
        print(f'   Unidade: {fabiana_antes.get("unidade_id", "NONE")}')
        print(f'   Curso: {fabiana_antes.get("curso_id", "NONE")}')
    
    # Testar update manual
    print('\n FAZENDO UPDATE PARA SANTANA:')
    nova_unidade = "5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff"  # Santana
    novo_curso = "f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f"     # Gestão
    
    result = await db.usuarios.update_one(
        {'email': 'fabiana.coelho@ios.org.br'},
        {'': {'unidade_id': nova_unidade, 'curso_id': novo_curso}}
    )
    
    print(f'   Documentos modificados: {result.modified_count}')
    
    print('\n DEPOIS DO UPDATE:')
    fabiana_depois = await db.usuarios.find_one({'email': 'fabiana.coelho@ios.org.br'})
    if fabiana_depois:
        print(f'   Nome: {fabiana_depois.get("nome")}')
        print(f'   Unidade: {fabiana_depois.get("unidade_id", "NONE")}')
        print(f'   Curso: {fabiana_depois.get("curso_id", "NONE")}')
        
        # Verificar nomes das unidades/cursos
        if fabiana_depois.get("unidade_id"):
            unidade = await db.unidades.find_one({'id': fabiana_depois.get("unidade_id")})
            if unidade:
                print(f'   Unidade Nome: {unidade.get("nome")}')
                
        if fabiana_depois.get("curso_id"):
            curso = await db.cursos.find_one({'id': fabiana_depois.get("curso_id")})
            if curso:
                print(f'   Curso Nome: {curso.get("nome")}')
    
    client.close()

asyncio.run(test_update_fabiana())
