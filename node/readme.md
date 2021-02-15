## set

새폴더에서
```
git clone https://github.com/oktrees/bookcover.git ./
cd node
```

.env 파일생성
```
COOKIE_SECRET=
JWT_SECRET=
SEQUELIZE_USERNAME=
SEQUELIZE_PASSWORD=
SEQUELIZE_HOST=
```
> ### local 사용
```
npm install
npm start
```

> ### docker 사용
```
sudo docker build -t {repo 이름}/{image 이름} .
sudo docker run --name {container 이름} -d -p{사용할포트번호}:3000 {repo 이름}/{image 이름}
```
ex)
```
sudo docker build -t oktrees/nodeweb .
sudo docker run --name nodeweb -d -p3000:3000 oktrees/nodeweb
```


