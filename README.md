# This is the site is my main site.
It hosts a resume and links to other projects
http://war.re

written in reactjs 
TODO: fix gulp file

## How to run the service
```
npm start
```

## Bundle js
```
  browserify -t [ reactify --es6 --target es5 ] inc/appRouter.js > src/root/js/Bundle.js
```
