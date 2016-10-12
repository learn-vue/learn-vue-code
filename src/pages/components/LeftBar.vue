<template>
	<div class="left-bar">
		<ul class="menu clearfix">
			<li v-for="(index,menu) in menuList" v-link="{ path: menu.linkUrl }">
				<a class="memu-item" v-link="{ path: menu.linkUrl }">{{ menu.text }}</a>
			</li>
		</ul>
	</div>
	<div class="main-content">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data(){
		return {
			menuList: [{
				linkUrl: '/page/components/select2',
				text: 'select2'
			},
			{
				linkUrl: '/page/components/datePicker',
				text: 'datePicker'
			},
			{
				linkUrl: '/page/components/mask',
				text: 'mask'
			},
			{
				linkUrl: '/page/components/validate',
				text: 'validate'
			},
			{
				linkUrl: '/page/components/tab',
				text: 'tab'
			},
			{
				linkUrl: '/page/components/pager',
				text: 'pager'
			},
			{
				linkUrl: '/page/components/table',
				text: 'table'
			},
			{
				linkUrl: '/page/components/modal',
				text: 'modal'
			},
			{
				linkUrl: '/page/components/modal',
				text: 'top'
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

<style>
.left-bar{
	position: absolute;
	width: 180px;
	text-align: center;
	border-right: 1px #ccc solid;
}
.main-content{
	width: 100%;
	padding-left: 200px;
}
.left-bar li{
	padding: 10px 0;
	font-size: 14px;
	position: relative;
}
.left-bar li:hover a{
	color: #2db7f5;
}
.left-bar .menu li.v-link-active::after{
	content: '';
	border-left: 3px solid #2db7f5;
	position: absolute;
	right: -2px;
	top: 0;
	height: 39px;
}
.memu-item.v-link-active{
	color: #2db7f5;
}
.memu-item{
	color: #333;
}
h4{
	margin: 20px auto;
}
</style>
