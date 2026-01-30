// Sistema de Controle de Presença - Instituto da Oportunidade Social
// VERSÃO MELHORADA - Com todas as funcionalidades solicitadas

// Estrutura melhorada de dados
window.enhancedDataStructure = {
  users: [],
  units: [],
  courses: [],
  classes: [], // Estrutura melhorada com professor, monitor, pedagoga
  students: [], // Com CPF como RA e status melhorado
  attendance: {}, // Com anexos e justificativas
  extensionClasses: {}, // Para aulas de extensão (português/matemática)
  reports: {}, // Relatórios de professores
  analytics: {} // Dados para dashboard Power BI
};

// FASE 1: NOVA ESTRUTURA DE TURMAS
// Estrutura melhorada para turmas com equipe completa
function createEnhancedClass(classData) {
  return {
    id: Date.now(),
    name: classData.name,
    unitId: classData.unitId,
    courseId: classData.courseId,
    
    // EQUIPE DA TURMA
    team: {
      instructor: {
        id: classData.instructorId,
        name: classData.instructorName,
        email: classData.instructorEmail
      },
      monitor: {
        id: classData.monitorId || null,
        name: classData.monitorName || null,
        email: classData.monitorEmail || null
      },
      pedagogue: {
        id: classData.pedagogueId || null,
        name: classData.pedagogueName || null,
        email: classData.pedagogueEmail || null
      }
    },
    
    // CONFIGURAÇÕES DE AULA
    schedule: {
      mainClass: {
        dayOfWeek: classData.mainClassDay,
        startTime: classData.mainClassStart,
        endTime: classData.mainClassEnd,
        type: 'main' // Aula principal do curso
      },
      extensionClass: {
        dayOfWeek: classData.extensionClassDay,
        startTime: classData.extensionClassStart,
        endTime: classData.extensionClassEnd,
        type: 'extension', // Aula de reforço (português/matemática)
        subject: classData.extensionSubject // 'portugues' ou 'matematica'
      }
    },
    
    year: classData.year,
    semester: classData.semester,
    status: 'active',
    createdAt: new Date().toISOString(),
    students: [] // Será populado separadamente
  };
}

// FASE 2: ESTRUTURA MELHORADA DE ESTUDANTES
function createEnhancedStudent(studentData) {
  return {
    id: Date.now(),
    name: studentData.name,
    cpf: studentData.cpf, // CPF como RA para integração Protheus
    ra: studentData.cpf.replace(/\D/g, ''), // CPF limpo como RA
    
    // INFORMAÇÕES BÁSICAS
    personalInfo: {
      fullName: studentData.fullName,
      birthDate: studentData.birthDate || null,
      phone: studentData.phone || null,
      email: studentData.email || null,
      address: studentData.address || null
    },
    
    // VÍNCULO ACADÊMICO
    academic: {
      classId: studentData.classId,
      enrollmentDate: new Date().toISOString(),
      status: 'active', // 'active', 'dropout', 'transferred'
      dropoutDate: null,
      dropoutReason: null
    },
    
    // CONTROLE DE FREQUÊNCIA
    attendance: {
      totalClasses: 0,
      totalPresent: 0,
      totalAbsent: 0,
      totalJustified: 0,
      attendanceRate: 0,
      frequencyStatus: 'regular', // 'frequent', 'regular', 'attention'
      lastUpdate: new Date().toISOString()
    },
    
    createdAt: new Date().toISOString(),
    createdBy: studentData.createdBy
  };
}

// FASE 3: SISTEMA DE PERMISSÕES REFINADO
function checkEnhancedPermissions(action, resource, resourceData = null) {
  if (!currentUser) return false;
  
  const permissions = {
    admin: {
      canViewAllUnits: true,
      canCreateUsers: true,
      canCreateUnits: true,
      canCreateCourses: true,
      canCreateClasses: true,
      canViewAllReports: true,
      canDeleteStudents: true,
      canViewAnalytics: 'all'
    },
    instructor: {
      canViewAllUnits: false,
      canCreateUsers: false,
      canCreateUnits: false,
      canCreateCourses: false,
      canCreateClasses: false,
      canViewAllReports: false,
      canDeleteStudents: false,
      canViewAnalytics: 'unit',
      canAddStudents: true,
      canMarkAttendance: true,
      canViewOwnClasses: true
    },
    pedagogue: {
      canViewAllUnits: false,
      canCreateUsers: false,
      canCreateUnits: false,
      canCreateCourses: false,
      canCreateClasses: false,
      canViewAllReports: false,
      canDeleteStudents: false,
      canViewAnalytics: 'unit',
      canAddStudents: true,
      canMarkAttendance: true,
      canViewOwnClasses: true,
      canManageExtensionClasses: true
    },
    monitor: {
      canViewAllUnits: false,
      canCreateUsers: false,
      canCreateUnits: false,
      canCreateCourses: false,
      canCreateClasses: false,
      canViewAllReports: false,
      canDeleteStudents: false,
      canViewAnalytics: 'limited',
      canAddStudents: true,
      canMarkAttendance: true,
      canViewOwnClasses: true
    }
  };
  
  const userPermissions = permissions[currentUser.type];
  if (!userPermissions) return false;
  
  // Verificar permissão específica
  if (userPermissions[action] === true) return true;
  if (userPermissions[action] === false) return false;
  
  // Verificar permissões baseadas em unidade
  if (action === 'canViewAnalytics') {
    if (userPermissions.canViewAnalytics === 'all') return true;
    if (userPermissions.canViewAnalytics === 'unit' && resourceData && resourceData.unitId === currentUser.unitId) return true;
    if (userPermissions.canViewAnalytics === 'limited' && resourceData && resourceData.unitId === currentUser.unitId) return 'limited';
  }
  
  return false;
}

// FASE 4: NOVA FUNÇÃO DE CADASTRO DE TURMAS
function addEnhancedClass(event) {
  event.preventDefault();
  
  if (!checkEnhancedPermissions('canCreateClasses')) {
    showAlert("Apenas administradores podem criar turmas!", "error");
    return;
  }
  
  // Coletar dados do formulário melhorado
  const classData = {
    name: document.getElementById("className").value.trim(),
    unitId: parseInt(document.getElementById("classUnit").value),
    courseId: parseInt(document.getElementById("classCourse").value),
    
    // Dados da equipe
    instructorId: parseInt(document.getElementById("classInstructorId").value),
    instructorName: document.getElementById("classInstructorName").value.trim(),
    instructorEmail: document.getElementById("classInstructorEmail").value.trim(),
    
    monitorId: document.getElementById("classMonitorId").value ? parseInt(document.getElementById("classMonitorId").value) : null,
    monitorName: document.getElementById("classMonitorName").value.trim() || null,
    monitorEmail: document.getElementById("classMonitorEmail").value.trim() || null,
    
    pedagogueId: document.getElementById("classPedagogueId").value ? parseInt(document.getElementById("classPedagogueId").value) : null,
    pedagogueName: document.getElementById("classPedagogueName").value.trim() || null,
    pedagogueEmail: document.getElementById("classPedagogueEmail").value.trim() || null,
    
    // Dados da programação
    mainClassDay: document.getElementById("mainClassDay").value,
    mainClassStart: document.getElementById("mainClassStart").value,
    mainClassEnd: document.getElementById("mainClassEnd").value,
    
    extensionClassDay: document.getElementById("extensionClassDay").value,
    extensionClassStart: document.getElementById("extensionClassStart").value,
    extensionClassEnd: document.getElementById("extensionClassEnd").value,
    extensionSubject: document.getElementById("extensionSubject").value,
    
    year: parseInt(document.getElementById("classYear").value),
    semester: parseInt(document.getElementById("classSemester").value) || 1
  };
  
  // Validações
  if (!classData.name || !classData.unitId || !classData.courseId || !classData.instructorName) {
    showAlert("Preencha todos os campos obrigatórios!", "error");
    return;
  }
  
  // Verificar se já existe turma com mesmo nome
  const existingClass = classes.find(c => c.name === classData.name && c.unitId === classData.unitId);
  if (existingClass) {
    showAlert("Já existe uma turma com este nome nesta unidade!", "error");
    return;
  }
  
  // Criar turma melhorada
  const newClass = createEnhancedClass(classData);
  
  // Adicionar aos arrays
  classes.push(newClass);
  window.classes.push(newClass);
  
  // Salvar dados
  saveData();
  
  // Limpar formulário e recarregar
  document.getElementById("enhancedClassForm").reset();
  loadEnhancedClasses();
  
  showAlert("Turma criada com sucesso! Equipe configurada.", "success");
  
  console.log("✅ Turma melhorada criada:", newClass);
}

// FASE 5: NOVA FUNÇÃO DE CADASTRO DE ESTUDANTES
function addEnhancedStudent() {
  const classId = parseInt(document.getElementById("studentClass").value);
  const studentName = document.getElementById("studentName").value.trim();
  const studentCpf = document.getElementById("studentCpf").value.trim();
  const studentFullName = document.getElementById("studentFullName").value.trim();
  
  if (!classId || !studentName || !studentCpf) {
    showAlert("Preencha todos os campos obrigatórios!", "error");
    return;
  }
  
  // Verificar se professor tem acesso à turma
  const selectedClass = classes.find(cls => cls.id === classId);
  if (!selectedClass) {
    showAlert("Turma não encontrada!", "error");
    return;
  }
  
  // Verificar permissões
  if (currentUser.type !== 'admin') {
    const hasAccess = selectedClass.team.instructor.id === currentUser.id ||
                     selectedClass.team.monitor?.id === currentUser.id ||
                     selectedClass.team.pedagogue?.id === currentUser.id;
    
    if (!hasAccess) {
      showAlert("Você só pode adicionar alunos às suas turmas!", "error");
      return;
    }
  }
  
  // Verificar se CPF já existe
  const existingStudent = students.find(s => s.cpf === studentCpf);
  if (existingStudent) {
    showAlert("Já existe um aluno com este CPF!", "error");
    return;
  }
  
  // Criar estudante melhorado
  const newStudent = createEnhancedStudent({
    name: studentName,
    fullName: studentFullName,
    cpf: formatCPF(studentCpf),
    classId: classId,
    createdBy: currentUser.id
  });
  
  // Adicionar aos arrays
  students.push(newStudent);
  window.students.push(newStudent);
  
  // Salvar dados
  saveData();
  
  // Limpar campos
  document.getElementById("studentName").value = "";
  document.getElementById("studentCpf").value = "";
  document.getElementById("studentFullName").value = "";
  
  // Recarregar interface
  loadEnhancedClasses();
  updateStudentCounts();
  
  showAlert(`Aluno ${studentName} adicionado com sucesso! RA: ${newStudent.ra}`, "success");
  
  console.log("✅ Estudante melhorado criado:", newStudent);
}

// FASE 6: CÁLCULO DE STATUS DE FREQUÊNCIA
function calculateFrequencyStatus(student) {
  if (student.attendance.totalClasses === 0) return 'regular';
  
  const attendanceRate = student.attendance.attendanceRate;
  
  if (attendanceRate >= 90) return 'frequent';
  if (attendanceRate >= 75) return 'regular';
  return 'attention';
}

// FASE 7: FUNÇÃO PARA ATUALIZAR CONTADORES
function updateStudentCounts() {
  classes.forEach(cls => {
    const classStudents = students.filter(s => s.classId === cls.id && s.academic.status === 'active');
    cls.studentCount = classStudents.length;
  });
}

// FASE 8: CARREGAR TURMAS MELHORADAS
function loadEnhancedClasses() {
  // Sincronizar dados
  syncDataArrays();
  
  const tbody = document.getElementById("classesTableBody");
  if (!tbody) return;
  
  tbody.innerHTML = "";
  
  // Filtrar turmas baseado em permissões
  let filteredClasses = classes;
  
  if (currentUser.type !== 'admin') {
    // Para não-admin, mostrar apenas turmas onde o usuário é membro da equipe
    filteredClasses = classes.filter(cls => {
      if (!cls.team) return false; // Turmas antigas sem estrutura de equipe
      
      return cls.team.instructor?.id === currentUser.id ||
             cls.team.monitor?.id === currentUser.id ||
             cls.team.pedagogue?.id === currentUser.id;
    });
  }
  
  filteredClasses.forEach(cls => {
    const unit = units.find(u => u.id === cls.unitId);
    const course = courses.find(c => c.id === cls.courseId);
    const classStudents = students.filter(s => s.classId === cls.id && s.academic.status === 'active');
    
    // Contar estudantes por status de frequência
    const frequentStudents = classStudents.filter(s => s.attendance.frequencyStatus === 'frequent').length;
    const regularStudents = classStudents.filter(s => s.attendance.frequencyStatus === 'regular').length;
    const attentionStudents = classStudents.filter(s => s.attendance.frequencyStatus === 'attention').length;
    
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div style="font-weight: 600; margin-bottom: 4px;">${cls.name}</div>
        <div style="color: #64748b; font-size: 0.85rem;">
          ${course ? course.name : 'Curso não encontrado'}
        </div>
      </td>
      <td>
        <div style="font-weight: 500;">${unit ? unit.name : 'N/A'}</div>
      </td>
      <td>
        <div style="margin-bottom: 8px;">
          <div><strong>Instrutor:</strong> ${cls.team?.instructor?.name || cls.instructor || 'N/A'}</div>
          ${cls.team?.monitor?.name ? `<div><strong>Monitor:</strong> ${cls.team.monitor.name}</div>` : ''}
          ${cls.team?.pedagogue?.name ? `<div><strong>Pedagoga:</strong> ${cls.team.pedagogue.name}</div>` : ''}
        </div>
      </td>
      <td>${cls.year}</td>
      <td>
        <div style="margin-bottom: 8px;">
          <strong>${classStudents.length}</strong> estudante(s)
        </div>
        <div style="font-size: 0.8rem; color: #64748b;">
          <span style="color: #48bb78;">●</span> ${frequentStudents} Frequentes
          <span style="color: #ed8936;">●</span> ${regularStudents} Regulares  
          <span style="color: #f56565;">●</span> ${attentionStudents} Atenção
        </div>
      </td>
      <td>
        <button class="btn" onclick="viewEnhancedStudents(${cls.id})" style="padding: 6px 12px; margin-right: 5px; font-size: 12px;">
          <i class="fas fa-eye"></i> Ver Alunos
        </button>
        ${currentUser.type === 'admin' && cls.canDelete ? `
          <button class="btn btn-danger" onclick="deleteClass(${cls.id})" style="padding: 6px 12px; font-size: 12px;">
            <i class="fas fa-trash"></i> Excluir
          </button>
        ` : ''}
      </td>
    `;
    tbody.appendChild(row);
  });
  
  // Atualizar dropdown de turmas para adição de estudantes
  updateStudentClassOptions();
}

// FASE 9: VER ESTUDANTES MELHORADO
function viewEnhancedStudents(classId) {
  const selectedClass = classes.find(cls => cls.id === classId);
  if (!selectedClass) return;
  
  const classStudents = students.filter(s => s.classId === classId);
  
  if (classStudents.length === 0) {
    alert(`A turma "${selectedClass.name}" não possui estudantes cadastrados.`);
    return;
  }
  
  let studentsList = classStudents.map(student => {
    const statusIcon = {
      'frequent': '🟢',
      'regular': '🟡', 
      'attention': '🔴'
    }[student.attendance.frequencyStatus];
    
    const statusText = {
      'frequent': 'Frequente',
      'regular': 'Regular',
      'attention': 'Atenção'
    }[student.attendance.frequencyStatus];
    
    return `${statusIcon} ${student.name} (RA: ${student.ra}) - ${statusText} - ${student.attendance.attendanceRate}%`;
  }).join('\n');
  
  alert(`Estudantes da turma "${selectedClass.name}":\n\n${studentsList}`);
}

// FUNÇÕES AUXILIARES PARA OS FORMULÁRIOS

// Preencher dados do professor quando selecionado
function fillInstructorData() {
  const instructorId = document.getElementById("classInstructorId").value;
  const instructorName = document.getElementById("classInstructorName");
  const instructorEmail = document.getElementById("classInstructorEmail");
  
  if (instructorId) {
    const instructor = users.find(u => u.id == instructorId);
    if (instructor) {
      instructorName.value = instructor.name;
      instructorEmail.value = instructor.email;
    }
  } else {
    instructorName.value = "";
    instructorEmail.value = "";
  }
}

// Preencher dados do monitor quando selecionado
function fillMonitorData() {
  const monitorId = document.getElementById("classMonitorId").value;
  const monitorName = document.getElementById("classMonitorName");
  const monitorEmail = document.getElementById("classMonitorEmail");
  
  if (monitorId) {
    const monitor = users.find(u => u.id == monitorId);
    if (monitor) {
      monitorName.value = monitor.name;
      monitorEmail.value = monitor.email;
    }
  } else {
    monitorName.value = "";
    monitorEmail.value = "";
  }
}

// Preencher dados da pedagoga quando selecionada
function fillPedagogueData() {
  const pedagogueId = document.getElementById("classPedagogueId").value;
  const pedagogueName = document.getElementById("classPedagogueName");
  const pedagogueEmail = document.getElementById("classPedagogueEmail");
  
  if (pedagogueId) {
    const pedagogue = users.find(u => u.id == pedagogueId);
    if (pedagogue) {
      pedagogueName.value = pedagogue.name;
      pedagogueEmail.value = pedagogue.email;
    }
  } else {
    pedagogueName.value = "";
    pedagogueEmail.value = "";
  }
}

// Carregar usuários nos dropdowns da equipe
function loadTeamMembersOptions() {
  syncDataArrays();
  
  const instructorSelect = document.getElementById("classInstructorId");
  const monitorSelect = document.getElementById("classMonitorId");
  const pedagogueSelect = document.getElementById("classPedagogueId");
  
  if (instructorSelect) {
    instructorSelect.innerHTML = '<option value="">Selecione um professor...</option>';
    const instructors = users.filter(u => u.type === 'instructor' && u.status === 'active');
    instructors.forEach(instructor => {
      const option = document.createElement("option");
      option.value = instructor.id;
      option.textContent = instructor.name;
      instructorSelect.appendChild(option);
    });
  }
  
  if (monitorSelect) {
    monitorSelect.innerHTML = '<option value="">Selecione um monitor...</option>';
    const monitors = users.filter(u => u.type === 'monitor' && u.status === 'active');
    monitors.forEach(monitor => {
      const option = document.createElement("option");
      option.value = monitor.id;
      option.textContent = monitor.name;
      monitorSelect.appendChild(option);
    });
  }
  
  if (pedagogueSelect) {
    pedagogueSelect.innerHTML = '<option value="">Selecione uma pedagoga...</option>';
    const pedagogues = users.filter(u => u.type === 'pedagogue' && u.status === 'active');
    pedagogues.forEach(pedagogue => {
      const option = document.createElement("option");
      option.value = pedagogue.id;
      option.textContent = pedagogue.name;
      pedagogueSelect.appendChild(option);
    });
  }
}

// Máscara para CPF
function applyCPFMask() {
  const cpfInput = document.getElementById("studentCpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", function(e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 11) value = value.substr(0, 11);
      
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      
      e.target.value = value;
    });
  }
}

// Integrar com o sistema existente
function enhancedSystemIntegration() {
  // Substituir função de carregamento de turmas
  if (typeof window.loadClasses === 'function') {
    const originalLoadClasses = window.loadClasses;
    window.loadClasses = function() {
      loadTeamMembersOptions();
      applyCPFMask();
      return loadEnhancedClasses();
    };
  }
}

// Inicializar quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    enhancedSystemIntegration();
    loadTeamMembersOptions();
    applyCPFMask();
    console.log("✅ Sistema melhorado integrado");
  }, 1000);
});

// Exportar funções para uso global
window.addEnhancedClass = addEnhancedClass;
window.addEnhancedStudent = addEnhancedStudent;
window.loadEnhancedClasses = loadEnhancedClasses;
window.viewEnhancedStudents = viewEnhancedStudents;
window.updateStudentCounts = updateStudentCounts;
window.calculateFrequencyStatus = calculateFrequencyStatus;
window.checkEnhancedPermissions = checkEnhancedPermissions;
window.fillInstructorData = fillInstructorData;
window.fillMonitorData = fillMonitorData;
window.fillPedagogueData = fillPedagogueData;
window.loadTeamMembersOptions = loadTeamMembersOptions;