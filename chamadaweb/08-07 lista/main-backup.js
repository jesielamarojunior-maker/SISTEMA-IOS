// Sistema de Controle de Presença - Instituto da Oportunidade Social
// Gerenciamento de armazenamento local
class DataManager {
  constructor() {
    this.storageKey = "ios_attendance_system";
    this.initializeData();
  }

  // Inicializar dados do localStorage ou usar dados padrão
  initializeData() {
    console.log("🚀 Inicializando DataManager...");

    try {
      const storedData = this.loadFromStorage();

      if (storedData && typeof storedData === "object") {
        console.log("📦 Dados encontrados no localStorage:", storedData);

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

        console.log("✅ Dados carregados do localStorage");
        console.log("- Users:", window.users.length);
        console.log("- Units:", window.units.length);
        console.log("- Courses:", window.courses.length);
        console.log("- Classes:", window.classes.length);
        console.log("- Students:", window.students.length);

        // Se dados básicos estão vazios, inicializar com padrões
        if (window.users.length === 0 || window.units.length === 0) {
          console.log("⚠️ Dados básicos ausentes, adicionando dados padrão...");
          this.ensureDefaultData();
        }
      } else {
        console.log("📝 Primeira execução - inicializando dados padrão");
        this.initializeDefaultData();
        this.saveToStorage();
      }
    } catch (error) {
      console.error("💥 ERRO ao inicializar dados:", error);
      console.log("� Reinicializando com dados padrão...");
      this.initializeDefaultData();
      this.saveToStorage();
    }

    // Verificar integridade após carregar
    setTimeout(() => {
      if (typeof window.verifyDataIntegrity === "function") {
        const isValid = window.verifyDataIntegrity();
        if (!isValid) {
          console.log("🔄 Dados corrigidos pela verificação de integridade");
        }
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
      console.log(
        "💾 Dados salvos no localStorage:",
        new Date().toLocaleString()
      );

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
    console.log(`🔄 Auto-save habilitado: ${intervalMinutes} minutos`);
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

// Estrutura de dados (será carregada pelo DataManager)
let users = [];

let units = [];

let courses = [];

let classes = [];

let students = [];

let attendance = {};

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

  console.log("Tentativa de login:", { email, userType, password: "***" });
  console.log(
    "Usuários disponíveis:",
    users.map((u) => ({ email: u.email, type: u.type, status: u.status }))
  );

  // Verificar usuários cadastrados primeiro
  const registeredUser = users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      u.type === userType &&
      u.status === "active"
  );

  if (registeredUser) {
    console.log(
      "✅ Login bem-sucedido com usuário cadastrado:",
      registeredUser.name
    );
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
    console.log("✅ Login bem-sucedido com usuário de teste");
    // Fallback para usuários de teste
    currentUser = {
      email: email,
      name: testUsers[email].name,
      type: userType,
      unitId: testUsers[email].unitId,
    };
  } else {
    console.log("❌ Falha no login - credenciais incorretas");
    showElement("loginAlert");
    return;
  }

  hideElement("loginScreen");
  showElement("mainSystem");
  updateUserInfo();
  updateNavigation();
  updateUIPermissions(); // Atualizar permissões das abas
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

  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("userRole").textContent = getUserRoleText(
    currentUser.type
  );
  document.getElementById("userAvatar").textContent = currentUser.name
    .charAt(0)
    .toUpperCase();
}

function getUserRoleText(type) {
  console.log("getUserRoleText chamado com:", type);
  const roles = {
    admin: "Administrador Master",
    instructor: "Instrutor",
    pedagogue: "Pedagogo",
    monitor: "Monitor",
  };
  const result = roles[type] || "Usuário";
  console.log("Resultado:", result);
  return result;
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
  document.getElementById("totalUnits").textContent = units.length;
  document.getElementById("totalClasses").textContent = classes.length;
  document.getElementById("totalStudents").textContent = students.filter(
    (s) => s.status === "active"
  ).length;

  // Presenças hoje
  const today = new Date().toISOString().split("T")[0];
  const todayAttendanceKeys = Object.keys(attendance).filter((key) =>
    key.includes(today)
  );
  let todayAttendanceCount = 0;

  todayAttendanceKeys.forEach((key) => {
    const dayAttendance = attendance[key];
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
  const dropouts = students.filter((s) => s.status === "dropout").length;
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
  return units.map((unit) => {
    const unitClasses = classes.filter((c) => c.unitId === unit.id);

    let totalAttendance = 0;
    let totalPossible = 0;

    unitClasses.forEach((cls) => {
      Object.keys(attendance).forEach((key) => {
        if (key.startsWith(`${cls.id}-`)) {
          const dayAttendance = attendance[key];
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
  console.log("=== INÍCIO loadUsers ===");

  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  // Verificar e corrigir dados se necessário antes de prosseguir
  console.log(
    "🔍 Verificando integridade dos dados antes de carregar usuários..."
  );

  // Garantir que users existe e é um array
  if (!window.users || !Array.isArray(window.users)) {
    console.error("❌ ERRO CRÍTICO: users não é um array válido!");
    console.log("Valor atual de users:", window.users);
    console.log("Tipo:", typeof window.users);

    // Forçar inicialização com dados padrão
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

    console.log("🔧 Array users reinicializado com dados padrão");
    saveData(); // Salvar a correção
  }

  // Garantir que units existe e é um array
  if (!window.units || !Array.isArray(window.units)) {
    console.error("❌ ERRO CRÍTICO: units não é um array válido!");
    console.log("Valor atual de units:", window.units);

    // Forçar inicialização com dados padrão
    window.units = [
      {
        id: 1,
        name: "Unidade Centro - São Paulo",
        address: "Rua Principal, 123 - Centro, São Paulo - SP",
        phone: "(11) 3456-7890",
        createdAt: new Date().toISOString(),
      },
    ];

    console.log("🔧 Array units reinicializado com dados padrão");
    saveData(); // Salvar a correção
  }

  loadUserUnitOptions();

  const tbody = document.getElementById("usersTableBody");
  if (!tbody) {
    console.error("❌ Elemento usersTableBody não encontrado!");
    return;
  }

  tbody.innerHTML = "";

  console.log("📊 Dados dos usuários:");
  console.log("Total de usuários:", users.length);
  console.log("Array users:", users);

  try {
    users.forEach((user, index) => {
      console.log(`Processando usuário ${index + 1}:`, {
        id: user.id,
        name: user.name,
        type: user.type,
        email: user.email,
      });

      const unit = units.find((u) => u.id === user.unitId);
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
            <i class="fas fa-${
              user.status === "active" ? "ban" : "check"
            }"></i> 
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

    console.log("✅ Usuários carregados com sucesso!");
  } catch (error) {
    console.error("💥 ERRO ao iterar usuários:", error);
    showAlert("Erro ao carregar lista de usuários: " + error.message, "error");
  }

  console.log("=== FIM loadUsers ===");
}

function loadUserUnitOptions() {
  console.log("🔧 Carregando opções de unidades...");

  const select = document.getElementById("userUnit");
  if (!select) {
    console.error("❌ Elemento userUnit não encontrado!");
    return;
  }

  select.innerHTML = '<option value="">Selecione...</option>';

  // Proteção: garantir que units é um array
  if (!window.units || !Array.isArray(window.units)) {
    console.error("❌ ERRO: units não é um array!");
    console.log("Variável units:", window.units);
    console.log("Tipo:", typeof window.units);

    // Forçar inicialização com dados padrão
    window.units = [
      {
        id: 1,
        name: "Unidade Centro - São Paulo",
        address: "Rua Principal, 123 - Centro, São Paulo - SP",
        phone: "(11) 3456-7890",
        createdAt: new Date().toISOString(),
      },
    ];

    console.log("🔧 Array units reinicializado");
    saveData();
  }

  console.log("📋 Carregando", units.length, "unidades para o select");

  try {
    units.forEach((unit, index) => {
      console.log(`Adicionando unidade ${index + 1}:`, unit.name);
      const option = document.createElement("option");
      option.value = unit.id;
      option.textContent = unit.name;
      select.appendChild(option);
    });

    console.log("✅ Opções de unidades carregadas com sucesso!");
  } catch (error) {
    console.error("💥 ERRO ao carregar opções de unidades:", error);
    showAlert("Erro ao carregar unidades: " + error.message, "error");
  }
}

function addUser(event) {
  console.log("🚀 addUser chamada! Event:", event);
  
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

  console.log("📝 Dados coletados:", { name, cpf, email, type, unitId });

  if (!name || !cpf || !email || !password || !type) {
    showAlert("Todos os campos são obrigatórios!", "error");
    return;
  }

  if (!email.includes("@ios.org.br")) {
    showAlert("E-mail deve ser do domínio @ios.org.br", "error");
    return;
  }

  if (users.find((u) => u.email === email)) {
    showAlert("E-mail já cadastrado!", "error");
    return;
  }

  if (users.find((u) => u.cpf === cpf)) {
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

  users.push(newUser);
  saveData();
  document.getElementById("userForm").reset();
  loadUsers();
  showAlert("Usuário cadastrado com sucesso!", "success");
}

function toggleUserStatus(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  if (user.type === "admin" && user.email === "admin@ios.org.br") {
    showAlert("Não é possível desativar o administrador principal!", "error");
    return;
  }

  user.status = user.status === "active" ? "inactive" : "active";
  saveData(); // Salvar automaticamente
  loadUsers();
  showAlert(
    `Usuário ${
      user.status === "active" ? "ativado" : "desativado"
    } com sucesso!`,
    "success"
  );
}

function resetUserPassword(userId) {
  const user = users.find((u) => u.id === userId);
  if (!user) return;

  const newPassword = prompt("Digite a nova senha temporária:");
  if (newPassword && newPassword.length >= 6) {
    user.password = newPassword;
    showAlert("Senha alterada com sucesso!", "success");
  } else if (newPassword) {
    showAlert("A senha deve ter pelo menos 6 caracteres!", "error");
  }
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

  const newUnit = {
    id: Date.now(),
    name,
    address,
    phone,
    courses: ["Informática Básica", "Administração"], // Cursos padrão
    createdAt: new Date().toISOString(),
  };

  units.push(newUnit);
  saveData(); // Salvar automaticamente
  document.getElementById("unitForm").reset();
  loadUnits();
  updateClassUnitOptions();
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
  const associatedClasses = classes.filter((cls) => cls.unitId === unitId);
  if (associatedClasses.length > 0) {
    showAlert(
      "Não é possível excluir unidade com turmas cadastradas!",
      "error"
    );
    return;
  }

  // Verificar se há usuários associados
  const associatedUsers = users.filter((u) => u.unitId === unitId);
  if (associatedUsers.length > 0) {
    showAlert(
      "Não é possível excluir unidade com usuários associados!",
      "error"
    );
    return;
  }

  units = units.filter((unit) => unit.id !== unitId);
  loadUnits();
  updateClassUnitOptions();
  loadUserUnitOptions();
  showAlert("Unidade excluída com sucesso!", "success");
}

function editUnit(unitId) {
  const unit = units.find((u) => u.id === unitId);
  if (!unit) return;

  const newName = prompt("Nome da unidade:", unit.name);
  if (newName && newName !== unit.name) {
    unit.name = newName;
    loadUnits();
    showAlert("Unidade atualizada com sucesso!", "success");
  }
}

// Funções para gerenciamento de cursos
let editingCourseId = null;

function loadCourses() {
  loadCourseUnitOptions();
  loadFilterCourseUnitOptions();

  const filterUnitId = document.getElementById("filterCourseUnit")?.value;
  let filteredCourses = courses;

  if (filterUnitId) {
    filteredCourses = courses.filter(
      (course) => course.unitId === parseInt(filterUnitId)
    );
  }

  const tbody = document.getElementById("coursesTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  filteredCourses.forEach((course) => {
    const unit = units.find((u) => u.id === course.unitId);
    const unitName = unit ? unit.name : "Unidade não encontrada";

    const coursesClasses = classes.filter((c) => c.courseId === course.id);
    const classesCount = coursesClasses.length;

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
  units.forEach((unit) => {
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

  units.forEach((unit) => {
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
    courses.find(
      (c) => c.name === name && c.unitId === unitId && c.id !== editingCourseId
    )
  ) {
    showAlert("Já existe um curso com este nome nesta unidade!", "error");
    return;
  }

  if (editingCourseId) {
    // Editando curso existente
    const courseIndex = courses.findIndex((c) => c.id === editingCourseId);
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

    courses.push(newCourse);
    showAlert("Curso cadastrado com sucesso!", "success");
  }

  saveData();
  document.getElementById("courseForm").reset();
  loadCourses();
}

function editCourse(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;

  editingCourseId = courseId;

  // Preencher formulário
  document.getElementById("courseName").value = course.name;
  document.getElementById("courseDescription").value = course.description || "";
  document.getElementById("courseDuration").value = course.duration;
  document.getElementById("courseUnit").value = course.unitId;

  // Mostrar botão cancelar e alterar texto do submit
  document.getElementById("cancelCourseEdit").style.display = "inline-flex";
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
  document.getElementById("cancelCourseEdit").style.display = "none";

  const submitBtn = document.querySelector('#courseForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fas fa-plus"></i> Cadastrar Curso';
  }
}

function toggleCourseStatus(courseId) {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return;

  const newStatus = course.status === "active" ? "inactive" : "active";

  // Se está desativando, verificar se há turmas ativas
  if (newStatus === "inactive") {
    const activeCourseClasses = classes.filter((c) => c.courseId === courseId);
    if (activeCourseClasses.length > 0) {
      if (
        !confirm(
          `Este curso possui ${activeCourseClasses.length} turma(s) ativa(s). Desativar mesmo assim?`
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
    totalCoursesElement.textContent = courses.length;
  }

  const activeCoursesElement = document.getElementById("activeCourses");
  if (activeCoursesElement) {
    const activeCourses = courses.filter((c) => c.status === "active");
    activeCoursesElement.textContent = activeCourses.length;
  }
}

// Event Listeners consolidados
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Inicializando sistema...");

  try {
    // Verificar integridade dos dados primeiro
    setTimeout(() => {
      if (typeof window.verifyDataIntegrity === "function") {
        const isValid = window.verifyDataIntegrity();
        console.log("Integridade inicial:", isValid ? "OK" : "Corrigida");
      }
    }, 100);

    const today = new Date().toISOString().split("T")[0];
    const attendanceDateElement = document.getElementById("attendanceDate");
    if (attendanceDateElement) {
      attendanceDateElement.value = today;
    }

    // Event listeners para formulários
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", login);
      console.log("✅ Event listener para loginForm registrado");
    } else {
      console.warn("⚠️ Elemento loginForm não encontrado");
    }

    const unitForm = document.getElementById("unitForm");
    if (unitForm) {
      unitForm.addEventListener("submit", addUnit);
      console.log("✅ Event listener para unitForm registrado");
    }

    const classForm = document.getElementById("classForm");
    if (classForm) {
      classForm.addEventListener("submit", addClass);
      console.log("✅ Event listener para classForm registrado");
    }

    const courseForm = document.getElementById("courseForm");
    if (courseForm) {
      courseForm.addEventListener("submit", addCourse);
      console.log("✅ Event listener para courseForm registrado");
    }

    const userForm = document.getElementById("userForm");
    if (userForm) {
      userForm.addEventListener("submit", addUser);
      console.log("✅ Event listener para userForm registrado");
    } else {
      console.warn("⚠️ Elemento userForm não encontrado");
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
      console.log("✅ Máscara de CPF aplicada");
    }

    // Carregar dashboard
    try {
      loadDashboard();
      console.log("✅ Dashboard carregado");
    } catch (error) {
      console.error("💥 ERRO ao carregar dashboard:", error);
    }

    console.log("✅ Sistema inicializado com sucesso!");
  } catch (error) {
    console.error("💥 ERRO CRÍTICO na inicialização:", error);
    showAlert(
      "Erro crítico na inicialização do sistema. Verifique o console.",
      "error"
    );
  }
});

// Funções globais para compatibilidade
window.showPage = showPage;
window.logout = logout;
window.addUser = addUser;
window.deleteUnit = deleteUnit;
window.editUnit = editUnit;
window.toggleUserStatus = toggleUserStatus;
window.resetUserPassword = resetUserPassword;

// Funções de Unidades
function loadUnits() {
  if (!hasPermission("admin")) {
    showAlert("Acesso negado!", "error");
    return;
  }

  const tbody = document.getElementById("unitsTableBody");
  tbody.innerHTML = "";

  units.forEach((unit) => {
    const unitClasses = classes.filter((cls) => cls.unitId === unit.id);
    const unitCourses = courses.filter(
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
              unitCourses.length > 0
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
              unitClasses.length
            } turma(s) • 
            <i class="fas fa-book"></i> ${unitCourses.length} curso(s)
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

// Funções de gerenciamento de dados
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
  if (usersCountElement) usersCountElement.textContent = users.length;

  const unitsCountElement = document.getElementById("unitsCount");
  if (unitsCountElement) unitsCountElement.textContent = units.length;

  const coursesCountElement = document.getElementById("coursesCount");
  if (coursesCountElement) coursesCountElement.textContent = courses.length;

  const classesCountElement = document.getElementById("classesCount");
  if (classesCountElement) classesCountElement.textContent = classes.length;

  const studentsCountElement = document.getElementById("studentsCount");
  if (studentsCountElement) studentsCountElement.textContent = students.length;

  const attendanceCountElement = document.getElementById("attendanceCount");
  if (attendanceCountElement) {
    const attendanceRecords = Object.keys(attendance).reduce((total, key) => {
      return total + Object.keys(attendance[key]).length;
    }, 0);
    attendanceCountElement.textContent = attendanceRecords;
  }
}

// Atualizar controle de permissões para incluir a nova aba
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

// Função de debug para verificar usuários
function debugUsers() {
  console.log("=== DEBUG DOS USUÁRIOS ===");
  console.log("Total de usuários:", users.length);
  users.forEach((user, index) => {
    console.log(`Usuário ${index + 1}:`, {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      type: user.type,
      status: user.status,
      unitId: user.unitId,
    });
  });
  console.log("========================");
}

// Função para debug - limpar usuários cadastrados (manter apenas admin padrão)
function clearRegisteredUsers() {
  console.log("Limpando usuários cadastrados...");
  console.log("Usuários antes:", users.length);

  // Manter apenas o admin padrão
  users = users.filter(
    (user) => user.id === 1 && user.email === "admin@ios.org.br"
  );

  console.log("Usuários depois:", users.length);
  saveData();
  loadUsers();
  showAlert("Usuários cadastrados removidos!", "success");
}

    "userRole",
    "userUnit",
  ];

  formElements.forEach((id) => {
    const element = document.getElementById(id);
    console.log(`${id}:`, element ? "✅ Encontrado" : "❌ Não encontrado");
    if (element) {
      console.log(`  - Valor: "${element.value || ""}"`);
      console.log(`  - Tipo: ${element.tagName}`);
      console.log(`  - ID: ${element.id}`);
      if (element.tagName === "SELECT") {
        console.log(
          `  - Opções:`,
          Array.from(element.options).map((o) => ({
            value: o.value,
            text: o.text,
          }))
        );
        console.log(`  - Selected Index:`, element.selectedIndex);
      }
    } else {
      // Verificar se há elementos com IDs similares
      const similarElements = document.querySelectorAll(`[id*="${id}"]`);
      if (similarElements.length > 0) {
        console.log(
          `  - Elementos similares:`,
          Array.from(similarElements).map((el) => el.id)
        );
      }
    }
  });

  // Verificar todos os elementos do form de usuários
  console.log("--- VERIFICAÇÃO DO FORM DE USUÁRIOS ---");
  const userForm = document.getElementById("userForm");
  if (userForm) {
    const formInputs = userForm.querySelectorAll("input, select");
    console.log(`Form encontrado com ${formInputs.length} elementos:`);
    formInputs.forEach((input) => {
      console.log(
        `  - ${input.id || "sem ID"} (${input.tagName}) = "${
          input.value || ""
        }"`
      );
    });
  }

  console.log("================================");
}

// Função para preencher formulário para teste
function fillTestUserForm() {
  console.log("🧪 Preenchendo formulário com dados de teste...");

  // Usar valores únicos baseados no timestamp para evitar duplicatas
  const timestamp = Date.now();

  document.getElementById("userName").value = `Usuário Teste ${timestamp}`;
  document.getElementById("userCpf").value = `${String(timestamp).slice(-11)}`;
  document.getElementById(
    "userEmailCreate"
  ).value = `teste${timestamp}@ios.org.br`;
  document.getElementById("userPassword").value = "teste123";
  document.getElementById("userRole").value = "instructor";
  document.getElementById("userUnit").value = "1";

  console.log("✅ Formulário preenchido com:", {
    nome: document.getElementById("userName").value,
    cpf: document.getElementById("userCpf").value,
    email: document.getElementById("userEmailCreate").value,
    tipo: document.getElementById("userRole").value,
    unidade: document.getElementById("userUnit").value,
  });
}

// Tornar disponível globalmente
window.debugUserForm = debugUserForm;
window.fillTestUserForm = fillTestUserForm;

// Tornar disponível globalmente
window.clearRegisteredUsers = clearRegisteredUsers;

// Função para verificar integridade dos dados
function verifyDataIntegrity() {
  console.log("🔍 VERIFICANDO INTEGRIDADE DOS DADOS...");

  let hasErrors = false;

  // Verificar users
  if (!window.users || !Array.isArray(window.users)) {
    console.error("❌ ERRO: users não é um array!");
    console.log("Valor atual:", window.users, "Tipo:", typeof window.users);
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
    hasErrors = true;
  } else {
    console.log(`✅ users está OK (${window.users.length} itens)`);
  }

  // Verificar units
  if (!window.units || !Array.isArray(window.units)) {
    console.error("❌ ERRO: units não é um array!");
    console.log("Valor atual:", window.units, "Tipo:", typeof window.units);
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
    hasErrors = true;
  } else {
    console.log(`✅ units está OK (${window.units.length} itens)`);
  }

  // Verificar courses
  if (!window.courses || !Array.isArray(window.courses)) {
    console.error("❌ ERRO: courses não é um array!");
    console.log("Valor atual:", window.courses, "Tipo:", typeof window.courses);
    window.courses = [];
    hasErrors = true;
  } else {
    console.log(`✅ courses está OK (${window.courses.length} itens)`);
  }

  // Verificar classes
  if (!window.classes || !Array.isArray(window.classes)) {
    console.error("❌ ERRO: classes não é um array!");
    console.log("Valor atual:", window.classes, "Tipo:", typeof window.classes);
    window.classes = [];
    hasErrors = true;
  } else {
    console.log(`✅ classes está OK (${window.classes.length} itens)`);
  }

  // Verificar students
  if (!window.students || !Array.isArray(window.students)) {
    console.error("❌ ERRO: students não é um array!");
    console.log(
      "Valor atual:",
      window.students,
      "Tipo:",
      typeof window.students
    );
    window.students = [];
    hasErrors = true;
  } else {
    console.log(`✅ students está OK (${window.students.length} itens)`);
  }

  // Verificar attendance
  if (typeof window.attendance !== "object" || window.attendance === null) {
    console.error("❌ ERRO: attendance não é um objeto!");
    console.log(
      "Valor atual:",
      window.attendance,
      "Tipo:",
      typeof window.attendance
    );
    window.attendance = {};
    hasErrors = true;
  } else {
    console.log(`✅ attendance está OK`);
  }

  if (hasErrors) {
    console.log("🔧 Dados corrompidos foram corrigidos. Salvando...");
    if (typeof saveData === "function") {
      saveData();
    }
    showAlert("Dados corrompidos foram corrigidos automaticamente.", "warning");
  }

  console.log("✅ Verificação de integridade concluída");

  // Retornar status
  return !hasErrors;
}

// Tornar disponível globalmente
window.verifyDataIntegrity = verifyDataIntegrity;

// Função para resetar completamente o sistema (emergência)
function resetSystemData() {
  console.log("🔄 RESETANDO SISTEMA COMPLETAMENTE...");

  try {
    // Limpar localStorage
    localStorage.removeItem("ios_attendance_system");

    // Reinicializar DataManager
    const dataManager = new DataManager();

    // Recarregar página para garantir estado limpo
    setTimeout(() => {
      location.reload();
    }, 1000);

    showAlert(
      "Sistema resetado com sucesso! Recarregando página...",
      "success"
    );
  } catch (error) {
    console.error("💥 ERRO ao resetar sistema:", error);
    showAlert("Erro ao resetar sistema: " + error.message, "error");
  }
}

// Tornar disponível globalmente para debug
window.resetSystemData = resetSystemData;

// Função para testar o cadastro de usuário completo
function testCompleteUserRegistration() {
  console.log("🧪 === TESTE COMPLETO DE CADASTRO ===");

  // 1. Verificar se estamos logados como admin
  if (!currentUser || currentUser.type !== "admin") {
    console.log("❌ Não está logado como admin. Fazendo login automático...");
    // Fazer login como admin
    document.getElementById("email").value = "admin@ios.org.br";
    document.getElementById("password").value = "admin123";
    document.getElementById("userType").value = "admin";

    const loginEvent = new Event("submit", { bubbles: true, cancelable: true });
    document.getElementById("loginForm").dispatchEvent(loginEvent);

    // Aguardar login e tentar novamente
    setTimeout(() => {
      testCompleteUserRegistration();
    }, 1000);
    return;
  }

  console.log("✅ Logado como admin:", currentUser.name);

  // 2. Ir para a página de usuários
  console.log("📄 Navegando para página de usuários...");
  showPage("users");

  setTimeout(() => {
    // 3. Debug do formulário
    console.log("� Verificando formulário...");
    debugUserForm();

    setTimeout(() => {
      // 4. Preencher formulário
      console.log("� Preenchendo formulário...");
      fillTestUserForm();

      setTimeout(() => {
        // 5. Debug após preenchimento
        console.log("🔍 Estado após preenchimento:");
        debugUserForm();

        setTimeout(() => {
          // 6. Submeter usando função segura
          console.log("📤 Submetendo formulário de forma segura...");
          safeAddUser(null);
        }, 500);
      }, 500);
    }, 500);
  }, 1000);
}

// Função para verificar se estamos na página de usuários
function isOnUsersPage() {
  const usersPage = document.getElementById("usersPage");
  return (
    usersPage &&
    !usersPage.classList.contains("hidden") &&
    usersPage.classList.contains("active")
  );
}

// Função melhorada para cadastrar usuário com verificações extras
function safeAddUser(event) {
  console.log("🛡️ FUNÇÃO SEGURA DE CADASTRO INICIADA");

  try {
    if (event) {
      event.preventDefault();
    }

    // Verificar se estamos na página correta
    if (!isOnUsersPage()) {
      console.log("📄 Não estamos na página de usuários, navegando...");
      showPage("users");
      setTimeout(() => {
        safeAddUser(null); // Tentar novamente após navegar
      }, 500);
      return;
    }

    console.log("✅ Estamos na página de usuários");

    // Chamar a função original
    addUser(null);
  } catch (error) {
    console.error("💥 ERRO na função segura:", error);
    showAlert("Erro ao processar cadastro: " + error.message, "error");
  }
}

// Função de diagnóstico específica para momento do submit
function diagnoseFormSubmit() {
  console.log("🩺 DIAGNÓSTICO NO MOMENTO DO SUBMIT");

  // Verificar página atual
  const currentPage = document.querySelector(".page.active");
  console.log("Página ativa:", currentPage ? currentPage.id : "Nenhuma");

  // Verificar elementos específicos
  const elements = [
    "userName",
    "userCpf",
    "userEmailCreate",
    "userPassword",
    "userRole",
    "userUnit",
  ];

  elements.forEach((id) => {
    const el = document.getElementById(id);
    console.log(`${id}:`, {
      found: !!el,
      value: el ? el.value : "N/A",
      type: el ? el.tagName : "N/A",
      visible: el ? !el.hidden && el.offsetParent !== null : false,
    });

    if (el && el.value) {
      try {
        const trimmedValue = el.value.trim();
        console.log(`  ${id} trim test: "${trimmedValue}"`);
      } catch (error) {
        console.error(`  ${id} trim error:`, error);
      }
    }
  });

  // Verificar se os elementos estão realmente acessíveis
  try {
    const testName = document.getElementById("userName");
    if (testName) {
      const testValue = testName.value;
      const testTrim = testValue ? testValue.trim() : "";
      console.log("✅ Teste de acesso bem-sucedido:", testTrim);
    }
  } catch (error) {
    console.error("❌ Erro no teste de acesso:", error);
  }
}
