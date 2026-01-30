// Database simulation using localStorage
class Database {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    console.log("Inicializando banco de dados...");

    // Verifica se há unidades no localStorage
    const unitsData = localStorage.getItem("iosUnits");
    if (!unitsData || JSON.parse(unitsData).length === 0) {
      console.log(
        "Nenhuma unidade encontrada, inicializando com dados padrão..."
      );

      // Unidades padrão para garantir que sempre haja dados
      const defaultUnits = [
        {
          id: 1,
          name: "Itaquera - SP",
          address:
            "R. Álvaro de Mendonça, 456 - Itaquera, São Paulo - SP, 08215-290",
          phone: "(11) 2205-1100",
          courses: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: "Santana - SP",
          address: "Avenida General Ataliba Leonel, 245",
          phone: "11939006541",
          courses: [],
          createdAt: new Date().toISOString(),
        },
      ];

      localStorage.setItem("iosUnits", JSON.stringify(defaultUnits));
    }

    // Inicializa outros dados se não existirem
    if (!localStorage.getItem("iosClasses")) {
      localStorage.setItem("iosClasses", JSON.stringify([]));
    }
    if (!localStorage.getItem("iosStudents")) {
      localStorage.setItem("iosStudents", JSON.stringify([]));
    }
    if (!localStorage.getItem("iosAttendance")) {
      localStorage.setItem("iosAttendance", JSON.stringify([]));
    }
    if (!localStorage.getItem("iosUsers")) {
      const defaultUsers = {
        admin: {
          password: "admin123",
          type: "admin",
          name: "Administrador Master",
          unitId: null, // Admin pode ver todas as unidades
        },
        instructor: {
          password: "inst123",
          type: "instructor",
          name: "Prof. João Silva",
          unitId: 1, // ID da unidade que o instrutor pertence
        },
        pedagogue: {
          password: "ped123",
          type: "pedagogue",
          name: "Ana Pedagoga",
          unitId: 1, // ID da unidade que o pedagogo pertence
        },
        monitor: {
          password: "mon123",
          type: "monitor",
          name: "Monitor Carlos",
          unitId: 2, // ID de outra unidade
        },
      };

      localStorage.setItem("iosUsers", JSON.stringify(defaultUsers));
    }

    console.log("Banco de dados inicializado com sucesso!");
  }

  getUnits() {
    return JSON.parse(localStorage.getItem("iosUnits") || "[]");
  }

  saveUnits(units) {
    localStorage.setItem("iosUnits", JSON.stringify(units));
  }

  getClasses() {
    return JSON.parse(localStorage.getItem("iosClasses") || "[]");
  }

  saveClasses(classes) {
    localStorage.setItem("iosClasses", JSON.stringify(classes));
  }

  getStudents() {
    return JSON.parse(localStorage.getItem("iosStudents") || "[]");
  }

  saveStudents(students) {
    localStorage.setItem("iosStudents", JSON.stringify(students));
  }

  getAttendance() {
    return JSON.parse(localStorage.getItem("iosAttendance") || "[]");
  }

  saveAttendance(attendance) {
    localStorage.setItem("iosAttendance", JSON.stringify(attendance));
  }

  // ADICIONE ESTE MÉTODO
  getUsers() {
    return JSON.parse(localStorage.getItem("iosUsers") || "{}");
  }

  // ADICIONE ESTE MÉTODO
  saveUsers(users) {
    localStorage.setItem("iosUsers", JSON.stringify(users));
  }
}

const db = new Database();
let currentUser = null;

// User credentials
const users = {
  admin: {
    password: "admin123",
    type: "admin",
    name: "Administrador Master",
    unitId: null, // Admin pode ver todas as unidades
  },
  instructor: {
    password: "inst123",
    type: "instructor",
    name: "Prof. João Silva",
    unitId: 1, // ID da unidade que o instrutor pertence
  },
  pedagogue: {
    password: "ped123",
    type: "pedagogue",
    name: "Ana Pedagoga",
    unitId: 1, // ID da unidade que o pedagogo pertence
  },
  monitor: {
    password: "mon123",
    type: "monitor",
    name: "Monitor Carlos",
    unitId: 2, // ID de outra unidade
  },
};

// Modificar as variáveis de controle no início do arquivo
let isLoginScreen = true;
let modalBlocked = false; // Mudei para false por padrão, não queremos bloquear os modais após o login

// Manter controle do estado da aplicação
// Login functionality
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM carregado, configurando eventos...");

  // Formulário de login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Login tentado");

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const userType = document.getElementById("userType").value;

      // CORRIJA ESTA LINHA: Use db.getUsers() em vez de getUsers()
      const user = users[email]; // Usamos o objeto users definido globalmente

      const alertElement = document.getElementById("loginAlert");

      if (user && user.password === password && user.type === userType) {
        currentUser = { email, ...user };
        showMainSystem();
        if (alertElement) alertElement.classList.add("hidden");
      } else {
        if (alertElement) alertElement.classList.remove("hidden");
        alert("Usuário ou senha incorretos!"); // Adicionei um alerta para feedback
      }
    });
  }

  // CONSERTANDO O FORMULÁRIO DE UNIDADES
  const unitForm = document.getElementById("unitForm");
  if (unitForm) {
    console.log("Formulário de unidades encontrado, adicionando evento submit");

    unitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Formulário de unidades submetido, processando...");

      // Obter valores dos campos
      const name = document.getElementById("unitName").value;
      const address = document.getElementById("unitAddress").value;
      const phone = document.getElementById("unitPhone").value;

      console.log("Dados do formulário:", { name, address, phone });

      if (!name || !address || !phone) {
        console.error("Campos obrigatórios não preenchidos");
        showAlert("Por favor, preencha todos os campos!", "error");
        return;
      }

      try {
        // Obter unidades existentes
        const units = db.getUnits();
        console.log("Unidades existentes:", units);

        // Criar nova unidade
        const newUnit = {
          id: Date.now(), // ID único baseado em timestamp
          name,
          address,
          phone,
          courses: [], // Array vazio de cursos
          createdAt: new Date().toISOString(),
        };

        // Adicionar à lista e salvar
        units.push(newUnit);
        db.saveUnits(units);
        console.log("Unidade salva com sucesso:", newUnit);

        // Limpar formulário
        this.reset();

        // Atualizar a interface
        loadUnitsTable();
        updateSelects();
        updateDashboard();

        showAlert("Unidade cadastrada com sucesso!", "success");
      } catch (error) {
        console.error("Erro ao salvar unidade:", error);
        showAlert("Erro ao cadastrar unidade: " + error.message, "error");
      }
    });
  } else {
    console.error("Formulário de unidades não encontrado!");
  }

  // Class form
  document.getElementById("classForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("className").value;
    const unitId = parseInt(document.getElementById("classUnit").value);
    const instructor = document.getElementById("classInstructor").value;
    const year = document.getElementById("classYear").value;

    const classes = db.getClasses();
    const newClass = {
      id: Date.now(),
      name,
      unitId,
      instructor,
      year,
      createdAt: new Date().toISOString(),
    };

    classes.push(newClass);
    db.saveClasses(classes);

    this.reset();
    loadClassesTable();
    updateSelects();
    updateDashboard();
    showAlert("Turma cadastrada com sucesso!", "success");
  });

  // Adicionar botão de emergência para reiniciar o banco de dados
  const headerElement = document.querySelector(".header");
  if (headerElement) {
    const resetButton = document.createElement("button");
    resetButton.className = "btn btn-danger";
    resetButton.style.marginLeft = "10px";
    resetButton.innerHTML = '<i class="fas fa-sync"></i> Reiniciar Dados';
    resetButton.onclick = function () {
      if (
        confirm(
          "Tem certeza que deseja reiniciar o banco de dados? Isso restaurará as unidades padrão."
        )
      ) {
        resetDatabase();
        showAlert("Banco de dados reinicializado com sucesso!", "success");
      }
    };

    // Adicionar ao header depois do perfil do usuário
    const userInfoElement = document.querySelector(".user-info");
    if (userInfoElement) {
      userInfoElement.parentNode.insertBefore(
        resetButton,
        userInfoElement.nextSibling
      );
    } else {
      headerElement.appendChild(resetButton);
    }
  }
});

function showMainSystem() {
  console.log("Iniciando exibição do sistema principal");
  // Escondendo tela de login e mostrando sistema principal
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("mainSystem").classList.remove("hidden");

  // IMPORTANTE: Mudando a flag de controle
  isLoginScreen = false;
  modalBlocked = false; // Não bloqueia mais os modais

  console.log("Sistema principal carregado, modais disponíveis");

  // Garante que qualquer modal esteja fechado ao fazer login
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
    modal.style.display = "none";
  });

  // Update user info
  document.getElementById("userName").textContent = currentUser.name;
  document.getElementById("userRole").textContent = getRoleDisplayName(
    currentUser.type
  );
  document.getElementById("userAvatar").textContent =
    currentUser.name.charAt(0);

  // Show/hide tabs based on user type
  if (currentUser.type !== "admin") {
    document.getElementById("unitsTab").style.display = "none";
    document.getElementById("usersTab").style.display = "none";

    // Apenas o admin e pedagogo podem ver relatórios
    if (currentUser.type !== "pedagogue") {
      document.getElementById("reportsTab").style.display = "none";
    }
  }

  // Load initial data
  updateDashboard();
  loadUnitsTable();
  loadClassesTable();
  if (currentUser.type === "admin") {
    loadUsersTable();
  }
  updateSelects();
  setDefaultDate();
}

function getRoleDisplayName(type) {
  const roles = {
    admin: "Administrador Master",
    instructor: "Instrutor",
    pedagogue: "Pedagogo",
    monitor: "Monitor",
  };
  return roles[type] || type;
}

function logout() {
  currentUser = null;

  // Bloqueando modais novamente
  isLoginScreen = true;
  modalBlocked = true;

  // Escondendo sistema principal e mostrando tela de login
  document.getElementById("loginScreen").classList.remove("hidden");
  document.getElementById("mainSystem").classList.add("hidden");
  document.getElementById("loginForm").reset();

  // Fechando todos os modais
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
  });

  showPage("dashboard");
}

function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Remove active class from all tabs
  document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId + "Page").classList.add("active");

  // Add active class to clicked tab
  event.currentTarget.classList.add("active");
}

function setDefaultDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("attendanceDate").value = today;
}

// Revise a função loadUnitsTable

function loadUnitsTable() {
  console.log("Carregando tabela de unidades...");

  // Obter unidades do banco de dados
  let units = db.getUnits();
  console.log("Unidades recuperadas:", units);

  // Filter units based on user access
  if (currentUser && currentUser.type !== "admin") {
    units = units.filter((unit) => unit.id === currentUser.unitId);
  }

  // Obter referência para o tbody
  const tbody = document.getElementById("unitsTableBody");
  if (!tbody) {
    console.error("Elemento unitsTableBody não encontrado!");
    return;
  }

  // Limpar a tabela
  tbody.innerHTML = "";

  // Verificar se há unidades
  if (units.length === 0) {
    console.log("Nenhuma unidade encontrada!");

    // Adicionar linha indicando que não há unidades
    const row = document.createElement("tr");
    row.innerHTML = `
      <td colspan="5" style="text-align: center;">Nenhuma unidade cadastrada</td>
    `;
    tbody.appendChild(row);
    return;
  }

  // Adicionar cada unidade à tabela
  units.forEach((unit) => {
    // Contar quantos cursos a unidade tem
    const coursesCount = (unit.courses && unit.courses.length) || 0;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${unit.name || "N/A"}</td>
      <td>${unit.address || "N/A"}</td>
      <td>${unit.phone || "N/A"}</td>
      <td>${coursesCount} curso(s)</td>
      <td>
        <button class="btn" onclick="handleUnitCoursesClick(${unit.id})">
          <i class="fas fa-graduation-cap"></i> Gerenciar Cursos
        </button>
        ${
          currentUser && currentUser.type === "admin"
            ? `<button class="btn btn-danger" onclick="deleteUnit(${unit.id})">
            <i class="fas fa-trash"></i> Excluir
          </button>`
            : ""
        }
      </td>
    `;
    tbody.appendChild(row);
  });

  console.log("Tabela de unidades carregada com sucesso!");
}

// Certifique-se de que a função deleteUnit está correta
function deleteUnit(unitId) {
  console.log("Tentando excluir unidade:", unitId);

  if (
    !confirm(
      "Tem certeza que deseja excluir esta unidade? Esta ação não pode ser desfeita."
    )
  ) {
    return;
  }

  try {
    // Obter unidades
    const units = db.getUnits();

    // Filtrar a unidade a ser excluída
    const updatedUnits = units.filter((unit) => unit.id !== unitId);

    // Salvar unidades atualizadas
    db.saveUnits(updatedUnits);

    // Atualizar interface
    loadUnitsTable();
    updateSelects();
    updateDashboard();

    showAlert("Unidade excluída com sucesso!", "success");
  } catch (error) {
    console.error("Erro ao excluir unidade:", error);
    showAlert("Erro ao excluir unidade: " + error.message, "error");
  }
}

// Adicionar botão de emergência para reiniciar o banco de dados
const headerElement = document.querySelector(".header");
if (headerElement) {
  const resetButton = document.createElement("button");
  resetButton.className = "btn btn-danger";
  resetButton.style.marginLeft = "10px";
  resetButton.innerHTML = '<i class="fas fa-sync"></i> Reiniciar Dados';
  resetButton.onclick = function () {
    if (
      confirm(
        "Tem certeza que deseja reiniciar o banco de dados? Isso restaurará as unidades padrão."
      )
    ) {
      resetDatabase();
      showAlert("Banco de dados reinicializado com sucesso!", "success");
    }
  };

  // Adicionar ao header depois do perfil do usuário
  const userInfoElement = document.querySelector(".user-info");
  if (userInfoElement) {
    userInfoElement.parentNode.insertBefore(
      resetButton,
      userInfoElement.nextSibling
    );
  } else {
    headerElement.appendChild(resetButton);
  }
}

// Adicione esta função para reinicializar o banco de dados com algumas unidades padrão

function resetDatabase() {
  console.log("Reinicializando o banco de dados com dados padrão...");

  // Unidades padrão para garantir que sempre haja dados
  const defaultUnits = [
    {
      id: 1,
      name: "Itaquera - SP",
      address:
        "R. Álvaro de Mendonça, 456 - Itaquera, São Paulo - SP, 08215-290",
      phone: "(11) 2205-1100",
      courses: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: "Santana - SP",
      address: "Avenida General Ataliba Leonel, 245",
      phone: "11939006541",
      courses: [],
      createdAt: new Date().toISOString(),
    },
  ];

  // Salvar unidades no localStorage
  localStorage.setItem("iosUnits", JSON.stringify(defaultUnits));

  // Recarregar tabela de unidades
  loadUnitsTable();

  // Atualizar selects que dependem das unidades
  updateSelects();

  console.log("Banco de dados reinicializado com sucesso!");
  return true;
}
