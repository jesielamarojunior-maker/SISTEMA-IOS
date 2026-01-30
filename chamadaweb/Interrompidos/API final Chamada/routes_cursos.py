import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

bp_cursos = Blueprint('cursos', __name__)

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@bp_cursos.route('/cursos', methods=['GET'])
def listar_cursos():
    url = f"{SUPABASE_URL}/rest/v1/cursos?select=*"
    resp = requests.get(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code

@bp_cursos.route('/cursos', methods=['POST'])
def criar_curso():
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/cursos"
    resp = requests.post(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_cursos.route('/cursos/<int:curso_id>', methods=['PATCH'])
def editar_curso(curso_id):
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/cursos?id=eq.{curso_id}"
    resp = requests.patch(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_cursos.route('/cursos/<int:curso_id>', methods=['DELETE'])
def deletar_curso(curso_id):
    url = f"{SUPABASE_URL}/rest/v1/cursos?id=eq.{curso_id}"
    resp = requests.delete(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code