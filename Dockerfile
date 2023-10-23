FROM octree/base:strapi-nginx

COPY ./frontend /srv/app/frontend
COPY ./backend /srv/app/backend