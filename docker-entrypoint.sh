#!/bin/sh

# Start NGINX in daemon mode
nginx

# Start NodeJS apps with PM2
cd /srv/app
pm2-runtime start ecosystem.config.js