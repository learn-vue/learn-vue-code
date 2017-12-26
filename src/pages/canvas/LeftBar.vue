<template>
	<div v-bind:class="{'compontents-layout':true}">
		<div class="left-bar">
			<ul class="menu clearfix">
				<router-link to="/page/canvas" tag="li" exact>
					<a>1111111111</a>
				</router-link>
				<router-link to="/page/canvas/test1" tag="li" exact>
					<a>2222222222</a>
				</router-link>
				<router-link to="/page/canvas/clock" tag="li" exact>
					<a>canvas时钟</a>
				</router-link>
				<router-link to="/page/canvas/test3" tag="li" exact>
					<a>4444444444</a>
				</router-link>
				<router-link to="/page/canvas/test4" tag="li" exact>
					<a>5555555555</a>
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
