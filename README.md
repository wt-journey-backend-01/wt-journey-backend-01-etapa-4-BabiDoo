<<<<<<< HEAD
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mzlsx7b3)

# Etapa 3: Persistência de Dados com PostgreSQL e Knex.js 

## 🧩 Contexto

O Departamento de Polícia está avançando na modernização de seus sistemas. Após a criação da API REST (Etapa 2), que armazenava dados em memória, agora chegou o momento de dar um passo importante rumo à persistência real.  
A partir desta etapa, todos os registros de **agentes** e **casos policiais** devem ser armazenados em um **banco de dados PostgreSQL**.

Sua missão será **migrar a API existente**, que atualmente utiliza arrays, para uma solução robusta e escalável, utilizando **Knex.js** como Query Builder, **migrations** para versionamento de esquemas e **seeds** para inserir dados iniciais.

---

## 🎯 Objetivo

Refatorar a API de gerenciamento de agentes e casos policiais para utilizar um **banco de dados PostgreSQL**, com suporte a migrations e seeds, mantendo todas as funcionalidades REST da etapa anterior.

---

## **O que deve ser feito**
# 📁  Estrutura dos Diretórios (pastas) 
=======
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/rskcst-g)
# Etapa 4: Segurança, Autenticação e Aplicação Completa em Node.js

## 🧩 Contexto
O Departamento de Polícia agora precisa garantir que apenas pessoas autorizadas tenham acesso ao sistema. Após a persistência dos dados com PostgreSQL (Etapa 3), chegou a hora de implementar **segurança, autenticação e autorização** para proteger os registros de agentes e casos.  
Sua missão será evoluir a API para um nível profissional, adicionando **hashing de senhas**, **geração de tokens JWT** e **proteção de rotas**, além de **documentar todo o processo** para que a aplicação esteja pronta para uso real em produção.

## 🎯 Objetivo
Transformar a API em uma aplicação completa e segura, com autenticação via **JWT** e rotas protegidas, permitindo **cadastro, login e acesso controlado** aos recursos do sistema.

⸻

## O que deve ser feito

### 📁 Estrutura dos Diretórios (pastas)
>>>>>>> a240e7c2936c561dd4d719009ff16868a6583696
```
📦 SEU-REPOSITÓRIO
│
├── package.json
├── server.js
├── .env
├── knexfile.js
├── INSTRUCTIONS.md
<<<<<<< HEAD

=======
>>>>>>> a240e7c2936c561dd4d719009ff16868a6583696
│
├── db/
│ ├── migrations/
│ ├── seeds/
│ └── db.js
│
├── routes/
│ ├── agentesRoutes.js
<<<<<<< HEAD
│ └── casosRoutes.js
│
├── controllers/
│ ├── agentesController.js
│ └── casosController.js
│
├── repositories/
│ ├── agentesRepository.js
│ └── casosRepository.js
│
├── utils/
│ └── errorHandler.js
│

  
```

### 1. Configurar o banco de dados PostgreSQL com Docker
- Crie um arquivo .env na raíz do projeto para armazenar as seguintes variáveis de ambiente do nosso banco de dados:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
```
**OBSERVAÇÃO: o uso de valores diferentes resultará em falhas nos testes**

- Crie um arquivo `docker-compose.yml` na raiz do projeto para subir um container do PostgreSQL com um **volume persistente**, utilizando as váriaveis de ambiente para inserir dados sensíveis. Tenha certeza de seu container está rodando quando for desenvolver sua aplicação
  
### 2. Instalar o knex e criar o arquivo **`knexfile.js`**
- Primeiro instale o knex localmente com `npm install knex pg`
- Rode `npm install dotenv` para utilizarmos variáveis do arquivo .env
- Agora, na **raiz do projeto**, devemos criar o knexfile.js com o comando `npx knex init`. Ele cria um arquivo de configurações de conexão com o PostgreSQL para diversos ambientes. Criaremos uma configuração de desenvolvimento para nos conectarmos ao banco que criamos e adicionaremos caminhos para a criação de migrations e seeds, edite esse arquivo para deixá-lo assim:

```js
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
        directory: './db/migrations',
      },
    seeds: {
        directory: './db/seeds',
      },
  },
  ci: {
    client: 'pg',
    connection: {
      host: 'postgres', 
      port: 5432,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  }

};

```

### 3. Criar a pasta `db/`
Dentro da pasta `db/`, você deve criar os seguinte arquivo:

#### **`db.js`**
Arquivo responsável por criar e exportar a instância do Knex:

```js
const knexConfig = require('../knexfile');
const knex = require('knex'); 

const nodeEnv = process.env.NODE_ENV || 'development';
const config = knexConfig[nodeEnv]; 

const db = knex(config);

module.exports = db;
```

Crie a variável de ambiente ```NODE_ENV``` no arquivo ```.env``` para definir qual ambiente será usado. No caso, em desenvolvimento, o valor atribuído a ela deverá ser ```development```.

---

### 4. Criar as Migrations
- Use o Knex CLI para gerar as migrations com o seguinte nome (Tem certeza de que o diretório que você se encontra no terminal é a raiz do projeto, do contrário você terá uma pasta `db/` duplicada):

```bash
npx knex migrate:make solution_migrations.js

```

- As tabelas devem ter as seguintes colunas:
  - `agentes`: `id`, `nome (string)`, `dataDeIncorporacao (date)`, `cargo (string)`
  - `casos`: `id`, `titulo (string)`, `descricao (string)`, `status (aberto/solucionado)`, `agente_id` com **foreign key** para `agentes.id`.

**IMPORTANTE! Não utilizaremos mais o uuid, pois o PostgreSQL lida com a lógica de indexação e incrementa automaticamente. Jamais explicite o id dentro de um payload que será guardado no banco de dados, pois isso pode causar comportamento indesejado**
- Aplique as migrations com:
```bash
npx knex migrate:latest
```
---

### 5. Criar Seeds
- Crie seeds para popular as tabelas com pelo menos 2 agentes e 2 casos (Tem certeza de que o diretório que você se encontra no terminal é a raiz do projeto, do contrário você terá uma pasta `db/` duplicada):

```bash
npx knex seed:make solution_migrations.js

```
- Execute as seeds com:
```bash
npx knex seed:run
```

**OBSERVAÇÃO: Siga o nome do migration à risca para evitar falhas desnecessárias nos testes**

---

### 6. Refatorar os Repositories
- Substituir os arrays atuais por queries usando **Knex.js** (`select`, `insert`, `update`, `delete`).

---

### 7. Manter Rotas e Controladores
- Todos os endpoints de **/casos** e **/agentes** devem continuar funcionando com as mesmas regras e validações.

---

### 8. Documentar de maneira simples em um arquivo INSTRUCTIONS.md
Crie esse arquivo e adicione instruções claras para:
- Subir o banco com Docker
- Executar migrations
- Rodar seeds


---

## **Bônus 🌟**
- Adicionar um script `npm run db:reset` que derruba, recria, migra e popula o banco automaticamente.
- Implementar endpoint `/agentes/:id/casos` para listar todos os casos atribuídos a um agente.
=======
│ ├── casosRoutes.js
│ └── authRoutes.js (novo)
│
├── controllers/
│ ├── agentesController.js
│ ├── casosController.js
│ └── authController.js (novo)
│
├── repositories/
│ ├── agentesRepository.js
│ ├── casosRepository.js
│ └── usuariosRepository.js (novo)
│
├── middlewares/
│ └── authMiddleware.js (novo)
│
├── utils/
│ └── errorHandler.js
```
⸻

### 1. Criar a tabela de usuários no banco
- Adicione uma migration para criar a tabela **usuarios** com os campos:
  - **id** (auto increment, chave primária)
  - **nome** (string, obrigatório)
  - **email** (string único, obrigatório)
  - **senha** (string, obrigatória — será armazenada de forma **hasheada**. A senha deve ter no mínimo 8 caracteres, sendo pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial)

⸻

### 2. Implementar autenticação
- Criar **registro de usuários** (`POST /auth/register`)
  - Receber **nome**, **email** e **senha**.
  - Validar se o **email** já está em uso.
  - Armazenar a **senha** com hash usando **bcrypt**.
- Criar **login de usuários** (`POST /auth/login`)
  - Receber **email** e **senha**.
  - Validar credenciais.
  - Gerar e retornar um **token JWT** com tempo de expiração.
- Criar **exclusão de usuários** (`DELETE /users/:id`).
- Criar **logout** (`POST /auth/logout`).

⸻

### 3. Proteger rotas sensíveis
- Criar um **middleware de autenticação** que:
  - Verifique o header `Authorization: Bearer <token>`.
  - Valide o **JWT**.
  - Adicione os dados do usuário autenticado ao `req.user`.
- Aplicar esse middleware em rotas de **/agentes** e **/casos**.

⸻

### 4. Documentar endpoints e segurança
No arquivo **INSTRUCTIONS.md**, incluir:
- Como **registrar** e **logar** usuários.
- **Exemplo** de envio de token JWT no header `Authorization`.
- **Fluxo de autenticação** esperado.

⸻
## Status Codes e Orientações
### Endpoints de login
- O endpoint de login deve retornar um objeto com o acess token e **status code 200 OK** da seguinte maneira:
  ```
    {

        access_token: "token aqui"

    }
  ```
- Caso o email do login já esteja em uso, **status code 400 BAD REQUEST**
- Caso o acess token seja inválido, **status code 401 Unauthorized**

### Importante
- Para gerenciar o segredo do seu JWT, utilize a seguinte variável de ambiente:

```.env
...
JWT_SECRET="segredo aqui"
```

- NUNCA insira seus segredos diretamente no código, pois essa é uma brecha crítica de segurança, além de interferir com o funcionamento dos testes.

## 💡 Bônus 🌟
- Implementar **refresh tokens** para prolongar sessões de forma segura.
- Criar endpoint **`/usuarios/me`** para retornar informações do usuário autenticado.



# wt-journey-backend-01-etapa-1-template
>>>>>>> a240e7c2936c561dd4d719009ff16868a6583696
