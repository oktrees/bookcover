
<div>
  <img src="https://img.shields.io/github/stars/oktrees/bookcover"/>
  <img src="https://img.shields.io/github/issues/oktrees/bookcover"/>
  <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Foktrees&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/>  
</div>

# C&D bookcover site  

<a href="https://cndbook.com/">cndbook.com</a><br/>

# INFO

* 책 커버 디자인 사이트입니다</br>
* 관리자 로그인 기능
* 관리자는 BOOKLIST 탭 게시판에 작업물을 게시, 수정, 삭제, 이미지 업로드를 할 수 있습니다.<br/> 
* 관리자는 CONTACT 탭에서 회사 소개 글을 수정할 수 있습니다. <br/>
* 게시한 작업물들은 메인페이지에 carousel로 노출됩니다.<br/>
<br/>


# SKILL

> ### FE 
* js : react
* css : styled-component
* deployment : github-pages

> ### BE
* restApi : node-express
* database : mysql-sequelize
* deployment : aws EC2, RDS, Route53, Docker
  
##

# SET

### github-pages deploy
bookcover/react/public/404.html 파일 <br/>
segmentCount 도메인적용시 0, gh-pages 주소는 1 설정
```javascript
...

var segmentCount = 0; //도메인 = 0, gh-pages 주소는 1

var l = window.location;
l.replace(
    l.protocol + '//' + l.hostname + (l.port ?   ':' + l.port : '') +
    l.pathname.split('/').slice(0, 1 +  segmentCount).join('/') + '/?p=/' +
    l.pathname.slice(1).split('/').slice  (segmentCount).join('/').replace(/&/g,  '~and~') +
    (l.search ? '&q=' + l.search.slice(1) .replace(/&/g, '~and~') : '') +
    l.hash
);

...
```
gh-pages branch에 build폴더만 push
```
git add react/build

git commit -m ‘gh-pages’

git subtree push --prefix react/build origin gh-pages
```
