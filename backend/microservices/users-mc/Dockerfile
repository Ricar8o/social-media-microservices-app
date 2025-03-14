
FROM node:18

WORKDIR /usr/src/app

COPY microservices/users-mc/package*.json ./
COPY microservices/users-mc/src ./src
COPY microservices/users-mc/tsconfig.json ./

COPY prisma/migrations ./prisma/migrations
COPY prisma/schema.prisma ./prisma/schema.prisma

RUN npm install
RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/index.js"]