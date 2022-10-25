# rtmp-server

Simple demo project to combine tiangolo's nginx-rtmp Docker image with a custom frontend.

## Usage

```sh
docker run -p 1935:1935 -p 80:80 simonknittel/rtmp-server
```

## URLs

* `rtmp://HOST/live/STREAMKEY` (for OBS and VLC)
* `http://HOST/hls/STREAMKEY.m3u8` (for VRChat)
* `http://HOST/` (web player)

## OBS settings

* **Rate control:** CBR
* **Keyframe Interval:** 2
* **CPU Usage Preset:** fast
* **Profile:** high
* **Audio Bitrate:** 192
