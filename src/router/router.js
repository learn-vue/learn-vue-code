import Vue from 'vue';

import Config from './../config';

import Router from 'vue-router';

import App from '../pages/App.vue';

// 路由规则
import RouterDEV from './routerDEV';

import SessionUtil from './../util/session';

import ApiUtil from './../util/api';

Vue.use(require('vue-resource'));

Vue.use(Router);

var router = new Router();

router.map(RouterDEV);

///////////////////////////////////////////////////////

Vue.http.options.root = '/v1';

Vue.http.options.emulateHTTP = true;

Vue.http.options.emulateJSON = true;

Vue.http.interceptors.push({

    request: function (request) {

    	request.url=ApiUtil.url(request.url);

    	var method=request.method;
    	
    	//登录后所有AJAX参数，默认传递用户token
    	var isLogin=SessionUtil.isLogin();

    	var token=isLogin && SessionUtil.getToken();

    	var data=request.data || request.params;
		
    	if(Config.publish){
    		
    		var md=method.toLowerCase();

        	//springMVC bug fix
    		if(md == 'put' || md=='delete'){

        		data["_method"]=md;
        		
        		request.method='post';
        		
        	}
        	
    	}

    	token ? data.token=token : false;

        return request;
    },

    response: function (response) {
    	
    	var data=response.data || {};
    
    	//后台session失效了
		if(data.ret===999){
			
	    	var path=this.$route.path;
	 
	    	var login=Config.login+"?redirectPath="+path;

			setTimeout(function(){
			
				SessionUitl.clear();
				
				$.confirm({
					title: "提示",
					content: '系统超时，请重新登录！',
					confirmButton: '确定',
					backgroundDismiss:false,
					cancelButton: false,
					confirm:function(){router.go(login);}
				});
		
			},100);
			
		}else//重置用户登录时间戳
			SessionUtil.resetTimestamp();
		
    	return response;
    }

});

///////////////////////////////////////////////////////

router.beforeEach(function (transition) {

	var body=document.getElementById("g_body");
	body ? body.scrollTop=0 : false;

    var to=transition.to;
	
    var auth = to.auth;

	var toPath=to.path;
    
    var isLogin=SessionUtil.isLogin();
	
	//重置用户登录时间戳
	isLogin && SessionUtil.resetTimestamp();	
	
	//记录用户最后一次访问地址,在浏览器重启后，正确跳转
	(auth===false || isLogin) && SessionUtil.setLastPath(toPath);
    
	if(auth===false)
    	return transition.next();

	if(isLogin)
		return transition.next();

	//未登录状态重置
	SessionUtil.clear();
	
	//developer
	var login=Config.login+"?redirectPath="+toPath;
	
	router.go({path:login});

});

var isLogin=SessionUtil.isLogin();

isLogin ? SessionUtil.resetTimestamp() : SessionUtil.clear();

//获取最后一次访问地址，登录后做跳转
var lastPath=SessionUtil.getLastPath() || Config.index;

var path=isLogin ? lastPath : Config.login;

router.redirect({'/': path});

router.start(App, '#app');