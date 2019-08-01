import Vue from 'vue';
import App from './index.vue';

Vue.config.devtools = true;

new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
});
