import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import axios from 'axios'

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios


const filenet_search = () =>
    import ( /* webpackChunkName: "filenet_packagingnode_info" */ '../components/filenet_search.vue');
const router = new VueRouter({
    mode: 'hash',
    routes: [{
        path: '/',
        name: 'filenet_search',
        component: filenet_search,
    }, ]
})


export default router