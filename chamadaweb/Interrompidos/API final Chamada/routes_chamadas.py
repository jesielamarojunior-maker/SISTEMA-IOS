import os
import requests
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

bp_chamadas = Blueprint('chamadas', __name__)

def get_headers():
    return {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }

@bp_chamadas.route('/chamadas', methods=['POST'])
def registrar_chamada():
    # Espera JSON: turma_id, data_chamada, hora_chamada, professor_id, faltas (lista de aluno_id)
    data = request.get_json()
    turma_id = data.get('turma_id')
    data_chamada = data.get('data_chamada')
    hora_chamada = data.get('hora_chamada')
    professor_id = data.get('professor_id')
    faltas = data.get('faltas', [])

    # Cria chamada
    chamada_payload = {
        "turma_id": turma_id,
        "data_chamada": data_chamada,
        "hora_chamada": hora_chamada,
        "professor_id": professor_id
    }
    chamada_resp = requests.post(f"{SUPABASE_URL}/rest/v1/chamadas", headers=get_headers(), json=chamada_payload)
    if chamada_resp.status_code not in (200, 201):
        return jsonify({"success": False, "message": "Erro ao registrar chamada"}), 400

    chamada_id = chamada_resp.json()[0]['id']

    # Registra faltas
    faltas_payload = []
    for aluno_id in faltas:
        faltas_payload.append({
            "chamada_id": chamada_id,
            "aluno_id": aluno_id,
            "data_falta": data_chamada,
            "hora_falta": hora_chamada
        })
    if faltas_payload:
        faltas_resp = requests.post(f"{SUPABASE_URL}/rest/v1/faltas", headers=get_headers(), json=faltas_payload)
        if faltas_resp.status_code not in (200, 201):
            return jsonify({"success": False, "message": "Erro ao registrar faltas"}), 400

    return jsonify({"success": True, "message": "Chamada registrada com sucesso"}), 201