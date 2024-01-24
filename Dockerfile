FROM git.octree.ch:4567/o/infra/templates/base/strapi:nginx 

ENV NEXTAUTH_URL_INTERNAL: http://localhost:3000/api/nauth

COPY ./frontend /srv/app/frontend
COPY ./backend /srv/app/backend
COPY ./_nginx/* /srv/nginx/