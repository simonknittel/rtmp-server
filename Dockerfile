FROM tiangolo/nginx-rtmp

COPY nginx.conf /etc/nginx/nginx.conf
COPY webroot /usr/local/nginx/html/

# Install Amplify
RUN curl -L -O https://github.com/nginxinc/nginx-amplify-agent/raw/master/packages/install.sh
ARG API_KEY
RUN sh ./install.sh
