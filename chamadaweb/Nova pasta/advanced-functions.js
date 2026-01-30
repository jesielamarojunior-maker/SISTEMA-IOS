// =======================
// UNIDADES E CURSOS IOS
// =======================
const UNIDADES_IOS = [
  {
    id: "rs-porto-alegre-renner",
    nome: "RS - Porto Alegre",
    projeto: "RENNER",
    endereco: "Sem informações",
    telefone: "Sem informações",
    estado: "RS",
    cidade: "Porto Alegre",
  },
  {
    id: "bh-barreiro",
    nome: "BH - Barreiro",
    projeto: "FMDCA - Quebrada Tech",
    endereco:
      "PUC Barreiro Av. Afonso Vaz de Melo, 1200 - Prédio 2, laboratório 318 - Barreiro, Belo Horizonte - MG, 30640-070",
    telefone: "11 2503-2617 | 31 9719-9538",
    estado: "MG",
    cidade: "Belo Horizonte",
  },
  {
    id: "bh-sao-gabriel",
    nome: "BH - São Gabriel",
    projeto: "FMCDCA - Jovens no topo",
    endereco:
      "PUC São Gabriel Rua Walter Ianni, 255 - Bloco E, laboratório 105 - São Gabriel, Belo Horizonte - MG, 31980-110",
    telefone: "11 2503-2617 | 31 99705-9270",
    estado: "MG",
    cidade: "Belo Horizonte",
  },
  {
    id: "pe-recife",
    nome: "PE - Recife",
    projeto: "LOCALIZA",
    endereco:
      "UNICAP R. do Príncipe, 526 - Bloco G, Sala 704 - Boa Vista, Recife - PE, 50050-900",
    telefone: "11 2503-2617 | 81 8147-7179",
    estado: "PE",
    cidade: "Recife",
  },
  {
    id: "rs-porto-alegre-dell",
    nome: "RS - Porto Alegre",
    projeto: "DELL",
    endereco:
      "PUCRS Av. Ipiranga, 6681 - Prédio 2 (Fundação Fijo) - Partenon, Porto Alegre - RS, 90610-001",
    telefone: "11 2503-2617 | 51 9719-1029",
    estado: "RS",
    cidade: "Porto Alegre",
  },
  {
    id: "sp-hortolandia",
    nome: "SP - Hortolândia",
    projeto: "Dell",
    endereco:
      "ADRA – Núcleo Vinde a Mim R. do Canário, 308 - Jardim Boa Esperança, Hortolândia - SP, 13183-363",
    telefone: "11 2503-2617 | 19 99927-3112",
    estado: "SP",
    cidade: "Hortolândia",
  },
  {
    id: "sp-itaquera",
    nome: "SP - Itaquera",
    projeto: "Sem projeto",
    endereco:
      "Obra Social Dom Bosco R. Álvaro de Mendonça, 456 - Vila Brasil, São Paulo - SP, 08215-290",
    telefone: "11 2056-3668 | 11 99592-0836",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "sp-santo-amaro",
    nome: "SP - Santo Amaro",
    projeto: "FUMCAD + Dell",
    endereco:
      "Rua Barão de Duprat, 318 - Sobreloja - Santo Amaro, Cep: 04743-060",
    telefone: "11 2503-2617",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "sp-sede-santana",
    nome: "SP - Sede Santana",
    projeto: "Múltiplos Projetos",
    endereco:
      "Sede do IOS Av. Gen. Ataliba Leonel, 245 - Santana, São Paulo - SP, 02033-000",
    telefone: "11 2503-2617 | 11 97343-9010",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "sp-jardim-angela",
    nome: "SP - Jardim Ângela",
    projeto: "Sem projeto",
    endereco:
      "Sociedade Santos Mártires R. Luís Baldinato, 9 - Jardim Angela, São Paulo - SP, 04935-100",
    telefone: "11 2503-2617 | 11 94351-6075",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "sp-paraisopolis",
    nome: "SP - Paraisópolis",
    projeto: "PECP",
    endereco: "Sem informações",
    telefone: "Sem informações",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "sp-barueri",
    nome: "SP - Barueri",
    projeto: "CONDECA",
    endereco:
      "CEB – Comunidade Evangélica Barueri Av.Brigadeiro Manoel Rodrigues Jordão, 1800, Jardim Silveira - SP, 06433-010",
    telefone: "11 2503-2617 | 11 94372-3683",
    estado: "SP",
    cidade: "Barueri",
  },
  {
    id: "sp-sao-mateus",
    nome: "SP - São Mateus",
    projeto: "FUMCAD",
    endereco:
      "Comunidade da Graça R. Forte do Rio Branco, 854 - Parque São Lourenço, São Paulo - SP, 08340-140",
    telefone: "11 2503-2617 | 11 94153-1255",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "sp-vila-dionisia",
    nome: "SP - Vila Dionísia",
    projeto: "FUMCAD",
    endereco:
      "Instituto Resgatando Vidas - Rede Gerando Falcões Rua Augusto Gil, 465 - Vila Dionisia, São Paulo - SP, 02670-070",
    telefone: "11 2503-2617 | 11 95555-1742",
    estado: "SP",
    cidade: "São Paulo",
  },
  {
    id: "material-generico",
    nome: "01 - Material Genérico",
    projeto: "genérico",
    endereco: "Material Genérico",
    telefone: "Material Genérico",
    estado: "GENERICO",
    cidade: "Genérico",
  },
];

const CURSOS_IOS = [
  {
    id: "zendesk",
    nome: "Zendesk",
    tipoCurso: "TI",
    categoria: "Suporte",
    descricao: "Plataforma de atendimento ao cliente",
  },
  {
    id: "gestao-empresarial-erp",
    nome: "Gestão Empresarial com ERP",
    tipoCurso: "Extensão",
    categoria: "Gestão",
    descricao: "Gestão empresarial utilizando sistemas ERP",
  },
  {
    id: "programacao-web",
    nome: "Programação Web",
    tipoCurso: "TI",
    categoria: "Desenvolvimento",
    descricao: "Desenvolvimento de aplicações web",
  },
  {
    id: "suporte-ti",
    nome: "Suporte TI",
    tipoCurso: "TI",
    categoria: "Suporte",
    descricao: "Suporte técnico em tecnologia da informação",
  },
  {
    id: "protheus-contabil",
    nome: "TOTVS Protheus Contábil: Instalação e Configuração",
    tipoCurso: "TI",
    categoria: "ERP",
    descricao: "Instalação e configuração do sistema Protheus Contábil",
  },
  {
    id: "office-zendesk",
    nome: "Office com Suporte Zendesk",
    tipoCurso: "Extensão",
    categoria: "Office",
    descricao: "Pacote Office integrado com Zendesk",
  },
  {
    id: "power-bi",
    nome: "Power BI",
    tipoCurso: "TI",
    categoria: "Business Intelligence",
    descricao: "Análise de dados e Business Intelligence",
  },
];

// =======================
// INICIALIZAÇÃO AUTOMÁTICA
// =======================
function initializeData() {
  // Verificar unidades e cursos pré-cadastrados
  if (!window.units || window.units.length === 0) {
    window.units = UNIDADES_IOS.map((unidade) => ({
      id: unidade.id,
      name: unidade.nome,
      address: unidade.endereco,
      phone: unidade.telefone,
      project: unidade.projeto,
      state: unidade.estado,
      city: unidade.cidade,
      status: "active",
    }));
    console.log("✅ Unidades IOS inicializadas:", window.units.length);
  }

  if (!window.courses || window.courses.length === 0) {
    window.courses = CURSOS_IOS.map((curso) => ({
      id: curso.id,
      name: curso.nome,
      tipoCurso: curso.tipoCurso,
      category: curso.categoria,
      description: curso.descricao,
      status: "active",
      duration: 0,
      unitId: "material-generico",
    }));
    console.log("✅ Cursos IOS inicializados:", window.courses.length);
  }

  // Salvar os dados
  if (window.saveData) window.saveData();
}

// =======================
// DROPDOWNS AUTOMÁTICOS
// =======================
function loadUnitsDropdown(selectId = "classUnit") {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = '<option value="">Selecione...</option>';
  window.units.forEach((unit) => {
    select.innerHTML += `<option value="${unit.id}">${unit.name}</option>`;
  });
}

function loadCoursesDropdown(selectId = "classCourse") {
  const select = document.getElementById(selectId);
  if (!select) return;
  select.innerHTML = '<option value="">Selecione um curso...</option>';

  const tiCourses = window.courses.filter((c) => c.tipoCurso === "TI");
  const extensaoCourses = window.courses.filter((c) => c.tipoCurso === "Extensão");

  if (tiCourses.length > 0) {
    select.innerHTML += '<optgroup label="Cursos de TI">';
    tiCourses.forEach((course) => {
      select.innerHTML += `<option value="${course.id}">${course.name}</option>`;
    });
    select.innerHTML += "</optgroup>";
  }

  if (extensaoCourses.length > 0) {
    select.innerHTML += '<optgroup label="Cursos de Extensão">';
    extensaoCourses.forEach((course) => {
      select.innerHTML += `<option value="${course.id}">${course.name}</option>`;
    });
    select.innerHTML += "</optgroup>";
  }
}

// =======================
// CICLO AUTOMÁTICO
// =======================
function getCurrentCycle() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const semester = month <= 6 ? "01" : "02";
  return `${semester}/${year}`;
}

// Inicializar dados quando o arquivo carrega
document.addEventListener("DOMContentLoaded", function () {
  initializeData();
  loadUnitsDropdown("classUnit");
  loadCoursesDropdown("classCourse");

  // **Povoar tabelas de Unidades e Cursos ao iniciar**
  if (typeof loadUnits === 'function') loadUnits();
  if (typeof loadCourses === 'function') loadCourses();

  // Garantir carregamento dos dados
  setTimeout(() => {
    if (window.loadData) {
      window.loadData();
    }
    ensureDataLoaded();
  }, 500);

  // Adicionar máscara de CPF
  document.addEventListener("input", function (e) {
    if (e.target.id === "studentCpf" || e.target.id === "userCpf") {
      let value = e.target.value.replace(/[^\d]/g, "");
      if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        e.target.value = value;
      }
    }
  });

  // Definir data padrão como hoje
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("attendanceDate");
  if (dateInput && !dateInput.value) {
    dateInput.value = today;
  }
});

// =======================
// FUNÇÕES DE TURMAS APRIMORADAS
// =======================
function loadClasses() {
  updateClassUnitOptions();
  updateStudentClassOptions();
  updateAttendanceClassOptions();

  const tbody = document.getElementById("classesTableBody");
  tbody.innerHTML = "";

  // Filtrar turmas por unidade se não for admin
  let filteredClasses = classes;
  if (currentUser.type !== "admin" && currentUser.unitId) {
    filteredClasses = classes.filter(
      (cls) => cls.unitId === currentUser.unitId
    );
  }

  filteredClasses.forEach((cls) => {
    const unit = units.find((u) => u.id === cls.unitId);
    const course = courses.find((c) => c.id === cls.courseId);
    const classStudents = students.filter(
      (s) => s.classId === cls.id && s.status === "active"
    );
    const row = document.createElement("tr");

    const canDelete =
      cls.canDelete &&
      (currentUser.type === "admin" || classStudents.length === 0);

    row.innerHTML = `
      <td>
        <div style="font-weight: 600;">${cls.name}</div>
        <div style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">
          ${course ? course.name : "Curso não encontrado"}
        </div>
      </td>
      <td>${unit ? unit.name : "N/A"}</td>
      <td>${cls.instructor}</td>
      <td>${cls.year}</td>
      <td>${classStudents.length} estudante(s)</td>
      <td>
        <button class="btn" onclick="viewStudents(${cls.id
      })" style="padding: 6px 12px; margin-right: 5px;">
          <i class="fas fa-eye"></i> Ver Estudantes
        </button>
        ${canDelete
        ? `
          <button class="btn btn-danger" onclick="deleteClass(${cls.id})" style="padding: 6px 12px;">
            <i class="fas fa-trash"></i> Excluir
          </button>
        `
        : ""
      }
      </td>
    `;
    tbody.appendChild(row);
  });
}

function updateClassUnitOptions() {
  const select = document.getElementById("classUnit");
  select.innerHTML = '<option value="">Selecione...</option>';

  let availableUnits = units;
  if (currentUser.type !== "admin" && currentUser.unitId) {
    availableUnits = units.filter((u) => u.id === currentUser.unitId);
  }

  availableUnits.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });
}

function updateStudentClassOptions() {
  const select = document.getElementById("studentClass");
  select.innerHTML = '<option value="">Selecione uma turma</option>';

  let availableClasses = classes;
  if (currentUser.type !== "admin" && currentUser.unitId) {
    availableClasses = classes.filter((c) => c.unitId === currentUser.unitId);
  }

  availableClasses.forEach((cls) => {
    const option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    select.appendChild(option);
  });
}

function updateAttendanceClassOptions() {
  const select = document.getElementById("attendanceClass");
  select.innerHTML = '<option value="">Selecione uma turma</option>';

  let availableClasses = classes;
  if (currentUser.type !== "admin" && currentUser.unitId) {
    availableClasses = classes.filter((c) => c.unitId === currentUser.unitId);
  }

  availableClasses.forEach((cls) => {
    const option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    select.appendChild(option);
  });
}

function addClass(event) {
  event.preventDefault();

  const name = document.getElementById("className").value;
  const unitId = parseInt(document.getElementById("classUnit").value);
  const courseId = parseInt(document.getElementById("classCourse").value);
  const instructor = document.getElementById("classInstructor").value;
  const year = parseInt(document.getElementById("classYear").value);
  const ciclo = document.getElementById("classCiclo").value;

  // Verificar permissão de unidade
  if (!checkUnitAccess(unitId)) {
    showAlert("Você só pode criar turmas na sua unidade!", "error");
    return;
  }

  if (!courseId) {
    showAlert("Selecione um curso!", "error");
    return;
  }

  const newClass = {
    id: Date.now(),
    name,
    unitId,
    courseId,
    instructor,
    year,
    ciclo,
    students: [],
    createdAt: new Date().toISOString(),
    canDelete: true,
  };

  classes.push(newClass);
  if (window.saveData) window.saveData(); // Salvar automaticamente
  document.getElementById("classForm").reset();
  loadClasses();
  showAlert("Turma cadastrada com sucesso!", "success");
}

function addStudent() {
  const classId = parseInt(document.getElementById("studentClass").value);
  const studentName = document.getElementById("studentName").value.trim();
  const studentCpf = document.getElementById("studentCpf").value.trim();

  if (!classId || !studentName || !studentCpf) {
    showAlert("Selecione uma turma e preencha todos os campos!", "error");
    return;
  }

  // Validar CPF
  if (!validateCPF(studentCpf)) {
    showAlert("CPF inválido! Verifique o número digitado.", "error");
    return;
  }

  // Verificar permissão de unidade
  const selectedClass = classes.find((cls) => cls.id === classId);
  if (!selectedClass) {
    showAlert("Turma não encontrada!", "error");
    return;
  }

  if (!checkUnitAccess(selectedClass.unitId)) {
    showAlert(
      "Você só pode adicionar estudantes em turmas da sua unidade!",
      "error"
    );
    return;
  }

  // Verificar CPF único
  const formattedCpf = formatCPF(studentCpf);
  if (students.find((s) => s.cpf === formattedCpf)) {
    showAlert("CPF já cadastrado no sistema!", "error");
    return;
  }

  const newStudent = {
    id: Date.now(),
    name: studentName,
    classId: classId,
    unitId: selectedClass.unitId,
    cpf: formattedCpf,
    status: "active",
    enrollmentDate: new Date().toISOString(),
  };

  students.push(newStudent);
  selectedClass.canDelete = false;
  if (window.saveData) window.saveData(); // Salvar automaticamente

  document.getElementById("studentName").value = "";
  document.getElementById("studentCpf").value = "";
  loadClasses();
  updateDashboardStats();
  showAlert("Estudante adicionado com sucesso!", "success");
}

function deleteClass(classId) {
  if (!confirm("Tem certeza que deseja excluir esta turma?")) {
    return;
  }

  const classToDelete = classes.find((c) => c.id === classId);
  if (!classToDelete) return;

  if (!checkUnitAccess(classToDelete.unitId)) {
    showAlert("Você só pode excluir turmas da sua unidade!", "error");
    return;
  }

  const classStudents = students.filter((s) => s.classId === classId);
  if (classStudents.length > 0 && currentUser.type !== "admin") {
    showAlert(
      "Não é possível excluir turma com estudantes cadastrados!",
      "error"
    );
    return;
  }

  classes = classes.filter((cls) => cls.id !== classId);
  students = students.filter((s) => s.classId !== classId);

  loadClasses();
  showAlert("Turma excluída com sucesso!", "success");
}

function viewStudents(classId) {
  const selectedClass = classes.find((cls) => cls.id === classId);
  if (!selectedClass) return;

  const classStudents = students.filter(
    (s) => s.classId === classId && s.status === "active"
  );
  const studentsList =
    classStudents.length > 0
      ? classStudents.map((s) => s.name).join("\n• ")
      : "Nenhum estudante cadastrado";

  alert(`Estudantes da turma ${selectedClass.name}:\n\n• ${studentsList}`);
}

// Funções de Presença Aprimoradas
function loadAttendancePage() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("attendanceDate").value = today;
  updateAttendanceClassOptions();
}

function loadAttendanceStudents() {
  const classId = document.getElementById("attendanceClass").value;
  const attendanceDate = document.getElementById("attendanceDate").value;

  if (!classId || !attendanceDate) {
    document.getElementById("attendanceStudents").innerHTML =
      '<div class="alert alert-info">Selecione uma turma e data para começar o registro de presença.</div>';
    return;
  }

  // Filtrar apenas alunos ativos da turma
  const classStudents = students.filter(
    (s) =>
      s.classId === classId &&
      (currentUser.role === "admin" || s.unitId === currentUser.unitId) &&
      s.status === "active"
  );

  if (classStudents.length === 0) {
    document.getElementById("attendanceStudents").innerHTML =
      '<div class="alert alert-warning">Nenhum aluno ativo encontrado nesta turma.</div>';
    return;
  }

  const attendanceKey = `${classId}-${attendanceDate}`;
  const existingAttendance = attendance[attendanceKey] || {};

  let html = `
        <div class="attendance-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h4><i class="fas fa-clipboard-list"></i> Lista de Chamada - ${new Date(
    attendanceDate
  ).toLocaleDateString("pt-BR")}</h4>
            <div class="course-info" style="margin-top: 10px;">
                <span class="badge" style="background: rgba(255,255,255,0.2); margin-right: 10px;">
                    Turma: ${getClassName(classId)}
                </span>
                <span class="badge" style="background: rgba(255,255,255,0.2); margin-right: 10px;">
                    Curso: ${getClassCourse(classId)}
                </span>
                <span class="badge" style="background: rgba(255,255,255,0.2);">
                    Ciclo: ${getClassCycle(classId)}
                </span>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="table table-striped">
                <thead style="background: #f8f9fa;">
                    <tr>
                        <th width="30%">Aluno</th>
                        <th width="15%">Presença</th>
                        <th width="20%">Motivo da Falta</th>
                        <th width="15%">Atestado</th>
                        <th width="20%">Observações</th>
                    </tr>
                </thead>
                <tbody>
    `;

  classStudents.forEach((student) => {
    const studentAttendance = existingAttendance[student.id] || {
      presente: true,
      justificada: false,
      motivo: null,
      anexo: null,
      observacao: "",
    };

    html += `
            <tr>
                <td>
                    <div style="display: flex; align-items: center;">
                        <div class="user-avatar" style="width: 40px; height: 40px; margin-right: 10px; background: linear-gradient(135deg, #4CAF50, #45a049); display: flex; align-items: center; justify-content: center; border-radius: 50%; color: white; font-weight: bold;">
                            ${student.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <strong>${student.name}</strong><br>
                            <small class="text-muted">CPF: ${student.cpf || "N/A"
      }</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="form-check form-switch">
                        <input class="form-check-input attendance-checkbox" 
                               type="checkbox" 
                               data-student-id="${student.id}"
                               ${studentAttendance.presente ? "checked" : ""}
                               style="transform: scale(1.5);">
                        <label class="form-check-label attendance-label" data-student-id="${student.id
      }" style="margin-left: 10px; font-weight: 500;">
                            ${studentAttendance.presente
        ? "✅ Presente"
        : "❌ Ausente"
      }
                        </label>
                    </div>
                </td>
                <td>
                    <select class="form-select motivo-select" 
                            data-student-id="${student.id}"
                            ${studentAttendance.presente ? "disabled" : ""}>
                        <option value="">Selecione...</option>
                        <option value="doenca" ${studentAttendance.motivo === "doenca"
        ? "selected"
        : ""
      }>Doença</option>
                        <option value="atestado" ${studentAttendance.motivo === "atestado"
        ? "selected"
        : ""
      }>Atestado Médico</option>
                        <option value="trabalho" ${studentAttendance.motivo === "trabalho"
        ? "selected"
        : ""
      }>Trabalho</option>
                        <option value="pessoal" ${studentAttendance.motivo === "pessoal"
        ? "selected"
        : ""
      }>Motivo Pessoal</option>
                        <option value="outros" ${studentAttendance.motivo === "outros"
        ? "selected"
        : ""
      }>Outros</option>
                    </select>
                </td>
                <td>
                    <input type="file" 
                           class="form-control form-control-sm anexo-input" 
                           data-student-id="${student.id}"
                           accept=".pdf,.jpg,.jpeg,.png"
                           ${studentAttendance.presente ? "disabled" : ""}>
                    ${studentAttendance.anexo
        ? `<small class="text-success"><i class="fas fa-check"></i> Anexado</small>`
        : ""
      }
                </td>
                <td>
                    <textarea class="form-control observacao-textarea" 
                              data-student-id="${student.id}" 
                              rows="2" 
                              placeholder="Observações...">${studentAttendance.observacao || ""
      }</textarea>
                </td>
            </tr>
        `;
  });

  html += `
            </tbody>
        </table>
    </div>
    
    <div class="mt-3" style="display: flex; gap: 10px; justify-content: space-between; align-items: center;">
        <div>
            <button type="button" class="btn btn-outline-success" onclick="marcarTodosPresentes()">
                <i class="fas fa-check-double"></i> Marcar Todos Presentes
            </button>
            <button type="button" class="btn btn-outline-warning" onclick="limparChamada()">
                <i class="fas fa-eraser"></i> Limpar Chamada
            </button>
        </div>
        <div>
            <strong>Total de alunos: ${classStudents.length}</strong>
        </div>
    </div>
    `;

  document.getElementById("attendanceStudents").innerHTML = html;
  setupAttendanceEvents();
}

function setupAttendanceEvents() {
  // Toggle presente/ausente
  document.querySelectorAll(".attendance-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const studentId = this.dataset.studentId;
      const isPresent = this.checked;
      const label = document.querySelector(
        `.attendance-label[data-student-id="${studentId}"]`
      );
      const motivoSelect = document.querySelector(
        `.motivo-select[data-student-id="${studentId}"]`
      );
      const anexoInput = document.querySelector(
        `.anexo-input[data-student-id="${studentId}"]`
      );

      label.innerHTML = isPresent ? "✅ Presente" : "❌ Ausente";
      label.style.color = isPresent ? "#28a745" : "#dc3545";
      motivoSelect.disabled = isPresent;
      anexoInput.disabled = isPresent;

      if (isPresent) {
        motivoSelect.value = "";
      }
    });
  });
}

function marcarTodosPresentes() {
  document.querySelectorAll(".attendance-checkbox").forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change"));
  });
}

function limparChamada() {
  if (confirm("Tem certeza que deseja limpar toda a chamada?")) {
    document.querySelectorAll(".attendance-checkbox").forEach((checkbox) => {
      checkbox.checked = true;
      checkbox.dispatchEvent(new Event("change"));
    });
    document.querySelectorAll(".observacao-textarea").forEach((textarea) => {
      textarea.value = "";
    });
  }
}

// ===== EXPORTAÇÃO DE LISTA DE CHAMADA =====
function exportAttendanceSheet() {
  const classId = document.getElementById("attendanceClass").value;
  const attendanceDate = document.getElementById("attendanceDate").value;

  if (!classId || !attendanceDate) {
    showAlert("Selecione uma turma e data primeiro!", "error");
    return;
  }

  const classStudents = students.filter(
    (s) =>
      s.classId === classId &&
      (currentUser.role === "admin" || s.unitId === currentUser.unitId) &&
      s.status === "active"
  );

  if (classStudents.length === 0) {
    showAlert("Nenhum aluno encontrado!", "error");
    return;
  }

  // Preparar dados para Excel
  const worksheetData = [
    ["INSTITUTO DA OPORTUNIDADE SOCIAL"],
    ["LISTA DE CHAMADA"],
    [""],
    [`Turma: ${getClassName(classId)}`],
    [`Curso: ${getClassCourse(classId)}`],
    [`Ciclo: ${getClassCycle(classId)}`],
    [`Data: ${new Date(attendanceDate).toLocaleDateString("pt-BR")}`],
    [""],
    ["Nome do Aluno", "CPF", "Presente", "Motivo da Falta", "Observações"],
  ];

  classStudents.forEach((student) => {
    worksheetData.push([student.name, student.cpf || "", "[ ]", "", ""]);
  });

  // Criar e exportar Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);

  // Estilizar cabeçalho
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } },
  ];

  XLSX.utils.book_append_sheet(wb, ws, "Lista de Chamada");

  const fileName = `Lista_Chamada_${getClassName(
    classId
  )}_${attendanceDate}.xlsx`;
  XLSX.writeFile(wb, fileName);

  showAlert("Lista de chamada exportada com sucesso!", "success");
}

// ===== OVERRIDE DA FUNÇÃO ADDSTUDDENT PARA INCLUIR CPF =====
const originalAddStudent = window.addStudent;
window.addStudent = function () {
  const studentName = document.getElementById("studentName").value.trim();
  const studentCpf = document.getElementById("studentCpf").value.trim();
  const classId = document.getElementById("studentClass").value;

  if (!studentName || !studentCpf || !classId) {
    showAlert("Preencha todos os campos!", "error");
    return;
  }

  // Validar CPF
  if (!validateCPF(studentCpf)) {
    showAlert("CPF inválido! Verifique o número digitado.", "error");
    return;
  }

  // Verificar CPF único
  const formattedCpf = formatCPF(studentCpf);
  if (students.some((s) => s.cpf === formattedCpf)) {
    showAlert("CPF já cadastrado no sistema!", "error");
    return;
  }

  const student = {
    id: Date.now().toString(),
    name: studentName,
    classId: classId,
    unitId: currentUser.unitId,
    cpf: formattedCpf,
    status: "active",
    dropoutReason: "",
    dropoutDate: "",
  };

  students.push(student);
  if (window.saveData) window.saveData();

  // Limpar campos
  document.getElementById("studentName").value = "";
  document.getElementById("studentCpf").value = "";

  loadClasses();
  showAlert("Estudante adicionado com sucesso!", "success");
};

// ===== VALIDAÇÃO DE CPF =====
function validateCPF(cpf) {
  // Remove formatação
  cpf = cpf.replace(/[^\d]/g, "");

  if (cpf.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  // Validação do algoritmo do CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) digit1 = 0;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) digit2 = 0;

  return (
    digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10))
  );
}

function formatCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// ===== SISTEMA DE AUTENTICAÇÃO CORRIGIDO =====
function validateLogin(email, password, userType) {
  // Verificar usuários padrão do sistema
  const defaultUsers = {
    "admin@ios.org.br": {
      password: "admin123",
      role: "admin",
      name: "Administrador Master",
    },
    "instrutor@ios.org.br": {
      password: "inst123",
      role: "instructor",
      name: "Instrutor Padrão",
    },
    "pedagogo@ios.org.br": {
      password: "ped123",
      role: "pedagogue",
      name: "Pedagogo Padrão",
    },
    "monitor@ios.org.br": {
      password: "mon123",
      role: "monitor",
      name: "Monitor Padrão",
    },
  };

  // Verificar usuário padrão
  if (
    defaultUsers[email] &&
    defaultUsers[email].password === password &&
    defaultUsers[email].role === userType
  ) {
    return {
      id: email,
      email: email,
      name: defaultUsers[email].name,
      role: userType,
      unitId: userType === "admin" ? null : "unit-1",
      status: "active",
    };
  }

  // Verificar usuários cadastrados
  if (typeof users !== "undefined" && users.length > 0) {
    // Aceitar tanto role quanto type para compatibilidade
    const user = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        (u.role === userType || u.type === userType) &&
        (u.status === "active" || !u.status)
    );
    if (user) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || user.type,
        unitId: user.unitId,
        status: user.status || "active",
      };
    }
  }

  return null;
}

// ===== OVERRIDE DA FUNÇÃO DE LOGIN PRINCIPAL =====
if (typeof window.handleLogin === "function") {
  const originalHandleLogin = window.handleLogin;
  window.handleLogin = function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const userType = document.getElementById("userType").value;

    const user = validateLogin(email, password, userType);

    if (user) {
      // Login bem-sucedido
      window.currentUser = user;
      document.getElementById("loginAlert").classList.add("hidden");
      document.getElementById("loginScreen").classList.add("hidden");
      document.getElementById("mainSystem").classList.remove("hidden");

      // Atualizar interface
      updateUserInterface(user);

      // Carregar dados
      if (window.loadData) window.loadData();

      // Inicializar páginas
      initializeUserInterface();

      showAlert("Login realizado com sucesso!", "success");
    } else {
      document.getElementById("loginAlert").classList.remove("hidden");
    }
  };
}

// ===== ATUALIZAR INTERFACE DO USUÁRIO =====
function updateUserInterface(user) {
  document.getElementById("userDisplayName").textContent = user.name;
  document.getElementById("userDisplayRole").textContent = getRoleDisplayName(
    user.role
  );

  // Avatar com primeira letra do nome
  const avatar = document.getElementById("userAvatar");
  avatar.textContent = user.name.charAt(0).toUpperCase();

  // Controlar visibilidade dos menus
  const adminOnlyTabs = [
    "usersTab",
    "unitsTab",
    "coursesTab",
    "reportsTab",
    "dataManagementTab",
  ];
  adminOnlyTabs.forEach((tabId) => {
    const tab = document.getElementById(tabId);
    if (tab) {
      tab.style.display = user.role === "admin" ? "block" : "none";
    }
  });
}

function getRoleDisplayName(role) {
  const roles = {
    admin: "Administrador Master",
    instructor: "Instrutor",
    pedagogue: "Pedagogo",
    monitor: "Monitor",
  };
  return roles[role] || role;
}

// ===== INICIALIZAÇÃO DA INTERFACE =====
function initializeUserInterface() {
  setTimeout(() => {
    initializeClassForm();
    loadClassesWithAccess();
    loadAttendanceClasses();
    updateDashboardStats();
  }, 100);
}

// ===== GARANTIR QUE OS DADOS ESTÃO DISPONÍVEIS =====
function ensureDataLoaded() {
  console.log("🔍 Verificando se os dados estão carregados...");

  const dataTypes = [
    "users",
    "units",
    "courses",
    "classes",
    "students",
    "attendance",
  ];
  const missingData = [];

  dataTypes.forEach((type) => {
    if (typeof window[type] === "undefined" || !Array.isArray(window[type])) {
      missingData.push(type);
    }
  });

  if (missingData.length > 0) {
    console.warn("⚠️ Dados faltando:", missingData);
    if (window.loadData) {
      console.log("🔄 Carregando dados...");
      window.loadData();
    }
    return false;
  }

  console.log("✅ Todos os dados estão carregados");
  return true;
}

// ===== CONTROLE DE ACESSO POR UNIDADE =====
function initializeClassForm() {
  const classUnitSelect = document.getElementById("classUnit");
  const classCourseSelect = document.getElementById("classCourse");

  if (!classUnitSelect || !window.currentUser) return;

  // Limpar options existentes
  classUnitSelect.innerHTML = '<option value="">Selecione...</option>';
  classCourseSelect.innerHTML =
    '<option value="">Selecione uma unidade primeiro...</option>';

  // Garantir que units existe
  if (typeof window.units === "undefined" || !Array.isArray(window.units)) {
    if (window.loadData) window.loadData();
    return;
  }

  // Admin vê todas as unidades
  if (window.currentUser.role === "admin") {
    window.units.forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit.id;
      option.textContent = unit.name;
      classUnitSelect.appendChild(option);
    });
    classUnitSelect.disabled = false;
  } else {
    // Usuário comum vê apenas sua unidade (ou unidades, se for mais de uma)
    let userUnits = [];
    if (Array.isArray(window.currentUser.unitId)) {
      userUnits = window.units.filter((u) =>
        window.currentUser.unitId.includes(u.id)
      );
    } else {
      userUnits = window.units.filter(
        (u) => u.id === window.currentUser.unitId
      );
    }
    userUnits.forEach((unit) => {
      const option = document.createElement("option");
      option.value = unit.id;
      option.textContent = unit.name;
      classUnitSelect.appendChild(option);
    });
    if (userUnits.length === 1) {
      classUnitSelect.value = userUnits[0].id;
      classUnitSelect.disabled = true;
    } else {
      classUnitSelect.disabled = false;
    }
    // Carregar cursos automaticamente se só houver uma unidade
    setTimeout(() => {
      window.loadCoursesForUnit();
    }, 100);
  }
}

// ===== CARREGAR CURSOS DA UNIDADE SELECIONADA =====
window.loadCoursesForUnit = function () {
  const unitId = document.getElementById("classUnit").value;
  const classCourseSelect = document.getElementById("classCourse");

  if (!classCourseSelect) return;

  console.log("🔍 Carregando cursos para unidade:", unitId);
  console.log("📚 Cursos disponíveis:", window.courses || []);

  if (!unitId) {
    classCourseSelect.innerHTML =
      '<option value="">Selecione uma unidade primeiro...</option>';
    return;
  }

  // Garantir que courses existe
  if (typeof window.courses === "undefined" || !Array.isArray(window.courses)) {
    console.warn("⚠️ Array de cursos não encontrado, carregando dados...");
    if (window.loadData) window.loadData();

    // Tentar novamente após carregar
    setTimeout(() => {
      window.loadCoursesForUnit();
    }, 100);
    return;
  }

  // Filtrar cursos da unidade selecionada
  const unitCourses = window.courses.filter((course) => {
    console.log(
      `🔍 Verificando curso: ${course.name}, unitId: ${course.unitId}, procurando: ${unitId}`
    );
    return course.unitId === unitId;
  });

  console.log("✅ Cursos encontrados para a unidade:", unitCourses);

  classCourseSelect.innerHTML =
    '<option value="">Selecione um curso...</option>';

  if (unitCourses.length === 0) {
    classCourseSelect.innerHTML =
      '<option value="">Nenhum curso cadastrado nesta unidade</option>';
    console.warn("⚠️ Nenhum curso encontrado para esta unidade");
    return;
  }

  unitCourses.forEach((course) => {
    classCourseSelect.innerHTML += `<option value="${course.id}">${course.name}</option>`;
    console.log(`✅ Curso adicionado: ${course.name} (ID: ${course.id})`);
  });

  console.log("🎉 Cursos carregados com sucesso!");
};

// ===== GERENCIAMENTO DE TURMAS CORRIGIDO =====
function loadClassesWithAccess() {
  const tbody = document.getElementById("classesTableBody");
  if (!tbody || !window.currentUser) return;

  // Filtrar turmas baseado no usuário
  let filteredClasses = [];
  if (typeof classes !== "undefined") {
    if (window.currentUser.role === "admin") {
      filteredClasses = classes;
    } else {
      filteredClasses = classes.filter(
        (cls) => cls.unitId === window.currentUser.unitId
      );
    }
  }

  let html = "";
  filteredClasses.forEach((cls) => {
    const unit =
      typeof units !== "undefined"
        ? units.find((u) => u.id === cls.unitId)
        : null;
    const course =
      typeof courses !== "undefined"
        ? courses.find((c) => c.id === cls.courseId)
        : null;
    const classStudents =
      typeof students !== "undefined"
        ? students.filter((s) => s.classId === cls.id && s.status === "active")
        : [];

    html += `
      <tr>
        <td><strong>${cls.name}</strong></td>
        <td>${unit ? unit.name : "N/A"}</td>
        <td>${course ? course.name : "N/A"}</td>
        <td><span class="badge bg-info">${cls.ciclo || "N/A"}</span></td>
        <td>${cls.instructor}</td>
        <td>${cls.year}</td>
        <td>
          <span class="badge bg-primary">${classStudents.length
      } estudantes</span>
          ${classStudents.length > 0
        ? `
            <br><small class="text-muted">${classStudents
          .slice(0, 3)
          .map((s) => s.name.split(" ")[0])
          .join(", ")}${classStudents.length > 3 ? "..." : ""}</small>
          `
        : ""
      }
        </td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="viewClassDetails('${cls.id
      }')">
            <i class="fas fa-eye"></i>
          </button>
          ${window.currentUser.role === "admin"
        ? `
            <button class="btn btn-sm btn-warning" onclick="editClass('${cls.id}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="btn btn-sm btn-danger" onclick="deleteClass('${cls.id}')">
              <i class="fas fa-trash"></i>
            </button>
          `
        : ""
      }
        </td>
      </tr>
    `;
  });

  tbody.innerHTML =
    html ||
    '<tr><td colspan="8" class="text-center">Nenhuma turma encontrada</td></tr>';

  // Atualizar select de turmas para adicionar estudantes
  updateStudentClassSelect();
}

// ===== ATUALIZAR SELECT DE TURMAS PARA ESTUDANTES =====
function updateStudentClassSelect() {
  const studentClassSelect = document.getElementById("studentClass");
  if (!studentClassSelect || !window.currentUser) return;

  let filteredClasses = [];
  if (typeof classes !== "undefined") {
    if (window.currentUser.role === "admin") {
      filteredClasses = classes;
    } else {
      filteredClasses = classes.filter(
        (cls) => cls.unitId === window.currentUser.unitId
      );
    }
  }

  studentClassSelect.innerHTML =
    '<option value="">Selecione uma turma</option>';
  filteredClasses.forEach((cls) => {
    const unit =
      typeof units !== "undefined"
        ? units.find((u) => u.id === cls.unitId)
        : null;
    studentClassSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${unit ? unit.name : "N/A"
      }</option>`;
  });
}

// ===== CARREGAR TURMAS PARA CHAMADA =====
function loadAttendanceClasses() {
  const attendanceClassSelect = document.getElementById("attendanceClass");
  if (!attendanceClassSelect || !window.currentUser) return;

  let filteredClasses = [];
  if (typeof classes !== "undefined") {
    if (window.currentUser.role === "admin") {
      filteredClasses = classes;
    } else {
      filteredClasses = classes.filter(
        (cls) => cls.unitId === window.currentUser.unitId
      );
    }
  }

  attendanceClassSelect.innerHTML =
    '<option value="">Selecione uma turma</option>';
  filteredClasses.forEach((cls) => {
    const unit =
      typeof units !== "undefined"
        ? units.find((u) => u.id === cls.unitId)
        : null;
    const course =
      typeof courses !== "undefined"
        ? courses.find((c) => c.id === cls.courseId)
        : null;
    attendanceClassSelect.innerHTML += `
      <option value="${cls.id}">
        ${cls.name} - ${course ? course.name : "N/A"} (${unit ? unit.name : "N/A"
      })
      </option>
    `;
  });
}

// ===== ADICIONAR TURMA CORRIGIDO =====
function addClassFixed() {
  if (!window.currentUser) {
    showAlert("Erro: usuário não autenticado!", "error");
    return;
  }

  // Garantir que os dados estão carregados
  if (!ensureDataLoaded()) {
    showAlert(
      "Carregando dados... Tente novamente em alguns segundos.",
      "warning"
    );
    return;
  }

  const className = document.getElementById("className").value.trim();
  const unitId = document.getElementById("classUnit").value;
  const courseId = document.getElementById("classCourse").value;
  const instructor = document.getElementById("classInstructor").value.trim();
  const year = document.getElementById("classYear").value;
  const ciclo = document.getElementById("classCiclo").value.trim();

  console.log("📝 Dados do formulário:", {
    className,
    unitId,
    courseId,
    instructor,
    year,
    ciclo,
  });

  if (!className || !unitId || !courseId || !instructor || !year || !ciclo) {
    showAlert("Preencha todos os campos!", "error");
    return;
  }

  // Verificar se o array classes existe
  if (typeof window.classes === "undefined") {
    window.classes = [];
    console.log("📚 Array de turmas criado");
  }

  const newClass = {
    id: Date.now().toString(),
    name: className,
    unitId: unitId,
    courseId: courseId,
    instructor: instructor,
    year: parseInt(year),
    ciclo: ciclo,
  };

  console.log("✅ Nova turma criada:", newClass);

  window.classes.push(newClass);
  if (window.saveData) window.saveData();

  // Limpar formulário
  document.getElementById("classForm").reset();
  if (window.currentUser.role !== "admin") {
    // Para usuários não-admin, restaurar a unidade
    setTimeout(() => {
      document.getElementById("classUnit").value = window.currentUser.unitId;
      window.loadCoursesForUnit();
    }, 100);
  }

  loadClassesWithAccess();
  showAlert("Turma cadastrada com sucesso!", "success");
}

// ===== ADICIONAR ESTUDANTE CORRIGIDO =====
window.addStudent = (function () {
  if (!window.currentUser) {
    showAlert("Erro: usuário não autenticado!", "error");
    return;
  }

  const studentName = document.getElementById("studentName").value.trim();
  const studentCpf = document.getElementById("studentCpf").value.trim();
  const classId = document.getElementById("studentClass").value;

  if (!studentName || !studentCpf || !classId) {
    showAlert("Preencha todos os campos!", "error");
    return;
  }

  // Validar CPF
  if (!validateCPF(studentCpf)) {
    showAlert("CPF inválido! Verifique o número digitado.", "error");
    return;
  }

  // Verificar se o array students existe
  if (typeof students === "undefined") {
    window.students = [];
  }

  // Verificar CPF único
  const formattedCpf = formatCPF(studentCpf);
  if (students.some((s) => s.cpf === formattedCpf)) {
    showAlert("CPF já cadastrado no sistema!", "error");
    return;
  }

  // Encontrar a unidade da turma
  const selectedClass = classes.find((c) => c.id === classId);
  if (!selectedClass) {
    showAlert("Turma não encontrada!", "error");
    return;
  }

  const student = {
    id: Date.now().toString(),
    name: studentName,
    classId: classId,
    unitId: selectedClass.unitId,
    cpf: formattedCpf,
    status: "active",
    dropoutReason: "",
    dropoutDate: "",
  };

  students.push(student);
  if (window.saveData) window.saveData();

  // Limpar campos
  document.getElementById("studentName").value = "";
  document.getElementById("studentCpf").value = "";

  loadClassesWithAccess();
  updateDashboardStats();
  showAlert("Estudante adicionado com sucesso!", "success");
})(
  // ===== UNIDADES IOS COMPLETAS =====
  function initDefaultUnits() {
    // Só inicializa se não houver unidades no localStorage
    if (
      !window.units ||
      !Array.isArray(window.units) ||
      window.units.length === 0
    ) {
      window.units = [
        {
          id: "rs-porto-alegre-renner",
          name: "RS - Porto Alegre",
          projeto: "RENNER",
          curso: "Zendesk",
          periodo: "",
          address: "Sem informações",
          phone: "Sem informações",
          status: "active",
        },
        {
          id: "bh-barreiro",
          name: "BH - Barreiro",
          projeto: "FMDCA - Quebrada Tech",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "PUC Barreiro Av. Afonso Vaz de Melo, 1200 - Prédio 2, laboratório 318 - Barreiro, Belo Horizonte - MG, 30640-070",
          phone: "11 2503-2617 | 31 9719-9538",
          status: "active",
        },
        {
          id: "bh-sao-gabriel",
          name: "BH - São Gabriel",
          projeto: "FMCDCA - Jovens no topo",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "PUC São Gabriel Rua Walter Ianni, 255 - Bloco E, laboratório 105 - São Gabriel, Belo Horizonte - MG, 31980-110",
          phone: "11 2503-2617 | 31 99705-9270",
          status: "active",
        },
        {
          id: "pe-recife",
          name: "PE - Recife",
          projeto: "LOCALIZA",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "UNICAP R. do Príncipe, 526 - Bloco G, Sala 704 - Boa Vista, Recife - PE, 50050-900",
          phone: "11 2503-2617 | 81 8147-7179",
          status: "active",
        },
        {
          id: "rs-porto-alegre-dell",
          name: "RS - Porto Alegre",
          projeto: "DELL",
          curso: "Programação Web",
          periodo: "Manhã e Tarde",
          address: "PUCRS Av. Ipiranga, 6681 - Prédio 2 (Fundação Fijo) - Partenon, Porto Alegre - RS, 90610-001",
          phone: "11 2503-2617 | 51 9719-1029",
          status: "active",
        },
        {
          id: "sp-hortolandia",
          name: "SP - Hortolândia",
          projeto: "Dell",
          curso: "Suporte TI",
          periodo: "Manhã e Tarde",
          address: "ADRA – Núcleo Vinde a Mim R. do Canário, 308 - Jardim Boa Esperança, Hortolândia - SP, 13183-363",
          phone: "11 2503-2617 | 19 99927-3112",
          status: "active",
        },
        {
          id: "sp-itaquera",
          name: "SP - Itaquera",
          projeto: "Sem projeto",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "Obra Social Dom Bosco R. Álvaro de Mendonça, 456 - Vila Brasil, São Paulo - SP, 08215-290",
          phone: "11 2056-3668 | 11 99592-0836",
          status: "active",
        },
        {
          id: "sp-santo-amaro",
          name: "SP - Santo Amaro",
          projeto: "FUMCAD + Dell",
          curso: "Programação Web",
          periodo: "Manhã e Tarde",
          address: "Rua Barão de Duprat, 318 - Sobreloja - Santo Amaro, Cep: 04743-060",
          phone: "11 2503-2617",
          status: "active",
        },
        {
          id: "sp-sede-santana",
          name: "SP - Sede Santana",
          projeto: "Múltiplos Projetos",
          curso: "Vários Cursos",
          periodo: "Manhã, Tarde e Noite",
          address: "Sede do IOS Av. Gen. Ataliba Leonel, 245 - Santana, São Paulo - SP, 02033-000",
          phone: "11 2503-2617 | 11 97343-9010",
          status: "active",
        },
        {
          id: "sp-jardim-angela",
          name: "SP - Jardim Ângela",
          projeto: "Sem projeto",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "Sociedade Santos Mártires R. Luís Baldinato, 9 - Jardim Angela, São Paulo - SP, 04935-100",
          phone: "11 2503-2617 | 11 94351-6075",
          status: "active",
        },
        {
          id: "sp-paraisopolis",
          name: "SP - Paraisópolis",
          projeto: "PECP",
          curso: "Suporte TI",
          periodo: "Manhã e Tarde",
          address: "Sem informações",
          phone: "Sem informações",
          status: "active",
        },
        {
          id: "sp-barueri",
          name: "SP - Barueri",
          projeto: "CONDECA",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "CEB – Comunidade Evangélica Barueri Av.Brigadeiro Manoel Rodrigues Jordão, 1800, Jardim Silveira - SP, 06433-010",
          phone: "11 2503-2617 | 11 94372-3683",
          status: "active",
        },
        {
          id: "sp-sao-mateus",
          name: "SP - São Mateus",
          projeto: "FUMCAD",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "Comunidade da Graça R. Forte do Rio Branco, 854 - Parque São Lourenço, São Paulo - SP, 08340-140",
          phone: "11 2503-2617 | 11 94153-1255",
          status: "active",
        },
        {
          id: "sp-vila-dionisia",
          name: "SP - Vila Dionísia",
          projeto: "FUMCAD",
          curso: "Gestão Empresarial com ERP",
          periodo: "Manhã e Tarde",
          address: "Instituto Resgatando Vidas - Rede Gerando Falcões Rua Augusto Gil, 465 - Vila Dionisia, São Paulo - SP, 02670-070",
          phone: "11 2503-2617 | 11 95555-1742",
          status: "active",
        },
        {
          id: "material-generico",
          name: "01 - Material Genérico",
          projeto: "genérico",
          curso: "genérico",
          periodo: "",
          address: "Material Genérico",
          phone: "Material Genérico",
          status: "active",
        },
      ];
      if (window.saveData) window.saveData();
      console.log('✅ Unidades IOS inicializadas:', window.units.length);
    }
  }
)();
// ===== INICIALIZAÇÃO DE CURSOS IOS =====
function initDefaultCourses() {
  if (!window.courses || !Array.isArray(window.courses) || window.courses.length === 0) {
    window.courses = [
      {
        id: "zendesk",
        name: "Zendesk",
        tipoCurso: "TI",
        category: "Suporte",
        description: "Plataforma de atendimento ao cliente"
      },
      {
        id: "gestao-empresarial-erp",
        name: "Gestão Empresarial com ERP",
        tipoCurso: "Extensão",
        category: "Gestão",
        description: "Gestão empresarial utilizando sistemas ERP"
      },
      {
        id: "programacao-web",
        name: "Programação Web",
        tipoCurso: "TI",
        category: "Desenvolvimento",
        description: "Desenvolvimento de aplicações web"
      },
      {
        id: "suporte-ti",
        name: "Suporte TI",
        tipoCurso: "TI",
        category: "Suporte",
        description: "Suporte técnico em tecnologia da informação"
      },
      {
        id: "protheus-contabil",
        name: "TOTVS Protheus Contábil: Instalação e Configuração",
        tipoCurso: "TI",
        category: "ERP",
        description: "Instalação e configuração do sistema Protheus Contábil"
      },
      {
        id: "office-zendesk",
        name: "Office com Suporte Zendesk",
        tipoCurso: "Extensão",
        category: "Office",
        description: "Pacote Office integrado com Zendesk"
      },
      {
        id: "power-bi",
        name: "Power BI",
        tipoCurso: "TI",
        category: "Business Intelligence",
        description: "Análise de dados e Business Intelligence"
      }
    ];
    if (window.saveData) window.saveData();
    console.log('✅ Cursos IOS inicializados:', window.courses.length);
  }
}

// Chamar ambas as funções na inicialização
(function initializeIOS() {
  initDefaultUnits();
  initDefaultCourses();
})();