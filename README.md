# Micro-SaaS: Gestão Editorial e de Parcerias 📚

Uma API RESTful desenvolvida em Node.js para o gerenciamento de parcerias literárias, editoras e campanhas (como envios e recebimentos de materiais). Ideal para criadores de conteúdo e portais de cultura pop que precisam organizar suas demandas e status de publicações.

## 🚀 Tecnologias Utilizadas

- Back-end: Node.js com Express
- Banco de Dados: MySQL 8.0 (Containerizado)
- Infraestrutura: Docker e Docker Compose
- Ferramentas de Teste: Thunder Client / Postman

## ⚙️ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado em sua máquina:
- Node.js
- Docker e Docker Compose
- Git

## 🛠️ Como executar o projeto localmente

1. Clone o repositório:
git clone [https://github.com/milenafelix/micro-saas-editorial.git](https://github.com/milenafelix/micro-saas-editorial.git)

2. Acesse a pasta do projeto:
cd micro-saas-editorial

3. Instale as dependências:
npm install

4. Suba o banco de dados com o Docker:
docker-compose up -d

5. Inicie o servidor de desenvolvimento:
npm run dev

(O servidor estará rodando em http://localhost:3000)

## 🛣️ Rotas da API (CRUD)

Abaixo estão os endpoints disponíveis na API para a entidade Parcerias:

- GET /api/parcerias : Lista todas as parcerias cadastradas.
- POST /api/parcerias : Cria uma nova parceria.
- PUT /api/parcerias/:id : Atualiza os dados ou o status de uma parceria existente.
- DELETE /api/parcerias/:id : Remove uma parceria do banco de dados.

### Exemplo de Corpo de Requisição (POST / PUT)

{
  "nome_empresa": "Editora Valentina",
  "nome_programa": "Amigos da Valen",
  "status": "Ativo"
}

*Status permitidos: Ativo, Inativo, Pendente, Renovado.*

---
Desenvolvido com ☕ e Node.JS por Milena Félix.
