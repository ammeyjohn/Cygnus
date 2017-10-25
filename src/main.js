import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
});