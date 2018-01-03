<template>
	<div>
		<h4>select2指令</h4>
		<div class="demo" >
			<span class="span-label">select2指令：</span>
			<select id="demo"  v-model="selected" v-selectt="{value: selected1,with:'300px',allowclear:'false', placeholder:'请选择一个选项'}">
				<option v-for="o in options" :value="o.id">{{ o.text }}</option>
			</select>
			<span class="select-label">选中的值: <span class="text-primary">{{selected}}</span></span>
		</div>
		<div class="demo">
			<span class="span-label">select2允许清空：</span>
			<select v-model="selected2" v-selectt="{value: selected1,with:'300px',allowclear:'false', placeholder:'请选择一个选项'}">
				<option v-for="o in options" :value="o.id">{{ o.text }}</option>
			</select>
			<span class="select-label">选中的值: <span class="text-primary">{{selected2}}</span></span>
		</div>
		<div class="demo">
			<span class="span-label">指令检查长度:</span>
			<input v-model="selected3" v-checkLength="{a: 2}" />
			<span class="select-label">输入的值: <span class="text-primary">{{selected3}}</span></span>
		</div>
	</div>
</template>

<script>
	require('../../lib/select2/index');

	module.exports = {
		data: function(){
			return {
				selected: '',
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
		},
		mounted(){
		}
	};
</script>

<style scoped>
h4{
	margin-top: 0;
}
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
