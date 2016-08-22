<template>
	<h4>select2插件</h4>
	<div class="demo">
		<span class="span-label">select2插件：</span>
		<select v-select="selected" width="300px" allowclear="false" placeholder="请选择一个选项">
			<option v-for="o in options" :value="o.id">{{ o.text }}</option>
		</select>
		<span class="span-label">选中的值: <span class="text-primary">{{selected}}</span></span>
	</div>
</template>

<script>
	require('../../lib/select2/index');

	module.exports = {
		data: function(){
			return {
				selected: '',
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
select {
  min-width: 300px;
}
h4{
	margin: 20px auto;
}
.text-primary{
	color: #428bca;
}
.span-label{
	margin: 0 10px 0 20px;
}
</style>
