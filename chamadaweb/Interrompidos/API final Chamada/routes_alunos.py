import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

bp_alunos = Blueprint('alunos', __name__)

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@bp_alunos.route('/alunos', methods=['GET'])
def listar_alunos():
    # Para filtrar por turma, envie ?turma_id=ID
    turma_id = request.args.get('turma_id')
    url = f"{SUPABASE_URL}/rest/v1/alunos?select=*"
    if turma_id:
        url += f"&turma_id=eq.{turma_id}"
    resp = requests.get(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code

@bp_alunos.route('/alunos', methods=['POST'])
def criar_aluno():
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/alunos"
    resp = requests.post(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_alunos.route('/alunos/<int:aluno_id>', methods=['PATCH'])
def editar_aluno(aluno_id):
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/alunos?id=eq.{aluno_id}"
    resp = requests.patch(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code