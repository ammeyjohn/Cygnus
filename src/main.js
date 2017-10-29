// Vue
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

// iView
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

// Entry
import App from './app/app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

const router = new VueRouter({
    routes: [{
        path: '/',
        name: 'root'
    }, 
    // {
    //     title: '产品下载',
    //     path: '/production/download',
    //     name: 'prod_download',
    //     component: resolve => {
    //         require(['./production/download/download.vue'], resolve);
    //     }
    // }
]
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
        }, {
            title: '首页sss',
            name: 'home_indessssssx'
        }]
    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});