import os
import requests
from flask import Blueprint, request, jsonify, session
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

bp_turmas = Blueprint('turmas', __name__)

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@bp_turmas.route('/turmas', methods=['GET'])
def listar_turmas():
    # Para filtrar por professor, envie ?professor_id=ID
    professor_id = request.args.get('professor_id')
    url = f"{SUPABASE_URL}/rest/v1/turmas?select=*"
    if professor_id:
        url += f"&professor_id=eq.{professor_id}"
    resp = requests.get(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code

@bp_turmas.route('/turmas', methods=['POST'])
def criar_turma():
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/turmas"
    resp = requests.post(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code