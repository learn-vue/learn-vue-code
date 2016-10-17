<template>
	<div>
		<h4>validate组件</h4>
		<div class="demo">
			<span class="span-label">validate组件：</span>
		</div>
	</div>
</template>

<script>
	require('src/lib/select2/index');

	module.exports = {
		data: function(){
			return {
				selected1: '',
				selected2: '',
				selected3: '',
				selected4: '',
				selected5: '',
				options: [
				{ id: 'hello', text: 'hello' },
				{ id: 'what', text: 'what' },
				{ id: '3个选项', text: '这是第3个选项' },
				{ id: '4个选项', text: '这是第4个选项' },
				{ id: '5个选项', text: '这是第5个选项' },
				{ id: '6个选项', text: '这是第6个选项' },
				{ id: '7个选项', text: '这是第7个选项' },
				{ id: '8个选项', text: '这是第8个选项' },
				{ id: '9个选项', text: '这是第9个选项' },
				{ id: '10个选项', text: '这是第10个选项' },
				{ id: '11个选项', text: '这是第11个选项' },
				{ id: '12个选项', text: '这是第12个选项' }]
			};
		}
	};
</script>

<style scoped>
.demo{
	margin-bottom: 10px;
}
select {
  min-width: 300px;
}
.text-primary{
	color: #428bca;
}
.span-label{
	margin: 0 10px 0 20px;
	width: 100px;
	text-align: right;
	display: inline-block;
}
.select-label{
	margin-left: 20px;
}
</style>
