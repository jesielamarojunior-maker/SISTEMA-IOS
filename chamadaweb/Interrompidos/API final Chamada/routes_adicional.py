import os
import requests
from flask import render_template, session, redirect, url_for, flash, request
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

def add_additional_routes(app, validar_cpf, formatar_cpf):
    """Adiciona rotas adicionais à aplicação"""

    def get_headers():
        return {
            "apikey": SUPABASE_API_KEY,
            "Authorization": f"Bearer {SUPABASE_API_KEY}",
            "Content-Type": "application/json"
        }

    @app.route('/professor/turmas/<int:turma_id>/alunos')
    def listar_alunos_professor(turma_id):
        if 'user_id' not in session or session['user_type'] != 'professor':
            return redirect(url_for('login'))

        # Busca turma e valida se pertence ao professor
        turma_url = f"{SUPABASE_URL}/rest/v1/turmas?id=eq.{turma_id}&select=nome,professor_id"
        turma_resp = requests.get(turma_url, headers=get_headers())
        if turma_resp.status_code != 200 or not turma_resp.json():
            flash('Turma não encontrada', 'error')
            return redirect(url_for('dashboard_professor'))
        turma_info = turma_resp.json()[0]

        # Busca alunos da turma
        alunos_url = f"{SUPABASE_URL}/rest/v1/alunos?turma_id=eq.{turma_id}&select=id,nome,cpf,editado"
        alunos_resp = requests.get(alunos_url, headers=get_headers())
        alunos = alunos_resp.json() if alunos_resp.status_code == 200 else []

        return render_template('professor/alunos.html',
                               turma_id=turma_id,
                               turma_nome=turma_info['nome'],
                               alunos=alunos)

    @app.route('/professor/turmas/<int:turma_id>/alunos/novo', methods=['GET', 'POST'])
    def novo_aluno_professor(turma_id):
        if 'user_id' not in session or session['user_type'] != 'professor':
            return redirect(url_for('login'))

        # Busca turma
        turma_url = f"{SUPABASE_URL}/rest/v1/turmas?id=eq.{turma_id}&select=nome,professor_id"
        turma_resp = requests.get(turma_url, headers=get_headers())
        if turma_resp.status_code != 200 or not turma_resp.json():
            flash('Turma não encontrada', 'error')
            return redirect(url_for('dashboard_professor'))
        turma_info = turma_resp.json()[0]

        if request.method == 'POST':
            nome = request.form['nome']
            cpf = request.form['cpf']

            if not nome or not cpf:
                flash('Nome e CPF são obrigatórios', 'error')
                return render_template('professor/novo_aluno.html',
                                       turma_id=turma_id,
                                       turma_nome=turma_info['nome'])

            if not validar_cpf(cpf):
                flash('CPF inválido', 'error')
                return render_template('professor/novo_aluno.html',
                                       turma_id=turma_id,
                                       turma_nome=turma_info['nome'])

            cpf_formatado = formatar_cpf(cpf)
            data = {
                "nome": nome,
                "cpf": cpf_formatado,
                "turma_id": turma_id
            }
            resp = requests.post(f"{SUPABASE_URL}/rest/v1/alunos", headers=get_headers(), json=data)
            if resp.status_code in (200, 201):
                flash('Aluno cadastrado com sucesso!', 'success')
                return redirect(url_for('listar_alunos_professor', turma_id=turma_id))
            else:
                if "duplicate key" in resp.text.lower():
                    flash('CPF já está cadastrado para outro aluno', 'error')
                else:
                    flash('Erro ao cadastrar aluno', 'error')

        return render_template('professor/novo_aluno.html',
                               turma_id=turma_id,
                               turma_nome=turma_info['nome'])

    @app.route('/professor/nova-turma', methods=['GET', 'POST'])
    def nova_turma_professor():
        if 'user_id' not in session or session['user_type'] != 'professor':
            return redirect(url_for('login'))

        # Busca professor pelo usuário logado
        prof_url = f"{SUPABASE_URL}/rest/v1/professores?usuario_id=eq.{session['user_id']}&select=id,curso_id"
        prof_resp = requests.get(prof_url, headers=get_headers())
        if prof_resp.status_code != 200 or not prof_resp.json():
            flash('Professor não encontrado', 'error')
            return redirect(url_for('dashboard_professor'))
        professor = prof_resp.json()[0]

        # Verifica número de turmas
        turmas_url = f"{SUPABASE_URL}/rest/v1/turmas?professor_id=eq.{professor['id']}&ativo=eq.true&select=id"
        turmas_resp = requests.get(turmas_url, headers=get_headers())
        num_turmas = len(turmas_resp.json()) if turmas_resp.status_code == 200 else 0
        if num_turmas >= 4:
            flash('Você já atingiu o limite de 4 turmas', 'error')
            return redirect(url_for('dashboard_professor'))

        if request.method == 'POST':
            nome = request.form['nome']
            if not nome:
                flash('Nome da turma é obrigatório', 'error')
                return render_template('professor/nova_turma.html')

            data = {
                "nome": nome,
                "curso_id": professor['curso_id'],
                "professor_id": professor['id']
            }
            resp = requests.post(f"{SUPABASE_URL}/rest/v1/turmas", headers=get_headers(), json=data)
            if resp.status_code in (200, 201):
                flash('Turma criada com sucesso!', 'success')
                return redirect(url_for('dashboard_professor'))
            else:
                flash('Erro ao criar turma', 'error')

        return render_template('professor/nova_turma.html')

    return app