<template>
    <div>
        <userhead :isIndex='isIndex'></userhead>

        <section class="container-1920" style="padding:20px 15px;">
            <div class="container-1200 searchadd"
                style="height:38px;margin-bottom:10px;line-height:38px;padding-left:5px">
                <div class="desc col-sm-2 hidden2-su-xs" style="font-size:18px;font-weight:700">Address
                    <span v-show="unshift" style="color:red;font-size:14px;font-weight:400">(&nbsp;{{$t('EaterAddress')}}&nbsp;)</span>
                ：</div>
                <div class="desc col-sm-10 cbs" style="word-wrap: break-word;font-weight:400">{{da.blockFrom.address}}</div>
            </div>
            <section class="container-1200" style="background:#fff;">
                <header style="height:42px;line-height:42px;background:rgba(66,160,205,0.15);position: relative;">
                    <span style="font-size: 16px;position: absolute;top:0;left:32px;">{{$t('Summary')}}</span>
                </header>
                <div class="row" style="padding:20px 0;">
                    <ul>
                        <li style="padding-left:15px">
                            <div class="col-sm-2 hidden2-su-xs" style="font-weight:700;">{{$t('balance')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;font-weight:700;">
                                {{common.reward(da.blockFrom.balance)}} Fn&nbsp;&nbsp;<span  v-show="unshift" style="color:red;font-weight:400">({{$t('burned')}})</span>
                            </div>
                        </li>
                        <li style="padding-left:15px">
                            <div class="col-sm-2 hidden2-su-xs">{{$t('approve')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">
                                {{common.reward(da.blockFrom.approvebalance)}} Fn</div>
                        </li>
                        <li style="padding-left:15px">
                            <div class="col-sm-2 hidden2-su-xs">{{$t('ownLock')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{common.reward(da.ownLock)}} Fn
                            </div>
                        </li>
                        <li style="padding-left:15px">
                            <div class="col-sm-2 hidden2-su-xs">{{$t('agentLock')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{common.reward(da.agentLock)}} Fn
                            </div>
                        </li>
                        <li style="padding-left:15px">
                            <div class="col-sm-2 hidden2-su-xs">{{$t('totalLock')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{common.reward(da.totalLock)}} Fn
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </section>
        <section class="container-1920">
            <section class="container-1200">
                <div class="blocktable">
                    <div class="nav">
                        <a href="javaScript:void(0);" @click="toblock('addTransfers',0)"
                            class="totest router-link-active">{{$t('transfers')}}</a>
                        <a href="javaScript:void(0);" @click="toblock('addContribs',1)"
                            class="totest">{{$t('contrib')}}</a>
                        <a href="javaScript:void(0);" @click="toblock('addBlock',2)" class="totest">{{$t('kuai')}}</a>
                        <a href="javaScript:void(0);" @click="toblock('addContarct',3)"
                            class="totest">{{$t('proxys')}}</a>
                        <a href="javaScript:void(0);" @click="toblock('addApproves',4)"
                            class="totest">{{$t('approves')}}</a>

                    </div>
                    <div class="routerviewContainer">
                        <router-view :address="address" :contrib="contrib" :transfer="transfer" :approves="approves"
                            :proxys="proxys" :receipts="receipts" :blocks="blocks" @sendiptVal="sunAddress">
                        </router-view>
                    </div>

                </div>
            </section>
        </section>
        <section class="index-footer container-1920" style="margin-top:50px;">
            <section class="container-1200 text-center white">
                <p>© Copyright&nbsp;&nbsp;&nbsp;2017-2020&nbsp;&nbsp;&nbsp;filenet.io
                </p>
            </section>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            da: {
                blockFrom: {
                    address: 0,
                    balance: 0,
                    approvebalance: 0,
                    proxybalance: 0,
                }
            },
            show: '',
            address: '',
            txid: '',
            showblock: false,
            showapprove: false,
            showReceipts: false,
            showProxys: false,
            showacontrib: false,
            contrib: false,
            transfer: false,
            proxys: false,
            receipts: false,
            blocks: false,
            approves: false,
            addressactive: '',
            isIndex: false,
            routerAdd: ''
        }
    },
    computed: {
        unshift(){
            if(this.da.blockFrom.address === '3Psbq3enwAmwXGa2QejWFdd9AwV1rczE6w1GPzs6WTPmJpKbmWghsLB'){
                return true
            }
        }
    },
    methods: {
        getAddress() {
           
        },
        toAddress(value) {
            var length = document.getElementsByClassName('totest').length
            this.$router.push({ path: '/filenet_address_search', query: { search: value } })
            for (var i = 0; i < length; i++) {
                if (i == 0) {
                    localStorage.setItem('addressactive', 0)
                    document.getElementsByClassName('totest')[0].classList.add('router-link-active')
                    window.location.reload()
                } else {
                    document.getElementsByClassName('totest')[i].classList.remove('router-link-active')
                }
            }
        },
        toblock(str, id) {
            localStorage.setItem('addressactive', id)
            this.$router.push({ path: str, query: { search: this.address } })
            var length = document.getElementsByClassName('totest').length
            for (var i = 0; i < length; i++) {
                if (id == i) {
                    document.getElementsByClassName('totest')[id].classList.add('router-link-active')
                } else {
                    document.getElementsByClassName('totest')[i].classList.remove('router-link-active')
                }
            }
        },
        sunAddress(childValue) {
            this.showblock = childValue.block
            this.showapprove = childValue.approve
            this.showReceipts = childValue.receipt
            this.showProxys = childValue.proxy
            this.showacontrib = childValue.block

        },
        showmore() {
            if (!document.getElementsByClassName('addh')[0]) {
                document.getElementsByClassName('seemore')[0].classList.add('addh')
                document.getElementsByClassName('seemore')[0].classList.remove('removeh')
            } else {
                document.getElementsByClassName('seemore')[0].classList.add('removeh')
                document.getElementsByClassName('seemore')[0].classList.remove('addh')
            }
        },
        showcinof() {
            
        },
        getAddContribs() { 
            
        },
        getAddTransfers() { 
            
        },
        getAddApproves() { 
           
        },
        getProxysfers() {
            
        },
        getReceipts() {
            
        },
        getAddBlock() {
            
        }
    },
    created() {
        this.txid = this.$route.query.search
        this.routerAdd = this.$route.query.search
        this.address = this.txid
        this.getAddress();
        this.getAddTransfers()
        this.getAddContribs()
        this.getAddApproves()
        this.getProxysfers()
        this.getReceipts()
        this.getAddBlock()
    },
    mounted() {
        this.toblock('addTransfers', 0)
        this.addressactive = localStorage.getItem('addressactive')
    },
    watch: {
        '$route': function (to, from) {
            this.routerAdd = to.query.search
        },
    }
}
</script>
<style scoped>
.nav {
    border-bottom: 1px solid #edf0ff;
}
.routerviewContainer {
    padding: 20px 30px;
    background: #fff;
}
@media (min-width: 768px){
 .desc.col-sm-2 {
    width: 17.4% ; 
}
}
@media (min-width: 768px){
 .desc.col-sm-10 {
    width: 82.6% ;
}
}
</style>
