FROM node:latest
WORKDIR /Trebek_client
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]