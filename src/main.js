import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'root',
        redirect: '/index'
    }, {
        path: '/index',
        name: 'index',
        component: resolve => {
            require(['./index/index.vue'], resolve);
        },
    }]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});