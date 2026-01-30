import os
import requests
from flask import Flask, request, jsonify, session
import bcrypt

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'

SUPABASE_URL = 'https://ccaiygwzxjchfenbqtgx.supabase.co'
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")
SECRET_KEY = os.getenv("SECRET_KEY", "ios_chamada_sistema_2024_chave_secreta")

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    senha = data.get('senha')

    if not email or not senha:
        return jsonify({"success": False, "message": "E-mail e senha obrigatórios"}), 400

    url = f"{SUPABASE_URL}/rest/v1/usuarios?email=eq.{email}&select=id,nome,email,senha,tipo,ativo"
    resp = requests.get(url, headers=get_headers())

    if resp.status_code != 200 or not resp.json():
        return jsonify({"success": False, "message": "Usuário não encontrado"}), 401

    usuario = resp.json()[0]
    if not usuario["ativo"]:
        return jsonify({"success": False, "message": "Usuário inativo"}), 403

    # Validação segura da senha
    if not bcrypt.checkpw(senha.encode(), usuario["senha"].strip().encode()):
        return jsonify({"success": False, "message": "Senha incorreta"}), 401

    # Salva sessão
    session["user_id"] = usuario["id"]
    session["user_name"] = usuario["nome"]
    session["user_type"] = usuario["tipo"]

    return jsonify({
        "success": True,
        "message": "Login realizado com sucesso",
        "tipo": usuario["tipo"],
        "nome": usuario["nome"],
        "id": usuario["id"]
    })

if __name__ == "__main__":
    app.run(debug=True)

