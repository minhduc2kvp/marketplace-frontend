import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './plugins/lang';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
import globalComponents from './global-components';

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(VueToast, { position: 'top-right' });

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
