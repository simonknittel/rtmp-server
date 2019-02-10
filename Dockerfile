FROM tiangolo/nginx-rtmp

COPY nginx.conf /etc/nginx/nginx.conf
COPY webroot /usr/local/nginx/html/

# Install Amplify (https://amplify.nginx.com/docs/guide-installing-and-managing-nginx-amplify-agent.html#installing-the-agent-manually)
# RUN curl -L -O https://github.com/nginxinc/nginx-amplify-agent/raw/master/packages/install.sh
# ARG API_KEY
# RUN sh ./install.sh # TODO: Fails due to needing to confirm apt-get in step X

# Install Amplify (trying to auto confirm apt-get)
# RUN curl -L -O https://github.com/nginxinc/nginx-amplify-agent/raw/master/packages/install.sh
# ARG API_KEY
# RUN export DEBIAN_FRONTEND=noninteractive
# RUN DEBIAN_FRONTEND=noninteractive sh ./install.sh

# Install Amplify manually (https://amplify.nginx.com/docs/guide-installing-and-managing-nginx-amplify-agent.html#installing-the-agent-manually)
# RUN curl -fs http://nginx.org/keys/nginx_signing.key | apt-key add -
# RUN codename=`lsb_release -cs` && os=`lsb_release -is | tr '[:upper:]' '[:lower:]'` && echo "deb http://packages.amplify.nginx.com/${os}/ ${codename} amplify-agent" > /etc/apt/sources.list.d/nginx-amplify.list
# RUN cat /etc/apt/sources.list.d/nginx-amplify.list && deb http://packages.amplify.nginx.com/ubuntu/ trusty amplify-agent
# RUN apt-get -y update
# RUN apt-get -y install nginx-amplify-agent
# ARG api_key
# RUN sed "s/api_key.*$/api_key = ${api_key}/" /etc/amplify-agent/agent.conf.default > /etc/amplify-agent/agent.conf
# RUN service amplify-agent start
