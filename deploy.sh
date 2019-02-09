git clone https://github.com/google/brotli.git && cd brotli
mkdir out && cd out
cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=./installed ..
cmake --build . --config Release --target install

cd ../../
brotli/out/installed/bin/brotli --best --rm webroot/error.html
brotli/out/installed/bin/brotli --best --rm webroot/index.html
brotli/out/installed/bin/brotli --best --rm webroot/scripts.js
brotli/out/installed/bin/brotli --best --rm webroot/styles.css

ls -la webroot

rsync -r Dockerfile nginx.conf webroot $D_USER@$D_HOST:$D_LOCATION

ssh $D_USER@$D_HOST "docker rm -f streaming-server && docker build -t streaming-server $D_LOCATION"
ssh $D_USER@$D_HOST "docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server"
