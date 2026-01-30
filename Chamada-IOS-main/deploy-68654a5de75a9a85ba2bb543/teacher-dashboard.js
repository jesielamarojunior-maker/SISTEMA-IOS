// 👨‍🏫 SISTEMA DIÁRIO DIGITAL DO PROFESSOR
// Funcionalidades: Chamada + Notas + Dashboard integrados

// Estrutura de dados para sistema de notas
window.gradeSystem = {
  grades: [], // Notas dos alunos
  attendance: [], // Registros de presença detalhados
  annotations: [], // Anotações do professor sobre alunos
  activities: [], // Atividades e avaliações
  teacherStats: {} // Estatísticas por professor
};

// ESTRUTURA DE NOTAS
function createGradeRecord(data) {
  return {
    id: Date.now(),
    studentId: data.studentId,
    classId: data.classId,
    teacherId: data.teacherId,
    activityType: data.activityType, // 'prova', 'trabalho', 'participacao', 'projeto'
    activityName: data.activityName,
    grade: parseFloat(data.grade),
    maxGrade: parseFloat(data.maxGrade) || 10,
    weight: parseFloat(data.weight) || 1,
    date: data.date || new Date().toISOString(),
    semester: data.semester || 1,
    notes: data.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// ESTRUTURA DE PRESENÇA DETALHADA
function createDetailedAttendance(data) {
  return {
    id: Date.now(),
    studentId: data.studentId,
    classId: data.classId,
    teacherId: data.teacherId,
    date: data.date,
    classType: data.classType, // 'main', 'extension'
    status: data.status, // 'present', 'absent', 'late', 'justified'
    arrivalTime: data.arrivalTime || null,
    justification: data.justification || '',
    justificationDoc: data.justificationDoc || null,
    teacherNotes: data.teacherNotes || '',
    createdAt: new Date().toISOString()
  };
}

// ESTRUTURA DE ANOTAÇÕES DO PROFESSOR
function createTeacherAnnotation(data) {
  return {
    id: Date.now(),
    studentId: data.studentId,
    classId: data.classId,
    teacherId: data.teacherId,
    type: data.type, // 'behavior', 'performance', 'participation', 'difficulty', 'improvement'
    title: data.title,
    content: data.content,
    priority: data.priority, // 'low', 'medium', 'high', 'urgent'
    isPrivate: data.isPrivate || false,
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    createdAt: new Date().toISOString()
  };
}

// 📊 CÁLCULOS DE PERFORMANCE
function calculateStudentAverage(studentId, classId, semester = null) {
  const studentGrades = window.gradeSystem.grades.filter(g => 
    g.studentId === studentId && g.classId === classId &&
    (semester === null || g.semester === semester)
  );
  
  if (studentGrades.length === 0) return null;
  
  let totalWeightedGrade = 0;
  let totalWeight = 0;
  
  studentGrades.forEach(grade => {
    const normalizedGrade = (grade.grade / grade.maxGrade) * 10;
    totalWeightedGrade += normalizedGrade * grade.weight;
    totalWeight += grade.weight;
  });
  
  return totalWeight > 0 ? (totalWeightedGrade / totalWeight).toFixed(2) : null;
}

function calculateAttendanceRate(studentId, classId) {
  const attendanceRecords = window.gradeSystem.attendance.filter(a => 
    a.studentId === studentId && a.classId === classId
  );
  
  if (attendanceRecords.length === 0) return 100;
  
  const presentCount = attendanceRecords.filter(a => 
    a.status === 'present' || a.status === 'late'
  ).length;
  
  return ((presentCount / attendanceRecords.length) * 100).toFixed(1);
}

// 📈 ESTATÍSTICAS DA TURMA
function calculateClassStats(classId, teacherId) {
  const classStudents = students.filter(s => s.classId === classId);
  const classGrades = window.gradeSystem.grades.filter(g => g.classId === classId);
  const classAttendance = window.gradeSystem.attendance.filter(a => a.classId === classId);
  
  if (classStudents.length === 0) return null;
  
  // Médias individuais
  const studentAverages = classStudents.map(student => {
    const avg = calculateStudentAverage(student.id, classId);
    return {
      student: student,
      average: parseFloat(avg) || 0,
      attendanceRate: parseFloat(calculateAttendanceRate(student.id, classId))
    };
  });
  
  // Estatísticas gerais
  const validAverages = studentAverages.filter(s => s.average > 0).map(s => s.average);
  const classAverage = validAverages.length > 0 ? 
    (validAverages.reduce((a, b) => a + b, 0) / validAverages.length).toFixed(2) : 0;
  
  const attendanceRates = studentAverages.map(s => s.attendanceRate);
  const avgAttendance = attendanceRates.length > 0 ?
    (attendanceRates.reduce((a, b) => a + b, 0) / attendanceRates.length).toFixed(1) : 100;
  
  // Alunos em risco
  const studentsAtRisk = studentAverages.filter(s => 
    s.average < 6.0 || s.attendanceRate < 75
  );
  
  // Distribuição de notas
  const gradeDistribution = {
    excellent: studentAverages.filter(s => s.average >= 9.0).length,
    good: studentAverages.filter(s => s.average >= 7.0 && s.average < 9.0).length,
    average: studentAverages.filter(s => s.average >= 6.0 && s.average < 7.0).length,
    below: studentAverages.filter(s => s.average < 6.0).length
  };
  
  return {
    totalStudents: classStudents.length,
    classAverage: parseFloat(classAverage),
    avgAttendance: parseFloat(avgAttendance),
    studentsAtRisk: studentsAtRisk,
    gradeDistribution: gradeDistribution,
    studentDetails: studentAverages,
    totalActivities: classGrades.length,
    lastUpdate: new Date().toISOString()
  };
}

// 🎯 DIÁRIO DIGITAL - INTERFACE PRINCIPAL
function showTeacherDiary() {
  const teacherClasses = getTeacherClasses(currentUser.id);
  
  if (teacherClasses.length === 0) {
    showAlert("Você não possui turmas atribuídas.", "info");
    return;
  }
  
  const diaryHTML = `
    <div class="teacher-diary-container">
      <div class="diary-header">
        <h2><i class="fas fa-book"></i> Diário Digital</h2>
        <div class="teacher-info">
          <span><strong>Professor:</strong> ${currentUser.name}</span>
          <span><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      
      <div class="class-selector">
        <label for="diaryClassSelect">Selecione a Turma:</label>
        <select id="diaryClassSelect" onchange="loadDiaryForClass(this.value)">
          <option value="">Selecione uma turma...</option>
          ${teacherClasses.map(cls => `
            <option value="${cls.id}">${cls.name}</option>
          `).join('')}
        </select>
      </div>
      
      <div id="diaryContent" class="diary-content" style="display: none;">
        <!-- Conteúdo será carregado dinamicamente -->
      </div>
    </div>
  `;
  
  // Mostrar no content area
  const contentDiv = document.querySelector('.content');
  contentDiv.innerHTML = diaryHTML;
}

function loadDiaryForClass(classId) {
  if (!classId) {
    document.getElementById('diaryContent').style.display = 'none';
    return;
  }
  
  const selectedClass = classes.find(c => c.id == classId);
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  const today = new Date().toISOString().split('T')[0];
  
  if (!selectedClass || classStudents.length === 0) {
    document.getElementById('diaryContent').innerHTML = '<p>Turma não encontrada ou sem alunos.</p>';
    return;
  }
  
  const diaryContentHTML = `
    <div class="diary-class-info">
      <h3>${selectedClass.name}</h3>
      <div class="class-summary">
        <span><i class="fas fa-users"></i> ${classStudents.length} alunos</span>
        <span><i class="fas fa-calendar"></i> ${new Date().toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
    
    <div class="diary-tabs">
      <button class="diary-tab active" onclick="showDiaryTab('attendance')">
        <i class="fas fa-check-circle"></i> Chamada
      </button>
      <button class="diary-tab" onclick="showDiaryTab('grades')">
        <i class="fas fa-star"></i> Notas
      </button>
      <button class="diary-tab" onclick="showDiaryTab('annotations')">
        <i class="fas fa-sticky-note"></i> Anotações
      </button>
      <button class="diary-tab" onclick="showDiaryTab('dashboard')">
        <i class="fas fa-chart-line"></i> Dashboard
      </button>
    </div>
    
    <!-- ABA CHAMADA -->
    <div id="attendanceTab" class="diary-tab-content active">
      <div class="attendance-header">
        <h4><i class="fas fa-check-circle"></i> Lista de Presença - ${new Date().toLocaleDateString('pt-BR')}</h4>
        <div class="attendance-controls">
          <label>
            Tipo de Aula: 
            <select id="classTypeSelect">
              <option value="main">Aula Principal</option>
              <option value="extension">Aula de Extensão</option>
            </select>
          </label>
          <button onclick="markAllPresent(${classId})" class="btn btn-success btn-sm">
            <i class="fas fa-check-double"></i> Marcar Todos Presentes
          </button>
        </div>
      </div>
      
      <div class="attendance-list">
        ${classStudents.map(student => `
          <div class="student-attendance-card" id="attendance-${student.id}">
            <div class="student-info">
              <div class="student-name">${student.name}</div>
              <div class="student-details">RA: ${student.ra} | Freq: ${calculateAttendanceRate(student.id, classId)}%</div>
            </div>
            
            <div class="attendance-controls">
              <div class="attendance-status">
                <label class="status-option">
                  <input type="radio" name="attendance-${student.id}" value="present" checked>
                  <span class="status-present">Presente</span>
                </label>
                <label class="status-option">
                  <input type="radio" name="attendance-${student.id}" value="absent">
                  <span class="status-absent">Falta</span>
                </label>
                <label class="status-option">
                  <input type="radio" name="attendance-${student.id}" value="late">
                  <span class="status-late">Atrasado</span>
                </label>
                <label class="status-option">
                  <input type="radio" name="attendance-${student.id}" value="justified">
                  <span class="status-justified">Justificado</span>
                </label>
              </div>
              
              <div class="attendance-notes">
                <input type="text" placeholder="Observações..." 
                       id="attendanceNotes-${student.id}" class="attendance-note-input">
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="attendance-footer">
        <button onclick="saveAttendance(${classId})" class="btn btn-primary">
          <i class="fas fa-save"></i> Salvar Chamada
        </button>
      </div>
    </div>
    
    <!-- ABA NOTAS -->
    <div id="gradesTab" class="diary-tab-content">
      <div class="grades-header">
        <h4><i class="fas fa-star"></i> Lançamento de Notas</h4>
        <button onclick="showAddActivityModal(${classId})" class="btn btn-success">
          <i class="fas fa-plus"></i> Nova Atividade
        </button>
      </div>
      
      <div id="gradesContent">
        <!-- Será carregado dinamicamente -->
      </div>
    </div>
    
    <!-- ABA ANOTAÇÕES -->
    <div id="annotationsTab" class="diary-tab-content">
      <div class="annotations-header">
        <h4><i class="fas fa-sticky-note"></i> Anotações sobre Alunos</h4>
        <button onclick="showAddAnnotationModal(${classId})" class="btn btn-success">
          <i class="fas fa-plus"></i> Nova Anotação
        </button>
      </div>
      
      <div id="annotationsContent">
        <!-- Será carregado dinamicamente -->
      </div>
    </div>
    
    <!-- ABA DASHBOARD -->
    <div id="dashboardTab" class="diary-tab-content">
      <div id="teacherDashboardContent">
        <!-- Será carregado dinamicamente -->
      </div>
    </div>
  `;
  
  document.getElementById('diaryContent').innerHTML = diaryContentHTML;
  document.getElementById('diaryContent').style.display = 'block';
  
  // Carregar dados iniciais
  loadGradesTab(classId);
  loadAnnotationsTab(classId);
  loadTeacherDashboard(classId);
}

// FUNÇÕES DE CONTROLE DAS ABAS
function showDiaryTab(tabName) {
  // Remover classe active de todas as abas
  document.querySelectorAll('.diary-tab').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.diary-tab-content').forEach(content => content.classList.remove('active'));
  
  // Ativar aba selecionada
  event.target.classList.add('active');
  document.getElementById(tabName + 'Tab').classList.add('active');
}

// SALVAR CHAMADA
function saveAttendance(classId) {
  const classStudents = students.filter(s => s.classId == classId && s.academic.status === 'active');
  const today = new Date().toISOString().split('T')[0];
  const classType = document.getElementById('classTypeSelect').value;
  
  classStudents.forEach(student => {
    const statusElements = document.getElementsByName(`attendance-${student.id}`);
    const selectedStatus = Array.from(statusElements).find(el => el.checked)?.value || 'present';
    const notes = document.getElementById(`attendanceNotes-${student.id}`).value;
    
    const attendanceRecord = createDetailedAttendance({
      studentId: student.id,
      classId: classId,
      teacherId: currentUser.id,
      date: today,
      classType: classType,
      status: selectedStatus,
      teacherNotes: notes
    });
    
    // Remover registro anterior do mesmo dia/tipo se existir
    window.gradeSystem.attendance = window.gradeSystem.attendance.filter(a => 
      !(a.studentId === student.id && a.classId === classId && 
        a.date === today && a.classType === classType)
    );
    
    window.gradeSystem.attendance.push(attendanceRecord);
    
    // Atualizar status de frequência do aluno
    const attendanceRate = calculateAttendanceRate(student.id, classId);
    student.attendance.attendanceRate = parseFloat(attendanceRate);
    student.attendance.frequencyStatus = calculateFrequencyStatus(student);
    student.attendance.lastUpdate = new Date().toISOString();
  });
  
  // Salvar dados
  saveEnhancedData();
  showAlert("Chamada salva com sucesso!", "success");
  
  // Atualizar interface
  loadDiaryForClass(classId);
}

// MARCAR TODOS PRESENTES
function markAllPresent(classId) {
  const classStudents = students.filter(s => s.classId == classId);
  
  classStudents.forEach(student => {
    const presentRadio = document.querySelector(`input[name="attendance-${student.id}"][value="present"]`);
    if (presentRadio) {
      presentRadio.checked = true;
    }
  });
  
  showAlert("Todos os alunos marcados como presentes!", "info");
}

// OBTER TURMAS DO PROFESSOR
function getTeacherClasses(teacherId) {
  if (currentUser.type === 'admin') {
    return classes; // Admin vê todas as turmas
  }
  
  return classes.filter(cls => {
    if (!cls.team) return false; // Turmas antigas sem estrutura de equipe
    
    return cls.team.instructor?.id === teacherId ||
           cls.team.monitor?.id === teacherId ||
           cls.team.pedagogue?.id === teacherId;
  });
}

// SALVAR DADOS MELHORADOS
function saveEnhancedData() {
  const enhancedData = {
    ...dataManager.getData(),
    gradeSystem: window.gradeSystem
  };
  
  localStorage.setItem('ios_attendance_system', JSON.stringify(enhancedData));
  console.log('✅ Dados melhorados salvos');
}

// CARREGAR DADOS MELHORADOS
function loadEnhancedData() {
  const data = localStorage.getItem('ios_attendance_system');
  if (data) {
    const parsedData = JSON.parse(data);
    if (parsedData.gradeSystem) {
      window.gradeSystem = parsedData.gradeSystem;
    }
  }
  console.log('✅ Dados melhorados carregados');
}

// EXPORTAR FUNÇÕES
window.showTeacherDiary = showTeacherDiary;
window.loadDiaryForClass = loadDiaryForClass;
window.showDiaryTab = showDiaryTab;
window.saveAttendance = saveAttendance;
window.markAllPresent = markAllPresent;
window.calculateStudentAverage = calculateStudentAverage;
window.calculateAttendanceRate = calculateAttendanceRate;
window.calculateClassStats = calculateClassStats;