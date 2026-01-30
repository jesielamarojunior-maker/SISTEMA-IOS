# Sistema de Controle de Presença - Instituto da Oportunidade Social

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Características](#características)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tipos de Usuário](#tipos-de-usuário)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)
- [Estrutura de Dados](#estrutura-de-dados)
- [Segurança e Permissões](#segurança-e-permissões)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Backup e Manutenção](#backup-e-manutenção)
- [Troubleshooting](#troubleshooting)

## 📖 Visão Geral

O **Sistema de Controle de Presença** é uma aplicação web moderna desenvolvida para o Instituto da Oportunidade Social (IOS). O sistema permite o gerenciamento completo de usuários, cursos, turmas e controle de presença dos estudantes, com diferentes níveis de acesso baseados no tipo de usuário.

### 🎯 Objetivos

- Centralizar o controle de presença dos estudantes
- Facilitar a gestão de cursos e turmas
- Fornecer dashboards e relatórios para tomada de decisão
- Garantir a segurança dos dados com controle de acesso
- Permitir backup e restauração dos dados

## ✨ Características

### 🎨 Interface Moderna

- **Design Glassmorphism**: Interface moderna com efeitos de vidro
- **Responsivo**: Adaptável a diferentes tamanhos de tela
- **Intuitivo**: Navegação simples e clara
- **Acessível**: Cores e contrastes adequados

### 🔐 Segurança

- **Autenticação por tipo de usuário**: Login seguro com validação
- **Controle de acesso por unidade**: Usuários só veem dados de sua unidade
- **Validação de dados**: CPF, email e outros campos são validados
- **Persistência local**: Dados armazenados no navegador do usuário

### 📊 Dashboards Inteligentes

- **Admin**: Visualiza dados de todas as unidades
- **Outros usuários**: Visualizam apenas dados de sua unidade
- **Estatísticas em tempo real**: Gráficos e métricas atualizadas
- **Exportação de dados**: Relatórios em Excel

## 📁 Estrutura do Projeto

```
├── index.html          # Interface principal do sistema
├── style.css           # Estilos visuais (glassmorphism)
├── main.js             # Lógica principal e gerenciamento de dados
├── advanced-functions.js # Funções avançadas de turmas e estudantes
├── README.md           # Esta documentação
├── INSTALACAO.md       # Guia de instalação
└── arquivos de backup/ # Backups anteriores (main-backup.js, etc.)
```

### 🗂️ Detalhamento dos Arquivos

#### `index.html`

- Interface única com múltiplas seções
- Sistema de abas dinâmico
- Modais para ações específicas
- Formulários com validação

#### `style.css`

- Design glassmorphism moderno
- Responsividade completa
- Animações e transições suaves
- Cores e tipografia do IOS

#### `main.js`

- **DataManager**: Gerenciamento de localStorage
- **Autenticação**: Sistema de login e controle de acesso
- **Dashboards**: Geração de estatísticas e gráficos
- **Backup/Restauração**: Exportação e importação de dados

#### `advanced-functions.js`

- **Gestão de Turmas**: CRUD completo de turmas
- **Gestão de Estudantes**: Adição e remoção de estudantes
- **Controle de Presença**: Sistema de chamada avançado
- **Validações**: Verificações de integridade dos dados

## 👥 Tipos de Usuário

### 🔴 Administrador Master (`admin`)

**Acesso Total ao Sistema**

- ✅ Visualiza **todas as unidades**
- ✅ Cadastra novos usuários
- ✅ Gerencia cursos e turmas
- ✅ Acessa página "Dados" (backup/restauração)
- ✅ Exporta relatórios Excel
- ✅ Exclui turmas e cursos
- ✅ Visualiza dashboard completo

### 🔵 Instrutor (`instructor`)

**Foco no Ensino**

- ✅ Visualiza apenas **sua unidade**
- ✅ Gerencia turmas de sua unidade
- ✅ Controla presença dos estudantes
- ✅ Adiciona estudantes às turmas
- ❌ Não cadastra usuários
- ❌ Não acessa dados de outras unidades

### 🟢 Pedagogo (`pedagogue`)

**Suporte Pedagógico**

- ✅ Visualiza apenas **sua unidade**
- ✅ Acompanha presença dos estudantes
- ✅ Visualiza relatórios de sua unidade
- ✅ Gerencia estudantes
- ❌ Não cadastra usuários
- ❌ Não exclui turmas

### 🟡 Monitor (`monitor`)

**Apoio Operacional**

- ✅ Visualiza apenas **sua unidade**
- ✅ Registra presença dos estudantes
- ✅ Visualiza informações básicas
- ❌ Não gerencia turmas
- ❌ Não cadastra usuários
- ❌ Acesso limitado

## 🚀 Funcionalidades

### 1. 🔐 Sistema de Login

- **Autenticação por email e senha**
- **Seleção do tipo de usuário**
- **Validação de credenciais**
- **Usuários de teste pré-configurados**

```
Usuários de Teste:
- Admin: admin@ios.org.br / admin123
- Instrutor: instrutor@ios.org.br / inst123
- Pedagogo: pedagogo@ios.org.br / ped123
- Monitor: monitor@ios.org.br / mon123
```

### 2. 📊 Dashboard

- **Estatísticas por unidade**
- **Gráficos de presença**
- **Métricas de estudantes**
- **Informações de cursos e turmas**

### 3. 👤 Gestão de Usuários (Admin)

- **Cadastro de novos usuários**
- **Validação de CPF e email**
- **Atribuição de unidades**
- **Controle de status (ativo/inativo)**

### 4. 🏢 Gestão de Unidades

- **Cadastro de unidades**
- **Informações de contato**
- **Endereços completos**

### 5. 📚 Gestão de Cursos

- **Criação de cursos**
- **Categorização por área**
- **Controle de duração**
- **Apenas admin pode excluir**

### 6. 🎓 Gestão de Turmas

- **Criação de turmas por curso**
- **Atribuição de instrutores**
- **Definição de ano letivo**
- **Vinculação com unidades**

### 7. 👨‍🎓 Gestão de Estudantes

- **Cadastro por turma**
- **Status ativo/inativo**
- **Histórico de matrícula**

### 8. ✅ Controle de Presença

- **Registro diário de presença**
- **Opções: Presente, Falta, Justificada**
- **Upload de arquivos de justificativa**
- **Histórico completo**

### 9. 📈 Relatórios e Exportação

- **Exportação para Excel**
- **Relatórios de presença**
- **Estatísticas por período**
- **Dados filtrados por unidade**

### 10. 💾 Backup e Restauração

- **Exportação completa dos dados**
- **Importação de backups**
- **Reset do sistema**
- **Verificação de integridade**

## 📖 Como Usar

### Primeiro Acesso

1. **Abra o arquivo `index.html` no navegador**
2. **Use um dos usuários de teste para fazer login**
3. **Explore as funcionalidades conforme seu tipo de usuário**

### Para Administradores

1. **Cadastre as unidades** na aba "Dados"
2. **Crie os cursos** disponíveis
3. **Cadastre usuários** para cada unidade
4. **Configure turmas** e associe instrutores
5. **Monitore através do dashboard**

### Para Instrutores/Pedagogos

1. **Acesse sua unidade** após o login
2. **Crie turmas** para seus cursos
3. **Adicione estudantes** às turmas
4. **Registre presença** diariamente
5. **Acompanhe relatórios** de sua unidade

### Para Monitores

1. **Acesse o sistema** com suas credenciais
2. **Selecione a turma** para chamada
3. **Registre a presença** dos estudantes
4. **Visualize informações básicas**

## 🗄️ Estrutura de Dados

### Usuários

```javascript
{
  id: number,
  name: string,
  cpf: string,
  email: string,
  password: string,
  type: 'admin' | 'instructor' | 'pedagogue' | 'monitor',
  unitId: number | null,
  status: 'active' | 'inactive',
  createdAt: string
}
```

### Unidades

```javascript
{
  id: number,
  name: string,
  address: string,
  phone: string,
  createdAt: string
}
```

### Cursos

```javascript
{
  id: number,
  name: string,
  description: string,
  duration: number,
  category: string,
  createdAt: string,
  canDelete: boolean
}
```

### Turmas

```javascript
{
  id: number,
  name: string,
  unitId: number,
  courseId: number,
  instructor: string,
  year: number,
  semester: number,
  createdAt: string,
  canDelete: boolean
}
```

### Estudantes

```javascript
{
  id: number,
  name: string,
  classId: number,
  status: 'active' | 'inactive',
  enrollmentDate: string
}
```

### Presença

```javascript
{
  [classId]: {
    [date]: {
      [studentId]: {
        status: 'presente' | 'falta' | 'justificada',
        file: File | null,
        timestamp: string
      }
    }
  }
}
```

## 🔒 Segurança e Permissões

### Controle de Acesso por Unidade

- **Admin**: Acesso a todas as unidades
- **Outros usuários**: Apenas sua unidade definida

### Validações Implementadas

- **CPF**: Formato e dígitos verificadores
- **Email**: Formato válido e unicidade
- **Senhas**: Critérios mínimos de segurança
- **Dados obrigatórios**: Validação de campos

### Proteções

- **XSS**: Sanitização de inputs
- **Integridade**: Verificação automática dos dados
- **Backup**: Proteção contra perda de dados

## 💻 Tecnologias Utilizadas

### Frontend

- **HTML5**: Estrutura moderna e semântica
- **CSS3**: Glassmorphism, Flexbox, Grid, Animations
- **JavaScript ES6+**: Classes, Promises, LocalStorage
- **Font Awesome**: Ícones modernos
- **Google Fonts**: Tipografia Inter

### Bibliotecas

- **SheetJS (xlsx)**: Exportação para Excel
- **LocalStorage API**: Persistência de dados
- **File API**: Upload de arquivos

### Recursos Modernos

- **CSS Custom Properties**: Variáveis CSS
- **CSS Grid & Flexbox**: Layout responsivo
- **ES6 Modules**: Organização do código
- **Async/Await**: Operações assíncronas

## 🔧 Instalação e Configuração

### Requisitos

- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **JavaScript habilitado**
- **LocalStorage disponível**

### Instalação

1. **Baixe todos os arquivos** do projeto
2. **Mantenha a estrutura** de arquivos
3. **Abra `index.html`** no navegador
4. **Pronto!** O sistema está funcionando

### Configuração Inicial

1. **Faça login como admin** (admin@ios.org.br / admin123)
2. **Acesse a aba "Dados"**
3. **Configure suas unidades**
4. **Cadastre usuários** para cada unidade
5. **Crie cursos** conforme necessário

### Personalização

- **Cores**: Edite as variáveis CSS em `style.css`
- **Logo**: Substitua o ícone no cabeçalho
- **Dados**: Modifique os dados padrão em `main.js`

## 💾 Backup e Manutenção

### Exportação de Dados

1. **Login como admin**
2. **Acesse "Dados" → "Backup"**
3. **Clique em "Exportar Dados"**
4. **Salve o arquivo JSON** gerado

### Importação de Dados

1. **Acesse "Dados" → "Backup"**
2. **Clique em "Importar Dados"**
3. **Selecione o arquivo JSON**
4. **Confirme a importação**

### Reset do Sistema

⚠️ **ATENÇÃO**: Remove todos os dados!

1. **Acesse "Dados" → "Backup"**
2. **Clique em "Reset Completo"**
3. **Confirme a ação**

### Manutenção Preventiva

- **Backup semanal** dos dados
- **Verificação de integridade** mensal
- **Limpeza de dados** antigos conforme necessário
- **Teste de restauração** periódico

## 🔧 Troubleshooting

### Problemas Comuns

#### Login não funciona

- ✅ Verifique se JavaScript está habilitado
- ✅ Confirme email e senha corretos
- ✅ Selecione o tipo de usuário correto
- ✅ Limpe o cache do navegador

#### Dados não aparecem

- ✅ Verifique se LocalStorage está habilitado
- ✅ Confirme se não está em modo privado/incógnito
- ✅ Teste em outro navegador
- ✅ Verifique console do navegador (F12)

#### Erro ao exportar Excel

- ✅ Verifique se há dados para exportar
- ✅ Confirme se navegador suporta downloads
- ✅ Tente com outro navegador
- ✅ Verifique bloqueadores de popup

#### Performance lenta

- ✅ Quantidade excessiva de dados armazenados
- ✅ Faça limpeza de dados antigos
- ✅ Execute reset se necessário
- ✅ Use navegador atualizado

### Códigos de Erro

#### DataManager

- **DM001**: Erro ao inicializar localStorage
- **DM002**: Dados corrompidos detectados
- **DM003**: Falha na verificação de integridade

#### Autenticação

- **AUTH001**: Credenciais inválidas
- **AUTH002**: Usuário não encontrado
- **AUTH003**: Tipo de usuário inválido

#### Validação

- **VAL001**: CPF inválido
- **VAL002**: Email inválido
- **VAL003**: Campo obrigatório

### Logs do Sistema

O sistema gera logs detalhados no console do navegador:

- 🚀 Inicialização
- 📦 Carregamento de dados
- ✅ Operações bem-sucedidas
- ⚠️ Avisos importantes
- 💥 Erros críticos

### Suporte Técnico

Para problemas não resolvidos:

1. **Abra o console** do navegador (F12)
2. **Copie as mensagens** de erro
3. **Documente os passos** que levaram ao erro
4. **Entre em contato** com o suporte técnico

---

## 📞 Contato e Suporte

**Instituto da Oportunidade Social**  
📧 Email: suporte@ios.org.br  
📱 Telefone: (11) 3456-7890  
🌐 Website: www.ios.org.br

---

_Documentação atualizada: Janeiro 2024_  
_Versão do Sistema: 2.0_

## Visão Geral

Sistema completo para gerenciamento de presença em unidades educacionais, desenvolvido especificamente para o Instituto da Oportunidade Social (IOS). O sistema permite controle total de usuários, unidades, turmas e registros de presença com diferentes níveis de acesso.

## Funcionalidades Principais

### 🏛️ **Administrador Master**

- **Controle Total**: Acesso a todas as funcionalidades do sistema
- **Gerenciamento de Usuários**: Cadastro de instructores, pedagogos e monitores
- **Gerenciamento de Unidades**: Criação e manutenção de unidades em todo o Brasil
- **Relatórios Avançados**: Exportação de dados em Excel com análises detalhadas
- **Dashboard Administrativo**: Estatísticas gerais, unidades com melhor/pior frequência, desistentes

### 👥 **Participantes das Unidades** (Instrutor, Pedagogo, Monitor)

- **Acesso Limitado**: Apenas à unidade designada pelo administrador
- **Gerenciamento de Turmas**: Criação de turmas (até 4 por curso)
- **Registro de Presença**: Sistema aprimorado com faltas justificadas e anexos
- **Dashboard da Unidade**: Estatísticas específicas da unidade

## Hierarquia do Sistema

```
Administrador Master
├── Tem acesso total
├── Cadastra unidades
├── Cadastra usuários com CPF e email @ios.org.br
└── Gera relatórios

Participantes da Unidade
├── Instrutor (Líder da unidade)
├── Pedagogo (Apoio pedagógico)
└── Monitor (Auxiliar)
    ├── Acesso apenas à sua unidade
    ├── Criam turmas
    ├── Adicionam estudantes
    └── Fazem chamada
```

## Estrutura de Arquivos

```
/
├── index.html              # Interface principal
├── style.css              # Estilos do sistema
├── main.js                # Funcionalidades principais
├── advanced-functions.js  # Funcionalidades avançadas
└── README.md             # Este arquivo
```

## Como Usar

### 1. **Login no Sistema**

- Use um dos usuários de teste ou cadastre novos pelo admin
- Selecione o tipo de usuário correspondente

### 2. **Usuários de Teste**

```
Administrador: admin@ios.org.br / admin123
Instrutor: instrutor@ios.org.br / inst123
Pedagogo: pedagogo@ios.org.br / ped123
Monitor: monitor@ios.org.br / mon123
```

### 3. **Cadastro de Usuários** (Apenas Admin)

- Nome completo
- CPF (com máscara automática)
- Email institucional (@ios.org.br)
- Senha temporária
- Tipo de usuário
- Unidade (obrigatório para não-admin)

### 4. **Gerenciamento de Unidades** (Apenas Admin)

- Cadastro de novas unidades
- Edição de informações
- Visualização de cursos e turmas

### 5. **Gerenciamento de Turmas**

- Criação de turmas por unidade
- Adição de estudantes
- Limitação: Após adicionar estudantes, apenas admin pode excluir

### 6. **Registro de Presença Avançado**

- **Marcação Intuitiva**: Todos os alunos iniciam como presentes
- **Falta Simples**: Marcar como ausente
- **Falta Justificada**: Checkbox para justificar
- **Anexo de Atestado**: Upload de documentos (PDF, JPG, PNG)
- **Controle de Acesso**: Apenas turmas da própria unidade

### 7. **Dashboard Inteligente**

#### Admin:

- Total de unidades, turmas e estudantes
- Presenças do dia
- Unidade com maior frequência
- Unidade com maior índice de faltas
- Total de desistentes

#### Participantes:

- Estatísticas da própria unidade
- Estudantes com maior presença
- Estudantes com maior falta
- Comparativo de desistentes

### 8. **Relatórios e Exportação** (Apenas Admin)

- Filtro por unidade e turma
- Período customizável
- Exportação em Excel com:
  - Data da presença
  - Unidade e turma
  - Nome do instrutor
  - Nome do estudante
  - Status (Presente/Ausente)
  - Falta justificada (Sim/Não)
  - Anexo de atestado

## Recursos de Segurança

### 🔒 **Controle de Acesso**

- Autenticação obrigatória
- Permissões por tipo de usuário
- Isolamento por unidade
- Validação de email institucional

### 🛡️ **Validações**

- CPF único no sistema
- Email único e obrigatoriamente @ios.org.br
- Não permite excluir admin principal
- Não permite excluir unidades com dados associados

### 📊 **Auditoria**

- Data de criação de usuários
- Data de matrícula de estudantes
- Histórico completo de presenças
- Status de usuários (ativo/inativo)

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Bibliotecas**:
  - Font Awesome (ícones)
  - SheetJS (exportação Excel)
- **Armazenamento**: LocalStorage (simulação de banco)
- **Design**: Responsive, gradientes modernos, cards interativos

## Melhorias Implementadas

### ✨ **Interface**

- Design moderno com gradientes
- Cards interativos
- Responsividade total
- Feedback visual em tempo real

### 🚀 **Funcionalidades**

- Sistema de permissões robusto
- Presença com faltas justificadas
- Upload de documentos
- Dashboard com métricas avançadas
- Exportação Excel detalhada

### 🎯 **Usabilidade**

- Máscara automática de CPF
- Validações em tempo real
- Confirmações de ações críticas
- Mensagens de erro/sucesso claras

## Próximos Passos

Para produção, considere implementar:

- Backend com banco de dados real
- Autenticação JWT
- Upload real de arquivos
- Backup automático
- Logs de auditoria
- API REST para integração

---

**Instituto da Oportunidade Social - Sistema de Controle de Presença v2.0**
_Desenvolvido com foco na usabilidade e controle de acesso rigoroso_
