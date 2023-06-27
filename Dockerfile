FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080

# Define the command to run when the container starts
CMD ["npm", "run", "serve"]