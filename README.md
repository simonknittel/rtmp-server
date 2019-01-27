# Streaming server

## Set up a Docker server following these guides:
1. https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
2. https://digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

## Updating the server
```
docker rm -f streaming-server
scp -r webroot Dockerfile nginx.conf USER@SERVER_ADDRESS:~/streaming-server
docker build -t streaming-server ~/streaming-server
```

## Starting Docker container
```
docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server
```

## Watching Docker logs
```
docker logs -f streaming-server
```

## Connect into running Docker container
```
docker exec -it streaming-server /bin/bash
```

### URLs
* rtmp://SERVER_ADDRESS/live/stream1
* http://SERVER_ADDRESS/stream1.html
* http://SERVER_ADDRESS/hls/stream1.m3u8
