import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './app/app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'root'
    }] 
});

const store = new Vuex.Store({
    state: {
        currentPath: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        pageOpenedList: [{
            title: '首页',
            name: 'home_index'
        }]
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});