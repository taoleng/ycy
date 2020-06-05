// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import MetaInfo from 'vue-meta-info';
import ElementUI,{Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/public.css';
import vueLazyload from 'vue-lazyload';

Vue.use(ElementUI)
Vue.use(MetaInfo)
Vue.use(vueLazyload, {
	preLoad: 1.3,
	error: '../static/img/error.jpg',
	loading: '../static/img/default.jpg',
	attempt: 1
})
Vue.prototype.$https = axios;
//设置用户信息
function setUserInfo (data){
	const info = data.Data;
	const userInfo = {
		Id:info.Id,
		Name:info.Name,
		Mobile:info.Mobile,
		UserType:info.UserType,
		UserLevel:info.UserLevel,
		IsPrincipal:info.IsPrincipal,
		Sex:info.Sex,
	}
	localStorage.setItem('LddUserInfo',JSON.stringify(userInfo));
	localStorage.setItem('LddToken',info.Ticket);
}
//删除用户信息
function removeUserInfo(){
	localStorage.removeItem('LddUserInfo');
	localStorage.removeItem('LddToken');
}
Vue.prototype.setUserInfo = setUserInfo;
Vue.prototype.removeUserInfo = removeUserInfo;
Vue.config.productionTip = false

Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}
//全局路由监听
router.beforeEach((to, from, next) => {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    next() 
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
      document.dispatchEvent(new Event('render-event'))
    }
})
