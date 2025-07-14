# API de Rede Social

API RESTful desenvolvida com Node.js, TypeScript, Express e PostgreSQL, oferecendo funcionalidades básicas de uma rede social.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- Docker & Docker Compose
- JWT para autenticação
- BCrypt para criptografia

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [https://github.com/Nata07/backend-social-network]
cd [nome-do-repositorio]/backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Inicie os containers Docker:
```bash
docker-compose up -d
```

5. Execute as migrações do banco:
```bash
npx prisma migrate dev
```

6. Inicie o servidor:
```bash
npm run dev
```

## 🏗️ Estrutura do Projeto

```
backend/
├── src/
│   ├── controllers/     # Controladores da aplicação
│   ├── services/        # Lógica de negócio
│   ├── middlewares/     # Middlewares Express
│   ├── routes/          # Definição de rotas
│   ├── app.ts          # Configuração do Express
│   └── server.ts       # Entrada da aplicação
├── prisma/
│   └── schema.prisma   # Schema do banco de dados
├── docker-compose.yml  # Configuração Docker
└── package.json
```

## 📖 Documentação

A API possui documentação completa usando Swagger/OpenAPI. Para acessar:

1. Inicie o servidor:
```bash
npm run dev
```

2. Acesse a documentação em:
```
http://localhost:3001/api-docs
```

Na interface do Swagger você encontrará:
- Descrição detalhada de todos os endpoints
- Schemas de requisição e resposta
- Exemplos de uso
- Testes interativos das rotas
- Autenticação via JWT

A documentação está organizada nas seguintes seções:
- **Autenticação**: Registro e login de usuários
- **Posts**: Gerenciamento de posts
- **Likes**: Sistema de curtidas
- **Comentários**: Sistema de comentários e respostas

## 📚 API Endpoints

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário

### Posts
- `POST /api/posts` - Criar post
- `GET /api/posts` - Listar posts (com paginação)
- `GET /api/posts/:id` - Obter post específico
- `PUT /api/posts/:id` - Atualizar post
- `DELETE /api/posts/:id` - Deletar post
- `GET /api/posts/user/:userId` - Listar posts de um usuário

### Likes
- `POST /api/posts/:postId/like` - Curtir/descurtir post
- `GET /api/posts/:postId/likes` - Listar curtidas
- `GET /api/posts/:postId/like-status` - Verificar status da curtida

### Comentários
- `POST /api/posts/:postId/comments` - Criar comentário
- `GET /api/posts/:postId/comments` - Listar comentários
- `PUT /api/comments/:id` - Atualizar comentário
- `DELETE /api/comments/:id` - Deletar comentário
- `GET /api/comments/:commentId/replies` - Listar respostas

## 🔒 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar endpoints protegidos, inclua o token no header:

```bash
Authorization: Bearer [seu-token-jwt]
```

## 🐳 Docker

O projeto inclui dois serviços Docker:
- **app**: Aplicação Node.js
- **postgres**: Banco de dados PostgreSQL

Para iniciar os serviços:
```bash
docker-compose up -d
```

## 📦 Banco de Dados

O projeto utiliza PostgreSQL com Prisma ORM. Principais modelos:

- **User**: Usuários do sistema
- **Post**: Posts dos usuários
- **Comment**: Comentários em posts
- **Like**: Curtidas em posts

## ⚙️ Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo desenvolvimento
- `npm run build`: Compila o TypeScript
- `npm start`: Inicia o servidor em produção
- `npm run lint`: Executa o linter
- `npm run lint:fix`: Corrige problemas de linting

## 🧪 Exemplos de Uso

> **Nota**: Todos estes exemplos e mais podem ser testados diretamente na interface do Swagger em `http://localhost:3001/api-docs`


### Registro de Usuário
```bash
curl -X POST http://localhost:3001/api/auth/register \
-H "Content-Type: application/json" \
-d "{\"name\": \"John Doe\", \"email\": \"john@example.com\", \"password\": \"123456\"}"
```

### Criação de Post
```bash
curl -X POST http://localhost:3001/api/posts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN" \
-d "{\"content\": \"Meu primeiro post!\"}"
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
