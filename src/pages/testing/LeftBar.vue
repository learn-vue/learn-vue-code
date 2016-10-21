<template>
	<div v-bind:class="{'compontents-layout':true}">
		<div class="left-bar">
			<ul class="menu clearfix">
				<router-link to="/page/test" tag="li" exact>
					<a>测试</a>
				</router-link>
				<router-link to="/page/test/test1" tag="li" exact>
					<a>1号实验室</a>
				</router-link>
				<router-link to="/page/test/test2" tag="li" exact>
					<a>2号实验室</a>
				</router-link>
				<router-link to="/page/test/test3" tag="li" exact>
					<a>3号实验室</a>
				</router-link>
				<router-link to="/page/test/test4" tag="li" exact>
					<a>4号实验室</a>
				</router-link>
			</ul>
		</div>
		<div class="main-content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			a: 'a'
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

<style>
.compontents-layout{
	position: relative;
}
.left-bar{
	position: absolute;
	width: 180px;
	text-align: center;
	border-right: 1px #ccc solid;
}
.main-content{
	padding-left: 200px;
	margin-top: 0;
}
.left-bar li{
	padding: 10px 0;
	font-size: 14px;
	position: relative;
}
.left-bar li a{
	color: #666;
		font-size: 14px;
}
.left-bar li.router-link-active a{
	color: #2db7f5;
	font-weight: 700;
}
.left-bar li:hover a{
	color: #2db7f5;
}
.left-bar .menu li.router-link-active::after{
	content: '';
	border-left: 3px solid #2db7f5;
	position: absolute;
	right: -2px;
	top: 0;
	height: 39px;
}
.memu-item.router-link-active{
	color: #2db7f5;
}
.memu-item{
	color: #333;
}
h4{
	padding: 20px 0;
}
</style>
