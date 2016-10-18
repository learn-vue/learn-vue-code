
import Layout from 'src/pages/Layout.vue';

import Index from 'src/pages/Index.vue';

import V404 from 'src/pages/404.vue';

// 妈蛋 坑 vue-router v2 变成数组了
export default [
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '/',
				component: Index
			},
			{
				path: 'index',
				component: Index
			}
		]
	},
	{
		path: '/page',
		component: Layout,
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
				component: require('src/pages/testing/LeftBar.vue'),
				children: [
					{
						path: '/',
						component: require('src/pages/testing/test.vue')
					},
					{
						path: 'test',
						component: require('src/pages/testing/test.vue')
					},
					{
						path: 'test1',
						component: require('src/pages/testing/test1.vue')
					},
					{
						path: 'test2',
						component: require('src/pages/testing/test2.vue')
					},
					{
						path: 'test3',
						component: require('src/pages/testing/test3.vue')
					},
					{
						path: 'test4',
						component: require('src/pages/testing/test4.vue')
					}
				]
			}
		]
	},
	{
		path: '/404',
		component: V404
	},
	// not found handler
	{
		path: '*',
		component: V404
	}
];
