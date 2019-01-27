# Streaming server

## Set up a Docker server following these guides:
1. https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
2. https://digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04

## Updating the server
```sh
docker rm -f streaming-server # Run on the Droplet
scp -r webroot Dockerfile nginx.conf USER@SERVER_ADDRESS:~/streaming-server # Run locally
docker build -t streaming-server ~/streaming-server # Run on the Droplet
```

## Starting Docker container
```sh
docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server # Run on the Droplet
```

## Watching Docker logs
```sh
docker logs -f streaming-server # Run on the Droplet
```

## Connect into running Docker container
```sh
docker exec -it streaming-server /bin/bash # Run on the Droplet
```

### URLs
* rtmp://SERVER_ADDRESS/live/stream1
* http://SERVER_ADDRESS/stream1.html
* http://SERVER_ADDRESS/hls/stream1.m3u8
