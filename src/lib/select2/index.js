import Vue from 'vue';

require('./select2.css');
require('./select2.min.js');
require('./i18n/zh-CN.js');

Vue.directive('selectt', {
	// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	bind: function (el, binding) {
	},
	// inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
	inserted (el, binding, vnode, oldVnode) {
		var data = binding.value;
		/*eslint-disable */
		var me = this;
		$(el).select2({
			language: 'zh-CN',
			width: data.width || '226px',
			allowClear: data.allowclear ? data.allowclear === 'true' ? true : false : true,
			placeholder: data.placeholder || '请选择'
		}).on('change', function (e) { 
			console.info($(el).val())
		});
	},
	// update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
	update: function (el, binding, vnode, oldVnode) {
		console.info('update')
		// $(this.el).val(value).trigger('change')
	},
	// componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
	componentUpdated (el, binding) {
		console.info('componentUpdated')
	},
	// unbind：只调用一次，指令与元素解绑时调用。
	unbind (el, binding) {
		console.info('unbind')
		$(el).off().select2('destroy')
	}
});

Vue.directive('checkLength', {
	// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
	bind: function (el, binding) {
		console.info('bind')
	},
	// inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
	inserted (el, binding, vnode, oldVnode) {
		console.info('inserted')
	},
	// update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
	update: function (el, binding, vnode) {
		// $(this.el).val(value).trigger('change')
	},
	// componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
	componentUpdated (el, binding) {
	},
	// unbind：只调用一次，指令与元素解绑时调用。
	unbind (el, binding) {
		console.info('unbind')
	}
});
