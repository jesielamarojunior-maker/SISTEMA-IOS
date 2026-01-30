// Teste de conectividade e autenticação - Debug 401
// Para usar: abra o console do navegador e execute este código

console.log("🔧 Debug Sistema de Autenticação IOS");
console.log("===================================");

// 1. Testar conectividade básica
async function testBackendConnection() {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/ping`
    );
    const data = await response.json();
    console.log("✅ Backend conectado:", data);
    return true;
  } catch (error) {
    console.error("❌ Erro conectando backend:", error);
    return false;
  }
}

// 2. Testar login e token
async function testLogin(email, senha) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Erro no login:", response.status, error);
      return null;
    }

    const data = await response.json();
    console.log("✅ Login realizado:", data);
    return data.access_token;
  } catch (error) {
    console.error("❌ Erro no login:", error);
    return null;
  }
}

// 3. Testar requisição autenticada
async function testAuthenticatedRequest(token) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Erro requisição autenticada:", response.status, error);
      return false;
    }

    const data = await response.json();
    console.log("✅ Requisição autenticada OK:", data);
    return true;
  } catch (error) {
    console.error("❌ Erro requisição autenticada:", error);
    return false;
  }
}

// 4. Executar todos os testes
async function runFullTest() {
  console.log("🧪 Iniciando testes completos...");

  // Teste 1: Conectividade
  const connected = await testBackendConnection();
  if (!connected) return;

  // Teste 2: Login (use credenciais reais do seu sistema)
  const token = await testLogin("admin@ios.com", "sua-senha-aqui");
  if (!token) return;

  // Teste 3: Requisição autenticada
  await testAuthenticatedRequest(token);

  console.log("🎉 Testes concluídos!");
}

// Para executar:
// runFullTest();

console.log("💡 Para testar, execute: runFullTest()");
console.log(
  "⚠️  Lembre-se de trocar 'admin@ios.com' e 'sua-senha-aqui' por credenciais reais!"
);
