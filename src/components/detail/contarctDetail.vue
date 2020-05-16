<template>
    <div>
        <userhead :isIndex='isIndex'></userhead>
        <section class="container-1920">
            <section class="container-1200" style="padding: 0 20px;">
                <div style="padding:15px 0;">
                    <h1 style="color: #333;font-size: 18px;padding-top: 4px;padding-bottom: 4px; font-weight:bold">
                        {{$t('ProxysDetail')}}
                    </h1>
                </div>
            </section>
        </section>

        <section class="container-1920">
            <section class="container-1200" style="padding: 0 20px;background:#C7DFEB;line-height:42px">
                <div>
                    {{$t('ProxyHash')}}:&nbsp;&nbsp;&nbsp;&nbsp;{{da.txid}}
                </div>
            </section>
        </section>

        <section class="container-1920" style="padding:20px 15px;">
            <section class="container-1200" style="background:#fff;">
                <header style="height:42px;line-height:42px;background:rgba(66,160,205,0.15);padding-left:30px">
                    {{$t('Summary')}}</header>
                <div class="row" style="padding:20px 0;">
                    <ul>
                        <li style="padding-left:15px;overflow:hidden">
                            <div class="col-sm-2 cbs hidden2-su-xs">{{$t('timestamp')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">
                                {{common.formatTime(da.timestamp)}}</div>
                        </li>

                        <li style="padding-left:15px;overflow:hidden">
                            <div class="col-sm-2 cbs hidden2-su-xs">{{$t('ProxyValue')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{common.reward(da.value)}} FN
                            </div>
                        </li>
                        <li style="padding-left:15px;overflow:hidden">
                            <div class="col-sm-2 cbs hidden2-su-xs">{{$t('blockheight')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">
                                <a href="javascript:void(0);" @click="toBlock(da.height)">{{da.height}}</a>
                            </div>
                        </li>

                        <li style="padding-left:15px;overflow:hidden">
                            <div class="col-sm-2 cbs hidden2-su-xs">{{$t('heyuequkuaishu')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{da.expired}}</div>
                        </li>

                        <li style="padding-left:15px;overflow:hidden">
                            <div class="col-sm-2 cbs hidden2-su-xs">{{$t('ExpiredHeight')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{da.expiredHeight}}</div>
                        </li>

                        <li style="padding-left:15px;overflow:hidden">
                            <div class="col-sm-2 cbs hidden2-su-xs">{{$t('state')}}:</div>
                            <div class="col-sm-10 cbs" style="word-wrap: break-word;">{{da.state}}</div>
                        </li>

                    </ul>
                </div>
            </section>
        </section>

        <section class="container-1920" style="padding:20px 15px;">
            <section class="container-1200" style="background:#fff;">
                <header style="height:42px;line-height:42px;background:rgba(66,160,205,0.15);padding-left:30px">
                    {{$t('Detail')}}</header>
                <div v-for="(item,index) in contractData" :key="index" class="paddingContainer">
                    <div class="cssBorderContanier">
                        <div class="addhash">
                            <span class='canclick' @click="$router.go(0)">{{item.txid}}</span>
                            <span>{{common.formatTime(item.timestamp)}}</span>
                        </div>
                        <div class="addtable">
                            <div>
                                <span class='canclick' @click="toAddress(item.from)">
                                    {{item.from}}
                                </span>
                                <span class="imgrow"><img src="../../assets/images/blue.png" alt=""
                                        style="width:18px;"></span>
                            </div>
                            <div class="addtableright">
                                <div>
                                    <div v-for="(item,index) in item.transferDetails" :key="index">
                                        <span class='canclick' @click="toAddress(item.to)">{{item.to}}</span>
                                        <span>{{common.reward(item.value)}} FN</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span class='canclick' @click="toAddress(item.to)">{{item.to}}</span>
                                        <span>{{common.reward(item.value)}} FN</span>
                                    </div>
                                </div>
                                <div>
                                    <span style="margin-right:0" class="proxystate">{{item.state}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="showcontent" style="text-align:center;font-size:24px;line-height: 200px;">
                    {{content}}
                </div>
            </section>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            da: [
                {
                    rxid: null,
                    txid: "56a07df4db34ee5f4d6cc66ee7fab75442301f5b2b4f8d2c48f7d62258a50152",
                    from: "5qeYvp94rYUjC9LJQdAmMN2aAgdzgrPsU4vMaisVKf5vjzf5U2SVq65",
                    to: "5t2xsjPydrsasLhPSQ6izKyKsakpVpXE76CucZdEE2fgaeierkrkdWk",
                    value: 44000000000000,
                    timestamp: 1589335015,
                    expired: 267840,
                    height: 4506005,
                    expiredHeight: 4773845,
                    state: "prepared",
                    content: null,
                    accept: "2",
                },
                {
                    rxid: null,
                    txid: "56a07df4db34ee5f4d6cc66ee7fab75442301f5b2b4f8d2c48f7d62258a50152",
                    from: "5qeYvp94rYUjC9LJQdAmMN2aAgdzgrPsU4vMaisVKf5vjzf5U2SVq65",
                    to: "5t2xsjPydrsasLhPSQ6izKyKsakpVpXE76CucZdEE2fgaeierkrkdWk",
                    value: 44000000000000,
                    timestamp: 1589335015,
                    expired: 267840,
                    height: 4506005,
                    expiredHeight: 4773845,
                    state: "prepared",
                    content: null,
                    accept: "2",
                },
                {
                    rxid: null,
                    txid: "56a07df4db34ee5f4d6cc66ee7fab75442301f5b2b4f8d2c48f7d62258a50152",
                    from: "5qeYvp94rYUjC9LJQdAmMN2aAgdzgrPsU4vMaisVKf5vjzf5U2SVq65",
                    to: "5t2xsjPydrsasLhPSQ6izKyKsakpVpXE76CucZdEE2fgaeierkrkdWk",
                    value: 44000000000000,
                    timestamp: 1589335015,
                    expired: 267840,
                    height: 4506005,
                    expiredHeight: 4773845,
                    state: "prepared",
                    content: null,
                    accept: "2",
                },
            ],
            isNothing: false,
            search: "",
            txid: '',
            from: '',
            // showrxid:false,
            isIndex: true,
            contractData: [],
            current_page: 1, //current page
            pages: "", //total pages
            changePage: '',//Jump page
            nowIndex: 0,
            search: "",
            pageSize: 10,
            showloading: true,
            content: `There is no transaction data for the current block height！`,
            showcontent: false
        }
    },
    created() {
        this.txid = this.$route.query.txid
        this.from = this.$route.query.from
        this.getDetail()
    },
    watch: {
        changePage() {
            this.changePage = String(this.changePage).replace(/\D|^0/g, '')
            if (this.changePage > this.pages) {
                this.changePage = this.pages
            }
        }
    },
    methods: {
        toBlockInfo(value) {

        },
        toAddress(value) {
            this.$router.push({ path: '/filenet_address_search', query: { search: value } })
        },
        toBlock(value) {
            this.$router.push({ path: '/filenet_block_info', query: { search: value } })
        },
        toreceiptsdetail(value) {
            this.$router.push({ path: '/receiptsDetail', query: { txid: value } })
        }
    }
}
</script>
<style scoped>
.paddingContainer {
    padding: 20px 30px;
    background: #fff;
    box-sizing: border-box;
}
.addtable {
    position: relative;
}
.imgrow {
    position: absolute;
    top: 26%;
    left: 44%;
    transform: translate(-50%, -50%);
}
</style>