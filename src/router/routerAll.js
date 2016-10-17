
import Layout from 'src/pages/Layout.vue';

import Index from 'src/pages/Index.vue';

// 妈蛋 坑 vue-router v2 变成数组了
export default [
	{
		path: '/',
		component: require('src/pages/Layout.vue'),
		children: [
			{
				path: '/',
				component: require('src/pages/Index.vue')
			},
			{
				path: 'index',
				component: Index
			}
		]
	},
	{
		path: '/Index2',
		component: require('src/pages/test/Index2.vue')
	},
	{
		path: '/Index3',
		component: require('src/pages/test/Index3.vue')
	},
	{
		path: '/Index4',
		component: require('src/pages/test/Index4.vue')
	},
	{
		path: '/Index5',
		component: require('src/pages/test/Index5.vue')
	},
	{
		path: '/page',
		component: require('src/pages/Layout.vue'),
		children: [
			{
				path: '/',
				component: Index
			},
			{
				path: 'index',
				component: Index
			},
			{
				path: 'components',
				component: require('src/pages/components/LeftBar.vue'),
				children: [
					{
						path: '/',
						component: require('src/pages/components/Select2-demo.vue')
					},
					{
						path: 'select2',
						component: require('src/pages/components/Select2-demo.vue')
					},
					{
						path: 'tab',
						component: require('src/pages/components/Tab.vue')
					},
					{
						path: 'datePicker',
						component: require('src/pages/components/DatePicker.vue')
					},
					{
						path: 'mask',
						component: require('src/pages/components/Mask.vue')
					},
					{
						path: 'modal',
						component: require('src/pages/components/Modal.vue')
					},
					{
						path: 'pager',
						component: require('src/pages/components/Pager.vue')
					},
					{
						path: 'table',
						component: require('src/pages/components/Table.vue')
					},
					{
						path: 'validate',
						component: require('src/pages/components/Validate.vue')
					}
				]
			},
			{
				path: 'article',
				component: require('src/pages/article/index.vue')
			},
			{
				path: 'test',
				component: require('src/pages/test.vue')
			}
		]
	}
];
