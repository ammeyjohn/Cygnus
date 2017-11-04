'use strict';

// Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import axios from 'axios';

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// jQuery
import 'jquery/dist/jquery.min.js';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

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
        title: '工单',
        path: '/assist',
        name: 'assist',
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
            title: '产品下载',
            path: '/download',
            name: 'prod_download'
        }],
        pageOpenedList: [{
            title: '首页',
            name: 'home_index'
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