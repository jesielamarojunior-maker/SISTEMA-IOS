// @ts-check
// Sistema de Controle de Presença - Instituto da Oportunidade Social
// Gerenciamento de armazenamento local
// Usa JavaScript ES6+
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
      console.log("🔄 Reinicializando com dados padrão...");
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
      {
        id: 2,
        name: "João Instrutor",
        cpf: "111.111.111-11",
        email: "instrutor@ios.org.br",
        password: "inst123",
        type: "instructor",
        unitId: 1,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "Maria Pedagoga",
        cpf: "222.222.222-22",
        email: "pedagogo@ios.org.br",
        password: "ped123",
        type: "pedagogue",
        unitId: 1,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Carlos Monitor",
        cpf: "333.333.333-33",
        email: "monitor@ios.org.br",
        password: "mon123",
        type: "monitor",
        unitId: 1,
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

// Certificar-se de que as variáveis globais estão definidas corretamente
console.log("Verificando variáveis globais...");
console.log("Users definidos:", typeof users !== 'undefined' ? "SIM" : "NÃO");
console.log("Units definidos:", typeof units !== 'undefined' ? "SIM" : "NÃO");
console.log("Courses definidos:", typeof courses !== 'undefined' ? "SIM" : "NÃO");
console.log("Classes definidos:", typeof classes !== 'undefined' ? "SIM" : "NÃO");
console.log("Students definidos:", typeof students !== 'undefined' ? "SIM" : "NÃO");
console.log("Attendance definido:", typeof attendance !== 'undefined' ? "SIM" : "NÃO");
console.log("TestUsers definido:", typeof testUsers !== 'undefined' ? "SIM" : "NÃO");

// Função helper para salvar dados (chamada após mudanças)
function saveData() {
  // Garantir consistência do tipo de dados antes de salvar
  users = users.map((user) => {
    // Garantir que o ID seja uma string
    user.id = String(user.id);
    // Normalizar campos role/type
    if (user.role && !user.type) {
      user.type = user.role;
    } else if (user.type && !user.role) {
      user.role = user.type;
    }
    return user;
  });

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
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("hidden");
  }
}

function hideElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add("hidden");
  }
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

  // Para acesso administrativo master, verificar se é o usuário admin@ios.org.br
  if (requiredLevel === "admin-master") {
    return currentUser.email === "admin@ios.org.br";
  }

  const permissions = {
    admin: ["admin"],
    instructor: ["admin", "instructor", "pedagogue", "monitor"],
    unit: ["admin", "instructor", "pedagogue", "monitor"],
  };

  return (
    permissions[requiredLevel]?.includes(
      currentUser.type || currentUser.role
    ) || false
  );
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
      (u.type === userType || u.role === userType) &&
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
      type: registeredUser.type || registeredUser.role,
      role: registeredUser.role || registeredUser.type,
      unitId: registeredUser.unitId || registeredUser.unit,
    };
    window.currentUser = currentUser;
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
      role: userType,
      unitId: testUsers[email].unitId,
    };
    window.currentUser = currentUser;
  } else {
    console.log("❌ Falha no login - credenciais incorretas");
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
  window.currentUser = null;
  hideElement("mainSystem");
  showElement("loginScreen");
  document.getElementById("loginForm").reset();
}

function updateUserInfo() {
  if (!currentUser) return;

  const userDisplayName = document.getElementById("userDisplayName");
  const userDisplayRole = document.getElementById("userDisplayRole");
  const userAvatar = document.getElementById("userAvatar");

  if (userDisplayName) userDisplayName.textContent = currentUser.name;
  if (userDisplayRole)
    userDisplayRole.textContent = getUserRoleText(currentUser.type);
  if (userAvatar)
    userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
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
  // Agora a lógica de exibição/ocultação das abas está na função updateUIPermissions
  // Essa função agora serve apenas para outras atualizações de navegação se necessário
  console.log("Navegação atualizada para:", currentUser.name);
}

function updateUIPermissions() {
  // Exibir ou ocultar elementos de acordo com o tipo de usuário
  console.log(
    "Atualizando permissões da interface para:",
    currentUser.type,
    "Email:",
    currentUser.email
  );

  // Elementos da barra de navegação
  const usersTab = document.getElementById("usersTab");
  const unitsTab = document.getElementById("unitsTab");
  const coursesTab = document.getElementById("coursesTab");
  const reportsTab = document.getElementById("reportsTab");
  const dataManagementTab = document.getElementById("dataManagementTab");

  // Controle de acesso para a aba de usuários - APENAS admin@ios.org.br (admin master)
  if (usersTab) {
    if (currentUser && currentUser.email === "admin@ios.org.br") {
      usersTab.style.display = "flex"; // Manter consistente com o estilo da navegação
      console.log("✅ Aba de usuários habilitada para admin master");
    } else {
      usersTab.style.display = "none";
      console.log("❌ Aba de usuários desabilitada para usuário não-master");
    }
  }

  // Controle de acesso para outras abas administrativas - qualquer admin
  if (
    currentUser &&
    (currentUser.type === "admin" || currentUser.role === "admin")
  ) {
    if (unitsTab) unitsTab.style.display = "flex";
    if (coursesTab) coursesTab.style.display = "flex";
    if (reportsTab) reportsTab.style.display = "flex";
    if (dataManagementTab) dataManagementTab.style.display = "flex";
  } else {
    if (unitsTab) unitsTab.style.display = "none";
    if (coursesTab) coursesTab.style.display = "none";
    if (reportsTab) reportsTab.style.display = "none";
    if (dataManagementTab) dataManagementTab.style.display = "none";
  }

  // Forçar ocultação da aba de usuários para não-admin master (redundância proposital para garantia)
  if (usersTab && currentUser && currentUser.email !== "admin@ios.org.br") {
    usersTab.style.display = "none";
  }
}

// Funções de navegação
function showPage(pageId) {
  // Verificar permissões para páginas administrativas
  if (pageId === "users") {
    // Apenas o usuário master (admin@ios.org.br) pode acessar a página de usuários
    if (!currentUser || currentUser.email !== "admin@ios.org.br") {
      showAlert(
        "Acesso negado! Apenas o administrador master pode gerenciar usuários.",
        "error"
      );
      // Redirecionar para o dashboard em caso de tentativa de acesso não autorizado
      pageId = "dashboard";
    }
  } else if (
    (pageId === "units" ||
      pageId === "courses" ||
      pageId === "reports" ||
      pageId === "data-management") &&
    !hasPermission("admin")
  ) {
    showAlert(
      "Acesso negado! Apenas administradores podem acessar esta seção.",
      "error"
    );
    pageId = "dashboard";
  }

  // Sempre atualizar as permissões de UI ao mudar de página
  setTimeout(() => {
    updateUIPermissions();
  }, 100);

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId + "Page");
  if (targetPage) {
    targetPage.classList.add("active");
  }

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
  const totalUnitsElement = document.getElementById("totalUnits");
  const totalClassesElement = document.getElementById("totalClasses");
  const totalStudentsElement = document.getElementById("totalStudents");
  const todayAttendanceElement = document.getElementById("todayAttendance");

  if (totalUnitsElement) totalUnitsElement.textContent = units.length;
  if (totalClassesElement) totalClassesElement.textContent = classes.length;
  if (totalStudentsElement) {
    totalStudentsElement.textContent = students.filter(
      (s) => s.status === "active"
    ).length;
  }

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

  if (todayAttendanceElement) {
    todayAttendanceElement.textContent = todayAttendanceCount;
  }

  // Estatísticas avançadas para admin
  if (currentUser && currentUser.type === "admin") {
    loadAdminDashboard();
  } else {
    loadInstructorDashboard();
  }
}

function loadAdminDashboard() {
  // Mostrar cards administrativos
  const highestAttendanceCard = document.getElementById(
    "highestAttendanceCard"
  );
  const highestAbsenceCard = document.getElementById("highestAbsenceCard");
  const dropoutsCard = document.getElementById("dropoutsCard");

  if (highestAttendanceCard) highestAttendanceCard.style.display = "block";
  if (highestAbsenceCard) highestAbsenceCard.style.display = "block";
  if (dropoutsCard) dropoutsCard.style.display = "block";

  // Calcular estatísticas
  const dropouts = students.filter((s) => s.status === "dropout").length;
  const totalDropoutsElement = document.getElementById("totalDropouts");
  if (totalDropoutsElement) totalDropoutsElement.textContent = dropouts;

  // Calcular frequências por unidade
  const unitStats = calculateUnitStats();

  if (unitStats.length > 0) {
    const highest = unitStats.reduce((prev, current) =>
      prev.attendanceRate > current.attendanceRate ? prev : current
    );
    const lowest = unitStats.reduce((prev, current) =>
      prev.attendanceRate < current.attendanceRate ? prev : current
    );

    const highestAttendanceElement =
      document.getElementById("highestAttendance");
    const highestAbsenceElement = document.getElementById("highestAbsence");

    if (highestAttendanceElement) {
      highestAttendanceElement.textContent = `${highest.name} (${highest.attendanceRate}%)`;
    }
    if (highestAbsenceElement) {
      highestAbsenceElement.textContent = `${lowest.name} (${(
        100 - lowest.attendanceRate
      ).toFixed(1)}%)`;
    }
  }
}

function loadInstructorDashboard() {
  // Ocultar cards administrativos
  const highestAttendanceCard = document.getElementById(
    "highestAttendanceCard"
  );
  const highestAbsenceCard = document.getElementById("highestAbsenceCard");
  const dropoutsCard = document.getElementById("dropoutsCard");

  if (highestAttendanceCard) highestAttendanceCard.style.display = "none";
  if (highestAbsenceCard) highestAbsenceCard.style.display = "none";
  if (dropoutsCard) dropoutsCard.style.display = "none";
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
  console.log("📊 Carregando usuários...");

  // Sempre sincronizar o array users com window.users antes de renderizar
  users = Array.isArray(window.users) ? [...window.users] : [];

  // Verificar se é o usuário administrador master
  if (!hasPermission("admin-master")) {
    showAlert(
      "Acesso negado! Apenas o administrador master pode gerenciar usuários.",
      "error"
    );
    showPage("dashboard");
    return;
  }

  loadUserUnitOptions();

  const tbody = document.getElementById("usersTableBody");
  if (!tbody) {
    console.error("❌ Elemento usersTableBody não encontrado!");
    return;
  }

  tbody.innerHTML = "";

  users.forEach((user) => {
    // Exibir todos, inclusive status 'pending' e compatibilizar campos
    const unit = units.find((u) => u.id == user.unitId || u.id == user.unit);
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
          <span class="user-type-badge user-type-${
            user.type || user.role || "undefined"
          }">
            ${getUserRoleText(user.type || user.role)}
          </span>
        </div>
        <div style="color: #64748b; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px;">
          ${user.type || user.role || "undefined"}
        </div>
      </td>
      <td>
        <div style="font-weight: 500;">${
          unit ? unit.name : "Todas as Unidades"
        }</div>
        ${
          unit
            ? `<div style=\"color: #64748b; font-size: 0.75rem; margin-top: 2px;\">${unit.address}</div>`
            : ""
        }
      </td>
      <td>
        <div><b>Ano:</b> ${user.ano || "-"}</div>
        <div><b>Ciclo:</b> ${user.ciclo || "-"}</div>
        <span class="status-badge ${
          user.status === "active"
            ? "status-active"
            : user.status === "pending"
            ? "status-pending"
            : "status-inactive"
        }">
          <i class="fas fa-${
            user.status === "active"
              ? "check-circle"
              : user.status === "pending"
              ? "clock"
              : "times-circle"
          }"></i>
          ${
            user.status === "active"
              ? "Ativo"
              : user.status === "pending"
              ? "Pendente"
              : "Inativo"
          }
        </span>
      </td>
      <td>
        <button class="btn btn-primary" onclick="openEditUserModal('${
          user.id
        }')" style="margin-right: 5px; padding: 6px 12px; font-size: 12px;">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn btn-danger" onclick="toggleUserStatus('${
          user.id
        }')" style="margin-right: 5px; padding: 6px 12px; font-size: 12px;">
          <i class="fas fa-${user.status === "active" ? "ban" : "check"}"></i> 
          ${user.status === "active" ? "Desativar" : "Ativar"}
        </button>
        <button class="btn" onclick="resetUserPassword('${
          user.id
        }')" style="padding: 6px 12px; font-size: 12px;">
          <i class="fas fa-key"></i> Reset Senha
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });

  console.log("✅ Usuários carregados com sucesso!");
}

function loadUserUnitOptions() {
  const select = document.getElementById("userUnit");
  if (!select) {
    console.error("❌ Elemento userUnit não encontrado!");
    return;
  }

  select.innerHTML = '<option value="">Selecione...</option>';

  units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });
}

function addUser(event) {
  console.log("🚀 addUser chamada!");

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

  console.log("✅ Usuário cadastrado com sucesso!");
}

function toggleUserStatus(userId) {
  const user = users.find((u) => String(u.id) === String(userId));
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
  const user = users.find((u) => String(u.id) === String(userId));
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

  units.push(newUnit);
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
  saveData();
  loadUnits();
  loadUserUnitOptions();
  showAlert("Unidade excluída com sucesso!", "success");
}

function editUnit(unitId) {
  const unit = units.find((u) => u.id === unitId);
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

// Funções de Turmas (Classes) - Implementação completa baseada no advanced-functions.js
function loadClasses() {
  updateClassUnitOptions();
  updateStudentClassOptions();
  updateAttendanceClassOptions();

  const tbody = document.getElementById("classesTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  // Filtrar turmas por unidade se não for admin
  let filteredClasses = classes;
  if (currentUser && currentUser.type !== "admin" && currentUser.unitId) {
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
  if (!select) return;

  select.innerHTML = '<option value="">Selecione...</option>';

  let availableUnits = units;
  if (currentUser && currentUser.type !== "admin" && currentUser.unitId) {
    availableUnits = units.filter((u) => u.id === currentUser.unitId);
  }

  availableUnits.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });

  // Se houver apenas uma unidade, pré-selecionar e carregar cursos e instrutores automaticamente
  if (availableUnits.length === 1) {
    select.value = availableUnits[0].id;
    loadCoursesForUnit();
    loadInstructorsForUnit();
  }
}

function updateStudentClassOptions() {
  const select = document.getElementById("studentClass");
  if (!select) return;

  select.innerHTML = '<option value="">Selecione uma turma</option>';

  let availableClasses = classes;
  if (currentUser && currentUser.type !== "admin" && currentUser.unitId) {
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
  const select = document.getElementById("attendanceClassSelect");
  if (!select) {
    console.error("Elemento attendanceClassSelect não encontrado");
    return;
  }

  select.innerHTML = '<option value="">Selecione uma turma</option>';
  console.log(`Atualizando opções de turmas para chamada. Total de turmas: ${classes.length}`);

  let availableClasses = classes;
  if (currentUser && currentUser.type !== "admin" && currentUser.unitId) {
    availableClasses = classes.filter((c) => c.unitId === currentUser.unitId);
    console.log(`Filtrando turmas para a unidade ${currentUser.unitId}. Total filtrado: ${availableClasses.length}`);
  }

  availableClasses.forEach((cls) => {
    const option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    select.appendChild(option);
  });
}

function loadCoursesForUnit() {
  const unitSelect = document.getElementById("classUnit");
  const courseSelect = document.getElementById("classCourse");

  if (!unitSelect || !courseSelect) return;

  const unitId = parseInt(unitSelect.value);

  courseSelect.innerHTML = '<option value="">Selecione um curso...</option>';

  if (unitId) {
    const unitCourses = courses.filter(
      (c) => c.unitId === unitId && c.status === "active"
    );

    unitCourses.forEach((course) => {
      const option = document.createElement("option");
      option.value = course.id;
      option.textContent = course.name;
      courseSelect.appendChild(option);
    });
  }
}

function loadInstructorsForUnit() {
  console.log("Carregando instrutores para a unidade selecionada");
  const unitSelect = document.getElementById("classUnit");
  const instructorSelect = document.getElementById("classInstructor");

  if (!unitSelect || !instructorSelect) {
    console.error("Elementos de select não encontrados");
    return;
  }

  const unitId = parseInt(unitSelect.value);

  instructorSelect.innerHTML = '<option value="">Selecione um instrutor...</option>';

  if (!unitId) {
    console.log("Nenhuma unidade selecionada");
    return;
  }

  console.log(`Buscando instrutores para unidade ID: ${unitId}`);
  
  // Filtrar usuários que são instrutores e pertencem à unidade selecionada
  const unitInstructors = users.filter((user) => 
    (user.type === "instructor" || user.role === "instructor") && 
    (parseInt(user.unitId) === unitId || parseInt(user.unit) === unitId) && 
    user.status === "active"
  );

  console.log(`Instrutores encontrados: ${unitInstructors.length}`);

  // Se não houver instrutores específicos, mostrar todos os usuários da unidade
  if (unitInstructors.length === 0) {
    console.log("Nenhum instrutor específico encontrado, mostrando todos os usuários da unidade");
    const unitUsers = users.filter((user) => {
      const hasUnitMatch = String(user.unitId) === String(unitId) || String(user.unit) === String(unitId);
      const isActive = user.status === "active";
      return hasUnitMatch && isActive;
    });

    unitUsers.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.name;  // Usamos o nome como valor para manter compatibilidade
      option.textContent = `${user.name} (${user.type || user.role || "Colaborador"})`;
      instructorSelect.appendChild(option);
    });
  } else {
    // Adicionar os instrutores encontrados
    unitInstructors.forEach((instructor) => {
      const option = document.createElement("option");
      option.value = instructor.name;  // Usamos o nome como valor para manter compatibilidade
      option.textContent = instructor.name;
      instructorSelect.appendChild(option);
    });
  }
}

function addClass(event) {
  event.preventDefault();

  const name = document.getElementById("className").value.trim();
  const unitId = parseInt(document.getElementById("classUnit").value);
  const courseId = parseInt(document.getElementById("classCourse").value);
  const instructor = document.getElementById("classInstructor").value.trim();
  const year = parseInt(document.getElementById("classYear").value);

  if (!name || !unitId || !courseId || !instructor || !year) {
    showAlert("Todos os campos são obrigatórios!", "error");
    return;
  }

  // Verificar permissões
  if (currentUser.type !== "admin" && currentUser.unitId !== unitId) {
    showAlert("Você só pode criar turmas na sua unidade!", "error");
    return;
  }

  // Verificar se já existe turma com mesmo nome na mesma unidade
  const existingClass = classes.find(
    (c) => c.name === name && c.unitId === unitId
  );
  if (existingClass) {
    showAlert("Já existe uma turma com este nome nesta unidade!", "error");
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
    createdAt: new Date().toISOString(),
    canDelete: true,
    students: [] // Inicializa com array vazio de estudantes
  };

  classes.push(newClass);
  saveData();
  document.getElementById("classForm").reset();
  loadClasses();
  showAlert("Turma cadastrada com sucesso!", "success");
}

function viewStudents(classId) {
  const cls = classes.find((c) => c.id === classId);
  if (!cls) return;

  const classStudents = students.filter(
    (s) => s.classId === classId && s.status === "active"
  );

  const studentsNames =
    classStudents.length > 0
      ? classStudents.map((s) => s.name).join("\n")
      : "Nenhum estudante cadastrado";

  alert(`Estudantes da turma ${cls.name}:\n\n${studentsNames}`);
}

function deleteClass(classId) {
  const cls = classes.find((c) => c.id === classId);
  if (!cls) return;

  const classStudents = students.filter((s) => s.classId === classId);

  if (classStudents.length > 0) {
    showAlert(
      "Não é possível excluir turma com estudantes cadastrados!",
      "error"
    );
    return;
  }

  if (!confirm(`Tem certeza que deseja excluir a turma "${cls.name}"?`)) {
    return;
  }

  classes = classes.filter((c) => c.id !== classId);
  saveData();
  loadClasses();
  showAlert("Turma excluída com sucesso!", "success");
}

// Funções de Presença (Attendance) - Implementação básica
function loadAttendancePage() {
  console.log("Carregando página de chamada...");
  
  // Atualiza as opções de turmas no select
  updateAttendanceClassOptions();

  // Garante que o event listener para alteração de turma está registrado
  const attendanceClass = document.getElementById("attendanceClassSelect");
  if (attendanceClass) {
    // Remove event listeners anteriores para evitar duplicações
    attendanceClass.removeEventListener("change", loadAttendanceStudents);
    // Adiciona novo event listener
    attendanceClass.addEventListener("change", loadAttendanceStudents);
    console.log("Event listener para attendanceClassSelect registrado");
  } else {
    console.error("Elemento attendanceClassSelect não encontrado!");
  }
  
  // Define a data padrão para hoje
  const dateField = document.getElementById("attendanceDate");
  if (dateField) {
    const today = new Date().toISOString().split("T")[0];
    dateField.value = today;
  }
}
function loadAttendanceStudents() {
    console.log("Carregando estudantes para chamada");
    const classId = parseInt(document.getElementById("attendanceClassSelect").value);
    const attendanceDate = document.getElementById("attendanceDate").value;
    const studentsContainer = document.getElementById("attendanceStudentsList");

    if (!classId || !attendanceDate || !studentsContainer) {
      if (studentsContainer) {
        studentsContainer.innerHTML = 
          '<div class="alert alert-info"><i class="fas fa-info-circle"></i> Selecione uma turma e data para registrar presença.</div>';
      }
      return;
    }

    console.log(`Buscando estudantes para a turma ID: ${classId} na data: ${attendanceDate}`);
    
    const classStudents = students.filter(
      (s) => s.classId === classId && s.status === "active"
    );

    console.log(`Estudantes encontrados: ${classStudents.length}`);

    if (classStudents.length === 0) {
      studentsContainer.innerHTML =
        '<div class="alert alert-info"><i class="fas fa-info-circle"></i> Esta turma não possui estudantes cadastrados.</div>';
      return;
    }

    const attendanceKey = `${classId}-${attendanceDate}`;
    const dayAttendance = attendance[attendanceKey] || {};

    // Preenche os dados do instrutor da turma selecionada
    const selectedClass = classes.find(c => c.id === classId);
    if (selectedClass) {
      const instructor = users.find(u => u.id === selectedClass.instructorId);
      if (instructor && document.getElementById("attendanceInstructor")) {
        document.getElementById("attendanceInstructor").value = instructor.name;
      }
    }

    let html = '<div class="attendance-students-grid">';
    
    classStudents.forEach(student => {
      const studentStatus = dayAttendance[student.id]?.status || '';
      html += `
        <div class="student-card">
          <div class="student-info">
            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random" alt="${student.name}" class="student-avatar">
            <div class="student-details">
              <div class="student-name">${student.name}</div>
              <div class="student-id">ID: ${student.id}</div>
            </div>
          </div>
          <div class="attendance-options">
            <label class="radio-option present">
              <input type="radio" name="attendance_${student.id}" value="present" ${studentStatus === 'present' ? 'checked' : ''}>
              <span>Presente</span>
            </label>
            <label class="radio-option absent">
              <input type="radio" name="attendance_${student.id}" value="absent" ${studentStatus === 'absent' ? 'checked' : ''}>
              <span>Ausente</span>
            </label>
            <label class="radio-option justified">
              <input type="radio" name="attendance_${student.id}" value="justified" ${studentStatus === 'justified' ? 'checked' : ''}>
              <span>Justificado</span>
            </label>
          </div>
          <div class="student-note">
            <input type="text" placeholder="Observação..." class="note-input" 
                   id="note_${student.id}" value="${dayAttendance[student.id]?.note || ''}">
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    studentsContainer.innerHTML = html;
    
    // Atualiza contadores
    updateAttendanceCounters();
}
function saveAttendance() {
  const classId = parseInt(document.getElementById("attendanceClassSelect").value);
  const attendanceDate = document.getElementById("attendanceDate").value;

  if (!classId || !attendanceDate) {
    showAlert("Selecione uma turma e data!", "error");
    return;
  }

  const classStudents = students.filter(
    (s) => s.classId === classId && s.status === "active"
  );
  const attendanceKey = `${classId}-${attendanceDate}`;

  if (!attendance[attendanceKey]) {
    attendance[attendanceKey] = {};
  }

  let savedCount = 0;

  classStudents.forEach((student) => {
    const radioButtons = document.getElementsByName(`attendance_${student.id}`);
    const checkedRadio = Array.from(radioButtons).find((radio) => radio.checked);
    const noteField = document.getElementById(`note_${student.id}`);
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
  const topicos = document.getElementById("lessonActivities") ? document.getElementById("lessonActivities").value : "";
  const observacoes = document.getElementById("lessonObservations") ? document.getElementById("lessonObservations").value : "";
  
  attendance[attendanceKey].lessonDetails = {
    topicos: topicos,
    observacoes: observacoes,
    horarioInicio: document.getElementById("attendanceStartTime") ? document.getElementById("attendanceStartTime").value : "",
    horarioFim: document.getElementById("attendanceEndTime") ? document.getElementById("attendanceEndTime").value : "",
    cargaHoraria: document.getElementById("attendanceDuration") ? document.getElementById("attendanceDuration").value : ""
  };

  if (savedCount > 0) {
    saveData();
    showAlert("Presença salva para " + savedCount + " estudante(s)!", "success");
    loadDashboard(); // Atualizar estatísticas
  } else {
    showAlert("Nenhuma presença foi marcada!", "error");
  }
}
}

// Função para atualizar os contadores de presença/ausência
function updateAttendanceCounters() {
  const presentInputs = document.querySelectorAll('input[value="present"]:checked').length;
  const absentInputs = document.querySelectorAll('input[value="absent"]:checked').length;
  const justifiedInputs = document.querySelectorAll('input[value="justified"]:checked').length;
  
  const presentCount = document.getElementById("presentCount");
  if (presentCount) presentCount.textContent = String(presentInputs);
  
  const absentCount = document.getElementById("absentCount");
  if (absentCount) absentCount.textContent = String(absentInputs + justifiedInputs);
  
  console.log("Contadores atualizados: " + presentInputs + " presentes, " + absentInputs + " ausentes, " + justifiedInputs + " justificados");
}

// Funções de Relatórios - Implementação básicação básica
function loadReportsPage() {
  console.log("Carregando página de relatórios");
  loadReportUnits();
  loadReportClasses();
}

function loadReportUnits() {
  console.log("Carregando unidades para relatórios");
  const select = document.getElementById("reportUnit");
  if (!select) {
    console.error("Elemento reportUnit não encontrado");
    return;
  }

  select.innerHTML = '<option value="">Todas as unidades</option>';

  let availableUnits = units;
  if (currentUser && currentUser.type !== "admin" && currentUser.unitId) {
    availableUnits = units.filter((u) => u.id === currentUser.unitId);
    console.log(`Filtrando unidades para o usuário. Total: ${availableUnits.length}`);
  }

  availableUnits.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    select.appendChild(option);
  });
  
  console.log(`Total de ${availableUnits.length} unidades carregadas para relatórios`);
}

function loadReportClasses() {
  const unitSelect = document.getElementById("reportUnit");
  const classSelect = document.getElementById("reportClass");

  if (!unitSelect || !classSelect) return;

  const unitId = parseInt(unitSelect.value);

  classSelect.innerHTML = '<option value="">Todas as turmas</option>';

  let availableClasses = classes;
  if (unitId) {
    availableClasses = classes.filter((c) => c.unitId === unitId);
  } else if (
    currentUser &&
    currentUser.type !== "admin" &&
    currentUser.unitId
  ) {
    availableClasses = classes.filter((c) => c.unitId === currentUser.unitId);
  }

  availableClasses.forEach((cls) => {
    const option = document.createElement("option");
    option.value = cls.id;
    option.textContent = cls.name;
    classSelect.appendChild(option);
  });
}

function generateReport() {
  showAlert("Função de relatórios será implementada em breve!", "info");
}

function exportToExcel() {
  showAlert(
    "Função de exportação para Excel será implementada em breve!",
    "info"
  );
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

// Funções adicionais para compatibilidade com advanced-functions.jsdade com advanced-functions.js
function forcarAtualizacaoDados() {
  console.log("🔄 Forçando atualização de dados...");
  saveData();
  loadDashboard();
  showAlert("Dados atualizados com sucesso!", "success");
}

function atualizarDadosForcado() {
  console.log("🔨 Atualização forçada iniciada...");
  if (window.dataManager) {
    window.dataManager.saveToStorage();
  }
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function mostrarDadosEmergencia() {
  console.log("🚨 Modo emergência ativado");
  const data = window.dataManager ? window.dataManager.loadFromStorage() : null;
  if (data) {
    console.log("Dados de emergência:", data);
    alert(
      `Dados encontrados:\n- Usuários: ${
        data.users?.length || 0
      }\n- Unidades: ${data.units?.length || 0}\n- Cursos: ${th || 0}\n- Cursos: ${
        data.courses?.length || 0
      }`
    );
  } else {
    alert("Nenhum dado encontrado no localStorage");
  }
}

// Funções de diagnóstico
function diagnosticoCompleto() {
  console.log("🔍 Executando diagnóstico completo...");
  const diagnostico = {
    localStorage: !!window.localStorage,
    dataManager: !!window.dataManager,
    users: users?.length || 0,
    units: units?.length || 0,
    courses: courses?.length || 0,
    classes: classes?.length || 0,
    students: students?.length || 0,
    currentUser: !!currentUser,
  };
  console.table(diagnostico);
  alert(`Diagnóstico:\n${JSON.stringify(diagnostico, null, 2)}`);
}

function testarCadastroCompleto() {
  console.log("🧪 Testando cadastro completo...");
  showAlert("Teste de cadastro iniciado - verifique o console", "info");
}

// Primeiro Acesso Functions
function openFirstAccessModal() {
  const modal = document.getElementById("firstAccessModal");
  modal.style.display = "flex";
  loadUnitsForFirstAccess();
  setupCPFMask();
  setupPhoneMask();
  setupEmailValidation();
  setupPasswordValidation();
}

function closeFirstAccessModal() {
  const modal = document.getElementById("firstAccessModal");
 
  document.getElementById("firstAccessForm").reset();
  hideAlert("firstAccessAlert");
  hideAlert("firstAccessSuccess");
}

function loadUnitsForFirstAccess() {
  const units = JSON.parse(localStorage.getItem("units")) || [];
  const unitSelect = document.getElementById("firstAccessUnit");

  unitSelect.innerHTML = '<option value="">Selecione sua unidade...</option>';

  units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    unitSelect.appendChild(option);
  });
}

function setupCPFMask() {
  const cpfInput = document.getElementById("firstAccessCpf");
  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 11) value = value

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = value;
  });
}

function setupPhoneMask() {
  const phoneInput = document.getElementById("firstAccessPhone");
  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 11) value = value.substr(0, 11);

    if (value.length === 10) {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    e.target.value = value;
  });
}

function handleFirstAccessSubmit() {
  const formData = {
    name: document.getElementById("firstAccessName").value.trim(),
    cpf: document.getElementById("firstAccessCpf").value.trim(),
    phone: document.getElementById("firstAccessPhone").value.trim(),
    email: document
      .getElementById("firstAccessEmail")
      .value.trim()
      .toLowerCase(),
    role: document.getElementById("firstAccessRole").value,
    unit: document.getElementById("firstAccessUnit").value,
    password: document.getElementById("firstAccessPassword").value,
    passwordConfirm: document.getElementById("firstAccessPasswordConfirm")
      .value,
  };

  // Validações
  if (!validateFirstAccessData(formData)) {
    return;
  }

  // Verificar se email já existe
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find((user) => user.email === formData.email)) {
    showAlert("firstAccessAlert", "Este e-mail já está cadastrado no sistema");
    return;
  }

  // Criar usuário
  const newUser = {
    id: Date.now().toString(),
    name: formData.name,
    cpf: formData.cpf,
    phone: formData.phone,
    email: formData.email,
    role: formData.role,
    unit: formData.unit,
    password: formData.password,
    status: "pending", // Aguardando aprovação do admin
    createdAt: new Date().toISOString(),
    firstAccess: true,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  showAlert(
    "firstAccessSuccess",
    "Cadastro realizado com sucesso! Aguarde a aprovação do administrador para acessar o sistema."
  );

  setTimeout(() => {
    closeFirstAccessModal();
    showAlert(
      "loginAlert",
      "Cadastro enviado! Entre em contato com o administrador para ativação da conta.",
      "success"
    );
  }, 3000);
}

function validateFirstAccessData(data) {
  if (!data.name || data.name.length < 3) {
    showAlert("firstAccessAlert", "Nome deve ter pelo menos 3 caracteres");
    return false;
  }

  if (!data.cpf || data.cpf.replace(/\D/g, "").length !== 11) {
    showAlert("firstAccessAlert", "CPF deve ter 11 dígitos");
    return false;
  }

  if (!data.email || !data.email.endsWith("@ios.org.br")) {
    showAlert("firstAccessAlert", "E-mail deve terminar com @ios.org.br");
    return false;
  }

  if (!data.role) {
    showAlert("firstAccessAlert", "Selecione sua função no IOS");
    return false;
  }

  if (!data.unit) {
    showAlert("firstAccessAlert", "Selecione sua unidade de trabalho");
    return false;
  }

  if (!data.password || data.password.length < 6) {
    showAlert("firstAccessAlert", "Senha deve ter pelo menos 6 caracteres");
    return false;
  }

  return true;
}

function showAlert(alertId, message, type = "error") {
  const alert = document.getElementById(alertId);
  alert.textContent = message;
  alert.className = `alert alert-${type}`;
  alert.classList.remove("hidden");
}

function hideAlert(alertId) {
  const alert = document.getElementById(alertId);
  alert.classList.add("hidden");
}

// Modificar função de login para considerar usuários pendentes
function attemptLogin(email, password, userType) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Primeiro verificar usuários padrão do sistema
  const defaultUsers = {
    "admin@ios.org.br": {
      password: "admin123",
      role: "admin",
      name: "Administrador",
    },
    "instrutor@ios.org.br": {
      password: "inst123",
      role: "instructor",
      name: "Instrutor",
    },
    "pedagogo@ios.org.br": {
      password: "ped123",
      role: "pedagogue",
      name: "Pedagogo",
    },
    "monitor@ios.org.br": {
      password: "mon123",
      role: "monitor",
      name: "Monitor",
    },
  };

  if (
    defaultUsers[email] &&
    defaultUsers[email].password === password &&
    defaultUsers[email].role === userType
  ) {
    return {
      success: true,
      user: { email, role: userType, name: defaultUsers[email].name },
    };
  }

  // Verificar usuários cadastrados
  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password &&
      (u.role === userType || u.type === userType)
  );

  if (user) {
    if (user.status === "pending") {
      return {
        success: false,
        message: "Sua conta ainda está aguardando aprovação do administrador.",
      };
    }

    if (user.status === "inactive") {
      return {
        success: false,
        message:
          "Sua conta foi desativada. Entre em contato com o administrador.",
      };
    }

    return { success: true, user: user };
  }

  return { success: false, message: "Credenciais inválidas!" };
}

// Disponibilizar funções globalmente
window.login = login;
window.logout = logout;
window.showPage = showPage;
window.addUser = addUser;
window.toggleUserStatus = toggleUserStatus;
window.resetUserPassword = resetUserPassword;
window.addUnit = addUnit;
window.deleteUnit = deleteUnit;
window.editUnit = editUnit;
window.addCourse = addCourse;
window.editCourse = editCourse;
window.cancelCourseEdit = cancelCourseEdit;
window.toggleCourseStatus = toggleCourseStatus;
window.loadClasses = loadClasses;
window.addClass = addClass;
window.addStudent = addStudent;
window.viewStudents = viewStudents;
window.deleteClass = deleteClass;
window.loadCoursesForUnit = loadCoursesForUnit;
window.loadInstructorsForUnit = loadInstructorsForUnit;
window.loadAttendanceStudents = loadAttendanceStudents;
window.saveAttendance = saveAttendance;
window.loadReportClasses = loadReportClasses;
window.generateReport = generateReport;
window.exportToExcel = exportToExcel;
window.exportDataBackup = exportDataBackup;
window.importDataBackup = importDataBackup;
window.clearAllSystemData = clearAllSystemData;
window.saveDataManually = saveDataManually;
window.forcarAtualizacaoDados = forcarAtualizacaoDados;
window.atualizarDadosForcado = atualizarDadosForcado;
window.mostrarDadosEmergencia = mostrarDadosEmergencia;
window.diagnosticoCompleto = diagnosticoCompleto;
window.testarCadastroCompleto = testarCadastroCompleto;
window.openEditUserModal = openEditUserModal;
window.closeUserEditModal = closeUserEditModal;
window.toggleUserStatusInsideModal = toggleUserStatusInsideModal;
window.resetUserPasswordInsideModal = resetUserPasswordInsideModal;
window.saveEditUser = saveEditUser;
// Garante que o modal de edição de usuário exista no DOM
document.addEventListener("DOMContentLoaded", function () {
  // Event listener para o formulário de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    // Remover possíveis event listeners anteriores
    const oldLogin = loginForm.onsubmit;
    loginForm.onsubmit = null;
    
    // Adicionar novo event listener usando a função login definida acima
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      console.log("Form de login submetido");
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const userType = document.getElementById("userType").value;

      console.log("Tentando fazer login com:", email, userType);
      
      // Verificar usuários cadastrados primeiro
      const registeredUser = users.find(
        (u) =>
          u.email === email &&
          u.password === password &&
          (u.type === userType || u.role === userType) &&
          u.status === "active"
      );

      if (registeredUser) {
        console.log("Login bem-sucedido com usuário cadastrado:", registeredUser.name);
        currentUser = {
          id: registeredUser.id,
          email: registeredUser.email,
          name: registeredUser.name,
          type: registeredUser.type || registeredUser.role,
          role: registeredUser.role || registeredUser.type,
          unitId: registeredUser.unitId || registeredUser.unit,
        };
        window.currentUser = currentUser;
      } else if (
        testUsers[email] &&
        testUsers[email].password === password &&
        testUsers[email].type === userType
      ) {
        console.log("Login bem-sucedido com usuário de teste:", email);
        // Fallback para usuários de teste
        currentUser = {
          email: email,
          name: testUsers[email].name,
          type: userType,
          role: userType,
          unitId: testUsers[email].unitId,
        };
        window.currentUser = currentUser;
      } else {
        console.log("Falha no login - credenciais incorretas");
        document.getElementById("loginAlert").classList.remove("hidden");
        return;
      }

      document.getElementById("loginScreen").classList.add("hidden");
      document.getElementById("mainSystem").classList.remove("hidden");
      updateUserInfo();
      updateNavigation();
      updateUIPermissions();
      loadDashboard();
      document.getElementById("loginAlert").classList.add("hidden");
    });
    
    console.log("✅ Event listener para loginForm registrado");
  }

  // Garante que o botão de salvar chamada está funcionando
  const saveAttendanceBtn = document.getElementById("saveAttendanceBtn");
  if (saveAttendanceBtn) {
    saveAttendanceBtn.removeEventListener("click", saveAttendance);
    saveAttendanceBtn.addEventListener("click", saveAttendance);
    console.log("✅ Event listener para saveAttendanceBtn registrado");
  }

  // Verificar se o modal de edição de usuário existe no DOM
  if (!document.getElementById("editUserModal")) {
    const modalDiv = document.createElement("div");
    modalDiv.id = "editUserModal";
    modalDiv.className = "modal";
    modalDiv.style.display = "none";
    document.body.appendChild(modalDiv);
  }

  // Registra event listener para o formulário de cursos
  const courseForm = document.getElementById("courseForm");
  if (courseForm) {
    courseForm.addEventListener("submit", addCourse);
    console.log("✅ Event listener para courseForm registrado");
  }

  // Registra event listener para o formulário de turmas
  const classForm = document.getElementById("classForm");
  if (classForm) {
    classForm.addEventListener("submit", addClass);
    console.log("✅ Event listener para classForm registrado");
  }
  
  // Registra event listener para o botão de salvar chamada
  const salvarChamadaBtn = document.getElementById("salvarChamada");
  if (salvarChamadaBtn) {
    salvarChamadaBtn.addEventListener("click", saveAttendance);
    console.log("✅ Event listener para salvarChamada registrado");
  }

  // Aplicar verificações de permissão para todas as abas após carregamento completo da página
  setTimeout(() => {
    if (currentUser) {
      console.log("Aplicando verificações de permissão após carregamento...");
      updateUIPermissions();
    }
  }, 500);
  
  // Remover o listener duplicado para o login - já está registrado acima
  console.log("Sistema de login verificado e ativo.");
  }
});


// Modal de edição de usuário
function openEditUserModal(userId) {
  const user = users.find((u) => String(u.id) === String(userId));
  if (!user) return;

  // Sempre preenche o conteúdo do modal e exibe
  let modal = document.getElementById("editUserModal");
  if (!modal) return;
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100vw";
  modal.style.height = "100vh";
  modal.style.background = "rgba(0,0,0,0.4)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.zIndex = "9999";
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%); border-radius: 16px; padding: 32px 28px; width: 420px; max-width: 95vw; box-shadow: 0 10px 40px rgba(0,0,0,0.2); position: relative; border: 1px solid rgba(66, 153, 225, 0.2);">
      <div style="display: flex; align-items: center; margin-bottom: 24px; border-bottom: 2px solid #4299e1; padding-bottom: 12px;">
        <div style="background: #4299e1; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
          <i class="fas fa-user-edit" style="font-size: 18px;"></i>
        </div>
        <h2 style="margin: 0; font-size: 1.5rem; color: #2d3748; font-weight: 600;">Editar Usuário</h2>
        <button onclick="closeEditUserModal()" style="position: absolute; top: 20px; right: 20px; background: #f1f5f9; border: none; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #64748b; font-size: 16px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">&times;</button>
      </div>
      
      <div style="background-color: #EBF8FF; border-left: 4px solid #4299E1; padding: 12px; margin-bottom: 20px; border-radius: 4px;">
        <p style="margin: 0; color: #2B6CB0; font-size: 14px;"><i class="fas fa-info-circle" style="margin-right: 8px;"></i> Atualize as informações do usuário conforme necessário</p>
      </div>
      
      <form id="editUserForm">
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: #4a5568; font-weight: 500;">
            <i class="fas fa-building" style="margin-right: 8px; color: #4299e1;"></i>Unidade:
          </label>
          <select id="editUserUnit" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; background-color: #f8fafc; font-size: 15px; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <option value="">Selecione uma unidade...</option>
          </select>
        </div>
        
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; color: #4a5568; font-weight: 500;">
            <i class="fas fa-calendar-alt" style="margin-right: 8px; color: #4299e1;"></i>Ano:
          </label>
          <input id="editUserAno" type="number" min="2020" max="2100" placeholder="Ex: 2025" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; background-color: #f8fafc; font-size: 15px; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);" />
        </div>
        
        <div style="margin-bottom: 24px;">
          <label style="display: block; margin-bottom: 6px; color: #4a5568; font-weight: 500;">
            <i class="fas fa-sync-alt" style="margin-right: 8px; color: #4299e1;"></i>Ciclo:
          </label>
          <input id="editUserCiclo" type="text" maxlength="20" placeholder="Ex: 2025.1" style="width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #cbd5e0; background-color: #f8fafc; font-size: 15px; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);" />
        </div>
        
        <div style="display: flex; justify-content: space-between; gap: 12px; margin-top: 20px;">
          <button type="button" onclick="closeEditUserModal()" style="padding: 10px 18px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s; flex: 1; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
            <i class="fas fa-times" style="margin-right: 8px;"></i>Cancelar
          </button>
          <button type="button" onclick="saveEditUser()" style="padding: 10px 18px; background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%); color: white; border: none; border-radius: 8px; font-weight: 500; cursor: pointer; transition: all 0.2s; flex: 1; box-shadow: 0 2px 5px rgba(44, 82, 130, 0.4);">
            <i class="fas fa-save" style="margin-right: 8px;"></i>Salvar
          </button>
        </div>
      </form>
      
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; display: flex; gap: 10px; justify-content: center;">
        <button type="button" onclick="toggleUserStatusInsideModal()" style="padding: 8px 12px; background-color: #FC8181; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(252, 129, 129, 0.3);">
          <i class="fas fa-power-off" style="margin-right: 6px;"></i>Ativar/Desativar
        </button>
        <button type="button" onclick="resetUserPasswordInsideModal()" style="padding: 8px 12px; background-color: #4FD1C5; color: white; border: none; border-radius: 6px; font-size: 13px; cursor: pointer; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(79, 209, 197, 0.3);">
          <i class="fas fa-key" style="margin-right: 6px;"></i>Redefinir Senha
        </button>
      </div>
    </div>
  `;

  // Preencher unidades
  const unitSelect = modal.querySelector("#editUserUnit");
  unitSelect.innerHTML = '<option value="">Selecione...</option>';
  units.forEach((unit) => {
    const option = document.createElement("option");
    option.value = unit.id;
    option.textContent = unit.name;
    unitSelect.appendChild(option);
  });
  unitSelect.value = user.unitId || user.unit || "";

  // Preencher ano e ciclo
  modal.querySelector("#editUserAno").value = user.ano || "";
  modal.querySelector("#editUserCiclo").value = user.ciclo || "";

  // Salvar id do usuário editado
  modal.setAttribute("data-user-id", user.id);

  // Remover evento submit do form (evita duplo submit)
  const form = modal.querySelector("#editUserForm");
  form.onsubmit = function (e) {
    e.preventDefault();
    return false;
  };
}

function closeUserEditModal() {
  const modal = document.getElementById("editUserModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Função para salvar as edições do usuário
function saveEditUser() {
  const modal = document.getElementById("editUserModal");
  if (!modal) return;

  const userId = modal.getAttribute("data-user-id");
  if (!userId) {
    showAlert("ID de usuário não encontrado!", "error");
    return;
  }

  const user = users.find((u) => String(u.id) === String(userId));
  if (!user) {
    showAlert("Usuário não encontrado!", "error");
    return;
  }

  // Atualizar os campos do usuário
  const unitValue = document.getElementById("editUserUnit").value;
  const anoValue = document.getElementById("editUserAno").value;
  const cicloValue = document.getElementById("editUserCiclo").value;

  user.unitId = unitValue ? unitValue : user.unitId;
  user.unit = unitValue ? unitValue : user.unit;
  user.ano = anoValue ? anoValue : user.ano;
  user.ciclo = cicloValue ? cicloValue : user.ciclo;

  // Salvar alterações
  saveData();
  loadUsers();

  // Feedback visual e fechar modal
  showAlert("Dados do usuário atualizados com sucesso!", "success");
  closeUserEditModal();
}

// Alterna status do usuário entre ativo/inativo
function toggleUserStatusInsideModal() {
  const modal = document.getElementById("editUserModal");
  if (!modal) return;

  const userId = modal.getAttribute("data-user-id");
  if (!userId) {
    showAlert("ID de usuário não encontrado!", "error");
    return;
  }

  const user = users.find((u) => String(u.id) === String(userId));
  if (!user) {
    showAlert("Usuário não encontrado!", "error");
    return;
  }

  // Confirmar a alteração com o usuário
  const status = user.status === "active" ? "desativar" : "ativar";
  if (!confirm(`Tem certeza que deseja ${status} o usuário ${user.name}?`)) {
    return;
  }

  user.status = user.status === "active" ? "inactive" : "active";
  saveData();
  loadUsers();
  closeUserEditModal();
  showAlert(
    `Usuário ${
      user.status === "active" ? "ativado" : "desativado"
    } com sucesso!`,
    "success"
  );
}

// Reseta senha do usuário via prompt
function resetUserPasswordInsideModal() {
  const modal = document.getElementById("editUserModal");
  if (!modal) return;

  const userId = modal.getAttribute("data-user-id");
  if (!userId) {
    showAlert("ID de usuário não encontrado!", "error");
    return;
  }

  const user = users.find((u) => String(u.id) === String(userId));
  if (!user) {
    showAlert("Usuário não encontrado!", "error");
    return;
  }

  const novaSenha = prompt(`Digite a nova senha para o usuário ${user.name}:`);
  if (novaSenha && novaSenha.length >= 6) {
    user.password = novaSenha;
    saveData();
    showAlert(
      `Senha do usuário ${user.name} foi redefinida com sucesso!`,
      "success"
    );
  } else if (novaSenha) {
    showAlert("A senha deve ter pelo menos 6 caracteres!", "error");
  }
}