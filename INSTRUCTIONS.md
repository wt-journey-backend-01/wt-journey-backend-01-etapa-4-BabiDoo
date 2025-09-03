# Instrucoes

0. **Pare containers antigos e limpe volumes** *(opcional, mas ajuda)*

```bash
docker compose down -v
```

1. **Ajuste o `.env`** conforme indicado
2. **Suba o Postgres**

```bash
docker compose up -d
```

3. **(Garantia)** resete o banco e (re)aplique **migrations + seeds**

```bash
npm run db:reset
# ou, na primeira vez:
npm run db:setup
```

4. **Rode a API**

```bash
npm run dev
```
