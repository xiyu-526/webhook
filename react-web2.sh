WORK_PATH = '/usr/mypj/react-web2'
cd $WORK_PATH

git reset --hard orgin/master
git clean -f

git pull orgin master

npm install
npm run build

docker build -t react-web2:v1.0 .

docker stop react-web2-container
docker rm react-web2-container

docker container run -p 86:86 --name react-web2-container -d react-web2:v1.0