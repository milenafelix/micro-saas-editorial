# 📚 Micro-SaaS: Gestão Editorial e de Parcerias

Uma API RESTful e aplicação web desenvolvida em Node.js para o gerenciamento de parcerias literárias, editoras e campanhas.

## 🚀 Tecnologias
- Back-end: Node.js, Express
- Banco de Dados: MySQL 8.0 (Containerizado)
- Infraestrutura: Docker e Docker Compose
- Front-end: HTML5, CSS3, JavaScript

## 📂 Arquitetura
- public/: Interface web do Dashboard (HTML, CSS, JS)
- src/config/: Configuração de conexão com o banco
- src/controllers/: Regras de negócio do CRUD
- src/routes/: Endpoints da API
- docker-compose.yml: Orquestração de containers
- Dockerfile: Build da aplicação Node.js
- init.sql: Inicialização do banco de dados

## ⚙️ Pré-requisitos
- Docker e Docker Compose
- Git

## 🛠️ Como Executar via Docker
1. Clone o repositório:
   git clone https://github.com/milenafelix/micro-saas-editorial.git

2. Acesse a pasta:
   cd micro-saas-editorial

3. Suba os containers:
   docker-compose up --build -d

4. Acesse no navegador:
   http://localhost:3000

## 🛣️ Rotas da API
- GET /api/parcerias - Lista todas as parcerias
- POST /api/parcerias - Cria uma nova parceria
- PUT /api/parcerias/:id - Atualiza uma parceria
- DELETE /api/parcerias/:id - Remove uma parceria

### Exemplo de Requisição (POST / PUT)
{
  "nome_empresa": "Editora Valentina",
  "nome_programa": "Amigos da Valen",
  "status": "Ativo"
}

Status permitidos: Ativo, Inativo, Pendente, Renovado.

---
Desenvolvido com ☕ e Node.js por Milena Félix.