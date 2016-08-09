import Layout from '../pages/dev/Layout.vue';

import DevLogin from '../pages/dev/Login.vue';

import DevSignup from '../pages/dev/signup/SignupOne.vue';

import DevSignupNext from '../pages/dev/signup/SignupTwo.vue';

import DevSignupSuccess from '../pages/dev/signup/SignupThree.vue';

// /////////////////////////////////////////////////找回密码//////////////////////////////////////////////

import DevFindpsw from '../pages/dev/findpsw/Account.vue';

import DevFindpswEmail from '../pages/dev/findpsw/Email.vue';

import DevFindpswReset from '../pages/dev/findpsw/Reset.vue';

import DevFindpswSuccess from '../pages/dev/findpsw/Success.vue';

// /////////////////////////////////////////////////应用管理//////////////////////////////////////////////

import DevIndex from '../pages/dev/index.vue';

import AppIndex from '../pages/dev/app/Index.vue';

import AppCreate from '../pages/dev/app/CreateStepApp.vue';

import AppCreateAdslot from '../pages/dev/app/CreateStepAdslot.vue';

import AppCreateSdk from '../pages/dev/app/CreateStepSdk.vue';

import AppCreateSuc from '../pages/dev/app/CreateStepSuc.vue';

import AppUpdate from '../pages/dev/app/Update.vue';

import AdslotUpdate from '../pages/dev/app/UpdateAdslot.vue';

// /////////////////////////////////////////////////数据管理//////////////////////////////////////////////

import DataIndex from '../pages/dev/data/Index.vue';

// /////////////////////////////////////////////////财务管理//////////////////////////////////////////////

import FinanceIndex from '../pages/dev/finance/Index.vue';

import FinanceData from '../pages/dev/finance/Data.vue';

import FinanceConfig from '../pages/dev/finance/Config.vue';

// /////////////////////////////////////////////////日志记录//////////////////////////////////////////////

import LogIndex from '../pages/dev/log/Index.vue';

// /////////////////////////////////////////////////通知记录//////////////////////////////////////////////

import MessageIndex from '../pages/dev/message/Index.vue';

import MessageDetail from '../pages/dev/message/Detail.vue';

// /////////////////////////////////////////////////通知记录//////////////////////////////////////////////

import UserIndex from '../pages/dev/user/Index.vue';

import UserPass from '../pages/dev/user/Password.vue';

// 开发者路由配置
export default
{	
	'/dev/login':{
		component:DevLogin,
		auth:false
	},
	'/dev/signup':{
		component:DevSignup,
		auth:false
	},
	'/dev/signup/next':{
		component:DevSignupNext,
		auth:false
	},
	'/dev/signup/success':{
		component:DevSignupSuccess,
		auth:false
	},
    // 找回密码
    '/dev/findpsw':{
        component:DevFindpsw,
        auth:false
    },
    '/dev/findpsw/email':{
        component:DevFindpswEmail,
        auth:false
    },
    '/dev/findpsw/reset':{
        component:DevFindpswReset,
        auth:false
    },
    '/dev/findpsw/success':{
        component:DevFindpswSuccess,
        auth:false
    },
	'/dev': {
		component: Layout,
		subRoutes:{
			'/index':{
				component:DevIndex
			},		
			'/app/index':{
    			component:AppIndex
    		},
			'/app/create':{// 创建APP第一步
				component:AppCreate
			},
			'/app/create/adslot':{// 创建APP第二步
				component:AppCreateAdslot
			},
			'/app/create/sdk':{// 创建APP第三步
				component:AppCreateSdk
			},
			'/app/create/suc':{// 创建APP第四步
				component:AppCreateSuc
			},
			'/app/update':{
				component:AppUpdate
			},
			'/app/update/adslot':{
				component:AdslotUpdate
			},
    
    		// ///////////////////////////数据管理//////////////////////

    		'/data/index':{
    			component:DataIndex
    		},

    		// ///////////////////////////财务管理//////////////////////

    		'/finance':{
    			component:FinanceIndex,
    			subRoutes:{
    				'/data':{
    					component:FinanceData,
    				},
    				'/config':{
    					component:FinanceConfig,
    				}
    			}
    		},

    		// ///////////////////////////日志记录//////////////////////
    		'/log/index':{
				component:LogIndex
			},
			
			// ///////////////////////////消息记录//////////////////////
			
    		'/message/index':{
				component:MessageIndex
			},
			'/message/detail':{
				component:MessageDetail
			},
			
			// ///////////////////////////用户管理//////////////////////
    		'/user/index':{
				component:UserIndex
			},
			'/user/password':{
				component:UserPass
			}
		}
	}
};
