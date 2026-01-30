// 📊 SISTEMA DE NOTAS E DASHBOARD DO PROFESSOR

// CARREGAR ABA DE NOTAS
function loadGradesTab(classId) {
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  const classGrades = window.gradeSystem.grades.filter(g => g.classId == classId);
  
  // Agrupar atividades por tipo
  const activities = [...new Set(classGrades.map(g => g.activityName))];
  
  const gradesHTML = `
    <div class="grades-container">
      ${activities.length > 0 ? `
        <div class="activities-section">
          <h5><i class="fas fa-list"></i> Atividades Lançadas</h5>
          <div class="activities-grid">
            ${activities.map(activityName => {
              const activityGrades = classGrades.filter(g => g.activityName === activityName);
              const avgGrade = activityGrades.length > 0 ? 
                (activityGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade * 10), 0) / activityGrades.length).toFixed(1) : 0;
              
              return `
                <div class="activity-card" onclick="viewActivityDetails('${activityName}', ${classId})">
                  <div class="activity-name">${activityName}</div>
                  <div class="activity-stats">
                    <span>Média: ${avgGrade}</span>
                    <span>${activityGrades.length}/${classStudents.length} alunos</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        
        <div class="grades-table-container">
          <h5><i class="fas fa-table"></i> Resumo de Notas</h5>
          <table class="grades-table">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>RA</th>
                ${activities.map(act => `<th>${act}</th>`).join('')}
                <th>Média</th>
                <th>Situação</th>
              </tr>
            </thead>
            <tbody>
              ${classStudents.map(student => {
                const studentAvg = calculateStudentAverage(student.id, classId);
                const situation = studentAvg >= 6 ? 'Aprovado' : studentAvg >= 4 ? 'Recuperação' : 'Reprovado';
                const situationClass = studentAvg >= 6 ? 'situation-approved' : studentAvg >= 4 ? 'situation-recovery' : 'situation-failed';
                
                return `
                  <tr>
                    <td>${student.name}</td>
                    <td>${student.ra}</td>
                    ${activities.map(activityName => {
                      const grade = classGrades.find(g => g.studentId === student.id && g.activityName === activityName);
                      return `<td>${grade ? (grade.grade / grade.maxGrade * 10).toFixed(1) : '-'}</td>`;
                    }).join('')}
                    <td><strong>${studentAvg || '-'}</strong></td>
                    <td><span class="situation-badge ${situationClass}">${studentAvg ? situation : '-'}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      ` : `
        <div class="no-activities">
          <i class="fas fa-clipboard-list fa-3x"></i>
          <h4>Nenhuma atividade lançada</h4>
          <p>Clique em "Nova Atividade" para começar a lançar notas.</p>
        </div>
      `}
    </div>
  `;
  
  document.getElementById('gradesContent').innerHTML = gradesHTML;
}

// MODAL PARA NOVA ATIVIDADE
function showAddActivityModal(classId) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content activity-modal">
      <div class="modal-header">
        <h3><i class="fas fa-plus"></i> Nova Atividade</h3>
        <button onclick="closeModal()" class="modal-close">&times;</button>
      </div>
      
      <form id="activityForm" onsubmit="createActivity(event, ${classId})">
        <div class="form-row">
          <div class="form-group">
            <label for="activityName">Nome da Atividade *</label>
            <input type="text" id="activityName" required placeholder="Ex: Prova 1, Trabalho JavaScript, etc.">
          </div>
          <div class="form-group">
            <label for="activityType">Tipo *</label>
            <select id="activityType" required>
              <option value="prova">Prova</option>
              <option value="trabalho">Trabalho</option>
              <option value="projeto">Projeto</option>
              <option value="participacao">Participação</option>
              <option value="seminario">Seminário</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="maxGrade">Nota Máxima *</label>
            <input type="number" id="maxGrade" required min="1" max="100" value="10" step="0.1">
          </div>
          <div class="form-group">
            <label for="weight">Peso *</label>
            <input type="number" id="weight" required min="0.1" max="10" value="1" step="0.1">
          </div>
        </div>
        
        <div class="form-group">
          <label for="activityDate">Data da Atividade</label>
          <input type="date" id="activityDate" value="${new Date().toISOString().split('T')[0]}">
        </div>
        
        <div class="modal-actions">
          <button type="button" onclick="closeModal()" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">Criar Atividade</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// CRIAR NOVA ATIVIDADE
function createActivity(event, classId) {
  event.preventDefault();
  
  const activityData = {
    name: document.getElementById('activityName').value,
    type: document.getElementById('activityType').value,
    maxGrade: parseFloat(document.getElementById('maxGrade').value),
    weight: parseFloat(document.getElementById('weight').value),
    date: document.getElementById('activityDate').value,
    classId: classId,
    teacherId: currentUser.id
  };
  
  closeModal();
  showGradeEntryModal(classId, activityData);
}

// MODAL PARA LANÇAR NOTAS
function showGradeEntryModal(classId, activityData) {
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content grade-entry-modal">
      <div class="modal-header">
        <h3><i class="fas fa-star"></i> Lançar Notas - ${activityData.name}</h3>
        <div class="activity-info">
          <span>Tipo: ${activityData.type}</span>
          <span>Nota máxima: ${activityData.maxGrade}</span>
          <span>Peso: ${activityData.weight}</span>
        </div>
        <button onclick="closeModal()" class="modal-close">&times;</button>
      </div>
      
      <div class="grade-entry-container">
        <div class="grade-entry-header">
          <button onclick="quickFillGrades('${activityData.maxGrade}')" class="btn btn-sm btn-outline">
            Preencher Todos (${activityData.maxGrade})
          </button>
          <button onclick="clearAllGrades()" class="btn btn-sm btn-outline">
            Limpar Todos
          </button>
        </div>
        
        <div class="students-grade-list">
          ${classStudents.map(student => `
            <div class="student-grade-row">
              <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-ra">RA: ${student.ra}</div>
              </div>
              
              <div class="grade-input-container">
                <input type="number" 
                       id="grade-${student.id}" 
                       class="grade-input"
                       min="0" 
                       max="${activityData.maxGrade}" 
                       step="0.1" 
                       placeholder="0.0">
                <span class="grade-max">/ ${activityData.maxGrade}</span>
              </div>
              
              <div class="grade-notes">
                <input type="text" 
                       id="notes-${student.id}" 
                       class="notes-input" 
                       placeholder="Observações...">
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="modal-actions">
        <button type="button" onclick="closeModal()" class="btn btn-secondary">Cancelar</button>
        <button onclick="saveActivityGrades(${classId}, ${JSON.stringify(activityData).replace(/"/g, '&quot;')})" 
                class="btn btn-success">
          <i class="fas fa-save"></i> Salvar Notas
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// SALVAR NOTAS DA ATIVIDADE
function saveActivityGrades(classId, activityData) {
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  let savedCount = 0;
  
  classStudents.forEach(student => {
    const gradeInput = document.getElementById(`grade-${student.id}`);
    const notesInput = document.getElementById(`notes-${student.id}`);
    
    if (gradeInput.value && gradeInput.value !== '') {
      const gradeRecord = createGradeRecord({
        studentId: student.id,
        classId: classId,
        teacherId: currentUser.id,
        activityType: activityData.type,
        activityName: activityData.name,
        grade: parseFloat(gradeInput.value),
        maxGrade: activityData.maxGrade,
        weight: activityData.weight,
        date: activityData.date,
        notes: notesInput.value
      });
      
      window.gradeSystem.grades.push(gradeRecord);
      savedCount++;
    }
  });
  
  if (savedCount > 0) {
    saveEnhancedData();
    showAlert(`${savedCount} notas salvas com sucesso!`, "success");
    closeModal();
    loadGradesTab(classId);
  } else {
    showAlert("Nenhuma nota foi inserida!", "warning");
  }
}

// FUNÇÕES AUXILIARES PARA MODAL DE NOTAS
function quickFillGrades(maxGrade) {
  const gradeInputs = document.querySelectorAll('.grade-input');
  gradeInputs.forEach(input => {
    if (!input.value) {
      input.value = maxGrade;
    }
  });
}

function clearAllGrades() {
  const gradeInputs = document.querySelectorAll('.grade-input');
  const notesInputs = document.querySelectorAll('.notes-input');
  
  gradeInputs.forEach(input => input.value = '');
  notesInputs.forEach(input => input.value = '');
}

// CARREGAR ABA DE ANOTAÇÕES
function loadAnnotationsTab(classId) {
  const classAnnotations = window.gradeSystem.annotations.filter(a => a.classId == classId);
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  
  const annotationsHTML = `
    <div class="annotations-container">
      ${classAnnotations.length > 0 ? `
        <div class="annotations-list">
          ${classAnnotations.map(annotation => {
            const student = classStudents.find(s => s.id === annotation.studentId);
            const priorityClass = `priority-${annotation.priority}`;
            const typeIcon = {
              'behavior': 'fas fa-user-friends',
              'performance': 'fas fa-chart-line',
              'participation': 'fas fa-hand-paper',
              'difficulty': 'fas fa-exclamation-triangle',
              'improvement': 'fas fa-arrow-up'
            }[annotation.type] || 'fas fa-sticky-note';
            
            return `
              <div class="annotation-card ${priorityClass}">
                <div class="annotation-header">
                  <div class="annotation-student">
                    <i class="${typeIcon}"></i>
                    <strong>${student ? student.name : 'Aluno não encontrado'}</strong>
                  </div>
                  <div class="annotation-meta">
                    <span class="annotation-date">${new Date(annotation.date).toLocaleDateString('pt-BR')}</span>
                    <span class="annotation-priority">${annotation.priority.toUpperCase()}</span>
                  </div>
                </div>
                
                <div class="annotation-content">
                  <h6>${annotation.title}</h6>
                  <p>${annotation.content}</p>
                </div>
                
                <div class="annotation-actions">
                  <button onclick="editAnnotation(${annotation.id})" class="btn btn-sm btn-outline">
                    <i class="fas fa-edit"></i> Editar
                  </button>
                  <button onclick="deleteAnnotation(${annotation.id})" class="btn btn-sm btn-danger">
                    <i class="fas fa-trash"></i> Excluir
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      ` : `
        <div class="no-annotations">
          <i class="fas fa-sticky-note fa-3x"></i>
          <h4>Nenhuma anotação registrada</h4>
          <p>Clique em "Nova Anotação" para registrar observações sobre os alunos.</p>
        </div>
      `}
    </div>
  `;
  
  document.getElementById('annotationsContent').innerHTML = annotationsHTML;
}

// MODAL PARA NOVA ANOTAÇÃO
function showAddAnnotationModal(classId) {
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML = `
    <div class="modal-content annotation-modal">
      <div class="modal-header">
        <h3><i class="fas fa-sticky-note"></i> Nova Anotação</h3>
        <button onclick="closeModal()" class="modal-close">&times;</button>
      </div>
      
      <form id="annotationForm" onsubmit="saveAnnotation(event, ${classId})">
        <div class="form-row">
          <div class="form-group">
            <label for="annotationStudent">Aluno *</label>
            <select id="annotationStudent" required>
              <option value="">Selecione um aluno...</option>
              ${classStudents.map(student => `
                <option value="${student.id}">${student.name} (RA: ${student.ra})</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label for="annotationType">Tipo *</label>
            <select id="annotationType" required>
              <option value="behavior">Comportamento</option>
              <option value="performance">Desempenho</option>
              <option value="participation">Participação</option>
              <option value="difficulty">Dificuldade</option>
              <option value="improvement">Melhoria</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="annotationPriority">Prioridade *</label>
            <select id="annotationPriority" required>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
              <option value="urgent">Urgente</option>
            </select>
          </div>
          <div class="form-group">
            <label for="annotationDate">Data</label>
            <input type="date" id="annotationDate" value="${new Date().toISOString().split('T')[0]}">
          </div>
        </div>
        
        <div class="form-group">
          <label for="annotationTitle">Título *</label>
          <input type="text" id="annotationTitle" required placeholder="Ex: Dificuldade em algoritmos">
        </div>
        
        <div class="form-group">
          <label for="annotationContent">Observação *</label>
          <textarea id="annotationContent" required rows="4" 
                    placeholder="Descreva sua observação sobre o aluno..."></textarea>
        </div>
        
        <div class="form-group">
          <label>
            <input type="checkbox" id="annotationPrivate"> 
            Anotação privada (não visível para outros professores)
          </label>
        </div>
        
        <div class="modal-actions">
          <button type="button" onclick="closeModal()" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Anotação</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// SALVAR ANOTAÇÃO
function saveAnnotation(event, classId) {
  event.preventDefault();
  
  const annotationData = createTeacherAnnotation({
    studentId: parseInt(document.getElementById('annotationStudent').value),
    classId: classId,
    teacherId: currentUser.id,
    type: document.getElementById('annotationType').value,
    title: document.getElementById('annotationTitle').value,
    content: document.getElementById('annotationContent').value,
    priority: document.getElementById('annotationPriority').value,
    isPrivate: document.getElementById('annotationPrivate').checked,
    date: document.getElementById('annotationDate').value
  });
  
  window.gradeSystem.annotations.push(annotationData);
  saveEnhancedData();
  
  showAlert("Anotação salva com sucesso!", "success");
  closeModal();
  loadAnnotationsTab(classId);
}

// FECHAR MODAL
function closeModal() {
  const modal = document.querySelector('.modal-overlay');
  if (modal) {
    modal.remove();
  }
}

// EXPORTAR FUNÇÕES
window.loadGradesTab = loadGradesTab;
window.showAddActivityModal = showAddActivityModal;
window.createActivity = createActivity;
window.showGradeEntryModal = showGradeEntryModal;
window.saveActivityGrades = saveActivityGrades;
window.quickFillGrades = quickFillGrades;
window.clearAllGrades = clearAllGrades;
window.loadAnnotationsTab = loadAnnotationsTab;
window.showAddAnnotationModal = showAddAnnotationModal;
window.saveAnnotation = saveAnnotation;
window.closeModal = closeModal;