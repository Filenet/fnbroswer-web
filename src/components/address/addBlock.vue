<template>
    <div>
        <div class="addblocktitle" v-show="!showcontent">
            <ul>
                <li>{{$t('kuaiheight')}}</li>
                <li>{{$t('timestamp')}}</li>
                <li>{{$t('transactions')}}</li>
                <li>{{$t('blockhash')}}</li>
                <li>{{$t('parentHash')}}</li>
                <li>{{$t('reward')}}</li>
            </ul>
        </div>
        <div class="addblocktable" style="min-height:560px">
            <div class="lili" v-for="(item,index) in blockData" :key="index">
                <span class="canclick" @click="toBlockInfo(item.height)">
                    {{item.height}}
                </span>
                <span>
                    {{common.formatTime(item.timestamp)}}
                </span>
                <span>
                    {{item.transfercount}}
                </span>
                <span class="canclick short" @click="toBlockInfo(item.height)">
                    {{common.middleEllipsis(item.hash)}}
                    <i>{{item.hash}}</i>
                </span>
                <span class="canclick short" @click="toBlockInfo(item.height-1)">
                    {{common.middleEllipsis(item.prevhash)}}
                    <i>{{item.prevhash}}</i>
                </span>
                <span>
                    {{common.reward(item.reward)}} FN
                </span>
            </div>
            <div v-show="showcontent" style="text-align:center;font-size:24px;line-height: 200px;">
                {{content}}
            </div>
            <div class="page" v-show="show">
                <div class="pageList">
                    <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
                    <span class="ellipsis" v-show="eFont">...</span>
                    <span class="jump" v-for="(num,index) in indexS" :key="index" :class="{bgPrimary:current_page==num}"
                        @click="jumpPage(num)">{{num}}</span>
                    <span class="ellipsis" v-show="eBehind">...</span>
                    <span :class="{disabled:pend}" class="jump" @click="nextPage">&gt;</span>
                    <span v-show="current_page<pages-4" class="jump" @click="jumpPage(pages)">&gt;&gt;</span>
                    <span class="jumpPoint">Turn To:</span>
                    <span class="jumpInput"><input type="text" @keyup.enter="jumpPage(changePage)"
                            v-model="changePage"></span>
                    <span class="jump goBtn" @click="jumpPage(changePage)">GO</span>
                </div>
            </div>
        </div>
        <div style="height:0;position: relative;z-index:100;" v-show="showloading">
            <i class="iconfont icon-loading xuanzhuan"
                style="color:#cdcdcd;font-size:100px;position: absolute;top:-400px;left:50%;"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: ['address', 'blocks'],
    data() {
        return {
            current_page: 1, //current page
            pages: "", //total pages
            changePage: '',//Jump page
            nowIndex: 0,
            search: "",
            pageSize: 20,
            blockData: [
                {
                    height: 4463690,
                    total: 224783200000000000,
                    reward: 25000000000,
                    timestamp: 1588911928,
                    transfercount: 0,
                    approvecount: 0,
                    proxycount: 0,
                    rxcount: 0,
                    txroot: "0000000000000000000000000000000000000000000000000000000000000000",
                    rxroot: "0000000000000000000000000000000000000000000000000000000000000000",
                    cxhash: "0000000000000000000000000000000000000000000000000000000000000000",
                    miner: "3hiVLJCHsW7WAgakKyhXPtTKRghjghjXwN2SXZRUgqk9PQqBcARwnVSKk",
                    extra: "0000000000000000000000000000000000000000000000000000000000000000",
                    prevhash: "e63dc53268a6fd7d3074ghjghj8502485270ac372450d1a5150d56d75fd9807211c",
                    hash: "03facac02016c94610d8270qerfasf4ff853854841a6daed86a1717c15e9e81e5d42",
                },
                {
                    height: 4463690,
                    total: 224783200000000000,
                    reward: 25000000000,
                    timestamp: 1588911928,
                    transfercount: 0,
                    approvecount: 0,
                    proxycount: 0,
                    rxcount: 0,
                    txroot: "0000000000000000000000000000000000000000000000000000000000000000",
                    rxroot: "0000000000000000000000000000000000000000000000000000000000000000",
                    cxhash: "0000000000000000000000000000000000000000000000000000000000000000",
                    miner: "3hiVLJCHsW7WAgakKyhXPtTKR8LnrXdfsfsdSXZRUgqk9PQqBcARwnVSKk",
                    extra: "0000000000000000000000000000000000000000000000000000000000000000",
                    prevhash: "e63dc53268a6fd7d307481e8502485270ac37sfsf0d1a5150d56d75fd9807211c",
                    hash: "03facac02016c94610d8270ac34ffsdfsf4841a6daed86a1717c15e9e81e5d42",
                },
            ],
            showloading: false,
            content: `There is no transaction data for the current block height！`,
            showcontent: false
        }
    },
    created() {
        if (this.blocks) {
            var block_data = JSON.parse(localStorage.getItem('blocks'))
            this.showloading = false
            this.pages = block_data.pageTotalsize
            this.blockData = block_data.list
            if (this.blockData.length == 0) {
                this.showcontent = false
            }
        }
        this.getAddBlock()
    },
    computed: {
        show: function () {
            return this.pages && this.pages != 1;
        },
        pStart: function () {
            return this.current_page == 1;
        },
        pend: function () {
            return this.current_page == this.pages;
        },
        eFont: function () {
            if (this.pages <= 7) return false;
            return this.current_page > 5
        },
        eBehind: function () {
            if (this.pages <= 7) return false;
            var nowAy = this.indexS;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexS: function () {
            var left = 1,
                right = this.pages,
                ar = [];
            if (this.pages >= 7) {
                if (this.current_page > 5 && this.current_page < this.pages - 4) {
                    left = Number(this.current_page) - 3;
                    right = Number(this.current_page) + 3;
                } else {
                    if (this.current_page <= 5) {
                        left = 1;
                        right = 7;
                    } else {
                        right = this.pages;
                        left = this.pages - 6;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        }
    },
    watch: {
        blocks: {
            handler(newValue, oldValue) {
                var block_data = JSON.parse(localStorage.getItem('blocks'))
                this.showloading = false
                this.pages = block_data.pageTotalsize
                this.blockData = block_data.list
                if (this.blockData.length == 0) {
                    this.showcontent = true
                }
            }
        },
        changePage() {
            this.changePage = String(this.changePage).replace(/\D|^0/g, '')
            if (this.changePage > this.pages) {
                this.changePage = this.pages
            }
        }

    },
    methods: {
        jumpPage(id) {
            if (id) {
                this.current_page = id;
                this.getAddBlock()
                this.changePage = ''
            }
        },
        prevPage() {
            this.current_page--
            this.getAddBlock()
        },
        nextPage() {
            this.current_page++
            this.getAddBlock()
        },
        getAddBlock() {
                this.showloading = false
                if (this.blockData.length == 0) {
                    this.showcontent = false
                }
        },
        toBlockInfo(value) {
            this.$router.push({ path: '/filenet_block_info', query: { search: value } })
        },
    }
}
</script>
