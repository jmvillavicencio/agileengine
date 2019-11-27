import Vue from 'vue';
import createRouter from './router';
import createStore from './store';
import App from './App.vue';
import i18n from './mixins/i18n';
import apiError from './mixins/apiError';
import vuetify from './plugins/vuetify';
import Offset from './components/core/Offset';
import Card from './components/core/Card';

import './styles.scss';

Vue.config.productionTip = false;

Vue.component(Offset.name, Offset);
Vue.component(Card.name, Card);

Vue.mixin(i18n);
Vue.mixin(apiError);

Vue.filter('currency', (value) => {
  return `$ ${parseFloat(value).toFixed(2)}`;
});

const store = createStore();
const router = createRouter();

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
