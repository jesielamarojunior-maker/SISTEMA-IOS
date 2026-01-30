import os
import re
import bcrypt
import requests
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from werkzeug.security import generate_password_hash
from datetime import datetime
from dotenv import load_dotenv
from config import Config
from routes_unidades import bp_unidades
from routes_cursos import bp_cursos
from routes_professores import bp_professores
from routes_turmas import bp_turmas
from routes_adicional import add_additional_routes

# ================= CONFIGURAÇÕES ===================
load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
app.secret_key = os.getenv('SECRET_KEY', 'ios_chamada_padrao')

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

# Registra os blueprints
app.register_blueprint(bp_unidades)
app.register_blueprint(bp_cursos)
app.register_blueprint(bp_professores)
app.register_blueprint(bp_turmas)

if __name__ == "__main__":
    app.run(debug=True)

SUPABASE_URL = 'https://ccaiygwzxjchfenbqtgx.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYWl5Z3d6eGpjaGZlbmJxdGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Mzc5MjksImV4cCI6MjA2NTMxMzkyOX0.7JdxScvbyHhms3A6b9yPCT31eqid7T8uFAFFv8oSjpU'

# Configuração do banco de dados
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    """Estabelece conexão com o banco de dados"""
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print(f"Erro na conexão com o banco: {e}")
        return None

def init_database():
    """Inicializa o banco de dados com as tabelas necessárias"""
    conn = get_db_connection()
    if not conn:
        print("Erro na conexão com o banco para inicializar")
        return False

    try:
        cursor = conn.cursor()
        
        # Tabela de usuários
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuarios (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                senha VARCHAR(255) NOT NULL,
                tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('master', 'professor')),
                ativo BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de unidades
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS unidades (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                endereco TEXT,
                ativo BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de cursos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS cursos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                unidade_id INTEGER REFERENCES unidades(id),
                ativo BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de professores
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS professores (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                cpf VARCHAR(14) UNIQUE NOT NULL,
                tipo VARCHAR(20) CHECK (tipo IN ('instrutor', 'monitor', 'pedagoga')),
                unidade_id INTEGER REFERENCES unidades(id),
                curso_id INTEGER REFERENCES cursos(id),
                usuario_id INTEGER REFERENCES usuarios(id),
                ativo BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de turmas
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS turmas (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                curso_id INTEGER REFERENCES cursos(id),
                professor_id INTEGER REFERENCES professores(id),
                ativo BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de alunos
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS alunos (
                id SERIAL PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                cpf VARCHAR(14) UNIQUE NOT NULL,
                turma_id INTEGER REFERENCES turmas(id),
                ativo BOOLEAN DEFAULT TRUE,
                editado BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de chamadas
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS chamadas (
                id SERIAL PRIMARY KEY,
                turma_id INTEGER REFERENCES turmas(id),
                data_chamada DATE NOT NULL,
                hora_chamada TIME NOT NULL,
                professor_id INTEGER REFERENCES professores(id),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Tabela de faltas
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS faltas (
                id SERIAL PRIMARY KEY,
                chamada_id INTEGER REFERENCES chamadas(id),
                aluno_id INTEGER REFERENCES alunos(id),
                data_falta DATE NOT NULL,
                hora_falta TIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        conn.commit()
        cursor.close()
        conn.close()
        print("Banco de dados inicializado com sucesso!")
        return True
        
    except Exception as e:
        print(f"Erro ao inicializar o banco de dados: {e}")
        conn.rollback()
        cursor.close()
        conn.close()
        return False

def create_master_user():
    """Cria usuário master padrão se não existir"""
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        
        # Verificar se já existe usuário master
        cursor.execute("SELECT id FROM usuarios WHERE tipo = 'master'")
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return True
        
        # Criar usuário master padrão
        email_master = "admin@ios.org.br"
        senha_master = generate_password_hash("admin123")
        
        cursor.execute('''
            INSERT INTO usuarios (nome, email, senha, tipo)
            VALUES (%s, %s, %s, %s)
        ''', ("Administrador IOS", email_master, senha_master, "master"))
        
        conn.commit()
        cursor.close()
        conn.close()
        print("Usuário master criado: admin@ios.org.br / admin123")
        return True
        
    except Exception as e:
        print(f"Erro ao criar usuário master: {e}")
        cursor.close()
        conn.close()
        return False

# Funções de validação
def validar_cpf(cpf):
    """Valida formato do CPF"""
    # Remove caracteres não numéricos
    cpf = re.sub(r'[^0-9]', '', cpf)
    
    # Verifica se tem 11 dígitos
    if len(cpf) != 11:
        return False
    
    # Verifica se todos os dígitos são iguais
    if cpf == cpf[0] * 11:
        return False
    
    return True

def formatar_cpf(cpf):
    """Formata CPF para XXX.XXX.XXX-XX"""
    cpf = re.sub(r'[^0-9]', '', cpf)
    return f"{cpf[:3]}.{cpf[3:6]}.{cpf[6:9]}-{cpf[9:]}"

import os
import requests
from dotenv import load_dotenv

load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_API_KEY = os.getenv("SUPABASE_API_KEY")

def buscar_alunos():
    url = f"{SUPABASE_URL}/rest/v1/alunos"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }
    params = {"select": "*"}
    resp = requests.get(url, headers=headers, params=params)
    return resp.json()

def inserir_aluno(nome, cpf, turma_id):
    url = f"{SUPABASE_URL}/rest/v1/alunos"
    headers = {
        "apikey": SUPABASE_API_KEY,
        "Authorization": f"Bearer {SUPABASE_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {"nome": nome, "cpf": cpf, "turma_id": turma_id}
    resp = requests.post(url, headers=headers, json=data)
    return resp.status_code in (200, 201)

# Rotas de autenticação
@app.route('/')
def index():
    if 'user_id' in session:
        if session['user_type'] == 'master':
            return redirect(url_for('dashboard_master'))
        else:
            return redirect(url_for('dashboard_professor'))
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# Rotas do Master
@app.route('/master/dashboard')
def dashboard_master():
    if 'user_id' not in session or session['user_type'] != 'master':
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    if not conn:
        flash('Erro de conexão com o banco de dados', 'error')
        return render_template('master/dashboard.html')
    
    try:
        cursor = conn.cursor()
        
        # Estatísticas gerais
        cursor.execute("SELECT COUNT(*) FROM unidades WHERE ativo = TRUE")
        total_unidades = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM cursos WHERE ativo = TRUE")
        total_cursos = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM professores WHERE ativo = TRUE")
        total_professores = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM alunos WHERE ativo = TRUE")
        total_alunos = cursor.fetchone()[0]
        
        cursor.close()
        conn.close()
        
        stats = {
            'unidades': total_unidades,
            'cursos': total_cursos,
            'professores': total_professores,
            'alunos': total_alunos
        }
        
        return render_template('master/dashboard.html', stats=stats)
        
    except Exception as e:
        print(f"Erro no dashboard master: {e}")
        flash('Erro ao carregar dashboard', 'error')
        return render_template('master/dashboard.html')

@app.route('/master/unidades')
def listar_unidades():
    if 'user_id' not in session or session['user_type'] != 'master':
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    if not conn:
        flash('Erro de conexão com o banco de dados', 'error')
        return render_template('master/unidades.html', unidades=[])
    
    try:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, nome, endereco, created_at 
            FROM unidades 
            WHERE ativo = TRUE 
            ORDER BY nome
        ''')
        
        unidades = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return render_template('master/unidades.html', unidades=unidades)
        
    except Exception as e:
        print(f"Erro ao listar unidades: {e}")
        flash('Erro ao carregar unidades', 'error')
        return render_template('master/unidades.html', unidades=[])

@app.route('/master/unidades/nova', methods=['GET', 'POST'])
def nova_unidade():
    if 'user_id' not in session or session['user_type'] != 'master':
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        nome = request.form['nome']
        endereco = request.form.get('endereco', '')
        
        if not nome:
            flash('Nome da unidade é obrigatório', 'error')
            return render_template('master/nova_unidade.html')
        
        conn = get_db_connection()
        if not conn:
            flash('Erro de conexão com o banco de dados', 'error')
            return render_template('master/nova_unidade.html')
        
        try:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO unidades (nome, endereco)
                VALUES (%s, %s)
            ''', (nome, endereco))
            
            conn.commit()
            cursor.close()
            conn.close()
            
            flash('Unidade cadastrada com sucesso!', 'success')
            return redirect(url_for('listar_unidades'))
            
        except Exception as e:
            print(f"Erro ao cadastrar unidade: {e}")
            flash('Erro ao cadastrar unidade', 'error')
            conn.rollback()
            cursor.close()
            conn.close()
    
    return render_template('master/nova_unidade.html')

# Rotas do Professor
@app.route('/professor/dashboard')
def dashboard_professor():
    if 'user_id' not in session or session['user_type'] != 'professor':
        return redirect(url_for('login'))
    
    # Buscar dados do professor
    conn = get_db_connection()
    if not conn:
        flash('Erro de conexão com o banco de dados', 'error')
        return render_template('professor/dashboard.html')
    
    try:
        cursor = conn.cursor()
        cursor.execute('''
            SELECT p.id, u.nome as unidade, c.nome as curso, p.tipo_professor
            FROM professores p
            JOIN unidades u ON p.unidade_id = u.id
            JOIN cursos c ON p.curso_id = c.id
            WHERE p.usuario_id = %s AND p.ativo = TRUE
        ''', (session['user_id'],))
        
        professor_info = cursor.fetchone()
        
        if not professor_info:
            cursor.close()
            conn.close()
            flash('Professor não encontrado ou não vinculado', 'error')
            return redirect(url_for('logout'))
        
        # Buscar turmas do professor
        cursor.execute('''
            SELECT id, nome, created_at
            FROM turmas
            WHERE professor_id = %s AND ativo = TRUE
            ORDER BY nome
        ''', (professor_info[0],))
        
        turmas = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return render_template('professor/dashboard.html', 
                             professor_info=professor_info, 
                             turmas=turmas)
        
    except Exception as e:
        print(f"Erro no dashboard professor: {e}")
        flash('Erro ao carregar dashboard', 'error')
        return render_template('professor/dashboard.html')

@app.route('/professor/turmas/<int:turma_id>/chamada', methods=['GET', 'POST'])
def fazer_chamada(turma_id):
    if 'user_id' not in session or session['user_type'] != 'professor':
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    if not conn:
        flash('Erro de conexão com o banco de dados', 'error')
        return redirect(url_for('dashboard_professor'))
    
    try:
        cursor = conn.cursor()
        
        # Verificar se a turma pertence ao professor
        cursor.execute('''
            SELECT t.nome, p.id as professor_id, p.usuario_id
            FROM turmas t
            JOIN professores p ON t.professor_id = p.id
            WHERE t.id = %s AND t.ativo = TRUE
        ''', (turma_id,))
        
        turma_info = cursor.fetchone()
        if not turma_info or turma_info[2] != session['user_id']:
            flash('Turma não encontrada ou acesso negado', 'error')
            return redirect(url_for('dashboard_professor'))
        
        if request.method == 'POST':
            faltas_ids = request.form.getlist('faltas')
            
            # Criar registro da chamada
            current_date = datetime.now().date()
            current_time = datetime.now().time()
            
            cursor.execute('''
                INSERT INTO chamadas (turma_id, data_chamada, hora_chamada, professor_id)
                VALUES (%s, %s, %s, %s)
                RETURNING id
            ''', (turma_id, current_date, current_time, turma_info[1]))
            
            chamada_id = cursor.fetchone()[0]
            
            # Registrar faltas
            if faltas_ids:
                for aluno_id in faltas_ids:
                    cursor.execute('''
                        INSERT INTO faltas (chamada_id, aluno_id, data_falta, hora_falta)
                        VALUES (%s, %s, %s, %s)
                    ''', (chamada_id, aluno_id, current_date, current_time))
            
            conn.commit()
            flash('Chamada registrada com sucesso!', 'success')
            return redirect(url_for('dashboard_professor'))
        
        # Buscar alunos para exibir na chamada
        cursor.execute('''
            SELECT id, nome, cpf
            FROM alunos
            WHERE turma_id = %s AND ativo = TRUE
            ORDER BY nome
        ''', (turma_id,))
        
        alunos = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return render_template('index.html', 
                            turma_info=turma_info,
                            alunos=alunos)
        
    except Exception as e:
        print(f"Erro ao processar chamada: {e}")
        flash('Erro ao processar chamada', 'error')
        return redirect(url_for('dashboard_professor'))

@app.route('/professor/turmas/<int:turma_id>/alunos/<int:aluno_id>/editar', methods=['GET', 'POST'])
def editar_aluno(turma_id, aluno_id):
    if 'user_id' not in session or session['user_type'] != 'professor':
        return redirect(url_for('login'))
    
    conn = get_db_connection()
    if not conn:
        flash('Erro de conexão com o banco de dados', 'error')
        return redirect(url_for('listar_alunos', turma_id=turma_id))
    
    try:
        cursor = conn.cursor()
        
        # Verificar se a turma pertence ao professor
        cursor.execute('''
            SELECT t.nome, p.usuario_id
            FROM turmas t
            JOIN professores p ON t.professor_id = p.id
            WHERE t.id = %s AND t.ativo = TRUE
        ''', (turma_id,))
        
        turma_info = cursor.fetchone()
        if not turma_info or turma_info[1] != session['user_id']:
            flash('Turma não encontrada ou acesso negado', 'error')
            return redirect(url_for('dashboard_professor'))
        
        # Buscar dados do aluno
        cursor.execute('''
            SELECT id, nome, cpf, editado
            FROM alunos
            WHERE id = %s AND turma_id = %s AND ativo = TRUE
        ''', (aluno_id, turma_id))
        
        aluno = cursor.fetchone()
        if not aluno:
            flash('Aluno não encontrado', 'error')
            return redirect(url_for('listar_alunos', turma_id=turma_id))
        
        # Verificar se o aluno já foi editado
        if aluno[3]:
            flash('Este aluno já foi editado uma vez e não pode ser editado novamente', 'error')
            return redirect(url_for('listar_alunos', turma_id=turma_id))
        
        if request.method == 'POST':
            nome = request.form['nome']
            cpf = request.form['cpf']
            
            if not nome or not cpf:
                flash('Nome e CPF são obrigatórios', 'error')
                return render_template('professor/editar_aluno.html', 
                                    turma_id=turma_id,
                                    turma_nome=turma_info[0],
                                    aluno=aluno)
            
            if not validar_cpf(cpf):
                flash('CPF inválido', 'error')
                return render_template('professor/editar_aluno.html', 
                                    turma_id=turma_id,
                                    turma_nome=turma_info[0],
                                    aluno=aluno)
            
            cpf_formatado = formatar_cpf(cpf)
            
            try:
                cursor.execute('''
                    UPDATE alunos
                    SET nome = %s, cpf = %s, editado = TRUE
                    WHERE id = %s
                ''', (nome, cpf_formatado, aluno_id))
                
                conn.commit()
                flash('Aluno atualizado com sucesso!', 'success')
                return redirect(url_for('listar_alunos', turma_id=turma_id))
                
            except psycopg2.IntegrityError:
                flash('CPF já está cadastrado para outro aluno', 'error')
                conn.rollback()
                return render_template('professor/editar_aluno.html', 
                                    turma_id=turma_id,
                                    turma_nome=turma_info[0],
                                    aluno=aluno)
        
        cursor.close()
        conn.close()
        return render_template('professor/editar_aluno.html', 
                             turma_id=turma_id,
                             turma_nome=turma_info[0],
                             aluno=aluno)
        
    except Exception as e:
        print(f"Erro ao editar aluno: {e}")
        flash('Erro ao editar aluno', 'error')
        return redirect(url_for('listar_alunos', turma_id=turma_id))

@app.route('/alunos')
def listar_alunos():
    alunos = buscar_alunos()
    # Se quiser exibir em HTML, crie um template alunos.html
    # return render_template('alunos.html', alunos=alunos)
    # Ou apenas retornar JSON:
    return jsonify(alunos)

# Importar e adicionar rotas adicionais
from routes_adicional import add_additional_routes
add_additional_routes(app, validar_cpf, formatar_cpf)

app.register_blueprint(bp_unidades)
app.register_blueprint(bp_cursos)
app.register_blueprint(bp_professores)
app.register_blueprint(bp_turmas)

if __name__ == "__main__":
    # Inicializar banco de dados
    if init_database():
        create_master_user()
        print("Sistema inicializado com sucesso!")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        print("Erro ao inicializar o sistema!")


from flask import Flask, request, jsonify, session
import requests
import bcrypt

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta'

SUPABASE_URL = 'https://ccaiygwzxjchfenbqtgx.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjYWl5Z3d6eGpjaGZlbmJxdGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Mzc5MjksImV4cCI6MjA2NTMxMzkyOX0.7JdxScvbyHhms3A6b9yPCT31eqid7T8uFAFFv8oSjpU'

def get_headers():
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }

# Rota para listar todos os usuários
@app.route('/usuarios', methods=['GET'])
def listar_usuarios():
    url = f"{SUPABASE_URL}/rest/v1/usuarios"
    resp = requests.get(url, headers=get_headers())
    return jsonify(resp.json()), resp.status_code

# Rota para cadastrar novo usuário
@app.route('/usuarios', methods=['POST'])
def criar_usuario():
    data = request.get_json()
    import bcrypt
    senha_hash = bcrypt.hashpw(data['senha'].encode(), bcrypt.gensalt()).decode()
    usuario = {
        "nome": data["nome"],
        "email": data["email"],
        "senha": senha_hash,
        "tipo": data["tipo"]
    }
    url = f"{SUPABASE_URL}/rest/v1/usuarios"
    resp = requests.post(url, headers=get_headers(), json=usuario)
    return jsonify(resp.json()), resp.status_code

# Rota para buscar usuário por ID
@app.route('/usuarios/<int:id>', methods=['GET'])
def buscar_usuario(id):
    url = f"{SUPABASE_URL}/rest/v1/usuarios?id=eq.{id}"
    resp = requests.get(url, headers=get_headers())
    usuarios = resp.json()
    if usuarios:
        return jsonify(usuarios[0]), 200
    return jsonify({"message": "Usuário não encontrado"}), 404

# Rota para atualizar usuário (PUT)
@app.route('/usuarios/<int:id>', methods=['PUT'])
def atualizar_usuario(id):
    data = request.get_json()
    if 'senha' in data:
        data['senha'] = bcrypt.hashpw(data['senha'].encode(), bcrypt.gensalt()).decode()
    url = f"{SUPABASE_URL}/rest/v1/usuarios?id=eq.{id}"
    resp = requests.patch(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

# Rota para atualizar parcialmente usuário (PATCH)
@app.route('/usuarios/<int:id>', methods=['PATCH'])
def atualizar_usuario_parcial(id):
    data = request.get_json()
    if 'senha' in data:
        data['senha'] = bcrypt.hashpw(data['senha'].encode(), bcrypt.gensalt()).decode()
    url = f"{SUPABASE_URL}/rest/v1/usuarios?id=eq.{id}"
    resp = requests.patch(url, headers=get_headers(), json=data)
    return jsonify(resp.json()), resp.status_code

# Rota para deletar usuário
@app.route('/usuarios/<int:id>', methods=['DELETE'])
def deletar_usuario(id):
    url = f"{SUPABASE_URL}/rest/v1/usuarios?id=eq.{id}"
    resp = requests.delete(url, headers=get_headers())
    return jsonify({"message": "Usuário deletado"}), resp.status_code
