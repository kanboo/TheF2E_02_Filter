// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import ElementUI from 'element-ui';
import underscore from 'vue-underscore';

import fontawesome from '@fortawesome/fontawesome';
import faStar from '@fortawesome/fontawesome-free-regular/faStar';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faMapMarkerAlt from '@fortawesome/fontawesome-free-solid/faMapMarkerAlt';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faTimesCircle from '@fortawesome/fontawesome-free-regular/faTimesCircle';
import faCalendarAlt from '@fortawesome/fontawesome-free-regular/faCalendarAlt';
import faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/all.scss';

import App from './App';

fontawesome.library.add(
  faStar,
  faSearch,
  faPlus,
  faCalendarAlt,
  faTimesCircle,
  faMapMarkerAlt,
  faGithub
);
Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(underscore);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
});
