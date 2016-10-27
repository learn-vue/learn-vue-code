<template>
	<div class="text-content">
		<div class="test-row" v-bind:id="dynamicId">id绑定</div>
		<div class="test-row">
			<button class="btn btn-success" v-bind:disabled="someDynamicCondition1">可用的按钮</button>
			<button class="btn btn-success" v-bind:disabled="someDynamicCondition2">不可用的按钮</button>
		</div>
		<div class="test-row">
			<span>表达式数据绑定 0 + 1 = {{ num1 + 1}}</span><br>
			<span>三元表达式数据绑定  ok ? {{ ok ? 'YES' : 'NO' }}</span><br>
			<span>数组操作表达式数据绑定 '12345' => '{{ arr1.split('').reverse().join('') }}'</span>
		</div>

		<div class="test-row">
			<span>过滤器</span><br>
			<span>日期格式化 now：{{ now | date }}</span><br>
			<span>日期格式化 now：{{ now | date('yyyy-MM-dd hh:mm:ss') }}</span><br>
			<span>日期格式化 now：{{ now | date('hh:mm') }}</span><br>
			<span>金额格式化 示例金额： {{ moneymock | money }}元</span><br>
		</div>

		<div class="test-row">
			<span>计算属性</span><br>
			<span>{{message}} ==>{{ reversedMessage }}</span><br>
		</div>
	</div>
</template>

<script>
module.exports = {
	data: function(){
		return {
			message: 'Hello Vue.js!' + new Date(),
			todos: [1, 2, 3, 4, 5],
			dynamicId: 'testId',
			someDynamicCondition1: false,
			someDynamicCondition2: true,
			num1: 0,
			num2: 1,
			ok: true,
			arr1: '12345',
			now: Date.now(),
			moneymock: '888888.88'
		};
	},
	computed: {
		// a computed getter
		reversedMessage: function () {
			// `this` points to the vm instance
			return this.message.split('').reverse().join('');
		}
	},
	components: {
		'todo': {
			props: ['todo'],
			template: '<li>这是第{{todo}}条</li>'
		}
	},
	methods: {

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
</style>
