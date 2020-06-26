FROM strapi/base:12-alpine

ARG NPM_REGISTRY=https://npm-8ee.hidora.com/
ENV NODE_ENV production
WORKDIR /srv/app

RUN apk add --no-cache git
RUN npm set registry $NPM_REGISTRY && \
    npm install -g strapi@latest

## Install dependencies
COPY . /srv/app/
RUN npm ci --only=production

# Build Strapi admin
RUN npm run build

## Build front app
RUN rm -rf public && \
    cd app && npm ci && \
    npm run build && \
    mv build ../public && \
    cd .. && rm -rf app

CMD ["strapi", "start"]
