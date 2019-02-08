# 'which ssh-agent || ( apt-get update -y && apt-get install openssh-client -y )'
mkdir -p ~/.ssh
eval $(ssh-agent -s)
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config
ssh-add <(echo "$PRIVATE_SSH_KEY")

rsync -r Dockerfile nginx.conf webroot $D_USER@$D_HOST:$D_LOCATION

ssh $D_USER@$D_HOST "docker rm -f streaming-server && docker build -t streaming-server $D_LOCATION"
ssh $D_USER@$D_HOST "docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server"
