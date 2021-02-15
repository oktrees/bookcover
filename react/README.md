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

```
git add react/build

git commit -m ‘gh-pages’

git subtree push --prefix react/build origin gh-pages
```
