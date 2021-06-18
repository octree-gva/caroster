FROM git.octree.ch:4567/o/infra/templates/base/strapi:nextjs

ARG VERSION
ENV VERSION ${VERSION:-dev}

COPY backend /srv/app/backend
COPY frontend /srv/app/frontend
