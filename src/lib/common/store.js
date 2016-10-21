/*
 * localStorage
 *
 * @author wenjie
 * @since 2016年8月9日15:51:59
 * @version 1.0.0
 * @lastUpdatedBy Zhao Wenjie at 2016年8月9日15:52:03
 */
// const 定义常量 es6
// const STORAGE_KEY = 'todos-vuejs'
export default {
	fetch(STORAGE_KEY){
		return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
	},
	save(STORAGE_KEY, items){
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	}
};
