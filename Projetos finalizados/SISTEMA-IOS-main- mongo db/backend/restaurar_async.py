from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def restore_users():
    #  CONEXÃO MONGO COM MOTOR (ASYNC)
    client = AsyncIOMotorClient("mongodb+srv://jesielamarojunior_db_user:admin123@cluster0.vuho6l7.mongodb.net/IOS-SISTEMA-CHAMADA?retryWrites=true&w=majority")
    db = client["IOS-SISTEMA-CHAMADA"]
    
    print(" RESTAURANDO USUÁRIOS ASYNC...")
    
    #  RESTAURAÇÕES ESPECÍFICAS
    updates = [
        {"email": "fabiana.coelho@ios.org.br", "unidade_id": "4d752e46-e89d-44dc-a974-78adc8e46ae5", "curso_id": "4977d16f-8ad2-4d92-90a1-ec1ba5ea7823"},
        {"email": "marcus.vinicius@ios.org.br", "unidade_id": "4d752e46-e89d-44dc-a974-78adc8e46ae5", "curso_id": "4977d16f-8ad2-4d92-90a1-ec1ba5ea7823"},
        {"email": "ione.almeida@ios.org.br", "unidade_id": "5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff", "curso_id": "f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f"},
        {"email": "gabrielle.santos@ios.org.br", "unidade_id": "5cb126bf-cfbc-4be5-8b07-b9c2a1d6dcff", "curso_id": "f0c3e2e8-b0b0-4f14-9a3e-9c8e8b4e3a5f"},
        {"email": "ermerson.silva@ios.org.br", "unidade_id": "7fb8db70-1234-5678-9abc-def012345678", "curso_id": "4977d16f-8ad2-4d92-90a1-ec1ba5ea7823"}
    ]
    
    total_updated = 0
    for update in updates:
        try:
            result = await db.users.update_one(
                {"email": update["email"]},
                {"\": {"unidade_id": update["unidade_id"], "curso_id": update["curso_id"]}}
            )
            if result.modified_count > 0:
                print(f" {update['email']} - ATUALIZADO")
                total_updated += 1
            else:
                print(f" {update['email']} - NÃO ENCONTRADO")
        except Exception as e:
            print(f" {update['email']} - ERRO: {e}")
    
    print(f"\n TOTAL ATUALIZADOS: {total_updated}/5")
    
    #  VERIFICAÇÃO FINAL
    print("\n VERIFICAÇÃO DOS USUÁRIOS:")
    for update in updates:
        user = await db.users.find_one({"email": update["email"]})
        if user:
            print(f" {user['email']}: {user.get('unidade_id', 'SEM_UNIDADE')[:8]}... / {user.get('curso_id', 'SEM_CURSO')[:8]}...")
    
    client.close()

# Executar
asyncio.run(restore_users())
