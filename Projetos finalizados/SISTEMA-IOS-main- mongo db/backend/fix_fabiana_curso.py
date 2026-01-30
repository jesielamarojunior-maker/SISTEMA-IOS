import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def check_fabiana_final():
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
        
        # Buscar nomes corretos
        if fabiana.get('unidade_id'):
            unidade = await db.unidades.find_one({'id': fabiana.get('unidade_id')})
            if unidade:
                print(f'✅ Unidade: {unidade.get("nome")}')
        
        if fabiana.get('curso_id'):
            curso = await db.cursos.find_one({'id': fabiana.get('curso_id')})
            if curso:
                print(f'✅ Curso: {curso.get("nome")}')
            else:
                print('❌ CURSO NÃO ENCONTRADO! Corrigindo...')
                # Curso correto: Microsoft Office Essencial + Zendesk
                curso_correto = '4977d16f-8ad2-4d92-90a1-ec1ba5ea7823'
                
                result = await db.usuarios.update_one(
                    {'email': 'fabiana.coelho@ios.org.br'},
                    {'$set': {'curso_id': curso_correto}}
                )
                
                print(f'📝 Documentos modificados: {result.modified_count}')
                
                # Verificar novamente
                curso_novo = await db.cursos.find_one({'id': curso_correto})
                if curso_novo:
                    print(f'✅ NOVO CURSO: {curso_novo.get("nome")}')
    
    client.close()

asyncio.run(check_fabiana_final())