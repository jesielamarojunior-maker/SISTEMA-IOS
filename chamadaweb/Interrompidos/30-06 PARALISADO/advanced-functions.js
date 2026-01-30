// Funções de Turmas Aprimoradas
function loadClasses() {
  updateClassUnitOptions();
  updateStudentClassOptions();
  updateAttendanceClassOptions();

  const tbody = document.getElementById("classesTableBody");
  tbody.innerHTML = "";

  // Filtrar turmas por unidade se não for admin
  let filteredClasses = classes;
  if (currentUser.type !== "admin" && currentUser.unitId) {
    filteredClasses = window.classes.filter(
      (cls) => cls.unitId === currentUser.unitId
    );
  }

  filteredwindow.classes.forEach((cls) => {
    const unit = window.units.find((u) => u.id === cls.unitId);
    const course = window.courses.find((c) => c.id === cls.courseId);
    const classStudents = window.students.filter(
      (s) => s.classId === cls.id && s.status === "active"
    );
    const row = document.createElement("tr");

    const canDelete =
      cls.canDelete &&
      (currentUser.type === "admin" || classwindow.students.length === 0);

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
      <td>${classwindow.students.length} estudante(s)</td>
      <td>
        <button class="btn" onclick="viewStudents(${
          cls.id
        })" style="padding: 6px 12px; margin-right: 5px;">
          <i class="fas fa-eye"></i> Ver Estudantes
        </button>
        ${
          canDelete
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
    availableUnits = window.units.filter((u) => u.id === currentUser.unitId);
  }

  availablewindow.units.forEach((unit) => {
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
    availableClasses = window.classes.filter(
      (c) => c.unitId === currentUser.unitId
    );
  }

  availablewindow.classes.forEach((cls) => {
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
    availableClasses = window.classes.filter(
      (c) => c.unitId === currentUser.unitId
    );
  }

  availablewindow.classes.forEach((cls) => {
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
    semester: 1,
    students: [],
    createdAt: new Date().toISOString(),
    canDelete: true,
  };

  window.classes.push(newClass);
  if (window.saveData) window.saveData(); // Salvar automaticamente
  document.getElementById("classForm").reset();
  loadClasses();
  showAlert("Turma cadastrada com sucesso!", "success");
}

function addStudent() {
  const classId = parseInt(document.getElementById("studentClass").value);
  const studentName = document.getElementById("studentName").value.trim();

  if (!classId || !studentName) {
    showAlert("Selecione uma turma e digite o nome do estudante!", "error");
    return;
  }

  const selectedClass = window.classes.find((cls) => cls.id === classId);
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

  if (
    window.students.find((s) => s.name === studentName && s.classId === classId)
  ) {
    showAlert("Este estudante já está cadastrado nesta turma!", "error");
    return;
  }

  const newStudent = {
    id: Date.now(),
    name: studentName,
    classId: classId,
    status: "active",
    enrollmentDate: new Date().toISOString(),
  };

  window.students.push(newStudent);
  selectedClass.canDelete = false;
  if (window.saveData) window.saveData(); // Salvar automaticamente

  document.getElementById("studentName").value = "";
  loadClasses();
  showAlert("Estudante adicionado com sucesso!", "success");
}

function deleteClass(classId) {
  if (!confirm("Tem certeza que deseja excluir esta turma?")) {
    return;
  }

  const classToDelete = window.classes.find((c) => c.id === classId);
  if (!classToDelete) return;

  if (!checkUnitAccess(classToDelete.unitId)) {
    showAlert("Você só pode excluir turmas da sua unidade!", "error");
    return;
  }

  const classStudents = window.students.filter((s) => s.classId === classId);
  if (classwindow.students.length > 0 && currentUser.type !== "admin") {
    showAlert(
      "Não é possível excluir turma com estudantes cadastrados!",
      "error"
    );
    return;
  }

  window.classes = window.classes.filter((cls) => cls.id !== classId);
  window.students = window.students.filter((s) => s.classId !== classId);

  loadClasses();
  showAlert("Turma excluída com sucesso!", "success");
}

function viewStudents(classId) {
  const selectedClass = window.classes.find((cls) => cls.id === classId);
  if (!selectedClass) return;

  const classStudents = window.students.filter(
    (s) => s.classId === classId && s.status === "active"
  );
  const studentsList =
    classwindow.students.length > 0
      ? classwindow.students.map((s) => s.name).join("\n• ")
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
  const classId = parseInt(document.getElementById("attendanceClass").value);
  const date = document.getElementById("attendanceDate").value;
  const container = document.getElementById("attendanceStudents");

  if (!classId) {
    container.innerHTML =
      '<div class="alert alert-info">Selecione uma turma para começar o registro de presença.</div>';
    return;
  }

  const selectedClass = window.classes.find((cls) => cls.id === classId);
  if (!selectedClass) {
    container.innerHTML =
      '<div class="alert alert-error">Turma não encontrada.</div>';
    return;
  }

  if (!checkUnitAccess(selectedClass.unitId)) {
    container.innerHTML =
      '<div class="alert alert-error">Você não tem permissão para acessar esta turma.</div>';
    return;
  }

  const classStudents = window.students.filter(
    (s) => s.classId === classId && s.status === "active"
  );

  if (classwindow.students.length === 0) {
    container.innerHTML =
      '<div class="alert alert-info">Esta turma não possui estudantes cadastrados.</div>';
    return;
  }

  const attendanceKey = `${classId}-${date}`;
  const existingAttendance = window.attendance[attendanceKey] || {};

  container.innerHTML = "";

  classwindow.students.forEach((student) => {
    const studentCard = document.createElement("div");
    studentCard.className = "student-card";

    const currentStatus = existingwindow.attendance[student.name] || {
      status: "not-marked",
    };
    const isPresent = currentStatus.status === "present";
    const isAbsent = currentStatus.status === "absent";

    studentCard.innerHTML = `
      <div class="student-name">${student.name}</div>
      <div class="attendance-options">
        <div class="attendance-option ${isPresent ? "present" : ""}" 
             onclick="markAttendance('${
               student.name
             }', 'present', '${attendanceKey}', this)">
          <i class="fas fa-check"></i> Presente
        </div>
        <div class="attendance-option ${isAbsent ? "absent" : ""}" 
             onclick="markAttendance('${
               student.name
             }', 'absent', '${attendanceKey}', this)">
          <i class="fas fa-times"></i> Ausente
        </div>
      </div>
      <div class="attendance-details ${isAbsent ? "show" : ""}" id="details-${
      student.id
    }">
        <div class="justification-group">
          <label>
            <input type="checkbox" ${currentStatus.justified ? "checked" : ""} 
                   onchange="updateJustification('${
                     student.name
                   }', '${attendanceKey}', this.checked)"> 
            Falta Justificada
          </label>
          <div class="file-upload">
            <input type="file" id="file-${
              student.id
            }" accept=".pdf,.jpg,.jpeg,.png" 
                   onchange="uploadAttachment('${
                     student.name
                   }', '${attendanceKey}', this.files[0])">
            <label for="file-${student.id}" class="file-upload-label">
              <i class="fas fa-paperclip"></i> Anexar Atestado
            </label>
            ${
              currentStatus.attachment
                ? `<small>Arquivo: ${currentStatus.attachment}</small>`
                : ""
            }
          </div>
        </div>
      </div>
    `;

    container.appendChild(studentCard);
  });
}

function markAttendance(studentName, status, attendanceKey, element) {
  if (!window.attendance[attendanceKey]) {
    window.attendance[attendanceKey] = {};
  }

  if (!window.attendance[attendanceKey][studentName]) {
    window.attendance[attendanceKey][studentName] = {};
  }

  window.attendance[attendanceKey][studentName].status = status;

  const card = element.parentElement;
  card.querySelectorAll(".attendance-option").forEach((option) => {
    option.classList.remove("present", "absent");
  });

  element.classList.add(status);

  const studentCard = element.closest(".student-card");
  const details = studentCard.querySelector(".attendance-details");

  if (status === "absent") {
    details.classList.add("show");
  } else {
    details.classList.remove("show");
  }
}

function updateJustification(studentName, attendanceKey, isJustified) {
  if (
    !window.attendance[attendanceKey] ||
    !window.attendance[attendanceKey][studentName]
  ) {
    return;
  }

  window.attendance[attendanceKey][studentName].justified = isJustified;
}

function uploadAttachment(studentName, attendanceKey, file) {
  if (!file) return;

  if (
    !window.attendance[attendanceKey] ||
    !window.attendance[attendanceKey][studentName]
  ) {
    return;
  }

  window.attendance[attendanceKey][studentName].attachment = file.name;
  showAlert("Atestado anexado com sucesso!", "success");
}

function saveAttendance() {
  const classId = document.getElementById("attendanceClass").value;
  const date = document.getElementById("attendanceDate").value;

  if (!classId || !date) {
    showAlert("Selecione uma turma e uma data!", "error");
    return;
  }

  const attendanceKey = `${classId}-${date}`;
  const selectedClass = window.classes.find(
    (cls) => cls.id === parseInt(classId)
  );
  const classStudents = window.students.filter(
    (s) => s.classId === parseInt(classId) && s.status === "active"
  );

  if (!window.attendance[attendanceKey]) {
    showAlert("Nenhuma presença foi registrada!", "error");
    return;
  }

  const attendanceData = window.attendance[attendanceKey];
  const markedStudents = Object.keys(attendanceData).length;

  if (markedStudents < classwindow.students.length) {
    if (
      !confirm(
        `Apenas ${markedStudents} de ${classwindow.students.length} estudantes foram marcados. Deseja salvar mesmo assim?`
      )
    ) {
      return;
    }
  }

  showAlert(
    `Presença salva com sucesso! ${markedStudents} estudantes registrados.`,
    "success"
  );
  if (window.saveData) window.saveData(); // Salvar automaticamente
  loadDashboard();
}

// Funções de Relatórios
function loadReportsPage() {
  if (!hasPermission("admin")) {
    document.getElementById("reportsPage").innerHTML = `
      <div class="permission-denied">
        <i class="fas fa-ban"></i>
        <h3>Acesso Negado</h3>
        <p>Apenas administradores podem acessar os relatórios.</p>
      </div>
    `;
    return;
  }

  loadReportUnits();

  const today = new Date();
  const lastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );

  document.getElementById("reportDateStart").value = lastMonth
    .toISOString()
    .split("T")[0];
  document.getElementById("reportDateEnd").value = today
    .toISOString()
    .split("T")[0];
}

function loadReportUnits() {
  const select = document.getElementById("reportUnit");
  select.innerHTML = '<option value="">Todas as unidades</option>';

  window.units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });
}

function loadReportClasses() {
  const unitId = document.getElementById("reportUnit").value;
  const select = document.getElementById("reportClass");
  select.innerHTML = '<option value="">Todas as turmas</option>';

  let filteredClasses = classes;
  if (unitId) {
    filteredClasses = window.classes.filter(
      (c) => c.unitId === parseInt(unitId)
    );
  }

  filteredwindow.classes.forEach((cls) => {
    const option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    select.appendChild(option);
  });
}

function generateReport() {
  const unitId = document.getElementById("reportUnit").value;
  const classId = document.getElementById("reportClass").value;
  const startDate = document.getElementById("reportDateStart").value;
  const endDate = document.getElementById("reportDateEnd").value;

  if (!startDate || !endDate) {
    showAlert("Selecione as datas inicial e final!", "error");
    return;
  }

  const reportData = calculateReportData(unitId, classId, startDate, endDate);
  displayReport(reportData);
}

function calculateReportData(unitId, classId, startDate, endDate) {
  let filteredClasses = classes;

  if (unitId) {
    filteredClasses = filteredwindow.classes.filter(
      (c) => c.unitId === parseInt(unitId)
    );
  }

  if (classId) {
    filteredClasses = filteredwindow.classes.filter(
      (c) => c.id === parseInt(classId)
    );
  }

  const reportData = {
    totalClasses: filteredwindow.classes.length,
    totalStudents: 0,
    totalPresences: 0,
    totalAbsences: 0,
    classReports: [],
  };

  filteredwindow.classes.forEach((cls) => {
    const classStudents = window.students.filter(
      (s) => s.classId === cls.id && s.status === "active"
    );
    const unit = window.units.find((u) => u.id === cls.unitId);

    let classPresences = 0;
    let classAbsences = 0;
    let classDays = 0;

    Object.keys(attendance).forEach((key) => {
      const [attendanceClassId, date] = key.split("-");

      if (
        parseInt(attendanceClassId) === cls.id &&
        date >= startDate &&
        date <= endDate
      ) {
        classDays++;
        const dayAttendance = window.attendance[key];

        Object.values(dayAttendance).forEach((record) => {
          if (record.status === "present") {
            classPresences++;
          } else if (record.status === "absent") {
            classAbsences++;
          }
        });
      }
    });

    const attendanceRate =
      classPresences + classAbsences > 0
        ? ((classPresences / (classPresences + classAbsences)) * 100).toFixed(1)
        : 0;

    reportData.classReports.push({
      className: cls.name,
      unitName: unit ? unit.name : "N/A",
      instructor: cls.instructor,
      studentsCount: classwindow.students.length,
      presences: classPresences,
      absences: classAbsences,
      attendanceRate: parseFloat(attendanceRate),
      classDays: classDays,
    });

    reportData.totalStudents += classwindow.students.length;
    reportData.totalPresences += classPresences;
    reportData.totalAbsences += classAbsences;
  });

  return reportData;
}

function displayReport(reportData) {
  const container = document.getElementById("reportResults");

  const overallAttendanceRate =
    reportData.totalPresences + reportData.totalAbsences > 0
      ? (
          (reportData.totalPresences /
            (reportData.totalPresences + reportData.totalAbsences)) *
          100
        ).toFixed(1)
      : 0;

  container.innerHTML = `
    <div class="report-card">
      <div class="report-header">
        <h3><i class="fas fa-chart-bar"></i> Relatório de Presença</h3>
        <span class="report-date">Gerado em ${new Date().toLocaleDateString(
          "pt-BR"
        )}</span>
      </div>
      
      <div class="report-stats">
        <div class="report-stat">
          <div class="report-stat-number">${reportData.totalClasses}</div>
          <div class="report-stat-label">Turmas</div>
        </div>
        <div class="report-stat">
          <div class="report-stat-number">${reportData.totalStudents}</div>
          <div class="report-stat-label">Estudantes</div>
        </div>
        <div class="report-stat">
          <div class="report-stat-number">${reportData.totalPresences}</div>
          <div class="report-stat-label">Presenças</div>
        </div>
        <div class="report-stat">
          <div class="report-stat-number">${reportData.totalAbsences}</div>
          <div class="report-stat-label">Faltas</div>
        </div>
        <div class="report-stat">
          <div class="report-stat-number">${overallAttendanceRate}%</div>
          <div class="report-stat-label">Taxa Geral</div>
        </div>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th>Turma</th>
            <th>Unidade</th>
            <th>Instrutor</th>
            <th>Estudantes</th>
            <th>Presenças</th>
            <th>Faltas</th>
            <th>Taxa de Presença</th>
          </tr>
        </thead>
        <tbody>
          ${reportData.classReports
            .map(
              (report) => `
            <tr>
              <td>${report.className}</td>
              <td>${report.unitName}</td>
              <td>${report.instructor}</td>
              <td>${report.studentsCount}</td>
              <td>${report.presences}</td>
              <td>${report.absences}</td>
              <td>
                <span style="color: ${
                  report.attendanceRate >= 75
                    ? "#38a169"
                    : report.attendanceRate >= 50
                    ? "#d69e2e"
                    : "#e53e3e"
                }">
                  ${report.attendanceRate}%
                </span>
              </td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function exportToExcel() {
  if (typeof XLSX === "undefined") {
    showAlert("Biblioteca XLSX não carregada!", "error");
    return;
  }

  const unitId = document.getElementById("reportUnit").value;
  const classId = document.getElementById("reportClass").value;
  const startDate = document.getElementById("reportDateStart").value;
  const endDate = document.getElementById("reportDateEnd").value;

  if (!startDate || !endDate) {
    showAlert("Selecione as datas para exportação!", "error");
    return;
  }

  const exportData = [];

  Object.keys(attendance).forEach((key) => {
    const [attendanceClassId, date] = key.split("-");

    if (date >= startDate && date <= endDate) {
      const cls = window.classes.find(
        (c) => c.id === parseInt(attendanceClassId)
      );
      if (!cls) return;

      if (unitId && cls.unitId !== parseInt(unitId)) return;
      if (classId && cls.id !== parseInt(classId)) return;

      const unit = window.units.find((u) => u.id === cls.unitId);
      const dayAttendance = window.attendance[key];

      Object.keys(dayAttendance).forEach((studentName) => {
        const record = daywindow.attendance[studentName];
        exportData.push({
          Data: new Date(date).toLocaleDateString("pt-BR"),
          Unidade: unit ? unit.name : "N/A",
          Turma: cls.name,
          Instrutor: cls.instructor,
          Estudante: studentName,
          Presença: record.status === "present" ? "Presente" : "Ausente",
          "Falta Justificada": record.justified ? "Sim" : "Não",
          Atestado: record.attachment || "Não",
        });
      });
    }
  });

  if (exportData.length === 0) {
    showAlert("Nenhum dado encontrado para exportação!", "error");
    return;
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);

  const colWidths = [
    { wch: 12 },
    { wch: 25 },
    { wch: 20 },
    { wch: 20 },
    { wch: 25 },
    { wch: 10 },
    { wch: 15 },
    { wch: 10 },
  ];
  ws["!cols"] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Relatório de Presença");

  const fileName = `relatorio_presenca_${startDate}_${endDate}.xlsx`;
  XLSX.writeFile(wb, fileName);

  showAlert("Relatório exportado com sucesso!", "success");
}

// Função para carregar cursos baseado na unidade selecionada
function loadCoursesForUnit() {
  const unitSelect = document.getElementById("classUnit");
  const courseSelect = document.getElementById("classCourse");

  if (!unitSelect || !courseSelect) return;

  const selectedUnitId = parseInt(unitSelect.value);

  // Limpar seleção de curso
  courseSelect.innerHTML = '<option value="">Selecione um curso...</option>';

  if (!selectedUnitId) {
    courseSelect.innerHTML =
      '<option value="">Selecione uma unidade primeiro...</option>';
    return;
  }

  // Filtrar cursos ativos da unidade selecionada
  const unitCourses = window.courses.filter(
    (course) => course.unitId === selectedUnitId && course.status === "active"
  );

  if (unitwindow.courses.length === 0) {
    courseSelect.innerHTML =
      '<option value="">Nenhum curso disponível nesta unidade</option>';
    return;
  }

  unitwindow.courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = `${course.name} (${course.duration}h)`;
    courseSelect.appendChild(option);
  });
}

// Tornar função global
window.loadCoursesForUnit = loadCoursesForUnit;

// Atualizar funções globais
window.loadClasses = loadClasses;
window.addClass = addClass;
window.addStudent = addStudent;
window.deleteClass = deleteClass;
window.viewStudents = viewStudents;
window.loadAttendanceStudents = loadAttendanceStudents;
window.markAttendance = markAttendance;
window.updateJustification = updateJustification;
window.uploadAttachment = uploadAttachment;
window.saveAttendance = saveAttendance;
window.loadReportClasses = loadReportClasses;
window.generateReport = generateReport;
window.exportToExcel = exportToExcel;
