import Vue from 'vue';

Vue.use(require('vue-validator'));

Vue.validator('email', function (val/*, rule*/) {
	// 空判断需要通过require判定
	if (val === undefined || val === null || val === ''){
		return true;
	}
	return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
});

Vue.validator('qq', function (val/*, rule*/) {
	// 空判断需要通过require判定
	if (val === undefined || val === null || val === ''){
		return true;
	}
	return /^\d{5,12}$/.test(val);
});

Vue.validator('phone', function (val/*, rule*/){
	// 空判断需要通过require判定
	if (val === undefined || val === null || val === ''){
		return true;
	}
	return /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/.test(val);
});

Vue.validator('bankNo', function (val/*, rule*/){
	// 空判断需要通过require判定
	if (val === undefined || val === null || val === ''){
		return true;
	}
	return /^\d{7,21}$/.test(val);
});

Vue.validator('percent', function (val/*, rule*/){
	// 百分数
	// 空判断需要通过require判定
	if (val === undefined || val === null || val === ''){
		return true;
	}
	return /^(\d*\.)?\d+$/.test(val);
});

Vue.validator('number', function (val/*, rule*/){
	// 空判断需要通过require判定
	if (val === undefined || val === null || val === ''){
		return true;
	};
	return /^(\d*\.)?\d+$/.test(val);
});

export default Vue;
