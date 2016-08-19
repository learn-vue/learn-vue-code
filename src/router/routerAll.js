import Layout from 'src/pages/Layout.vue';
import Index from 'src/pages/Index.vue';
import Index1 from 'src/pages/test/Index1.vue';
import Index2 from 'src/pages/test/Index2.vue';
import Index3 from 'src/pages/test/Index3.vue';
import Index4 from 'src/pages/test/Index4.vue';
import Index5 from 'src/pages/test/Index5.vue';
import Index6 from 'src/pages/test/Index6.vue';

export default
	{
		'/': {
			component: Layout,
			subRoutes: {
				'/': {
					component: Index // 首页
				},
				'/index': {
					component: Index
				}
			}
		},
		'/index2': {
			component: Index2
		},
		'/index3': {
			component: Index3
		},
		'/index4': {
			component: Index4
		},
		'/index5': {
			component: Index5
		},
		'/index6': {
			component: Index6
		},
		'/page': {
			component: Layout,
			subRoutes: {
				'/': {
					component: Index
				},
				'/index': {
					component: Index
				},
				'/components': {
					component: require('src/pages/components/LeftBar.vue'),
					subRoutes: {
						'/': {
							component: require('src/pages/components/Select2-demo.vue')
						},
						'/select2': {
							component: require('src/pages/components/Select2-demo.vue')
						}
					}
				},
				'/index1': {
					component: Index1
				},
				'/index2': {
					component: Index2
				},
				'/index3': {
					component: Index3
				},
				'/index4': {
					component: Index4
				},
				'/index5': {
					component: Index5
				},
				'/index6': {
					component: Index6
				}
			}
		},
		// not found handler
		'*': {
			component: Index
		}
	};
