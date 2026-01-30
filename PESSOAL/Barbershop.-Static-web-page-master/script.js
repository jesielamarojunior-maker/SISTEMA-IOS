let totalValue = 0;

// Função para atualizar o total dos procedimentos individuais
function updateTotal() {
    const checkboxes = document.querySelectorAll('#procedures input[type="checkbox"]:checked');
    let total = 0;

    checkboxes.forEach((checkbox) => {
        total += parseFloat(checkbox.value);
    });

    totalValue = total;
    displayTotal();
}

// Função para atualizar o total das combinações de procedimentos
function updateTotalCombo() {
    const radio = document.querySelector('#combined-procedures input[type="radio"]:checked');
    let total = radio ? parseFloat(radio.value) : 0;

    totalValue = total;
    displayTotal();
}

// Exibir o valor total final
function displayTotal() {
    document.getElementById('total-value').textContent = totalValue.toFixed(2);
}function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";
    }
}

function updateTotal() {
    // Atualizar o cálculo do total conforme os procedimentos individuais
}

function updateTotalCombo() {
    // Atualizar o cálculo do total conforme as combinações de procedimentos
}
// Função para selecionar a data
document.querySelectorAll('.date-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'selected' de todos os botões de data
        document.querySelectorAll('.date-button').forEach(btn => btn.classList.remove('selected'));
        // Adiciona a classe 'selected' ao botão clicado
        button.classList.add('selected');
    });
});

// Função para selecionar a hora
document.querySelectorAll('.time-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'selected' de todos os botões de hora
        document.querySelectorAll('.time-button').forEach(btn => btn.classList.remove('selected'));
        // Adiciona a classe 'selected' ao botão clicado
        button.classList.add('selected');
    });
});
function confirmarAgendamento() {
    // Lógica para confirmar o agendamento
    // ...

    // Redirecionar para a nova página
    window.location.href = "confirmacao.html";
}

// Mock de dados de agendamentos - você substituiria isso com dados reais
const agendamentos = [
    { cliente: 'João Silva', data: '25/10/2024', hora: '14:00' },
    { cliente: 'Maria Souza', data: '26/10/2024', hora: '10:00' },
    { cliente: 'Pedro Alves', data: '27/10/2024', hora: '16:30' }
];

// Exibe os agendamentos na tabela
function exibirAgendamentos() {
    const tabela = document.getElementById('tabela-agendamentos').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
    agendamentos.forEach(agendamento => {
        const row = tabela.insertRow();
        row.insertCell(0).textContent = agendamento.cliente;
        row.insertCell(1).textContent = agendamento.data;
        row.insertCell(2).textContent = agendamento.hora;
    });
}

// Salvar configuração dos dias de funcionamento
document.getElementById('config-dias-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const diasSelecionados = [];
    document.querySelectorAll('input[name="dias"]:checked').forEach((checkbox) => {
        diasSelecionados.push(checkbox.value);
    });
    alert('Dias de funcionamento salvos: ' + diasSelecionados.join(', '));
    // Aqui você pode salvar os dias em um backend, localStorage, etc.
});

// Inicializa a tabela de agendamentos quando a página carrega
window.onload = exibirAgendamentos;
fetch('/salvar-dias', {
    method: 'POST',
    body: JSON.stringify({ dias: diasSelecionados }),
    headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())
.then(data => console.log('Dias salvos:', data))
.catch(error => console.error('Erro:', error));
