# Build stage
FROM strapi/base:12-alpine

ARG VERSION
ENV VERSION ${VERSION:-dev}
ENV NPM_REGISTRY https://npm-8ee.hidora.com/
ENV NODE_ENV production
WORKDIR /srv/app

RUN apk add --no-cache git
RUN npm set registry $NPM_REGISTRY

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

# Prod stage
FROM strapi/base:12-alpine

ENV NODE_ENV production
WORKDIR /srv/app

COPY --from=0 /srv/app .

CMD ["npm", "start"]
