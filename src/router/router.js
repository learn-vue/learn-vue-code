import Vue from 'vue';

import Router from 'vue-router';

import RouterAll from './routerAll';

// 定义组件
// 路由器需要一个根组件。
// 出于演示的目的，这里使用一个空的组件，直接使用 HTML 作为应用的模板
import App from '../App';
// 创建一个路由器实例
// 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
Vue.use(Router);
var router = new Router({
	hashbang: false
})
// 定义路由规则
// 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
// 创建的组件构造函数，也可以是一个组件选项对象。
// 稍后我们会讲解嵌套路由
router.map(RouterAll)
// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
router.start(App, '#app');

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点在讨论嵌套路由。
// const routes = [
//   { path: '/foo', component: Foo },
//   { path: '/bar', component: Bar }
// ]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
// const router = new Router({
// 	RouterAll // （缩写）相当于 routes: RouterAll
// })
// // 4. 创建和挂载根实例。
// // 记得要通过 router 配置参数注入路由，
// // 从而让整个应用都有路由功能
// const app = new Vue({
// 	router
// }).$mount('#app')

// 现在，应用已经启动了！
