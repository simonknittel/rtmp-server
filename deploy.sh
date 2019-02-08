rsync -r Dockerfile nginx.conf webroot $D_USER@$D_HOST:$D_LOCATION

ssh $D_USER@$D_HOST "docker rm -f streaming-server && docker build -t streaming-server $D_LOCATION"
ssh $D_USER@$D_HOST "docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server"
