# Streaming server

## Prerequisite: Set up a server with Docker installed
1. https://digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04
2. https://digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04 (step 1 and 2)


## How to: Start and update the server

### 1. Upload new files to the server:
```sh
# Run locally
scp -r webroot Dockerfile nginx.conf USER@HOST:~/streaming-server # Windows
rsync -r . USER@HOST:~/streaming-server # Unix (macOS, Linux)
```

### 2. Stop, destroy and build the new Docker container:
```sh
# Run on the server
docker rm -f streaming-server && docker build -t streaming-server ~/streaming-server
```

### 3. Start the Docker container
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
* rtmp://HOST/live/STREAMKEY (for OBS and VLC)
* http://HOST/hls/STREAMKEY.m3u8 (for VRChat)
* http://HOST/ (web player)


## OBS settings
* **Resolution:** 1280x720
* **Rate control:** CBR
* **Bitrate:** 3000
* **Keyframe Interval:** 2
* **CPU Usage Preset:** fast
* **Profile:** high
* **Audio Bitrate:** 256
