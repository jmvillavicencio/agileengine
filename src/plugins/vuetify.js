import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        lowseason: '#64B5F6',
        midseason: '#FFD54F',
        highseason: '#E57373',
      },
    },
  },
});
