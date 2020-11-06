# Contribute

## Building this image

## Publishing this image

```
git tag vX.X.X
docker build -t rtmp-server:vX.X.X -t rtmp-server:latest .

git push --tags
docker push simonknittel/rtmp-server:vX.X.X
docker push simonknittel/rtmp-server:latest
```
