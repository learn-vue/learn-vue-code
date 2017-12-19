import Vue from 'vue';

require('./select2.css');
require('./select2.min.js');
require('./i18n/zh-CN.js');

Vue.directive('select2', {
	twoWay: true,
	priority: 1000,
	params: ['width', 'allowclear', 'placeholder'],
	bind: function (el, binding) {
		// 只调用一次，在指令第一次绑定到元素上时调用。
		// var self = this;
		// var params = this.params;
		var data = binding.value;
		console.info(el);
		// console.info($(el));
		console.info(data);
		// console.info(this.params);
		// $(el).select2({
		// 	language: 'zh-CN',
		// 	width: data.width || '226px',
		// 	allowClear: data.allowclear ? data.allowclear === 'true' ? true : false : true,
		// 	placeholder: data.placeholder || '请选择'
		// }).on('change', function () {
		// 	// $(el).set(this.value)
		// })
	},
	update: function (value) {
		console.info(value);
		// 在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值
		// $(this.el).val(value).trigger('change')
	},
	unbind: function () {
		// 只调用一次，在指令从元素上解绑时调用。
		// $(this.el).off().select2('destroy')
	}
});
