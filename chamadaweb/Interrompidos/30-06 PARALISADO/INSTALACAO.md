# 🚀 Guia de Instalação - Sistema de Controle de Presença IOS

## 📋 Pré-requisitos

### Navegadores Suportados

- ✅ **Google Chrome** (versão 80+)
- ✅ **Mozilla Firefox** (versão 75+)
- ✅ **Microsoft Edge** (versão 80+)
- ✅ **Safari** (versão 13+)

### Requisitos do Sistema

- **JavaScript habilitado**
- **LocalStorage disponível** (não funciona em modo privado/incógnito)
- **Conexão com internet** (para carregar fontes e ícones)
- **Resolução mínima**: 1024x768 pixels

## 📁 Estrutura dos Arquivos

Certifique-se de que todos os arquivos estão na mesma pasta:

```
📁 sistema-ios/
├── 📄 index.html            # Arquivo principal (ABRIR ESTE)
├── 🎨 style.css            # Estilos visuais
├── ⚙️ main.js              # Lógica principal
├── 🔧 advanced-functions.js # Funções avançadas
├── 📖 README.md            # Documentação completa
└── 📋 INSTALACAO.md        # Este guia
```

## 🔧 Instalação Passo a Passo

### Método 1: Execução Local (Recomendado)

#### 1️⃣ **Download dos Arquivos**

- Baixe todos os arquivos do sistema
- Mantenha-os na mesma pasta
- NÃO altere os nomes dos arquivos

#### 2️⃣ **Abrir o Sistema**

- **Duplo clique** em `index.html` OU
- **Clique direito** → "Abrir com" → Selecione seu navegador OU
- **Arraste** o arquivo `index.html` para o navegador

#### 3️⃣ **Verificar Funcionamento**

- A tela de login deve aparecer
- Os estilos devem estar carregados
- Não deve haver erros no console (F12)

### Método 2: Servidor Web Local

#### Para usuários avançados que preferem usar servidor local:

**Com Python:**

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Com Node.js:**

```bash
npx http-server
```

**Com PHP:**

```bash
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## 🔐 Primeiro Acesso

### 1️⃣ **Tela de Login**

Ao abrir o sistema, você verá a tela de login com:

- Campo para **E-mail**
- Campo para **Senha**
- Seletor de **Tipo de usuário**

### 2️⃣ **Usuários de Teste**

Use estes usuários pré-configurados:

| Tipo          | E-mail               | Senha    | Acesso                   |
| ------------- | -------------------- | -------- | ------------------------ |
| **Admin**     | admin@ios.org.br     | admin123 | Todas as funcionalidades |
| **Instrutor** | instrutor@ios.org.br | inst123  | Sua unidade apenas       |
| **Pedagogo**  | pedagogo@ios.org.br  | ped123   | Sua unidade apenas       |
| **Monitor**   | monitor@ios.org.br   | mon123   | Acesso limitado          |

### 3️⃣ **Login de Administrador**

Para configuração inicial, use:

- **E-mail**: `admin@ios.org.br`
- **Senha**: `admin123`
- **Tipo**: `Administrador Master`

## ⚙️ Configuração Inicial

### Como Administrador, configure na seguinte ordem:

#### 1️⃣ **Unidades** (Aba "Dados")

- Acesse **Dados** → **Gerenciar Unidades**
- Cadastre suas unidades do IOS
- Exemplo: "Unidade Centro", "Unidade Norte", etc.

#### 2️⃣ **Cursos** (Aba "Cursos")

- Crie os cursos oferecidos
- Defina categoria e duração
- Exemplo: "Informática Básica", "Inglês", etc.

#### 3️⃣ **Usuários** (Aba "Usuários")

- Cadastre instrutores, pedagogos e monitores
- Associe cada usuário a uma unidade
- Defina permissões adequadas

#### 4️⃣ **Turmas** (Aba "Turmas")

- Crie turmas para cada curso/unidade
- Defina instrutores responsáveis
- Configure ano letivo

#### 5️⃣ **Estudantes** (Aba "Turmas")

- Adicione estudantes às turmas
- Mantenha informações atualizadas

## 🔍 Verificação de Funcionamento

### ✅ Checklist de Instalação

- [ ] **Arquivos**: Todos os arquivos estão na mesma pasta
- [ ] **Navegador**: Usando navegador suportado e atualizado
- [ ] **JavaScript**: Habilitado no navegador
- [ ] **LocalStorage**: Funcionando (não em modo privado)
- [ ] **Login**: Consegue fazer login com usuários de teste
- [ ] **Interface**: Estilos carregados corretamente
- [ ] **Funcionalidades**: Todas as abas aparecem conforme permissões
- [ ] **Console**: Sem erros críticos (F12 → Console)

### 🚨 Indicadores de Problemas

❌ **Tela em branco**: Verifique se JavaScript está habilitado  
❌ **Sem estilos**: Confirme se `style.css` está na mesma pasta  
❌ **Login falha**: Verifique console do navegador (F12)  
❌ **Dados não salvam**: LocalStorage pode estar desabilitado  
❌ **Lentidão**: Muitos dados salvos, considere fazer limpeza

## 🛠️ Solução de Problemas

### Problema: Tela de Login não Aparece

**Soluções:**

1. Verifique se todos os arquivos estão na mesma pasta
2. Abra o console (F12) e veja se há erros
3. Teste em outro navegador
4. Certifique-se que JavaScript está habilitado

### Problema: Estilos não Carregam

**Soluções:**

1. Confirme que `style.css` está na mesma pasta que `index.html`
2. Verifique conexão com internet (para fontes externas)
3. Limpe cache do navegador (Ctrl+F5)
4. Teste em modo privado

### Problema: Login não Funciona

**Soluções:**

1. Use exatamente os dados dos usuários de teste
2. Selecione o tipo de usuário correto
3. Verifique se não está em modo privado/incógnito
4. Abra console (F12) para ver erros

### Problema: Dados não Salvam

**Soluções:**

1. Saia do modo privado/incógnito
2. Verifique se LocalStorage está habilitado
3. Limpe dados antigos se necessário
4. Teste em outro navegador

## 🔄 Atualizações e Backup

### Antes de Atualizar

1. **Faça backup** dos dados (Dados → Backup → Exportar)
2. Salve o arquivo JSON em local seguro
3. Teste a nova versão em pasta separada

### Após Atualizar

1. **Substitua** apenas os arquivos de código
2. **Mantenha** os dados salvos no navegador
3. **Teste** todas as funcionalidades
4. **Restaure** backup se necessário

## 📞 Suporte Técnico

### Se ainda não conseguir instalar:

1. **Verifique o console** do navegador (F12 → Console)
2. **Anote as mensagens** de erro exatas
3. **Documente os passos** realizados
4. **Entre em contato** com os detalhes

### Informações para Suporte

- **Navegador e versão** utilizada
- **Sistema operacional**
- **Mensagens de erro** do console
- **Passos executados** antes do problema

---

## 🎯 Próximos Passos

Após a instalação bem-sucedida:

1. **Leia a documentação completa** no `README.md`
2. **Configure o sistema** conforme suas necessidades
3. **Treine os usuários** nas funcionalidades
4. **Estabeleça rotina** de backup dos dados
5. **Monitore o uso** e performance

---

**🏢 Instituto da Oportunidade Social**  
_Sistema de Controle de Presença - v2.0_

Use o administrador master para começar:

```
Email: admin@ios.org.br
Senha: admin123
Tipo: Administrador Master
```

### 3. **Primeiros Passos**

#### Como Administrador Master:

1. **Cadastre Unidades**

   - Vá em "Unidades" → Preencha os dados → "Cadastrar Unidade"

2. **Cadastre Usuários**

   - Vá em "Usuários" → Preencha os dados → Selecione a unidade → "Cadastrar Usuário"

3. **Visualize Dashboard**
   - Estatísticas gerais do sistema
   - Acompanhe performance das unidades

#### Como Participante (Instrutor/Pedagogo/Monitor):

1. **Faça Login**

   - Use credenciais fornecidas pelo administrador

2. **Crie Turmas**

   - Vá em "Turmas" → Preencha dados → "Cadastrar Turma"

3. **Adicione Estudantes**

   - Na mesma página, selecione a turma → Digite nome → "Adicionar"

4. **Realize Chamada**

   - Vá em "Chamada" → Selecione turma e data → Marque presenças/faltas
   - Para faltas: Marque como ausente → Justifique se necessário → Anexe atestado

5. **Acompanhe Dashboard**
   - Estatísticas da sua unidade

## Funcionalidades Principais

### ✅ **Implementado com Sucesso**

- ✅ Hierarquia de usuários (Master → Participantes)
- ✅ Controle de acesso por unidade
- ✅ Cadastro de unidades pelo admin
- ✅ Cadastro de usuários com validação de email @ios.org.br
- ✅ Sistema de turmas com até 4 turmas por curso
- ✅ Proteção contra exclusão de turmas com estudantes
- ✅ Chamada aprimorada com faltas justificadas
- ✅ Upload de atestados
- ✅ Dashboard diferenciado por tipo de usuário
- ✅ Relatórios Excel completos (apenas admin)
- ✅ Interface moderna e responsiva

### 🔒 **Segurança**

- ✅ Usuários só acessam sua unidade
- ✅ Validações de permissão em todas as ações
- ✅ Email obrigatoriamente @ios.org.br
- ✅ CPF único no sistema
- ✅ Senhas temporárias resetáveis

### 📊 **Dashboard Inteligente**

- **Admin**: Visão geral + unidades com melhor/pior frequência + desistentes
- **Participantes**: Estatísticas da unidade + estudantes com maior/menor frequência

### 📈 **Relatórios**

- **Admin**: Exportação Excel com todos os dados de presença
- **Participantes**: Apenas visualização do dashboard

## Dados de Teste

O sistema já vem com dados de exemplo para facilitar os testes:

**Unidades:**

- Unidade Centro - São Paulo
- Unidade Norte - Rio de Janeiro

**Usuários de Teste:**

- Admin: admin@ios.org.br / admin123
- Instrutor: instrutor@ios.org.br / inst123
- Pedagogo: pedagogo@ios.org.br / ped123
- Monitor: monitor@ios.org.br / mon123

**Estudantes de Exemplo:**

- Ana Santos Silva
- Carlos Oliveira Costa
- Maria José Fernandes

## Resolução de Problemas

### Problema: "Não consegue fazer login"

**Solução:** Verifique se selecionou o tipo de usuário correto

### Problema: "Não aparece a aba Usuários/Unidades"

**Solução:** Essas abas só aparecem para administradores master

### Problema: "Não consegue acessar turma de outra unidade"

**Solução:** Funcionalidade correta - usuários só acessam sua unidade

### Problema: "Não consegue excluir turma"

**Solução:** Após adicionar estudantes, apenas admin pode excluir

### Problema: "Exportação Excel não funciona"

**Solução:** Apenas administradores têm acesso aos relatórios

---

**Sistema pronto para uso! 🚀**

Para dúvidas ou suporte, consulte o README.md completo.
