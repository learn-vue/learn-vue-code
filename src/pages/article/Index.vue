<template>
	<div class="text-content">
		<ul>
			<vue-article v-for="article in articles" v-bind:article="article"></vue-article>
		</ul>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			message: 'Hello Vue.js!' + new Date(),
			articles: [{
				label: '入门教程',
				link: 'http://www.runoob.com/w3cnote/requirejs-tutorial-1.html',
				text: 'requireJs 入门教程'
			}, {
				label: '文档手册',
				link: 'http://cn.vuejs.org/guide/installation.html',
				text: 'VUE 1.0 中文文档'
			}, {
				label: '文档手册',
				link: 'http://vuefe.cn/guide/',
				text: 'VUE 2.0 中文文档'
			}, {
				label: '入门教程',
				link: 'https://zhuanlan.zhihu.com/p/23134551',
				text: 'Vue 2.0 的建议学习顺序[知乎@尤雨溪]'
			}, {
				label: '文档手册',
				link: 'https://webpack.js.org/get-started/',
				text: 'webpack文档'
			}, {
				label: '文档手册',
				link: 'http://vue-loader.vuejs.org/en/configurations/asset-url.html',
				text: 'vue-loader文档'
			}, {
				label: '技术文章',
				link: 'https://segmentfault.com/a/1190000007238999',
				text: '前端路由的两种实现原理'
			}, {
				label: '文档手册',
				link: 'http://sole.github.io/tween.js/examples/03_graphs.html',
				text: 'tween.js运动曲线图'
			}]
		};
	},
	components: {
		'vue-article': {
			props: ['article'],
			template: '<li class="article-list">\
				<label for="" class="article-label">[ {{ article.label }} ]</label>\
				<a v-bind:href="article.link" target="_blank">{{ article.text }}</a>\
			</li>'
		}
	},
	methods: {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text-content{
	height: 200px;
	background: rgba(255,255,255,0.9);
	width: 900px;
	margin: 20px auto;
	font-size: 14px;
}
.article-list{
	margin: 10px 0;
}
</style>
<style>
.article-label{
	width: 100px;
	text-align: right;
	display: inline-block;
	margin-right: 10px;
}
</style>
