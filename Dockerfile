FROM tiangolo/nginx-rtmp:latest-2021-09-17

COPY nginx.conf /etc/nginx/nginx.conf
COPY webroot /usr/local/nginx/html/
