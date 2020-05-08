import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import axios from 'axios'

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios


const filenet_search = () =>
    import ( /* webpackChunkName: "filenet_packagingnode_info" */ '../components/filenet_search.vue');

const packagingNodeTable = () =>
    import ( /* webpackChunkName: "packagingNodeTable" */ '../components/index/packingNodeTable.vue');

const newBlockTable = () =>
    import ( /* webpackChunkName: "newBlockTable" */ '../components/index/newBlockTable.vue');

const transferTable = () =>
    import ( /* webpackChunkName: "transferTable" */ '../components/index/transferTable.vue');



const filenet_packagingnode_info = () =>
    import ( /* webpackChunkName: "filenet_packagingnode_info" */ '../components/filenet_packingnode_info.vue');

const vote = () =>
    import ( /* webpackChunkName: "vote" */ '../components/packingnode/vote.vue');

const router = new VueRouter({
    mode: 'hash',
    routes: [{
            path: '/',
            name: 'filenet_search',
            component: filenet_search,
            children: [
                { path: '', redirect: 'packagingNodeTable' },
                {
                    path: 'packagingNodeTable',
                    name: 'packagingNodeTable',
                    component: packagingNodeTable,
                    meta: {
                        title: 'Search',
                    }
                },
                {
                    path: 'newBlockTable',
                    name: 'newBlockTable',
                    component: newBlockTable,
                    meta: {
                        title: 'Search',
                    }
                },
                {
                    path: 'transferTable',
                    name: 'transferTable',
                    component: transferTable,
                    meta: {
                        title: 'Search',
                    }
                }
            ]
        },
        {
            path: '/filenet_packagingnode_info',
            name: 'filenet_packagingnode_info',
            component: filenet_packagingnode_info,
            children: [
                { path: '', redirect: 'vote' },
                {
                    path: 'vote',
                    component: vote,
                    meta: {
                        title: 'Wallet Address'
                    }
                },
            ]
        }
    ]
})


export default router