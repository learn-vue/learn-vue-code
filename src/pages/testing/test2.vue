<template>
	<div class="text-content">

		<div class="test-row">循环渲染标签</div>
		
		<div class="test-row">
			<table>
				<thead>
					<tr>
						<th>姓名</th>
						<th>年龄</th>
						<th>地址</th>
					</tr>
				</thead>
				<tbody> 
					<!-- 每次for循环，都会创建一个tr标签。item是遍历的元素。 -->
					<tr v-for="item in UserList" >
						<td>{{ item.name }}</td>
						<td>{{ item.age }}</td>
						<td>{{ item.address }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	
		<div class="test-row">循环渲染多标签</div>

		<ul>
			<!-- 通过template标签，可以一次循环，输出两个li标签 -->
			<template v-for="item in UserList">
				<li>{{ item.name }}</li>
				<li class="divider"></li>
			</template>
		</ul>

	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			UserList: [
				{'name': 'malun', 'age': 18, 'address': '北京黑地下室'},
				{'name': 'flydragon', 'age': 22, 'address': '厦门的很多热的地方'},
				{'name': 'temp', 'age': 25, 'address': '东北松花江上'},
				{'name': 'jaywin', 'age': 24, 'address': '上海群租房里'}
			],
			number: 1
		};
	},
	methods: {

	},
	beforeCreate: function () {
		console.log('beforeCreate 钩子执行...');
		console.log(this.number)
	},
	cteated: function () {
		console.log('cteated 钩子执行...');
		console.log(this.number)
	},
	beforeMount: function () {
		console.log('beforeMount 钩子执行...');
		console.log(this.number)
	},
	mounted: function () {
		console.log('mounted 钩子执行...');
		console.log(this.number)
	},
	beforeUpdate: function () {
		console.log('beforeUpdate 钩子执行...');
		console.log(this.number)
	},
	updated: function () {
		console.log('updated 钩子执行...');
		console.log(this.number)
	},
	beforeDestroy: function () {
		console.log('beforeDestroy 钩子执行...');
		console.log(this.number)
	},
	destroyed: function () {
		console.log('destroyed 钩子执行...');
		console.log(this.number)
	}
}
</script>
<style scoped>
.text-content{
	height: 200px;
	background: rgba(255,255,255,0.9);
	margin: 0 auto;
	padding: 20px 15px;
}
.test-row{
	border-bottom: 1px #ccc dashed; 
	padding: 15px 0;
}
.divider{
	border-bottom: 1px dashed #ccc;
	width: 200px;
}
</style>
