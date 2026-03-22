# Usa Node LTS
FROM node:20-alpine

# Diretório da aplicação
WORKDIR /app

# Copia package.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN npm run build

# Porta da API
EXPOSE 3000

# Comando para rodar a API
CMD ["npm", "run", "start:prod"]