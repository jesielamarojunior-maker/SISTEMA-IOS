# Sistema de Controle de Presença - Instituto da Oportunidade Social (IOS)

Este projeto é um sistema de controle de presença desenvolvido para o Instituto da Oportunidade Social (IOS). O sistema permite que professores e administradores gerenciem a presença dos alunos de forma eficiente e organizada.

## Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
ios-presenca
├── public
│   ├── index.html          # Página principal do sistema
│   ├── login.html          # Página de login
│   └── assets
│       ├── styles.css      # Estilos CSS do projeto
│       └── logo.svg        # Logotipo do Instituto
├── src
│   ├── app.js              # Ponto de entrada do aplicativo
│   ├── supabase.js         # Configuração do cliente Supabase
│   ├── auth.js             # Funções de autenticação
│   ├── dashboard.js         # Lógica do painel de controle
│   ├── units.js            # Gerenciamento de unidades
│   ├── courses.js          # Gerenciamento de cursos
│   ├── teachers.js         # Gerenciamento de professores
│   ├── classes.js          # Gerenciamento de turmas
│   ├── students.js         # Gerenciamento de alunos
│   └── attendance.js       # Gerenciamento de presença
├── .env.example             # Exemplo de configuração de variáveis de ambiente
├── package.json             # Configuração do npm
└── README.md                # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd ios-presenca
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Renomeie o arquivo `.env.example` para `.env` e preencha com suas credenciais do Supabase.

## Uso

- Para iniciar o servidor de desenvolvimento, execute:
  ```
  npm start
  ```

- Acesse o sistema em `http://localhost:3000`.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.