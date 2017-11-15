'use strict';

// Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// Entry
import App from './app/app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'root',
        redirect: '/demo'
    }, {
        title: '项目工单',
        path: '/workorder',
        name: 'workorder',
        component: resolve => {
            require(['./workorder/workorder.vue'], resolve);
        }
    }, {
        title: '示例',
        path: '/demo',
        name: 'demo',
        component: resolve => {
            require(['./demo/demo.vue'], resolve);
        }
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