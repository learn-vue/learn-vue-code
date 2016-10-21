<template>
	<div v-bind:class="{'compontents-layout':true}">
		<div class="left-bar">
			<ul class="menu clearfix">
				<router-link to="/page/components" tag="li" exact>
					<a>select2</a>
				</router-link>
				<router-link to="/page/components/datePicker" tag="li" exact>
					<a>datePicker</a>
				</router-link>
				<router-link to="/page/components/mask" tag="li" exact>
					<a>mask</a>
				</router-link>
				<router-link to="/page/components/validate" tag="li" exact>
					<a>validate</a>
				</router-link>
				<router-link to="/page/components/tab" tag="li" exact>
					<a>tab</a>
				</router-link>
				<router-link to="/page/components/pager" tag="li" exact>
					<a>pager</a>
				</router-link>
				<router-link to="/page/components/table" tag="li" exact>
					<a>table</a>
				</router-link>
				<router-link to="/page/components/modal" tag="li" exact>
					<a>modal</a>
				</router-link>
				<router-link to="/page/components/top" tag="li" exact>
					<a>top</a>
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
