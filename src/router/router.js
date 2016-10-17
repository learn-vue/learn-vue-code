
var Vue = require('vue')

import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = require('./routerAll')

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
	routes: routes.default
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
	router: router,
	template: '<router-view></router-view>'
}).$mount('#app')

// 现在，应用已经启动了！