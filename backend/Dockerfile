FROM node:14-alpine

WORKDIR /srv/app
COPY ./ .

EXPOSE 1337
VOLUME /srv/app/public/uploads
VOLUME /srv/app/node_modules
VOLUME /srv/app/build

CMD ["yarn", "start"]
