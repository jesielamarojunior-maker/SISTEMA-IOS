from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# Função para inicializar o banco de dados
def init_db():
    conn = sqlite3.connect('agendamentos.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS agendamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            telefone TEXT NOT NULL,
            data TEXT NOT NULL,
            hora TEXT NOT NULL,
            procedimento TEXT NOT NULL,
            valor REAL NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Rota para agendamento
@app.route('/agendar', methods=['GET', 'POST'])
def agendar():
    if request.method == 'POST':
        nome = request.form['name']
        telefone = request.form['phone']
        data = request.form['date']
        hora = request.form['time']
        
        # Procedimentos e valor total
        procedimentos = request.form.getlist('procedures')
        valor_total = sum([float(v) for v in procedimentos])

        # Inserindo os dados no banco de dados
        conn = sqlite3.connect('agendamentos.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO agendamentos (nome, telefone, data, hora, procedimento, valor)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (nome, telefone, data, hora, ', '.join(procedimentos), valor_total))
        conn.commit()
        conn.close()

        return redirect(url_for('controle'))

    return render_template('agendar.html')

# Rota para controle do barbeiro
@app.route('/controle')
def controle():
    conn = sqlite3.connect('agendamentos.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM agendamentos')
    agendamentos = cursor.fetchall()
    conn.close()

    return render_template('controle_barbeiro.html', agendamentos=agendamentos)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)

