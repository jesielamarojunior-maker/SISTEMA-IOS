# Sistema de Controle de Presença - Instituto da Oportunidade Social

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
