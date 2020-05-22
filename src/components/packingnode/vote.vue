<template>
    <div>
        <div class="voteTableTitle" v-show="!showcontent">
            <ul>
                <li>{{$t('Txid')}}</li>
                <li>{{$t('timestamp')}}</li>
                <li>{{$t('from')}}</li>
                <li>{{$t('to')}}</li>
                <li>{{$t('Lockmargin')}}</li>
                <li>{{$t('status')}}</li>
            </ul>
        </div>
        <div class="voteTable" style="min-height:560px">
            <div class="lili" v-for="(item,index) in voteData" :key="index">
                <span class="canclick short" @click="toProxyDetail(item.txid)">
                    {{common.middleEllipsis(item.txid)}}
                    1<i>{{item.txid}}</i>
                </span>
                <span>
                    {{common.formatTime(item.timestamp)}}
                </span>
                <span class="canclick short" @click="toAddress(item.from)">
                    {{common.middleEllipsis(item.from)}}
                   2 <i>{{item.from}}</i>
                </span>
                <span style="">- ></span>
                <span class="canclick short" @click="toAddress(item.to)">
                    {{common.middleEllipsis(item.to)}}
                   3 <i>{{item.to}}</i>
                </span>
                <span>
                    {{common.reward(item.value)}} FN
                </span>
                <span>
                    {{$t(item.state)}}
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
    props: ['address'],
    data() {
        return {
            current_page: 1, //current page
            pages: "", //total pages
            changePage: '',//Jump page
            nowIndex: 0,
            search: "",
            pageSize: 10,
            voteData: [
                {   
                    rxid: null,
                    txid: "jyukuikiuoumbncvbstghgagerqwrgergfhnugmbnmbhjujgh",
                    from: "sdhguiumfzweqrytymbnbvjuijmbnmbkDGHDHDFTJHKGHK",
                    to: "fasfasfsfsdfsdfsfsdfee3geryrdfjuigjnfgjhsghfjDRTYTFJFGJ",
                    value: 20000000000000,
                    timestamp: 1588687222,
                    expired: 190080,
                    height: 4441459,
                    expiredHeight: 4631539,
                    state: "processing",
                    content: null,
                    accept: "1"
                },
                {   
                    rxid: null,
                    txid: "jyukuikiuoumbncvbstghgagerqwrgergfhnugmbnmbhjujgh",
                    from: "sdhguiumfzweqrytymbnbvjuijmbnmbk",
                    to: "fasfasfsfsdfsdfsfsdfee3geryrdfjuigjnfgjh",
                    value: 20000000000000,
                    timestamp: 1588687222,
                    expired: 190080,
                    height: 4441459,
                    expiredHeight: 4631539,
                    state: "processing",
                    content: null,
                    accept: "1"
                },
                {   
                    rxid: null,
                    txid: "jyukuikiuoumbncvbstghgagerqwrgergfhnugmbnmbhjujgh",
                    from: "sdhguiumfzweqrytymbnbvjuijmbnmbk",
                    to: "fasfasfsfsdfsdfsfsdfee3geryrdfjuigjnfgjh",
                    value: 20000000000000,
                    timestamp: 1588687222,
                    expired: 190080,
                    height: 4441459,
                    expiredHeight: 4631539,
                    state: "processing",
                    content: null,
                    accept: "1"
                },
                {   
                    rxid: null,
                    txid: "jyukuikiuoumbncvbstghgagerqwrgergfhnugmbnmbhjujgh",
                    from: "sdhguiumfzweqrytymbnbvjuijmbnmbk",
                    to: "fasfasfsfsdfsdfsfsdfee3geryrdfjuigjnfgjh",
                    value: 20000000000000,
                    timestamp: 1588687222,
                    expired: 190080,
                    height: 4441459,
                    expiredHeight: 4631539,
                    state: "processing",
                    content: null,
                    accept: "1"
                },
            ],
            showloading: false,
            content: `There is no data for the current address！`,
            showcontent: false
        }
    },
    created() {
        this.getVoteDetail()
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
        changePage() {
            this.changePage = String(this.changePage).replace(/\D|^0/g, '')
            if (this.changePage > this.pages) {
                this.changePage = this.pages
            }
        }
    },
    methods: {
        toProxyDetail(txid) {
            this.$router.push({ path: '/contarctDetail', query: { txid: txid } })
        },
        toAddress(value) {
            this.$router.push({ path: '/filenet_address_search', query: { search: value } })
        },
        jumpPage(id) {
            if (id) {
                this.current_page = id;
                this.getVoteDetail()
                this.changePage = ''
            }
        },
        prevPage() {
            this.current_page--
            this.getVoteDetail()
        },
        nextPage() {
            this.current_page++
            this.getVoteDetail()
        },
        getVoteDetail() {
            this.showloading = true
                this.showloading = false
                if (this.voteData.length == 0) {
                    this.showcontent = true
                }
        }
    }
}
</script>

<style scoped>
/* .voteTableTitle */

.voteTableTitle {
    height: 50px;
    background-color: #eff5ff;
    padding: 0 30px;
    color: #888;
}

.voteTableTitle li {
    float: left;
    font-weight: 400;
    line-height: 50px;
    width: 180px;
}

.voteTableTitle li:nth-child(3) {
    width: 270px;
}

.voteTableTitle li:nth-child(6) {
    width: 90px;
}

.voteTable {
    padding: 0 30px;
}

.voteTable > .lili span {
    float: left;
    position: relative;
    width: 180px;
}

.voteTable > .lili span:nth-child(4) {
    width: 90px;
}

.voteTable > .lili span:nth-child(7) {
    width: 90px;
}

.voteTable > .lili span i {
    top: 40px;
}
</style>