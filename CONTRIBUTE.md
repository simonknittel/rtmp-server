# Contribute

## Building this image

## Publishing this image

```sh
git tag vX.X.X
docker build -t simonknittel/rtmp-server:vX.X.X -t simonknittel/rtmp-server:latest .

git push --tags
docker push simonknittel/rtmp-server:vX.X.X
docker push simonknittel/rtmp-server:latest
```
