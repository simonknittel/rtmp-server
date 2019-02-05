rsync -r Dockerfile nginx.conf webroot $USER@$HOST:$LOCATION

ssh $USER@$HOST 'docker rm -f streaming-server && docker build -t streaming-server $LOCATION'
ssh $USER@$HOST 'docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server'
