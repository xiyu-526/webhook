#!/bin/bash
WORK_PATH='/usr/mypj/vue-node'
#DIST_PATH='/usr/mypj/vue-node/dist'
#DATE=${date +%Y-%M-%D-%H-%M-%S}
cd $WORK_PATH

#打包文件目录文件 zip -r, zip 打包单个文件 ,unzip [文件名], cp -r 目录/* , rm -rf 目录/*
#zip -r $WORK_PATH/bifen-date.zip $DIST_PATH/*

echo "先清除老代码"
git reset --hard origin/master
git clean -f
echo '拉取最新代码'
git pull origin master
echo '开始构建'
docker build -t vue-node:1.0 .
echo '先停止并删除旧容器'
docker stop vue-node-container
docker rm vue-node-container
echo "启动新容器"
docker container run -p 3000:3000 --name vue-node-container -d vue-node:1.0