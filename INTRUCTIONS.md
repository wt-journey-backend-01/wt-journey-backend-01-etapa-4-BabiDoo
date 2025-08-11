## Tudo em um comando (Olhe os scripts em package.json)
```bash
npm run db:setup
````

> Sobe o Postgres com Docker e executa **migrations** + **seeds**.

## Separado (se preferir)

```bash
docker compose up -d   # sobe o Postgres
npm run migrate        # executa migrations
npm run seed           # executa seeds
```