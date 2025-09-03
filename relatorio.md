<sup>Suas cotas de feedback AI acabaram, o sistema de feedback voltou ao padrão.</sup>

# 🧪 Relatório de Avaliação – Journey Levty Etapa 1 - BabiDoo

**Data:** 03/09/2025 06:24

**Nota Final:** `47.35/100`
**Status:** ❌ Reprovado

---
## ✅ Requisitos Obrigatórios
- Foram encontrados `8` problemas nos requisitos obrigatórios. Veja abaixo os testes que falharam:
  - ⚠️ **Falhou no teste**: `CREATE: Cria agentes corretamente`
    - **Melhoria sugerida**: A criação de agentes (`POST /agentes`) não está conforme o esperado. O teste esperava um status `201 Created` e os dados do agente no corpo da resposta. Verifique a lógica da sua rota para garantir que o agente é salvo e a resposta é formatada corretamente.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados do agente com por completo (com PUT) corretamente`
    - **Melhoria sugerida**: A atualização completa de agentes (`PUT /agentes/:id`) não funcionou. O teste esperava um status `200 OK` e o agente com os dados atualizados. Verifique se sua rota está recebendo o payload completo e substituindo os dados existentes corretamente.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar agente parcialmente com método PATCH e payload em formato incorreto`
    - **Melhoria sugerida**: Nenhuma sugestão de melhoria disponível.
  - ⚠️ **Falhou no teste**: `CREATE: Cria casos corretamente`
    - **Melhoria sugerida**: A criação de casos (`POST /casos`) não está como o esperado. O teste esperava um status `201 Created` e os dados do caso no corpo da resposta. Revise a lógica da sua rota de criação de casos.
  - ⚠️ **Falhou no teste**: `UPDATE: Atualiza dados de um caso com por completo (com PUT) corretamente`
    - **Melhoria sugerida**: A atualização completa de casos (`PUT /casos/:id`) não funcionou. O teste esperava um status `200 OK` e o caso com os dados atualizados. Verifique se sua rota está recebendo o payload completo e substituindo os dados existentes corretamente.
  - ⚠️ **Falhou no teste**: `CREATE: Recebe status code 404 ao tentar criar caso com id de agente inválido/inexistente`
    - **Melhoria sugerida**: Ao tentar criar um caso com um `agente_id` inexistente, o teste não recebeu `404 Not Found`. Sua API deve ser capaz de identificar que o agente referenciado não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `READ: Recebe status code 404 ao tentar buscar um caso por ID inválido`
    - **Melhoria sugerida**: Ao tentar buscar um caso com ID inexistente (`GET /casos/:id`), o teste não recebeu `404 Not Found`. Sua rota deve ser capaz de identificar que o recurso não existe e retornar o status apropriado.
  - ⚠️ **Falhou no teste**: `UPDATE: Recebe status code 400 ao tentar atualizar um caso por completo com método PUT com payload em formato incorreto`
    - **Melhoria sugerida**: Sua rota de atualização completa de casos (`PUT /casos/:id`) não está retornando `400 Bad Request` para payloads inválidos. Garanta que a validação de dados ocorra antes da tentativa de atualização.

## ⭐ Itens de Destaque (recupera até 40 pontos)
- Nenhum item bônus foi identificado. Tente adicionar mais estilo e complexidade ao seu código nas próximas tentativas!

## ❌ Problemas Detectados (Descontos de até 100 pontos)
- Foram encontrados `4` problemas que acarretam descontos. Veja abaixo os testes penalizados:
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar agente com data de incorporação no futuro`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um agente com uma `dataDeIncorporacao` no futuro. Datas de incorporação não devem ser futuras. Implemente uma validação para impedir isso.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue alterar ID do agente com método PUT`
    - **Correção sugerida**: Nenhuma sugestão de correção disponível.
  - ⚠️ **Falhou no teste de penalidade**: `Validation: Consegue registrar caso com agente inexistente`
    - **Correção sugerida**: **Penalidade:** Sua API permitiu o registro de um caso com um `agente_id` que não existe no sistema. A integridade referencial é fundamental. Um caso só deve ser criado se o agente associado for válido.
  - ⚠️ **Falhou no teste de penalidade**: `Static files: usuário não seguiu estrutura de arquivos à risca`
    - **Correção sugerida**: **Penalidade:** A estrutura de arquivos do seu projeto não está seguindo as diretrizes. Verifique se as pastas `docs/`, `routes/`, `controllers/`, `repositories/` e os arquivos `.gitignore`, `package.json`, `server.json` estão presentes e organizados conforme o esperado.

---
Continue praticando e caprichando no código. Cada detalhe conta! 💪
Se precisar de ajuda, não hesite em perguntar nos canais da guilda. Estamos aqui para ajudar! 🤝

---
<sup>Made By the Autograder Team.</sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Carvalho](https://github.com/ArthurCRodrigues)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Arthur Drumond](https://github.com/drumondpucminas)</sup></sup><br>&nbsp;&nbsp;&nbsp;&nbsp;<sup><sup>- [Gabriel Resende](https://github.com/gnvr29)</sup></sup>