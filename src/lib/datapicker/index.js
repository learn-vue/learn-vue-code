import Vue from 'vue';
import $ from 'jquery';

require('./select2/select2.css');
require('./select2/select2.min.js');
require('./select2/i18n/zh-CN.js');
require('./jquery.dropdown.css');
require('./jquery.daterange.js');

Vue.directive('datePicker', {
	twoWay: true,
	priority: 1000,
	params: ['width', 'allowclear', 'placeholder','callback'],
	bind: function () {
		// 只调用一次，在指令第一次绑定到元素上时调用。
		var self = this;
		var params = self.params;

		$(this.el).DateRange({
			width: params.width || '226px',
			allowClear: params.allowclear ? params.allowclear === 'true' ? true : false : true,
			placeholder: params.placeholder || '请选择'
		}).on('change', function () {
			// self.set(this.value)
		})
	},
	update: function (value) {
		// 在 bind 之后立即以初始值为参数第一次调用，之后每当绑定值变化时调用，参数为新值与旧值
		// $(this.el).val(value).trigger('change')
	},
	unbind: function () {
		// 只调用一次，在指令从元素上解绑时调用。
		// $(this.el).off().select2('destroy')
	}
});
