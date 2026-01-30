# Guia de Instalação Rápida

## Como Executar o Sistema

### 1. **Abrir o Sistema**

- Abra o arquivo `index.html` em qualquer navegador moderno
- Recomendamos Chrome, Firefox, Safari ou Edge

### 2. **Login Inicial**

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
