import Vue from 'vue';
import $ from 'jquery';

require('./select2.css');
require('./jquery-1.11.2.min.js');
require('./select2.min.js');
require('./i18n/zh-CN.js');

Vue.directive('select', {
	twoWay: true,
	priority: 1000,
	params: ['options'],
	bind: function () {
		var self = this
		$(this.el)
		.select2()
		.on('change', function () {
			self.set(this.value)
		})
	},
	update: function (value) {
		$(this.el).val(value).trigger('change')
	},
	unbind: function () {
		$(this.el).off().select2('destroy')
	}
});
