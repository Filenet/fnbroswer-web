import Vue from 'vue'
import { Table, TableColumn } from 'element-ui'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/css/bootstrap.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/filenet_new.css'
import './assets/iconfont/iconfont.css'
import common from './commonFunction/common'
import router from './router/index'
import store from './store/index'
import VueI18n from "vue-i18n";
import userhead from './components/common/head.vue'

import VueWechatTitle from 'vue-wechat-title'


Vue.use(VueWechatTitle)
Vue.use(VueI18n);
Vue.component('userhead', userhead)

Vue.use(Table)
Vue.use(TableColumn)

const i18n = new VueI18n({
    locale: 'en',
    messages: {
        'zh': require('./assets/language/zh'),
        'en': require('./assets/language/en')
    }
})

Vue.prototype.common = common


new Vue({
    i18n,
    store,
    render: h => h(App),
    router
}).$mount('#app')