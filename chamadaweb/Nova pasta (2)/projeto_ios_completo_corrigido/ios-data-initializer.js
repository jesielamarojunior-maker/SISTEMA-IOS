// Dados das 15 unidades do IOS
const IOS_UNITS = [
    {
        id: "rs-porto-alegre-renner",
        name: "RS - Porto Alegre",
        phone: "Sem informações",
        project: "RENNER",
        address: "Sem informações"
    },
    {
        id: "bh-barreiro",
        name: "BH - Barreiro", 
        phone: "11 2503-2617 | 31 9719-9538",
        project: "FMDCA - Quebrada Tech",
        address: "PUC Barreiro Av. Afonso Vaz de Melo, 1200 - Prédio 2, laboratório 318 - Barreiro, Belo Horizonte - MG, 30640-070"
    },
    {
        id: "bh-centro-norte",
        name: "BH - Centro Norte",
        phone: "31 3349-1000",
        project: "FMDCA - Quebrada Tech", 
        address: "Av. Dom José Gaspar, 500 - Coração Eucarístico, Belo Horizonte - MG, 30535-901"
    },
    {
        id: "bh-betim",
        name: "BH - Betim",
        phone: "31 3532-6000",
        project: "FMDCA - Quebrada Tech",
        address: "Av. Edméia Matos Lazzarotti, 1000 - Betim, MG, 32604-100"
    },
    {
        id: "sp-sao-paulo-centro",
        name: "SP - São Paulo Centro",
        phone: "11 3124-4600",
        project: "Diversos",
        address: "Rua Marquês de Paranaguá, 111 - Consolação, São Paulo - SP, 01303-050"
    },
    {
        id: "sp-guarulhos",
        name: "SP - Guarulhos",
        phone: "11 2464-1700",
        project: "Diversos",
        address: "Praça Tereza Cristina, 229 - Centro, Guarulhos - SP, 07110-100"
    },
    {
        id: "rj-rio-de-janeiro-centro",
        name: "RJ - Rio de Janeiro Centro", 
        phone: "21 2240-8800",
        project: "Diversos",
        address: "Rua da Carioca, 42 - Centro, Rio de Janeiro - RJ, 20050-008"
    },
    {
        id: "rj-nova-iguacu",
        name: "RJ - Nova Iguaçu",
        phone: "21 2667-8000",
        project: "Diversos", 
        address: "Av. Dr. Mario Guimarães, 318 - Centro, Nova Iguaçu - RJ, 26255-230"
    },
    {
        id: "pe-recife",
        name: "PE - Recife",
        phone: "81 3413-5000",
        project: "Diversos",
        address: "Rua do Hospício, 836 - Boa Vista, Recife - PE, 50050-050"
    },
    {
        id: "ba-salvador",
        name: "BA - Salvador",
        phone: "71 3116-4000", 
        project: "Diversos",
        address: "Av. Sete de Setembro, 1238 - Vitória, Salvador - BA, 40080-002"
    },
    {
        id: "pr-curitiba",
        name: "PR - Curitiba",
        phone: "41 3340-8000",
        project: "Diversos",
        address: "Rua XV de Novembro, 1299 - Centro, Curitiba - PR, 80060-000"
    },
    {
        id: "ce-fortaleza",
        name: "CE - Fortaleza",
        phone: "85 3254-8000",
        project: "Diversos",
        address: "Av. Monsenhor Tabosa, 1001 - Praia de Iracema, Fortaleza - CE, 60165-010"
    },
    {
        id: "go-goiania", 
        name: "GO - Goiânia",
        phone: "62 3524-8000",
        project: "Diversos",
        address: "Av. Goiás, 460 - Centro, Goiânia - GO, 74015-010"
    },
    {
        id: "df-brasilia",
        name: "DF - Brasília",
        phone: "61 3340-8000",
        project: "Diversos", 
        address: "SCS Quadra 6, Bloco A, n° 196 - Asa Sul, Brasília - DF, 70306-900"
    },
    {
        id: "am-manaus",
        name: "AM - Manaus",
        phone: "92 3234-8000",
        project: "Diversos",
        address: "Av. Eduardo Ribeiro, 620 - Centro, Manaus - AM, 69010-001"
    }
];

// Dados dos 7 cursos do IOS
const IOS_COURSES = [
    {
        id: "gestao-empresarial-erp",
        name: "Gestão Empresarial com ERP",
        description: "Curso completo de gestão empresarial utilizando sistema ERP",
        tipoCurso: "Extensão",
        duration: 180,
        status: "active"
    },
    {
        id: "programacao-web",
        name: "Programação Web",
        description: "Desenvolvimento web com HTML, CSS, JavaScript e frameworks modernos",
        tipoCurso: "TI",
        duration: 240,
        status: "active"
    },
    {
        id: "informatica-basica",
        name: "Informática Básica",
        description: "Curso introdutório de informática e uso de computadores",
        tipoCurso: "Básico",
        duration: 120,
        status: "active"
    },
    {
        id: "assistente-administrativo",
        name: "Assistente Administrativo",
        description: "Formação completa para assistente administrativo",
        tipoCurso: "Administrativo",
        duration: 160,
        status: "active"
    },
    {
        id: "design-grafico",
        name: "Design Gráfico",
        description: "Curso de design gráfico e criação visual",
        tipoCurso: "Design",
        duration: 200,
        status: "active"
    },
    {
        id: "vendas-atendimento",
        name: "Vendas e Atendimento ao Cliente",
        description: "Técnicas de vendas e excelência no atendimento",
        tipoCurso: "Comercial",
        duration: 100,
        status: "active"
    },
    {
        id: "logistica-estoque",
        name: "Logística e Controle de Estoque",
        description: "Gerenciamento logístico e controle de estoques",
        tipoCurso: "Logística",
        duration: 140,
        status: "active"
    }
];

// Função para inicializar dados do IOS
function initializeIOSData() {
    try {
        // Verificar se as variáveis globais existem
        if (typeof units === 'undefined') {
            window.units = [];
        }
        if (typeof courses === 'undefined') {
            window.courses = [];
        }

        // Popular unidades apenas se estiver vazio
        if (!units || units.length === 0) {
            units.push(...IOS_UNITS);
            console.log('✅ Unidades do IOS inicializadas:', units.length);
        }
        
        // Popular cursos apenas se estiver vazio
        if (!courses || courses.length === 0) {
            courses.push(...IOS_COURSES);
            console.log('✅ Cursos do IOS inicializados:', courses.length);
        }
        
        // Atualizar contadores no dashboard
        updateDashboardCounters();
        
        // Salvar dados se a função existir
        if (window.saveData) {
            window.saveData();
        }
        
        return true;
    } catch (error) {
        console.error('❌ Erro ao inicializar dados do IOS:', error);
        return false;
    }
}

// Função para atualizar contadores do dashboard
function updateDashboardCounters() {
    try {
        const totalUnitsEl = document.getElementById('totalUnits');
        const totalCoursesEl = document.getElementById('totalCourses');
        const totalClassesEl = document.getElementById('totalClasses');
        const totalStudentsEl = document.getElementById('totalStudents');

        if (totalUnitsEl) totalUnitsEl.textContent = units?.length || 0;
        if (totalCoursesEl) totalCoursesEl.textContent = courses?.length || 0;
        if (totalClassesEl) totalClassesEl.textContent = classes?.length || 0;
        if (totalStudentsEl) totalStudentsEl.textContent = students?.length || 0;
    } catch (error) {
        console.error('Erro ao atualizar contadores:', error);
    }
}

// Função para melhorar a tela de chamada
function loadAttendanceStudents() {
    const classId = document.getElementById('attendanceClass')?.value;
    const date = document.getElementById('attendanceDate')?.value;
    const container = document.getElementById('attendanceStudents');
    
    if (!container) return;
    
    if (!classId || !date) {
        container.innerHTML = '<div class="alert alert-info">Selecione uma turma e data para começar o registro de presença.</div>';
        return;
    }
    
    // Verificar se students existe
    if (typeof students === 'undefined' || !students) {
        container.innerHTML = '<div class="alert alert-warning">Sistema não inicializado. Recarregue a página.</div>';
        return;
    }
    
    // Filtrar estudantes da turma
    const classStudents = students.filter(s => s.classId === classId);
    
    if (classStudents.length === 0) {
        container.innerHTML = '<div class="alert alert-warning">Nenhum estudante encontrado nesta turma. Adicione estudantes primeiro.</div>';
        return;
    }
    
    // Gerar HTML da interface moderna
    let html = `
        <div class="attendance-modern-header">
            <h4><i class="fas fa-clipboard-list"></i> Lista de Chamada - ${formatDate(date)}</h4>
            <div class="course-badges">
                <span class="badge bg-primary">Curso: ${getCourseName(classId)}</span>
                <span class="badge bg-secondary">Turma: ${getClassName(classId)}</span>
                <span class="badge bg-secondary">Total: ${classStudents.length} alunos</span>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-dark">
                    <tr>
                        <th><i class="fas fa-user"></i> Aluno</th>
                        <th width="120"><i class="fas fa-check"></i> Presente</th>
                        <th width="180"><i class="fas fa-exclamation-circle"></i> Motivo da Falta</th>
                        <th width="150"><i class="fas fa-paperclip"></i> Atestado</th>
                        <th width="200"><i class="fas fa-comment"></i> Observações</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    classStudents.forEach(student => {
        const attendanceKey = `${classId}-${date}`;
        const studentAttendance = attendance?.[attendanceKey]?.[student.id] || {
            presente: true,
            motivo: '',
            anexo: '',
            observacao: ''
        };
        
        html += `
            <tr class="student-row">
                <td>
                    <div class="student-info">
                        <strong>${student.name}</strong>
                        ${student.cpf ? `<br><small class="text-muted">CPF: ${student.cpf}</small>` : ''}
                    </div>
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input attendance-toggle" 
                               type="checkbox" 
                               data-student-id="${student.id}"
                               ${studentAttendance.presente ? 'checked' : ''}>
                        <label class="form-check-label attendance-label">
                            ${studentAttendance.presente ? '✅ Presente' : '❌ Ausente'}
                        </label>
                    </div>
                </td>
                <td>
                    <select class="form-select form-select-sm motivo-select" 
                            data-student-id="${student.id}"
                            ${studentAttendance.presente ? 'disabled' : ''}>
                        <option value="">Motivo...</option>
                        <option value="doenca" ${studentAttendance.motivo === 'doenca' ? 'selected' : ''}>🤒 Doença</option>
                        <option value="atestado" ${studentAttendance.motivo === 'atestado' ? 'selected' : ''}>🏥 Atestado Médico</option>
                        <option value="trabalho" ${studentAttendance.motivo === 'trabalho' ? 'selected' : ''}>💼 Trabalho</option>
                        <option value="pessoal" ${studentAttendance.motivo === 'pessoal' ? 'selected' : ''}>👨‍👩‍👧‍👦 Pessoal</option>
                        <option value="outros" ${studentAttendance.motivo === 'outros' ? 'selected' : ''}>📋 Outros</option>
                    </select>
                </td>
                <td>
                    <input type="file" 
                           class="form-control form-control-sm anexo-input" 
                           data-student-id="${student.id}"
                           accept=".pdf,.jpg,.jpeg,.png"
                           ${studentAttendance.presente ? 'disabled' : ''}>
                    ${studentAttendance.anexo ? '<small class="text-success">📎 Anexado</small>' : ''}
                </td>
                <td>
                    <textarea class="form-control form-control-sm observacao-input" 
                              data-student-id="${student.id}"
                              rows="2" 
                              placeholder="Observações...">${studentAttendance.observacao || ''}</textarea>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    </div>
    
    <div class="attendance-actions">
        <button type="button" class="btn btn-success btn-lg" onclick="saveAttendance()">
            <i class="fas fa-save"></i> 💾 Salvar Chamada
        </button>
        <button type="button" class="btn btn-outline-primary" onclick="markAllPresent()">
            <i class="fas fa-check-double"></i> ✅ Marcar Todos Presentes
        </button>
    </div>
    `;
    
    container.innerHTML = html;
    setupAttendanceInteractions();
}

// Funções auxiliares para a interface de chamada
function setupAttendanceInteractions() {
    document.querySelectorAll('.attendance-toggle').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const studentId = this.dataset.studentId;
            const isPresent = this.checked;
            const label = this.nextElementSibling;
            const row = this.closest('.student-row');
            const motivoSelect = row.querySelector('.motivo-select');
            const anexoInput = row.querySelector('.anexo-input');
            
            // Atualizar label
            label.textContent = isPresent ? '✅ Presente' : '❌ Ausente';
            label.className = `form-check-label attendance-label ${isPresent ? 'text-success' : 'text-danger'}`;
            
            // Habilitar/desabilitar campos
            motivoSelect.disabled = isPresent;
            anexoInput.disabled = isPresent;
            
            // Limpar campos se presente
            if (isPresent) {
                motivoSelect.value = '';
            }
            
            // Efeito visual na linha
            setTimeout(() => {
                if (isPresent) {
                    row.style.backgroundColor = '#d4edda';
                } else {
                    row.style.backgroundColor = '#f8d7da';
                }
            }, 100);
        });
    });
}

function markAllPresent() {
    document.querySelectorAll('.attendance-toggle').forEach(toggle => {
        if (!toggle.checked) {
            toggle.checked = true;
            toggle.dispatchEvent(new Event('change'));
        }
    });
    
    showAlert('✅ Todos os alunos marcados como presentes!', 'success');
}

function getCourseName(classId) {
    if (typeof classes === 'undefined' || typeof courses === 'undefined') return 'N/A';
    
    const classData = classes.find(c => c.id === classId);
    if (!classData) return 'N/A';
    
    const course = courses.find(c => c.id === classData.courseId);
    return course ? course.name : 'N/A';
}

function getClassName(classId) {
    if (typeof classes === 'undefined') return 'N/A';
    
    const classData = classes.find(c => c.id === classId);
    return classData ? classData.name : 'N/A';
}

function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function showAlert(message, type = 'info') {
    // Criar alerta temporário
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        padding: 15px;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#bee5eb'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
    `;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" onclick="this.parentElement.remove()" style="float: right; background: none; border: none; font-size: 16px; cursor: pointer;">×</button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Remover após 3 segundos
    setTimeout(() => {
        if (alertDiv.parentElement) {
            alertDiv.remove();
        }
    }, 3000);
}

// Inicializar dados quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializador do IOS carregado');
    
    // Aguardar um pouco para garantir que as variáveis globais estejam definidas
    setTimeout(() => {
        initializeIOSData();
    }, 1000);
});

// Também tentar inicializar quando o sistema principal carregar
window.addEventListener('load', function() {
    setTimeout(() => {
        if (typeof units !== 'undefined' && typeof courses !== 'undefined') {
            initializeIOSData();
        }
    }, 1500);
});
