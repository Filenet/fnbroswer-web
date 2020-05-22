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

const statistics = () =>
    import ( /* webpackChunkName: "statistics" */ '../components/packingnode/statistics.vue');




const filenet_address_search = () =>
    import ( /* webpackChunkName: "filenet_address_search" */ '../components/filenet_address_search.vue');

const addTransfers = () =>
    import ( /* webpackChunkName: "addTransfers" */ '../components/address/addTransfers.vue');

const addContribs = () =>
    import ( /* webpackChunkName: "addContribs" */ '../components/address/addContribs.vue');

const addBlock = () =>
    import ( /* webpackChunkName: "addBlock" */ '../components/address/addBlock.vue');


//detail
const contarctDetail = () =>
    import ( /* webpackChunkName: "contarctDetail" */ '../components/detail/contarctDetail.vue');

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
                {
                    path: 'addBlock',
                    component: addBlock,
                    meta: {
                        title: 'Wallet Address'
                    }
                },
                {
                    path: 'statistics',
                    component: statistics,
                    meta: {
                        title: 'Wallet Address'
                    }
                },
            ]
        },
        {
            path: '/filenet_address_search',
            name: 'filenet_address_search',
            component: filenet_address_search,
            children: [
                { path: '', redirect: 'addTransfers' },
                {
                    path: 'addTransfers',
                    component: addTransfers,
                    meta: {
                        title: 'Wallet Address'
                    }
                },
                {
                    path: 'addContribs',
                    component: addContribs,
                    meta: {
                        title: 'Wallet Address'
                    }
                },
                {
                    path: 'addBlock',
                    component: addBlock,
                    meta: {
                        title: 'Wallet Address'
                    }
                },
            ]
        },
        {
            path: '/contarctDetail',
            name: 'contarctDetail',
            component: contarctDetail,
            meta: {
                title: 'Detail'
            }
        },
    ]
})


export default router