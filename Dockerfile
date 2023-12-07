FROM git.octree.ch:4567/o/infra/templates/base/strapi:nginx 

COPY ./frontend /srv/app/frontend
COPY ./backend /srv/app/backend