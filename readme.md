# 웹팩을 heroku에 배포하는법

## 1\. heroku 회원가입/로그인

[https://www.heroku.com](https://www.heroku.com)

heroku 홈페이지에서 회원가입을 한 뒤, 프로젝트 콘솔에서

```
heroku login
```

을 입력해 로그인을 해주세요

## 2\. 서버가 없으신 분들은 express 서버를 생성해주세요

저는 `SPA구조`를 사용하였기 때문에 간단하게 루트로 들어오면 index.html 페이지를 띄우도록 만들었습니다.

```
const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

// server.js가 있는 디렉토리로 설정해준다. 
//이 패스가 프로젝트의 루트로 취급된다. 
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
```

## 3\. 서버와 웹팩 동작 테스트

이제 웹팩과 서버를 한번씩 돌려보도록 하겠습니다.

```
webpack -p
node server.js
```

를 차례로 콘솔에서 입력해봅니다!

웹팩은 bundle.js를 생성하고 서버는 html 파일을 띄워준다면 성공적입니다

## 4\. package.json 설정

package.json에 아래와 같이 스크립트를 추가해주세요.

```
"scripts": {
  "start": "node server.js", // serves the application
  "heroku-postbuild": "webpack -p" // runs after installation
},
```

이 작업은 빌드 프로세스를 커스터마이징하는 작업입니다.

배포를 할 때 모든 종속성이 설치된 후 웹팩을 빌드하기 위해서 `heroku-postbuild`스크립트를 이용합니다.

## 5\. git 설정

heroku를 사용하기 위해선 `git`이 필수입니다. 로컬 프로젝트의 `master`브랜치에서 heroku의 `master` 브랜치로 push를 했을 때 자동으로 배포가 되는 방식이기 때문이죠.  
때문에 아직 git 적용이 안되었다면 `git init`을 통해 git을 생성해주세요.  
그 다음 현재 파일들을 master브랜치에 commit합니다.

```
git add .
git commit -m 'initial commit'
```

## 6\. heroku app 생성

이제 heroku app을 만들어서 로컬 repo에서 heroku로 push 해주기만 하면 배포 끝! 거의 다 왔으니 끝까지 따라오세요~

```
heroku create 
```

를 입력하면 app이 생성되고 app name이 콘솔에 출력됩니다.

그럼 이제 그 app name으로

```
heroku git:remote --app <app_name>
```

을 입력해 heroku git이 해당 app을 바라보도록 설정해 줍니다.

마지막! `push`작업만 해주면 배포 끝!

```
git push heroku master
```

를 입력하게 되면 배포과정이 콘솔에 입력될 것이고 최종 압축까지 마치면 완성 메세지가 뜹니다.  
`heorku open`을 입력하면 배포 페이지로 바로 이동이 가능합니다.

---
</br>

**번외::dist 디렉토리**

보통 dist디렉토리에 웹팩 번들링 파일들을 저장한다면 해당 폴더는 `gitignore`에 등록해 두는게 보통입니다.  
하지만 heroku는 git을 통해 배포를 하니 dist 디렉토리를 stage해야하나 싶으실거에요.  
`heroku config:set NPM\_CONFIG\_PRODUCTION=false`설정을 미리 해둔 후 배포시 devDependencies가 설치되어 가능하다고 하네요!
</br>

**console에서 heroku app list 확인 방법**

```
heroku info -s | grep web_url | cut -d= -f2
```

</br>
</br>

**참고 사이트**

[https://medium.com/@adityaa803/how-to-deploy-webpack-node-based-app-to-heroku-f55437602a3e](https://medium.com/@adityaa803/how-to-deploy-webpack-node-based-app-to-heroku-f55437602a3e) : gitignore 피하고 배포하는 방법

[https://codeburst.io/deploy-your-webpack-apps-to-heroku-in-3-simple-steps-4ae072af93a8](https://codeburst.io/deploy-your-webpack-apps-to-heroku-in-3-simple-steps-4ae072af93a8) : webpack 배포 방법
