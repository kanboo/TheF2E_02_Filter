// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';

import fontawesome from '@fortawesome/fontawesome';
import faStar from '@fortawesome/fontawesome-free-regular/faStar';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/all.scss';

import App from './App';

fontawesome.library.add(faStar);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
