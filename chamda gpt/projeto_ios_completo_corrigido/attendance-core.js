function loadAttendanceStudents() {
  console.log("Carregando estudantes para chamada");
  const classId = parseInt(
    document.getElementById("attendanceClassSelect").value
  );
  const attendanceDate = document.getElementById("attendanceDate").value;
  const studentsContainer = document.getElementById("attendanceStudentsList");

  if (!classId || !attendanceDate || !studentsContainer) {
    if (studentsContainer) {
      studentsContainer.innerHTML =
        '<div class="alert alert-info"><i class="fas fa-info-circle"></i> Selecione uma turma e data para registrar presença.</div>';
    }
    return;
  }

  console.log(
    "Buscando estudantes para a turma ID: " +
      classId +
      " na data: " +
      attendanceDate
  );

  const classStudents = students.filter(
    (s) => s.classId === classId && s.status === "active"
  );

  console.log("Estudantes encontrados: " + classStudents.length);

  if (classStudents.length === 0) {
    studentsContainer.innerHTML =
      '<div class="alert alert-info"><i class="fas fa-info-circle"></i> Esta turma não possui estudantes cadastrados.</div>';
    return;
  }

  const attendanceKey = classId + "-" + attendanceDate;
  const dayAttendance = attendance[attendanceKey] || {};

  // Preenche os dados do instrutor da turma selecionada
  const selectedClass = classes.find((c) => c.id === classId);
  if (selectedClass) {
    const instructor = users.find((u) => u.id === selectedClass.instructorId);
    if (instructor && document.getElementById("attendanceInstructor")) {
      document.getElementById("attendanceInstructor").value = instructor.name;
    }
  }

  let html = '<div class="attendance-students-grid">';

  classStudents.forEach((student) => {
    const studentStatus = dayAttendance[student.id]
      ? dayAttendance[student.id].status
      : "";
    html +=
      '<div class="student-card">' +
      '<div class="student-info">' +
      '<img src="https://ui-avatars.com/api/?name=' +
      encodeURIComponent(student.name) +
      '&background=random" alt="' +
      student.name +
      '" class="student-avatar">' +
      '<div class="student-details">' +
      '<div class="student-name">' +
      student.name +
      "</div>" +
      '<div class="student-id">ID: ' +
      student.id +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="attendance-options">' +
      '<label class="radio-option present">' +
      '<input type="radio" name="attendance_' +
      student.id +
      '" value="present" ' +
      (studentStatus === "present" ? "checked" : "") +
      ">" +
      "<span>Presente</span>" +
      "</label>" +
      '<label class="radio-option absent">' +
      '<input type="radio" name="attendance_' +
      student.id +
      '" value="absent" ' +
      (studentStatus === "absent" ? "checked" : "") +
      ">" +
      "<span>Ausente</span>" +
      "</label>" +
      '<label class="radio-option justified">' +
      '<input type="radio" name="attendance_' +
      student.id +
      '" value="justified" ' +
      (studentStatus === "justified" ? "checked" : "") +
      ">" +
      "<span>Justificado</span>" +
      "</label>" +
      "</div>" +
      '<div class="student-note">' +
      '<input type="text" placeholder="Observação..." class="note-input" ' +
      'id="note_' +
      student.id +
      '" value="' +
      (dayAttendance[student.id] ? dayAttendance[student.id].note || "" : "") +
      '">' +
      "</div>" +
      "</div>";
  });

  html += "</div>";
  studentsContainer.innerHTML = html;

  // Atualiza contadores
  updateAttendanceCounters();
}

function saveAttendance() {
  const classId = parseInt(
    document.getElementById("attendanceClassSelect").value
  );
  const attendanceDate = document.getElementById("attendanceDate").value;

  if (!classId || !attendanceDate) {
    showAlert("Selecione uma turma e data!", "error");
    return;
  }

  const classStudents = students.filter(
    (s) => s.classId === classId && s.status === "active"
  );
  const attendanceKey = classId + "-" + attendanceDate;

  if (!attendance[attendanceKey]) {
    attendance[attendanceKey] = {};
  }

  let savedCount = 0;

  classStudents.forEach((student) => {
    const radioButtons = document.getElementsByName("attendance_" + student.id);
    const checkedRadio = Array.from(radioButtons).find(
      (radio) => radio.checked
    );
    const noteField = document.getElementById("note_" + student.id);
    const note = noteField ? noteField.value : "";

    if (checkedRadio) {
      attendance[attendanceKey][student.id] = {
        studentId: student.id,
        studentName: student.name,
        status: checkedRadio.value,
        date: attendanceDate,
        note: note,
        timestamp: new Date().toISOString(),
        recordedBy: currentUser.name,
      };
      savedCount++;
    }
  });

  // Salvar informações adicionais da aula
  const topicos = document.getElementById("lessonActivities")
    ? document.getElementById("lessonActivities").value
    : "";
  const observacoes = document.getElementById("lessonObservations")
    ? document.getElementById("lessonObservations").value
    : "";

  attendance[attendanceKey].lessonDetails = {
    topicos: topicos,
    observacoes: observacoes,
    horarioInicio: document.getElementById("attendanceStartTime")
      ? document.getElementById("attendanceStartTime").value
      : "",
    horarioFim: document.getElementById("attendanceEndTime")
      ? document.getElementById("attendanceEndTime").value
      : "",
    cargaHoraria: document.getElementById("attendanceDuration")
      ? document.getElementById("attendanceDuration").value
      : "",
  };

  if (savedCount > 0) {
    saveData();
    showAlert(
      "Presença salva para " + savedCount + " estudante(s)!",
      "success"
    );
    loadDashboard(); // Atualizar estatísticas
  } else {
    showAlert("Nenhuma presença foi marcada!", "error");
  }
}

// Função para atualizar os contadores de presença/ausência
function updateAttendanceCounters() {
  const presentInputs = document.querySelectorAll(
    'input[value="present"]:checked'
  ).length;
  const absentInputs = document.querySelectorAll(
    'input[value="absent"]:checked'
  ).length;
  const justifiedInputs = document.querySelectorAll(
    'input[value="justified"]:checked'
  ).length;

  document.getElementById("presentCount").textContent = presentInputs;
  document.getElementById("absentCount").textContent =
    absentInputs + justifiedInputs;

  console.log(
    "Contadores atualizados: " +
      presentInputs +
      " presentes, " +
      absentInputs +
      " ausentes, " +
      justifiedInputs +
      " justificados"
  );
}
