#!/bin/bash
cd '/usr/mypj/web-vue'

git reset --hard origin/master
git clean -f

git pull origin master

npm run build

docker build -t web-vue:v1.0

docker stop web-vue-container
docker rm web-vue-container

docker container run -p 80:80 --name web-vue-container -d web-vue:v1.0
