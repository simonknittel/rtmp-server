pip install brotli
pip show brotli

python /home/rof/.pyenv/versions/2.7.15/lib/python2.7/site-packages/bro.py --best --rm webroot/error.html
python /home/rof/.pyenv/versions/2.7.15/lib/python2.7/site-packages/bro.py --best --rm webroot/index.html
python /home/rof/.pyenv/versions/2.7.15/lib/python2.7/site-packages/bro.py --best --rm webroot/scripts.js
python /home/rof/.pyenv/versions/2.7.15/lib/python2.7/site-packages/bro.py --best --rm webroot/styles.css

ls -la webroot

rsync -r Dockerfile nginx.conf webroot $D_USER@$D_HOST:$D_LOCATION

ssh $D_USER@$D_HOST "docker rm -f streaming-server && docker build -t streaming-server $D_LOCATION"
ssh $D_USER@$D_HOST "docker run -d -p 1935:1935 -p 80:80 --name streaming-server --restart always streaming-server"
