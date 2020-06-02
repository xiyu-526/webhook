#!/bin/bash
WORK_PATH='/usr/mypj/vue-web'
cd $WORK_PATH

echo "先清除老代码"
git reset --hard origin/master
git clean -f

echo "拉取最新代码"
git pull origin master

echo "install代码"
npm install

echo "构建代码"
npm run build

echo "构建镜像"
docker build -t vue-web:v1.0 .

echo "停止容器"
docker stop vue-web-container
echo "删除容器"
docker rm vue-web-container

echo "启动容器"
docker container run -p 85:80 --name vue-web-container -d vue-web:v1.0
