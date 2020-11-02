FROM node:14.15.0-alpine3.10 AS base
RUN mkdir /node_app && chown -R node:node /node_app
WORKDIR /node_app
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node . .
ENV PATH=/node_app/node_modules/.bin:$PATH
RUN npm install --only=development
USER node
CMD ["npm", "run", "dev"]