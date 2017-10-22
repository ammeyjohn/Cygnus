import Vue from 'vue';

var vm = new Vue({
    el: '#app',
    data: {
        a: 1,
        message: 'Hello Vue!',
        todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '整个牛项目' }
        ]
    },
    created: function () {
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)
    }
})