// Sistema de Controle de Presença - Instituto da Oportunidade Social
// Gerenciamento de armazenamento local
class DataManager {
  constructor() {
    this.storageKey = "ios_attendance_system";
    this.initializeData();
  }

  // Inicializar dados do localStorage ou usar dados padrão
  initializeData() {
    try {
      const storedData = this.loadFromStorage();

      if (storedData && typeof storedData === "object") {
        // Carregar dados salvos com verificações de segurança
        window.users = Array.isArray(storedData.users) ? storedData.users : [];
        window.units = Array.isArray(storedData.units) ? storedData.units : [];
        window.courses = Array.isArray(storedData.courses)
          ? storedData.courses
          : [];
        window.classes = Array.isArray(storedData.classes)
          ? storedData.classes
          : [];
        window.students = Array.isArray(storedData.students)
          ? storedData.students
          : [];
        window.attendance =
          typeof storedData.attendance === "object" &&
          storedData.attendance !== null
            ? storedData.attendance
            : {};

        // Se dados básicos estão vazios, inicializar com padrões
        if (window.users.length === 0 || window.units.length === 0) {
          this.ensureDefaultData();
        }
      } else {
        this.initializeDefaultData();
        this.saveToStorage();
      }
    } catch (error) {
      console.error("💥 ERRO ao inicializar dados:", error);
      this.initializeDefaultData();
      this.saveToStorage();
    }

    // Verificar integridade após carregar
    setTimeout(() => {
      if (typeof window.verifyDataIntegrity === "function") {
        window.verifyDataIntegrity();
      }
    }, 200);
  }

  // Garantir que dados básicos existem
  ensureDefaultData() {
    if (!Array.isArray(window.users) || window.users.length === 0) {
      window.users = [
        {
          id: 1,
          name: "Administrador Master",
          cpf: "000.000.000-00",
          email: "admin@ios.org.br",
          password: "admin123",
          type: "admin",
          unitId: null,
          status: "active",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    if (!Array.isArray(window.units) || window.units.length === 0) {
      window.units = [
        {
          id: 1,
          name: "Unidade Centro - São Paulo",
          address: "Rua Principal, 123 - Centro, São Paulo - SP",
          phone: "(11) 3456-7890",
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Unidade Norte - Rio de Janeiro",
          address: "Av. Norte, 456 - Tijuca, Rio de Janeiro - RJ",
          phone: "(21) 3456-7891",
          createdAt: new Date().toISOString(),
        },
      ];
    }

    this.saveToStorage();
  }

  // Dados padrão para primeira execução
  initializeDefaultData() {
    window.users = [
      {
        id: 1,
        name: "Administrador Master",
        cpf: "000.000.000-00",
        email: "admin@ios.org.br",
        password: "admin123",
        type: "admin",
        unitId: null,
        status: "active",
        createdAt: new Date().toISOString(),
      },
    ];

    window.units = [
      {
        id: 1,
        name: "Unidade Centro - São Paulo",
        address: "Rua Principal, 123 - Centro, São Paulo - SP",
        phone: "(11) 3456-7890",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Unidade Norte - Rio de Janeiro",
        address: "Av. Norte, 456 - Tijuca, Rio de Janeiro - RJ",
        phone: "(21) 3456-7891",
        createdAt: new Date().toISOString(),
      },
    ];

    window.courses = [
      {
        id: 1,
        name: "Informática Básica",
        description:
          "Curso introdutório de informática com Windows, Word, Excel e Internet",
        duration: 120,
        unitId: 1,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Administração",
        description: "Fundamentos da administração de empresas",
        duration: 180,
        unitId: 1,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Marketing Digital",
        description: "Estratégias de marketing digital e redes sociais",
        duration: 100,
        unitId: 1,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Gestão Empresarial",
        description: "Gestão e liderança empresarial",
        duration: 200,
        unitId: 2,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        name: "Recursos Humanos",
        description: "Gestão de pessoas e recursos humanos",
        duration: 160,
        unitId: 2,
        status: "active",
        createdAt: new Date().toISOString(),
      },
    ];

    window.classes = [
      {
        id: 1,
        name: "Informática Básica - Turma A",
        unitId: 1,
        courseId: 1,
        instructor: "João Silva",
        year: 2025,
        semester: 1,
        students: [],
        createdAt: new Date().toISOString(),
        canDelete: true,
      },
    ];

    window.students = [];
    window.attendance = {};
  }

  // Salvar todos os dados no localStorage
  saveToStorage() {
    try {
      const dataToSave = {
        users: window.users || [],
        units: window.units || [],
        courses: window.courses || [],
        classes: window.classes || [],
        students: window.students || [],
        attendance: window.attendance || {},
        lastSaved: new Date().toISOString(),
      };

      localStorage.setItem(this.storageKey, JSON.stringify(dataToSave));

      // Mostrar indicador de salvamento
      this.showSaveIndicator();
    } catch (error) {
      console.error("❌ Erro ao salvar dados:", error);
      alert(
        "Erro ao salvar dados. Verifique o espaço disponível no navegador."
      );
    }
  }

  // Carregar dados do localStorage
  loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("❌ Erro ao carregar dados:", error);
      return null;
    }
  }

  // Limpar todos os dados (reset completo)
  clearAllData() {
    if (
      confirm(
        "⚠️ ATENÇÃO: Isso apagará TODOS os dados do sistema!\n\nTem certeza que deseja continuar?"
      )
    ) {
      localStorage.removeItem(this.storageKey);
      location.reload();
    }
  }

  // Exportar dados para backup
  exportData() {
    const data = this.loadFromStorage();
    if (data) {
      const dataStr = JSON.stringify(data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(dataBlob);
      link.download = `ios_backup_${
        new Date().toISOString().split("T")[0]
      }.json`;
      link.click();

      alert("✅ Backup exportado com sucesso!");
    }
  }

  // Importar dados de backup
  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        if (
          confirm("⚠️ Isso substituirá todos os dados atuais.\n\nContinuar?")
        ) {
          localStorage.setItem(this.storageKey, JSON.stringify(importedData));
          alert("✅ Dados importados com sucesso! A página será recarregada.");
          location.reload();
        }
      } catch (error) {
        alert("❌ Erro ao importar dados. Arquivo inválido.");
      }
    };
    reader.readAsText(file);
  }

  // Mostrar indicador visual de salvamento
  showSaveIndicator() {
    // Remove indicador anterior se existir
    const existingIndicator = document.getElementById("saveIndicator");
    if (existingIndicator) {
      existingIndicator.remove();
    }

    // Criar novo indicador
    const indicator = document.createElement("div");
    indicator.id = "saveIndicator";
    indicator.innerHTML = '<i class="fas fa-check"></i> Dados Salvos';
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
      color: white;
      padding: 10px 20px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
      z-index: 10000;
      font-weight: 600;
      font-size: 14px;
      opacity: 0;
      transform: translateY(-20px);
      transition: all 0.3s ease;
    `;

    document.body.appendChild(indicator);

    // Animar entrada
    setTimeout(() => {
      indicator.style.opacity = "1";
      indicator.style.transform = "translateY(0)";
    }, 100);

    // Remover após 3 segundos
    setTimeout(() => {
      indicator.style.opacity = "0";
      indicator.style.transform = "translateY(-20px)";
      setTimeout(() => indicator.remove(), 300);
    }, 3000);
  }

  // Auto-save periódico (opcional)
  enableAutoSave(intervalMinutes = 5) {
    setInterval(() => {
      this.saveToStorage();
    }, intervalMinutes * 60 * 1000);
  }
}

// Inicializar gerenciador de dados
const dataManager = new DataManager();

// Disponibilizar globalmente
window.dataManager = dataManager;

// Função helper para salvar dados (chamada após mudanças)
function saveData() {
  dataManager.saveToStorage();
}

// Auto-save a cada 2 minutos
dataManager.enableAutoSave(2);

// Salvar dados antes de sair da página
window.addEventListener("beforeunload", () => {
  dataManager.saveToStorage();
});

// Dados em memória (simulando banco de dados)
let currentUser = null;

// Estrutura de dados (será carregada pelo DataManager) - Usar window. para acessibilidade global
window.users = [];
window.units = [];
window.courses = [];
window.classes = [];
window.students = [];
window.attendance = {};

// Usuários de teste para compatibilidade
const testUsers = {
  "admin@ios.org.br": {
    password: "admin123",
    type: "admin",
    name: "Administrador Master",
    unitId: null,
  },
  "instrutor@ios.org.br": {
    password: "inst123",
    type: "instructor",
    name: "João Instrutor",
    unitId: 1,
  },
  "pedagogo@ios.org.br": {
    password: "ped123",
    type: "pedagogue",
    name: "Maria Pedagoga",
    unitId: 1,
  },
  "monitor@ios.org.br": {
    password: "mon123",
    type: "monitor",
    name: "Carlos Monitor",
    unitId: 1,
  },
};

// Funções de utilidade
function showElement(elementId) {
  document.getElementById(elementId).classList.remove("hidden");
}

function hideElement(elementId) {
  document.getElementById(elementId).classList.add("hidden");
}

function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type}`;
  alertDiv.innerHTML = `<i class="fas fa-${
    type === "error"
      ? "exclamation-triangle"
      : type === "success"
      ? "check-circle"
      : "info-circle"
  }"></i> ${message}`;

  const content = document.querySelector(".content");
  if (content) {
    content.insertBefore(alertDiv, content.firstChild);
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.remove();
      }
    }, 5000);
  }
}

function formatCPF(cpf) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function hasPermission(requiredLevel) {
  if (!currentUser) return false;

  const permissions = {
    admin: ["admin"],
    instructor: ["admin", "instructor", "pedagogue", "monitor"],
    unit: ["admin", "instructor", "pedagogue", "monitor"],
  };

  return permissions[requiredLevel]?.includes(currentUser.type) || false;
}

function checkUnitAccess(unitId) {
  if (!currentUser) return false;
  if (currentUser.type === "admin") return true;
  return currentUser.unitId === unitId;
}

// Funções de autenticação
function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userType = document.getElementById("userType").value;

  // Verificar usuários cadastrados primeiro
  const registeredUser = window.users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      u.type === userType &&
      u.status === "active"
  );

  if (registeredUser) {
    currentUser = {
      id: registeredUser.id,
      email: registeredUser.email,
      name: registeredUser.name,
      type: registeredUser.type,
      unitId: registeredUser.unitId,
    };
  } else if (
    testUsers[email] &&
    testUsers[email].password === password &&
    testUsers[email].type === userType
  ) {
    // Fallback para usuários de teste
    currentUser = {
      email: email,
      name: testUsers[email].name,
      type: userType,
      unitId: testUsers[email].unitId,
    };
  } else {
    showElement("loginAlert");
    return;
  }

  hideElement("loginScreen");
  showElement("mainSystem");
  updateUserInfo();
  updateNavigation();
  updateUIPermissions();
  loadDashboard();
  hideElement("loginAlert");
}

function logout() {
  currentUser = null;
  hideElement("mainSystem");
  showElement("loginScreen");
  document.getElementById("loginForm").reset();
}

function updateUserInfo() {
  if (!currentUser) return;

  // Atualizar o nome do usuário na header
  const userDisplayName = document.getElementById("userDisplayName");
  if (userDisplayName) {
    userDisplayName.textContent = currentUser.name;
  }

  // Atualizar o tipo/role do usuário na header
  const userDisplayRole = document.getElementById("userDisplayRole");
  if (userDisplayRole) {
    userDisplayRole.textContent = getUserRoleText(currentUser.type);
  }

  // Atualizar o avatar
  const userAvatar = document.getElementById("userAvatar");
  if (userAvatar) {
    userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
  }
}

function getUserRoleText(type) {
  const roles = {
    admin: "Administrador Master",
    instructor: "Instrutor",
    pedagogue: "Pedagogo",
    monitor: "Monitor",
  };
  return roles[type] || "Usuário";
}

function updateNavigation() {
  const usersTab = document.getElementById("usersTab");
  const unitsTab = document.getElementById("unitsTab");
  const reportsTab = document.getElementById("reportsTab");

  if (currentUser.type === "admin") {
    usersTab.style.display = "flex";
    unitsTab.style.display = "flex";
    reportsTab.style.display = "flex";
  } else {
    usersTab.style.display = "none";
    unitsTab.style.display = "none";
    reportsTab.style.display = "none";
  }
}

function updateUIPermissions() {
  const userRole = currentUser?.type;

  // Aba de usuários (apenas admin)
  const usersTab = document.getElementById("usersTab");
  if (usersTab) {
    usersTab.style.display = userRole === "admin" ? "flex" : "none";
  }

  // Aba de unidades (apenas admin)
  const unitsTab = document.getElementById("unitsTab");
  if (unitsTab) {
    unitsTab.style.display = userRole === "admin" ? "flex" : "none";
  }

  // Aba de cursos (apenas admin)
  const coursesTab = document.getElementById("coursesTab");
  if (coursesTab) {
    coursesTab.style.display = userRole === "admin" ? "flex" : "none";
  }

  // Aba de relatórios (apenas admin)
  const reportsTab = document.getElementById("reportsTab");
  if (reportsTab) {
    reportsTab.style.display = userRole === "admin" ? "flex" : "none";
  }

  // Aba de gerenciamento de dados (apenas admin)
  const dataManagementTab = document.getElementById("dataManagementTab");
  if (dataManagementTab) {
    dataManagementTab.style.display = userRole === "admin" ? "flex" : "none";
  }
}

// Funções de navegação
function showPage(pageId) {
  // Verificar permissões
  if (
    (pageId === "users" ||
      pageId === "units" ||
      pageId === "courses" ||
      pageId === "reports" ||
      pageId === "data-management") &&
    currentUser.type !== "admin"
  ) {
    showAlert(
      "Acesso negado! Apenas administradores podem acessar esta seção.",
      "error"
    );
    return;
  }

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  document.getElementById(pageId + "Page").classList.add("active");

  const activeTab = [...document.querySelectorAll(".nav-tab")].find((tab) =>
    tab.getAttribute("onclick")?.includes(pageId)
  );
  if (activeTab) {
    activeTab.classList.add("active");
  }

  switch (pageId) {
    case "dashboard":
      loadDashboard();
      break;
    case "users":
      loadUsers();
      break;
    case "units":
      loadUnits();
      break;
    case "courses":
      loadCourses();
      break;
    case "classes":
      loadClasses();
      break;
    case "attendance":
      loadAttendancePage();
      break;
    case "reports":
      loadReportsPage();
      break;
    case "data-management":
      updateDataManagementPage();
      break;
  }
}

// Funções do Dashboard
function loadDashboard() {
  // Estatísticas básicas
  document.getElementById("totalUnits").textContent = window.units.length;
  document.getElementById("totalClasses").textContent = window.classes.length;
  document.getElementById("totalStudents").textContent = window.students.filter(
    (s) => s.status === "active"
  ).length;

  // Presenças hoje
  const today = new Date().toISOString().split("T")[0];
  const todayAttendanceKeys = Object.keys(attendance).filter((key) =>
    key.includes(today)
  );
  let todayAttendanceCount = 0;

  todayAttendanceKeys.forEach((key) => {
    const dayAttendance = window.attendance[key];
    todayAttendanceCount += Object.values(dayAttendance).filter(
      (record) => record.status === "present"
    ).length;
  });

  document.getElementById("todayAttendance").textContent = todayAttendanceCount;

  // Estatísticas avançadas para admin
  if (currentUser.type === "admin") {
    loadAdminDashboard();
  } else {
    loadInstructorDashboard();
  }
}

function loadAdminDashboard() {
  // Mostrar cards administrativos
  document.getElementById("highestAttendanceCard").style.display = "block";
  document.getElementById("highestAbsenceCard").style.display = "block";
  document.getElementById("dropoutsCard").style.display = "block";

  // Calcular estatísticas
  const dropouts = window.students.filter((s) => s.status === "dropout").length;
  document.getElementById("totalDropouts").textContent = dropouts;

  // Calcular frequências por unidade
  const unitStats = calculateUnitStats();

  if (unitStats.length > 0) {
    const highest = unitStats.reduce((prev, current) =>
      prev.attendanceRate > current.attendanceRate ? prev : current
    );
    const lowest = unitStats.reduce((prev, current) =>
      prev.attendanceRate < current.attendanceRate ? prev : current
    );

    document.getElementById(
      "highestAttendance"
    ).textContent = `${highest.name} (${highest.attendanceRate}%)`;
    document.getElementById("highestAbsence").textContent = `${lowest.name} (${(
      100 - lowest.attendanceRate
    ).toFixed(1)}%)`;
  }
}

function loadInstructorDashboard() {
  // Ocultar cards administrativos
  document.getElementById("highestAttendanceCard").style.display = "none";
  document.getElementById("highestAbsenceCard").style.display = "none";
  document.getElementById("dropoutsCard").style.display = "none";
}

function calculateUnitStats() {
  return window.units.map((unit) => {
    const unitClasses = window.classes.filter((c) => c.unitId === unit.id);

    let totalAttendance = 0;
    let totalPossible = 0;

    unitwindow.classes.forEach((cls) => {
      Object.keys(attendance).forEach((key) => {
        if (key.startsWith(`${cls.id}-`)) {
          const dayAttendance = window.attendance[key];
          Object.values(dayAttendance).forEach((record) => {
            totalPossible++;
            if (record.status === "present") totalAttendance++;
          });
        }
      });
    });

    const attendanceRate =
      totalPossible > 0
        ? ((totalAttendance / totalPossible) * 100).toFixed(1)
        : 0;

    return {
      id: unit.id,
      name: unit.name,
      attendanceRate: parseFloat(attendanceRate),
    };
  });
}

// Funções de Usuários
function loadUsers() {
  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  loadUserUnitOptions();

  const tbody = document.getElementById("usersTableBody");
  if (!tbody) {
    return;
  }

  tbody.innerHTML = "";

  window.users.forEach((user) => {
    const unit = window.units.find((u) => u.id === user.unitId);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div style="font-weight: 600; margin-bottom: 4px;">${
          user.name || "Nome não definido"
        }</div>
        <div style="color: #64748b; font-size: 0.75rem;">ID: ${user.id}</div>
      </td>
      <td>${user.cpf || "N/A"}</td>
      <td>
        <div style="font-weight: 500;">${user.email || "N/A"}</div>
        <div style="color: #64748b; font-size: 0.75rem; margin-top: 2px;">Senha: ${
          user.password || "N/A"
        }</div>
      </td>
      <td>
        <div style="margin-bottom: 6px;">
          <span class="user-type-badge user-type-${user.type || "undefined"}">
            ${getUserRoleText(user.type)}
          </span>
        </div>
        <div style="color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">
          ${user.type || "undefined"}
        </div>
      </td>
      <td>
        <div style="font-weight: 500;">${
          unit ? unit.name : "Todas as Unidades"
        }</div>
        ${
          unit
            ? `<div style="color: #64748b; font-size: 0.75rem; margin-top: 2px;">${unit.address}</div>`
            : ""
        }
      </td>
      <td>
        <span class="status-badge ${
          user.status === "active" ? "status-active" : "status-inactive"
        }">
          <i class="fas fa-${
            user.status === "active" ? "check-circle" : "times-circle"
          }"></i>
          ${user.status === "active" ? "Ativo" : "Inativo"}
        </span>
      </td>
      <td>
        <button class="btn btn-danger" onclick="toggleUserStatus(${
          user.id
        })" style="margin-right: 5px; padding: 6px 12px; font-size: 12px;">
          <i class="fas fa-${user.status === "active" ? "ban" : "check"}"></i> 
          ${user.status === "active" ? "Desativar" : "Ativar"}
        </button>
        <button class="btn" onclick="resetUserPassword(${
          user.id
        })" style="padding: 6px 12px; font-size: 12px;">
          <i class="fas fa-key"></i> Reset Senha
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function loadUserUnitOptions() {
  const select = document.getElementById("userUnit");
  if (!select) {
    return;
  }

  select.innerHTML = '<option value="">Selecione...</option>';

  window.units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });
}

function addUser(event) {
  if (event) {
    event.preventDefault();
  }

  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  const name = document.getElementById("userName").value.trim();
  const cpf = document.getElementById("userCpf").value.trim();
  const email = document.getElementById("userEmailCreate").value.trim();
  const password = document.getElementById("userPassword").value.trim();
  const type = document.getElementById("userRole").value;
  const unitId = document.getElementById("userUnit").value;

  if (!name || !cpf || !email || !password || !type) {
    showAlert("Todos os campos são obrigatórios!", "error");
    return;
  }

  if (!email.includes("@ios.org.br")) {
    showAlert("E-mail deve ser do domínio @ios.org.br", "error");
    return;
  }

  if (window.users.find((u) => u.email === email)) {
    showAlert("E-mail já cadastrado!", "error");
    return;
  }

  if (window.users.find((u) => u.cpf === cpf)) {
    showAlert("CPF já cadastrado!", "error");
    return;
  }

  if (type !== "admin" && !unitId) {
    showAlert("Selecione uma unidade para usuários não-admin", "error");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    cpf: formatCPF(cpf),
    email,
    password,
    type,
    unitId: type === "admin" ? null : parseInt(unitId),
    status: "active",
    createdAt: new Date().toISOString(),
  };

  window.users.push(newUser);
  saveData();
  document.getElementById("userForm").reset();
  loadUsers();
  showAlert("Usuário cadastrado com sucesso!", "success");
}

function toggleUserStatus(userId) {
  const user = window.users.find((u) => u.id === userId);
  if (!user) return;

  if (user.type === "admin" && user.email === "admin@ios.org.br") {
    showAlert("Não é possível desativar o administrador principal!", "error");
    return;
  }

  user.status = user.status === "active" ? "inactive" : "active";
  saveData();
  loadUsers();
  showAlert(
    `Usuário ${
      user.status === "active" ? "ativado" : "desativado"
    } com sucesso!`,
    "success"
  );
}

function resetUserPassword(userId) {
  const user = window.users.find((u) => u.id === userId);
  if (!user) return;

  const newPassword = prompt("Digite a nova senha temporária:");
  if (newPassword && newPassword.length >= 6) {
    user.password = newPassword;
    saveData();
    showAlert("Senha alterada com sucesso!", "success");
  } else if (newPassword) {
    showAlert("A senha deve ter pelo menos 6 caracteres!", "error");
  }
}

// Funções de Unidades
function loadUnits() {
  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  const tbody = document.getElementById("unitsTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  window.units.forEach((unit) => {
    const unitClasses = window.classes.filter((cls) => cls.unitId === unit.id);
    const unitCourses = window.courses.filter(
      (course) => course.unitId === unit.id && course.status === "active"
    );

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div style="font-weight: 600; margin-bottom: 8px;">${unit.name}</div>
        <div style="color: #64748b; font-size: 0.9rem;">${unit.address}</div>
      </td>
      <td>${unit.phone}</td>
      <td>
        <div style="margin-bottom: 10px;">
          <strong style="color: #374151; font-size: 0.9rem;">Cursos Disponíveis:</strong>
          <div style="margin-top: 5px;">
            ${
              unitwindow.courses.length > 0
                ? unitCourses
                    .map(
                      (course) =>
                        `<span class="course-badge" title="${course.description}">${course.name}</span>`
                    )
                    .join("")
                : '<span style="color: #9ca3af; font-style: italic;">Nenhum curso cadastrado</span>'
            }
          </div>
        </div>
        <div>
          <small style="color: #64748b;">
            <i class="fas fa-graduation-cap"></i> ${
              unitwindow.classes.length
            } turma(s) • 
            <i class="fas fa-book"></i> ${unitwindow.courses.length} curso(s)
          </small>
        </div>
      </td>
      <td>
        <button class="btn" onclick="editUnit(${
          unit.id
        })" style="margin-right: 5px;">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn btn-danger" onclick="deleteUnit(${unit.id})">
          <i class="fas fa-trash"></i> Excluir
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function addUnit(event) {
  event.preventDefault();

  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  const name = document.getElementById("unitName").value;
  const address = document.getElementById("unitAddress").value;
  const phone = document.getElementById("unitPhone").value;

  if (!name || !address || !phone) {
    showAlert("Todos os campos são obrigatórios!", "error");
    return;
  }

  const newUnit = {
    id: Date.now(),
    name,
    address,
    phone,
    createdAt: new Date().toISOString(),
  };

  window.units.push(newUnit);
  saveData();
  document.getElementById("unitForm").reset();
  loadUnits();
  loadUserUnitOptions();
  showAlert("Unidade cadastrada com sucesso!", "success");
}

function deleteUnit(unitId) {
  if (
    !confirm(
      "Tem certeza que deseja excluir esta unidade? Isso afetará todas as turmas e usuários associados."
    )
  ) {
    return;
  }

  // Verificar se há turmas associadas
  const associatedClasses = window.classes.filter(
    (cls) => cls.unitId === unitId
  );
  if (associatedwindow.classes.length > 0) {
    showAlert(
      "Não é possível excluir unidade com turmas cadastradas!",
      "error"
    );
    return;
  }

  // Verificar se há usuários associados
  const associatedUsers = window.users.filter((u) => u.unitId === unitId);
  if (associatedUsers.length > 0) {
    showAlert(
      "Não é possível excluir unidade com usuários associados!",
      "error"
    );
    return;
  }

  window.units = window.units.filter((unit) => unit.id !== unitId);
  saveData();
  loadUnits();
  loadUserUnitOptions();
  showAlert("Unidade excluída com sucesso!", "success");
}

function editUnit(unitId) {
  const unit = window.units.find((u) => u.id === unitId);
  if (!unit) return;

  const newName = prompt("Nome da unidade:", unit.name);
  if (newName && newName !== unit.name) {
    unit.name = newName;
    saveData();
    loadUnits();
    showAlert("Unidade atualizada com sucesso!", "success");
  }
}

// Funções para gerenciamento de cursos
let editingCourseId = null;

function loadCourses() {
  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  loadCourseUnitOptions();
  loadFilterCourseUnitOptions();

  const filterUnitId = document.getElementById("filterCourseUnit")?.value;
  let filteredCourses = window.courses;

  if (filterUnitId) {
    filteredCourses = window.courses.filter(
      (course) => course.unitId === parseInt(filterUnitId)
    );
  }

  const tbody = document.getElementById("coursesTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  filteredwindow.courses.forEach((course) => {
    const unit = window.units.find((u) => u.id === course.unitId);
    const unitName = unit ? unit.name : "Unidade não encontrada";

    const coursesClasses = window.classes.filter(
      (c) => c.courseId === course.id
    );
    const classesCount = courseswindow.classes.length;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <div style="font-weight: 600;">${course.name}</div>
        <div style="color: #64748b; font-size: 0.9rem; margin-top: 4px;">${
          course.description || "Sem descrição"
        }</div>
      </td>
      <td>${unitName}</td>
      <td>${course.duration}h</td>
      <td>
        <span class="status-badge ${
          course.status === "active" ? "status-active" : "status-inactive"
        }">
          ${course.status === "active" ? "Ativo" : "Inativo"}
        </span>
      </td>
      <td>
        <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">
          ${classesCount} turma${classesCount !== 1 ? "s" : ""}
        </span>
      </td>
      <td>
        <button class="btn" onclick="editCourse(${
          course.id
        })" style="padding: 6px 12px; margin-right: 5px;">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn" onclick="toggleCourseStatus(${course.id})" 
                style="padding: 6px 12px; background: ${
                  course.status === "active" ? "#f56565" : "#48bb78"
                };">
          <i class="fas fa-${
            course.status === "active" ? "pause" : "play"
          }"></i> 
          ${course.status === "active" ? "Desativar" : "Ativar"}
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  updateCoursesStats();
}

function loadCourseUnitOptions() {
  const select = document.getElementById("courseUnit");
  if (!select) return;

  select.innerHTML = '<option value="">Selecione uma unidade...</option>';
  window.units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });
}

function loadFilterCourseUnitOptions() {
  const select = document.getElementById("filterCourseUnit");
  if (!select) return;

  const currentValue = select.value;
  select.innerHTML = '<option value="">Todas as unidades</option>';

  window.units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });

  select.value = currentValue;
}

function addCourse(event) {
  event.preventDefault();

  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  const name = document.getElementById("courseName").value.trim();
  const description = document.getElementById("courseDescription").value.trim();
  const duration = parseInt(document.getElementById("courseDuration").value);
  const unitId = parseInt(document.getElementById("courseUnit").value);

  if (!name || !duration || !unitId) {
    showAlert("Preencha todos os campos obrigatórios!", "error");
    return;
  }

  // Verificar se já existe curso com mesmo nome na mesma unidade
  if (
    window.courses.find(
      (c) => c.name === name && c.unitId === unitId && c.id !== editingCourseId
    )
  ) {
    showAlert("Já existe um curso com este nome nesta unidade!", "error");
    return;
  }

  if (editingCourseId) {
    // Editando curso existente
    const courseIndex = window.courses.findIndex(
      (c) => c.id === editingCourseId
    );
    if (courseIndex !== -1) {
      courses[courseIndex] = {
        ...courses[courseIndex],
        name,
        description,
        duration,
        unitId,
        updatedAt: new Date().toISOString(),
      };
      showAlert("Curso atualizado com sucesso!", "success");
      cancelCourseEdit();
    }
  } else {
    // Criando novo curso
    const newCourse = {
      id: Date.now(),
      name,
      description,
      duration,
      unitId,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    window.courses.push(newCourse);
    showAlert("Curso cadastrado com sucesso!", "success");
  }

  saveData();
  document.getElementById("courseForm").reset();
  loadCourses();
}

function editCourse(courseId) {
  const course = window.courses.find((c) => c.id === courseId);
  if (!course) return;

  editingCourseId = courseId;

  // Preencher formulário
  document.getElementById("courseName").value = course.name;
  document.getElementById("courseDescription").value = course.description || "";
  document.getElementById("courseDuration").value = course.duration;
  document.getElementById("courseUnit").value = course.unitId;

  // Mostrar botão cancelar e alterar texto do submit
  const cancelBtn = document.getElementById("cancelCourseEdit");
  if (cancelBtn) {
    cancelBtn.style.display = "inline-flex";
  }

  const submitBtn = document.querySelector('#courseForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Atualizar Curso';
  }

  // Scroll para o formulário
  document.getElementById("courseForm").scrollIntoView({ behavior: "smooth" });
}

function cancelCourseEdit() {
  editingCourseId = null;
  document.getElementById("courseForm").reset();

  const cancelBtn = document.getElementById("cancelCourseEdit");
  if (cancelBtn) {
    cancelBtn.style.display = "none";
  }

  const submitBtn = document.querySelector('#courseForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Cadastrar Curso';
  }
}

function toggleCourseStatus(courseId) {
  const course = window.courses.find((c) => c.id === courseId);
  if (!course) return;

  const newStatus = course.status === "active" ? "inactive" : "active";

  // Se está desativando, verificar se há turmas ativas
  if (newStatus === "inactive") {
    const activeCourseClasses = window.classes.filter(
      (c) => c.courseId === courseId
    );
    if (activeCoursewindow.classes.length > 0) {
      if (
        !confirm(
          `Este curso possui ${activeCoursewindow.classes.length} turma(s) ativa(s). Desativar mesmo assim?`
        )
      ) {
        return;
      }
    }
  }

  course.status = newStatus;
  course.updatedAt = new Date().toISOString();

  saveData();
  loadCourses();
  showAlert(
    `Curso ${newStatus === "active" ? "ativado" : "desativado"} com sucesso!`,
    "success"
  );
}

function updateCoursesStats() {
  const totalCoursesElement = document.getElementById("totalCourses");
  if (totalCoursesElement) {
    totalCoursesElement.textContent = window.courses.length;
  }

  const activeCoursesElement = document.getElementById("activeCourses");
  if (activeCoursesElement) {
    const activeCourses = window.courses.filter((c) => c.status === "active");
    activeCoursesElement.textContent = activewindow.courses.length;
  }
}

// Funções de Turmas (Classes)
// Funções de turmas implementadas em advanced-functions.js

// Funções de Presença (Attendance)
function loadAttendancePage() {
  // Implementação em advanced-functions.js
}

// Funções de Relatórios
function loadReportsPage() {
  // Implementação em advanced-functions.js
}

// Funções de Gerenciamento de Dados
function updateDataManagementPage() {
  if (!window.dataManager) return;

  // Calcular tamanho dos dados
  const data = window.dataManager.loadFromStorage();
  const dataSize = data ? JSON.stringify(data).length : 0;
  const sizeInKB = (dataSize / 1024).toFixed(2);

  // Atualizar elementos da interface
  const dataSizeElement = document.getElementById("dataStorageSize");
  if (dataSizeElement) dataSizeElement.textContent = `${sizeInKB} KB`;

  // Último salvamento
  const lastSaveElement = document.getElementById("lastSaveTime");
  if (lastSaveElement && data && data.lastSaved) {
    const lastSave = new Date(data.lastSaved);
    lastSaveElement.textContent = lastSave.toLocaleString();
  }

  // Contadores
  const usersCountElement = document.getElementById("usersCount");
  if (usersCountElement) usersCountElement.textContent = window.users.length;

  const unitsCountElement = document.getElementById("unitsCount");
  if (unitsCountElement) unitsCountElement.textContent = window.units.length;

  const coursesCountElement = document.getElementById("coursesCount");
  if (coursesCountElement)
    coursesCountElement.textContent = window.courses.length;

  const classesCountElement = document.getElementById("classesCount");
  if (classesCountElement)
    classesCountElement.textContent = window.classes.length;

  const studentsCountElement = document.getElementById("studentsCount");
  if (studentsCountElement)
    studentsCountElement.textContent = window.students.length;

  const attendanceCountElement = document.getElementById("attendanceCount");
  if (attendanceCountElement) {
    const attendanceRecords = Object.keys(attendance).reduce((total, key) => {
      return total + Object.keys(window.attendance[key]).length;
    }, 0);
    attendanceCountElement.textContent = attendanceRecords;
  }
}

function exportDataBackup() {
  if (window.dataManager) {
    window.dataManager.exportData();
  } else {
    showAlert("Erro: Sistema de dados não disponível", "error");
  }
}

function importDataBackup(input) {
  if (input.files && input.files[0] && window.dataManager) {
    window.dataManager.importData(input.files[0]);
  } else if (!window.dataManager) {
    showAlert("Erro: Sistema de dados não disponível", "error");
  }
}

function clearAllSystemData() {
  if (window.dataManager) {
    window.dataManager.clearAllData();
  } else {
    showAlert("Erro: Sistema de dados não disponível", "error");
  }
}

function saveDataManually() {
  if (window.dataManager) {
    window.dataManager.saveToStorage();
    showAlert("Dados salvos manualmente com sucesso!", "success");
  } else {
    showAlert("Erro: Sistema de dados não disponível", "error");
  }
}

// Funções globais adicionais para compatibilidade
window.deleteUnit = deleteUnit;
window.editUnit = editUnit;
window.addUnit = addUnit;
window.loadUnits = loadUnits;
window.addCourse = addCourse;
window.editCourse = editCourse;
window.cancelCourseEdit = cancelCourseEdit;
window.toggleCourseStatus = toggleCourseStatus;
window.loadCourses = loadCourses;
window.addClass = addClass;
window.loadClasses = loadClasses;
window.loadAttendancePage = loadAttendancePage;
window.loadReportsPage = loadReportsPage;
window.updateDataManagementPage = updateDataManagementPage;
window.exportDataBackup = exportDataBackup;
window.importDataBackup = importDataBackup;
window.clearAllSystemData = clearAllSystemData;
window.saveDataManually = saveDataManually;

// Event Listeners consolidados
document.addEventListener("DOMContentLoaded", function () {
  try {
    const today = new Date().toISOString().split("T")[0];
    const attendanceDateElement = document.getElementById("attendanceDate");
    if (attendanceDateElement) {
      attendanceDateElement.value = today;
    }

    // Event listeners para formulários
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", login);
    }

    const userForm = document.getElementById("userForm");
    if (userForm) {
      userForm.addEventListener("submit", addUser);
    }

    const unitForm = document.getElementById("unitForm");
    if (unitForm) {
      unitForm.addEventListener("submit", addUnit);
    }

    const classForm = document.getElementById("classForm");
    if (classForm) {
      classForm.addEventListener("submit", addClass);
    }

    const courseForm = document.getElementById("courseForm");
    if (courseForm) {
      courseForm.addEventListener("submit", addCourse);
    }

    // Aplicar máscara de CPF
    const userCpfInput = document.getElementById("userCpf");
    if (userCpfInput) {
      userCpfInput.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})/, "$1-$2");
        e.target.value = value;
      });
    }

    // Carregar dashboard
    loadDashboard();
  } catch (error) {
    console.error("💥 ERRO CRÍTICO na inicialização:", error);
    showAlert(
      "Erro crítico na inicialização do sistema. Verifique o console.",
      "error"
    );
  }
});
