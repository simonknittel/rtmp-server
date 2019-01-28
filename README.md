# Streaming server

## Prerequisite: Set up a server with Docker installed
1. https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
2. https://digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04 (step 1 and 2)


## How to: Start and update the server

### 1. Stop and destroy the Docker container:
```sh
# Run on the server
docker rm -f streaming-server
```

### 2. Upload new files to the server:
```sh
# Run locally
scp -r webroot Dockerfile nginx.conf USER@HOST:~/streaming-server
```

### 3. Build the new Docker container:
```sh
# Run on the server
docker build -t streaming-server ~/streaming-server
```

### 4. Start the Docker container
```sh
# Run on the server
docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server
```


## Useful Docker commands

### Watch logs of the running container
```sh
# Run on the server
docker logs -f streaming-server
```

### Connect into the running container
```sh
# Run on the server
docker exec -it streaming-server /bin/bash
```


## URLs
* rtmp://HOST/live/STREAMKEY
* http://HOST/hls/STREAMKEY.m3u8
* http://HOST/player.html
