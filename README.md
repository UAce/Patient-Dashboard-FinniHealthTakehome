# FinniHealthTakehome

Take-home project for Finni Health

This project is build with ExpressJS in TypeScript and MongoDB.

## Start project

```bash
# initialize nodeJS
npm init -y

# install dependencies
npm install express dotenv cors helmet morgan uuid mongoose pino pino-pretty
npm install --save-dev typescript ts-node-dev @types/node @types/express @types/dotenv @types/cors @types/helmet @types/morgan

# initialize typescript
npx tsc --init
echo PORT=4000 >> .env
mkdir src
touch src/index.ts
```

Add npm script to `package.json`

```json
"scripts": {
    "dev": "ts-node-dev --respawn --pretty --transpile-only src/index.ts"
}
```

## Run Database

```bash
docker-compose -f docker-compose.yml up -d
```

## Run Server

```bash
npm run dev
```
