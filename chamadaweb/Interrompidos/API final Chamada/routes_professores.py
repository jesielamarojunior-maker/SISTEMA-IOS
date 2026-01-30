import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

bp_professores = Blueprint('professores', __name__)

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@bp_professores.route('/professores', methods=['GET'])
def listar_professores():
    url = f"{SUPABASE_URL}/rest/v1/professores?select=*"
    resp = requests.get(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code

@bp_professores.route('/professores', methods=['POST'])
def criar_professor():
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/professores"
    resp = requests.post(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_professores.route('/professores/<int:professor_id>', methods=['PATCH'])
def editar_professor(professor_id):
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/professores?id=eq.{professor_id}"
    resp = requests.patch(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_professores.route('/professores/<int:professor_id>', methods=['DELETE'])
def deletar_professor(professor_id):
    url = f"{SUPABASE_URL}/rest/v1/professores?id=eq.{professor_id}"
    resp = requests.delete(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code