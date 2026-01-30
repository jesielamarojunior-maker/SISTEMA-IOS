import os
import requests
from flask import Blueprint, request, jsonify, session
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

bp_unidades = Blueprint('unidades', __name__)

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@bp_unidades.route('/unidades', methods=['GET'])
def listar_unidades():
    url = f"{SUPABASE_URL}/rest/v1/unidades?select=*"
    resp = requests.get(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code

@bp_unidades.route('/unidades', methods=['POST'])
def criar_unidade():
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/unidades"
    resp = requests.post(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_unidades.route('/unidades/<int:unidade_id>', methods=['PATCH'])
def editar_unidade(unidade_id):
    data = request.get_json()
    url = f"{SUPABASE_URL}/rest/v1/unidades?id=eq.{unidade_id}"
    resp = requests.patch(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

@bp_unidades.route('/unidades/<int:unidade_id>', methods=['DELETE'])
def deletar_unidade(unidade_id):
    url = f"{SUPABASE_URL}/rest/v1/unidades?id=eq.{unidade_id}"
    resp = requests.delete(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code