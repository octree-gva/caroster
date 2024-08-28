FROM git.octree.ch:4567/o/infra/templates/base/strapi:nginx 

ENV NEXTAUTH_URL_INTERNAL http://localhost:3000/api/nauth

COPY ./ /srv/app/
COPY ./_nginx/* /srv/nginx/