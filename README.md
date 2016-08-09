
## VUE练习项目[ (Click Me)](https://learn-vue.github.io)

### 一. 安装

#### 第一步: 安装taobao镜像工具 (非常重要！！！)

(国内最好先安装这个，不然下载这个项目实在是太艰难了) [淘宝NPM镜像地址 (Click Me)](https://npm.taobao.org/)

`npm install -g cnpm --registry=https://registry.npm.taobao.org`

#### 第二步: 创建项目文件夹，配置项目相关信息

``` bash
npm install -g vue-cli       #进入项目文件夹全局安装 vue-cli

vue init webpack my-vue      #创建一个基于 "webpack" 模板的新项目,这里文件名起的是‘my-vue’
```

根据提示写入package.json相关信息  [package.json文档 (Click Me)](http://www.mujiang.info/translation/npmjs/files/package.json.html)

选择性安装 karam+mocha (单元测试) 等一些工具

#### 第三步: 安装依赖资源，启动项目

``` bash
cd my-vue       #进入项目文件夹

npm install     #安装依赖的一些资源，就是package.json里面对应的东东

$ npm run dev   #启动项目
```


可以尽情的开发了  [VUE文档地址 (Click Me)](http://cn.vuejs.org/guide/installation.html)

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


其他资源

```bash
npm install vue-router   路由

```