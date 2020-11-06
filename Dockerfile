FROM tiangolo/nginx-rtmp:latest-2020-08-16

COPY nginx.conf /etc/nginx/nginx.conf
COPY webroot /usr/local/nginx/html/
