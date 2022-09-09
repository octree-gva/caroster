#!/bin/sh

# Start NGINX in daemon mode
grep -q -F "pid " /etc/nginx/nginx.conf || echo "pid /run/nginx.pid;" >> /etc/nginx/nginx.conf
nginx

# Start NodeJS apps with PM2
cd /srv/app
pm2-runtime start ecosystem.config.js