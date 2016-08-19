<template>
	<div class="dev-overview">
		select2插件
	</div>
	<div id="el">
		<p>Selected: {{selected}}</p>
		<select v-select="selected">
			<option value="0">default</option>
			<option v-for="o in options" :value="o.id">{{ o.text }}</option>
		</select>
	</div>
</template>

<script>
	require('../../lib/select2/index');

	module.exports = {
		data: function(){
			return {
				selected: 0,
				options: [
				{ id: 1, text: 'hello' },
				{ id: 2, text: 'what' }]
			};
		}
	};
</script>

<style>
select {
  min-width: 300px;
}
.select2 {
	width: 300px;
}
</style>
