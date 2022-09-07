FROM node:16-alpine

VOLUME /srv/app/backend/node_modules
VOLUME /srv/app/backend/build
VOLUME /srv/app/backend/public/uploads
VOLUME /srv/app/frontend/node_modules
VOLUME /srv/app/frontend/.next

EXPOSE 80
WORKDIR /srv/app

RUN apk add --no-cache nginx && yarn global add pm2
COPY ./frontend /srv/app/frontend
COPY ./backend /srv/app/backend
COPY ./ecosystem.config.js /srv/app/
COPY ./nginx.conf /etc/nginx/http.d/default.conf

CMD nginx && pm2-runtime start ecosystem.config.js