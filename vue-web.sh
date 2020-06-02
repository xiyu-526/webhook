#!/bin/bash
WORK_PATH='/usr/mypj/vue-web'
cd $WORK_PATH

git reset --hard origin/master
git clean -f

git pull origin master

npm install
npm run build

docker build -t vue-web:v1.0

docker stop vue-web-container
docker rm vue-web-container

docker container run -p 80:80 --name vue-web-container -d vue-web:v1.0
