#!/bin/bash
WORK_PATH='/usr/mypj/react-web2'
cd $WORK_PATH

ls

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
docker build -t react-web2:v1.0 .

echo "停止容器"
docker stop react-web2-container

echo "删除容器"
docker rm react-web2-container

echo "启动容器"
docker container run -p 86:86 --name react-web2-container -d react-web2:v1.0

