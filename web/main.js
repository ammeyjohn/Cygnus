'use strict';

// Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Vuex);

// iView
import iView from 'iview';
Vue.use(iView);

// Entry
import App from './app/app.vue';
import Main from './main/main.vue';

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'root',
        redirect: '/login'
    }, {
        title: '登录',
        path: '/login',
        name: 'login',
        component: resolve => {
            require(['./login/login.vue'], resolve);
        }
    }, {
        title: 'main',
        path: '/main',
        name: 'main',
        component: Main,
        children: [{
            title: '项目工单',
            path: 'workorder',
            name: 'workorder',
            component: resolve => {
                require(['./views/workorder/workorder.vue'], resolve);
            }
        }, {
            title: '示例',
            path: '/demo',
            name: 'demo',
            component: resolve => {
                require(['./views/demo/demo.vue'], resolve);
            }
        }]
    }]
});

const store = new Vuex.Store({
    state: {
        currentPath: [{
            title: '项目工单',
            path: '/workorder',
            name: 'workorder'
        }],
        pageOpenedList: [{
            title: '项目工单',
            name: 'workorder'
        }]
    }
});

// Axios global config
axios.defaults.baseURL = "http://localhost:8051/cygnus/api";

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});