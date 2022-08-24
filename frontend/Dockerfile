FROM node:16-alpine

WORKDIR /srv/app

COPY . .

EXPOSE 3000
VOLUME /srv/app/node_modules
VOLUME /srv/app/.next

CMD ["yarn", "start"]