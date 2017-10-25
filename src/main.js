import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './app.vue';

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
    routes: [{
        path: '/index',
        name: 'index',
        meta: {
            title: '首页'
        },
        component: resolve => { require(['./index/sidebarMenu.vue'], resolve); }
    }]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});