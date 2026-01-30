// Função para visualizar histórico de presenças
function viewAttendanceHistory() {
  const classId = parseInt(
    document.getElementById("attendanceClassSelect").value
  );

  if (!classId) {
    showAlert("Selecione uma turma para visualizar o histórico!", "error");
    return;
  }

  const modal = document.getElementById("attendanceHistoryModal");
  const historyContent = modal.querySelector(".modal-body");

  // Filtrar registros de presença para a turma selecionada
  const classAttendanceKeys = Object.keys(attendance).filter((key) =>
    key.startsWith(`${classId}-`)
  );

  if (classAttendanceKeys.length === 0) {
    historyContent.innerHTML =
      '<div class="alert alert-info">Nenhum registro de presença encontrado para esta turma.</div>';
    modal.style.display = "block";
    return;
  }

  // Ordenar por data (mais recente primeiro)
  classAttendanceKeys.sort().reverse();

  let historyHtml = `
    <div class="history-dates">
      <h4>Datas de Registro</h4>
      <ul class="date-list">
  `;

  classAttendanceKeys.forEach((key) => {
    const date = key.split("-")[1]; // Formato: "YYYY-MM-DD"
    const formattedDate = new Date(date).toLocaleDateString("pt-BR");
    historyHtml += `<li><a href="#" onclick="showAttendanceDetails('${key}')">${formattedDate}</a></li>`;
  });

  historyHtml += `
      </ul>
    </div>
    <div id="attendanceDetails" class="attendance-details">
      <h4>Selecione uma data para ver os detalhes</h4>
    </div>
  `;

  historyContent.innerHTML = historyHtml;
  modal.style.display = "block";
}

// Função para fechar o modal de histórico
function closeAttendanceHistory() {
  document.getElementById("attendanceHistoryModal").style.display = "none";
}

// Função para mostrar detalhes de uma data específica
function showAttendanceDetails(attendanceKey) {
  const dayAttendance = attendance[attendanceKey];
  if (!dayAttendance) return;

  const detailsContainer = document.getElementById("attendanceDetails");

  // Obter informações da turma
  const classId = parseInt(attendanceKey.split("-")[0]);
  const date = attendanceKey.split("-")[1];
  const formattedDate = new Date(date).toLocaleDateString("pt-BR");
  const classInfo = classes.find((c) => c.id === classId);

  let detailsHtml = `
    <h4>Registro de ${formattedDate}</h4>
    <div class="class-details">
      <p><strong>Turma:</strong> ${classInfo ? classInfo.name : "N/A"}</p>
    </div>
    
    <table class="attendance-table">
      <thead>
        <tr>
          <th>Estudante</th>
          <th>Status</th>
          <th>Observação</th>
        </tr>
      </thead>
      <tbody>
  `;

  Object.keys(dayAttendance).forEach((studentId) => {
    if (studentId === "lessonDetails") return; // Pular detalhes da aula

    const record = dayAttendance[studentId];
    const statusClass =
      record.status === "present"
        ? "present"
        : record.status === "justified"
        ? "justified"
        : "absent";
    const statusText =
      record.status === "present"
        ? "Presente"
        : record.status === "justified"
        ? "Justificado"
        : "Ausente";

    detailsHtml += `
      <tr>
        <td>${record.studentName}</td>
        <td class="${statusClass}">${statusText}</td>
        <td>${record.note || "-"}</td>
      </tr>
    `;
  });

  detailsHtml += `
      </tbody>
    </table>
  `;

  detailsContainer.innerHTML = detailsHtml;
}

// Função para exportar lista de presença
function exportAttendanceList() {
  const classId = parseInt(
    document.getElementById("attendanceClassSelect").value
  );
  const attendanceDate = document.getElementById("attendanceDate").value;

  if (!classId || !attendanceDate) {
    showAlert("Selecione uma turma e data para exportar!", "error");
    return;
  }

  const attendanceKey = `${classId}-${attendanceDate}`;
  const dayAttendance = attendance[attendanceKey];

  if (
    !dayAttendance ||
    Object.keys(dayAttendance).filter((key) => key !== "lessonDetails")
      .length === 0
  ) {
    showAlert("Nenhum registro de presença encontrado para exportar!", "error");
    return;
  }

  // Obter informações da turma e unidade
  const classInfo = classes.find((c) => c.id === classId);
  const unitInfo = units.find((u) => u.id === classInfo.unitId);
  const formattedDate = new Date(attendanceDate).toLocaleDateString("pt-BR");

  // Criar dados para exportação
  const wb = XLSX.utils.book_new();

  // Dados dos estudantes
  const studentsData = [];

  Object.keys(dayAttendance).forEach((studentId) => {
    if (studentId === "lessonDetails") return; // Pular detalhes da aula

    const record = dayAttendance[studentId];
    studentsData.push({
      ID: record.studentId,
      Nome: record.studentName,
      Status:
        record.status === "present"
          ? "Presente"
          : record.status === "justified"
          ? "Justificado"
          : "Ausente",
      Observação: record.note || "",
    });
  });

  const ws = XLSX.utils.json_to_sheet(studentsData);

  // Adicionar informações da turma no topo
  XLSX.utils.sheet_add_aoa(
    ws,
    [
      [`Instituto da Oportunidade Social - Lista de Presença`],
      [`Unidade: ${unitInfo ? unitInfo.name : "N/A"}`],
      [`Turma: ${classInfo ? classInfo.name : "N/A"}`],
      [`Data: ${formattedDate}`],
      [`Instrutor: ${document.getElementById("attendanceInstructor").value}`],
      [""],
    ],
    { origin: "A1" }
  );

  XLSX.utils.book_append_sheet(wb, ws, "Lista de Presença");

  // Exportar arquivo
  XLSX.writeFile(
    wb,
    `presenca_${
      classInfo ? classInfo.name.replace(/\s+/g, "_") : classId
    }_${attendanceDate}.xlsx`
  );

  showAlert("Lista de presença exportada com sucesso!", "success");
} // Função para marcar todos os estudantes como presentes
function markAllPresent() {
  const radios = document.querySelectorAll('input[value="present"]');
  radios.forEach((radio) => {
    radio.checked = true;
  });
  updateAttendanceCounters();
  showAlert("Todos os estudantes marcados como presentes!", "success");
}

// Função para marcar todos os estudantes como ausentes
function markAllAbsent() {
  const radios = document.querySelectorAll('input[value="absent"]');
  radios.forEach((radio) => {
    radio.checked = true;
  });
  updateAttendanceCounters();
  showAlert("Todos os estudantes marcados como ausentes!", "warning");
}

// Função para limpar todas as marcações de presença
function clearAllAttendance() {
  const radios = document.querySelectorAll(
    'input[type="radio"][name^="attendance_"]'
  );
  radios.forEach((radio) => {
    radio.checked = false;
  });
  updateAttendanceCounters();
  showAlert("Todas as marcações de presença foram limpas!", "info");
}

// Função para filtrar estudantes na lista de chamada
function filterStudents() {
  const searchText = document
    .getElementById("studentSearch")
    .value.toLowerCase();
  const studentCards = document.querySelectorAll(".student-card");

  studentCards.forEach((card) => {
    const studentName = card
      .querySelector(".student-name")
      .textContent.toLowerCase();
    if (studentName.includes(searchText)) {
      card.style.display = ""; // Mostra o card
    } else {
      card.style.display = "none"; // Esconde o card
    }
  });
}
