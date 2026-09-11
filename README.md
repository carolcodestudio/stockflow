# 📦 StockFlow

O **StockFlow** é um sistema full-stack de gerenciamento de estoque desenvolvido para facilitar o cadastro e o controle de produtos, entradas e saídas de estoque e a visualização de informações gerais por meio de uma interface simples e organizada.

Este projeto foi desenvolvido como parte do meu portfólio, com o objetivo de aplicar na prática conceitos de desenvolvimento **frontend**, **backend**, integração com **API REST** e versionamento de código com **Git e GitHub**.

## 🚀 Funcionalidades

O sistema possui as seguintes funcionalidades:

- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Pesquisa de produtos
- Registro de entradas no estoque
- Registro de saídas do estoque
- Atualização automática da quantidade disponível
- Controle para impedir saídas maiores que o estoque disponível
- Visualização da quantidade total de produtos
- Cálculo do valor total do estoque
- Relatório resumido do estoque
- Dashboard para gerenciamento dos produtos
- Integração entre frontend e backend através de API REST
- Interface responsiva

## 🛠️ Tecnologias utilizadas

### Frontend

- Angular
- TypeScript
- HTML
- CSS

### Backend

- Node.js
- Express
- API REST

### Ferramentas

- Git
- GitHub
- Visual Studio Code
- npm

## 📊 Principais páginas

O sistema possui diferentes áreas para facilitar o gerenciamento do estoque.

### Dashboard

Apresenta uma visão geral do estoque e permite realizar o gerenciamento dos produtos, incluindo cadastro, edição e exclusão.

### Products

Exibe a lista de produtos cadastrados e permite realizar pesquisas por nome ou categoria.

### Inventory Entries

Permite registrar a entrada de novas unidades de um produto no estoque. Após o registro, a quantidade disponível é atualizada automaticamente.

### Inventory Outputs

Permite registrar a saída de produtos do estoque. O sistema também verifica se existe quantidade suficiente antes de realizar a operação.

### Reports

Apresenta um resumo das informações do estoque, incluindo:

- quantidade de produtos cadastrados;
- quantidade total de unidades disponíveis;
- valor total do estoque;
- valor individual de estoque de cada produto.

## 📁 Estrutura do projeto

```text
StockFlow/
├── backend/
│   ├── controllers/
│   ├── data/
│   ├── frontend/
│   ├── routes/
│   └── server.js
├── database/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Como executar o projeto

Para executar o StockFlow localmente, é necessário ter o **Node.js** e o **npm** instalados no computador.

### 1. Executar o backend

Abra um terminal na pasta principal do projeto e execute:

```bash
cd backend
node server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

### 2. Executar o frontend

Abra um segundo terminal e execute:

```bash
cd backend/frontend
npm start
```

Depois, acesse no navegador:

```text
http://localhost:4200
```

## 🔄 Funcionamento

O frontend desenvolvido em Angular envia requisições para a API desenvolvida com Node.js e Express.

A API é responsável pelas operações de cadastro, consulta, atualização e exclusão dos produtos.

As alterações realizadas nas entradas e saídas atualizam a quantidade disponível de cada produto no estoque.

## 🎯 Objetivo do projeto

O StockFlow foi desenvolvido com o objetivo de praticar e demonstrar conhecimentos relacionados a:

- desenvolvimento de aplicações web;
- criação de interfaces com Angular;
- programação com TypeScript;
- desenvolvimento de APIs com Node.js e Express;
- operações CRUD;
- comunicação entre frontend e backend;
- manipulação e gerenciamento de dados;
- organização de projetos;
- controle de versão utilizando Git;
- publicação de projetos no GitHub.

## 📌 Status do projeto

✅ Projeto funcional.

As principais funcionalidades de gerenciamento e controle de estoque estão implementadas e integradas entre frontend e backend.

## 👩‍💻 Autoria

Desenvolvido por **CarolCode Studio**.

Projeto criado para fins de estudo, prática e composição de portfólio profissional.