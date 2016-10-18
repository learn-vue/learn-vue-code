<template>
	<div class="layout">
		<l-header></l-header>
		<div class="list-404">
			<div class="content-404 content-404-1">
				<img src="../assets/img/404/404_1.png" alt="404" />
			</div>
			<div class="content-404 content-404-2">
				<img src="../assets/img/404/404_2.jpg" alt="404" />
			</div>
			<div class="content-404 content-404-3">
				<img src="../assets/img/404/404_3.gif" alt="404" />
			</div>
		</div>
	</div>
</template>

<script>
	import Header from 'src/components/Header.vue';

	export default {
		data: function(){
			return {
				'index': 1
			}
		},
		components: {
			'l-header': Header
		}
	};
</script>

<style scoped>
.content-404{
	width: 100%;
	height: 100%;
	position: fixed;
	text-align: center;
	top: 0;
	bottom: 0;
	z-index: -1;
}
.content-404-1{
	background-color: #282828;
	display: none;
}
.content-404-2{
	display: none;
}
.content-404-3{
	/*display: none;*/
}
.content-404 img{
	margin: 0 auto;
	vertical-align: middle;
	position: absolute;
	top: 50%; left: 50%;
	-webkit-transform: translate(-50%,-50%);
	-ms-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
}
</style>
