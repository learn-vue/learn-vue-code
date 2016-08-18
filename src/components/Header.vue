<template>
	<div class="header">
		<div id="logo">
			<img class="logo" src="../assets/logo.png">
		</div>	
		<div id="menu" class="">
			<ul class="menu clearfix">
				<li class="customerPage">
					<a v-link="{ path: '/page/index' }">首页</a>
				</li>
				<li>
					<a v-link="{ path: '/page/index1' }">111</a>
				</li>
				<li>
					<a v-link="{ path: '/page/index2' }">222</a>
				</li>
				<li>
					<a v-link="{ path: '/page/index3' }">333</a>
				</li>
				<li>
					<a v-link="{ path: '/page/index4' }">444</a>
				</li>
				<li>
					<a v-link="{ path: '/page/index5' }">555</a>
				</li>
				<li>
					<a v-link="{ path: '/page/index6' }">666</a>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script>
export default {
	data(){
		return {
			msg: '我是header'
		};
	},
	props: ['show'],
	methods: {
		load: function(){
			console.info(this.show);
		},
		clickMe: function(){
			this.$emit('child-tell-me-something', this.msg);
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
#menu > .menu > li > a{
	outline: none;
	width:70px;
	display: inline-block;
	font-family: "Microsoft YaHei";
	font-size:14px;
	font-weight:500;
	color:#777;
	text-align: center;
	margin: 0px 15px;
	height: 50px;
	line-height: 50px;
}
#menu > .menu >li> a:hover{
	color:#428bca;
	border-bottom: 3px solid #428bca; 
}
#menu .menu li a.active{
	color:#428bca;
	border-bottom: 3px solid #428bca;	
}
</style>
