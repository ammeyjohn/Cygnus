import Vue from 'vue';
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './app.vue';

// Vue.use(iView);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
});