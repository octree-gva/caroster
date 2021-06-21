FROM git.octree.ch:4567/o/infra/templates/base/strapi:nextjs

ARG VERSION
ENV VERSION ${VERSION:-dev}

COPY backend /srv/app/backend
COPY frontend /srv/app/frontend
COPY ecosystem.config.js /srv/app/

CMD cd /srv/app; pm2 start ecosystem.config.js; pm2 logs