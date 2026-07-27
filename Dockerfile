# Usa a imagem oficial e leve do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências de produção/desenvolvimento
RUN npm install

# Copia todo o restante do código da aplicação
COPY . .

# Expõe a porta que o Express utiliza
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]