// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Axios from 'axios'
import App from './App'
import router from './router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


Vue.config.productionTip = false

/* http */
Vue.prototype.$http = Axios;

//替换文件名的过滤器
Vue.filter('name', function (value) {
    return showSpecialChar(value);
});
Vue.filter('pic', function (value) {
    return value.replace('https:', location.protocol).replace('http:', location.protocol).replace('//img', '//kwimg').replace('sycdn.kuwo.cn', 'kuwo.cn').replace('kwcdn.kuwo.cn', 'kuwo.cn');
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})



