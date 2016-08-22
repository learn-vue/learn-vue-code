<template>
	<div class="header">
		<div id="logo">
			<img class="logo" src="../assets/logo.png">
		</div>	
		<div id="menu" class="">
			<ul class="menu clearfix">
				<li v-for="(index,menu) in menuList">
					<a class="nemu-item" v-link="{ path: menu.linkUrl }">{{ menu.text }}</a>
				</li>
				<li>
					<a href="http://cn.vuejs.org/guide/installation.html" target="_blank">VUE</a>
				</li>
				<li>
					<a href="http://router.vuejs.org/zh-cn/installation.html" target="_blank">VUE-router</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			msg: '我是header',
			menuList: [{
				linkUrl: '/index',
				text: '首页'
			},
			{
				linkUrl: '/page/components/select2',
				text: 'components'
			},
			{
				linkUrl: '/page/index2',
				text: '222'
			},
			{
				linkUrl: '/page/index3',
				text: '333'
			},
			{
				linkUrl: '/page/index4',
				text: '444'
			},
			{
				linkUrl: '/page/index5',
				text: '555'
			},
			{
				linkUrl: '/page/index6',
				text: '666'
			}]
		};
	},
	methods: {
		load: function(){
		},
		clickMe: function(){
		}
	},
	ready: function(){
		this.load();
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a,a:hover,a:visited{
	text-decoration: none;
}
.header{
	width:100%;
	margin:auto;
	font-size:14px;
	padding: 10px 15px;
	height: 73px;
}
#logo{
	width:202px;
	height:60px;
	float:left;	
}
.logo {
	width: 60px;
	height: 60px
}
#menu{
	margin-bottom:-10px; 
	float: right;
	margin-right: 50px;
}
.menu{
	list-style:none;
	padding-left:0px;
}
#menu .menu li{
	float:left;
}
.nemu-item.v-link-active{
	border-bottom: 3px solid #428bca;
    color: #428bca;
}
#menu > .menu > li > a{
	outline: none;
	display: inline-block;
	font-family: "Microsoft YaHei";
	font-size:14px;
	font-weight:500;
	color:#777;
	text-align: center;
	margin: 0px 15px;
	height: 50px;
	line-height: 50px;
	padding: 0 10px;
}
#menu > .menu >li> a:hover{
	color:#428bca;
}
#menu .menu li a.active{
	color:#428bca;
	border-bottom: 3px solid #428bca;	
}
</style>
