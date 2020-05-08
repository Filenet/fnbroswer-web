<template>
    <div>
        <div class="statisticsTableTitle" v-show="!showcontent">
            <ul>
                <li>{{$t('statisticsTime')}}</li>
                <li>{{$t('height')}}</li>
                <li>{{$t('votes')}}</li>
                <li>{{$t('totalVotes')}}</li>
                <li>{{$t('percentage')}}</li>
            </ul>
        </div>
        <div class="statisticsTable" style="min-height:560px">
            <div class="lili" v-for="(item,index) in statisticsData" :key="index">
                <span>
                    {{item.date}}
                </span>
                <span class="canclick" @click="toBlockInfo(item.height)">
                    {{item.height}}
                </span>
                <span>
                    {{common.reward(item.total)}} FN
                </span>
                <span>
                    {{common.reward(item.totalCount)}} FN
                </span>
                <span>
                    {{item.accounted}}
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
            statisticsData: [
                {
                    id: 1245143843486040000,
                    address: "3hiVLJCHsW7WAgakKyhXPtTKR8LnrXwN2SXZRUgqk9PQqBcARwnVSKk",
                    date: "2020-05-01 00:00:00",
                    voteNumber: null,
                    height: 3900774,
                    ownLock: null,
                    agentLock: null,
                    totalLock: null,
                    accounted: "0.051750753884585846",
                    total: 400838000000000,
                    totalCount: 7745549000000000,
                },
                {
                    id: 1245143843486040000,
                    address: "3hiVLJCHsW7WAgakKyhXPtTKR8LnrXwN2SXZRUgqk9PQqBcARwnVSKk",
                    date: "2020-05-01 00:00:00",
                    voteNumber: null,
                    height: 3900774,
                    ownLock: null,
                    agentLock: null,
                    totalLock: null,
                    accounted: "0.051750753884585846",
                    total: 400838000000000,
                    totalCount: 7745549000000000,
                },
                {
                    id: 1245143843486040000,
                    address: "3hiVLJCHsW7WAgakKyhXPtTKR8LnrXwN2SXZRUgqk9PQqBcARwnVSKk",
                    date: "2020-05-01 00:00:00",
                    voteNumber: null,
                    height: 3900774,
                    ownLock: null,
                    agentLock: null,
                    totalLock: null,
                    accounted: "0.051750753884585846",
                    total: 400838000000000,
                    totalCount: 7745549000000000,
                },
                {
                    id: 1245143843486040000,
                    address: "3hiVLJCHsW7WAgakKyhXPtTKR8LnrXwN2SXZRUgqk9PQqBcARwnVSKk",
                    date: "2020-04-01 00:00:00",
                    voteNumber: null,
                    height: 3900774,
                    ownLock: null,
                    agentLock: null,
                    totalLock: null,
                    accounted: "0.051750753884585846",
                    total: 400838000000000,
                    totalCount: 7745549000000000,
                },
            ],
            showloading: false,
            content: `There is no data for the current address！`,
            showcontent: false
        }
    },
    created() {
        this.getStatistics()
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
        jumpPage(id) {
            if (id) {
                this.current_page = id;
                this.getStatistics()
                this.changePage = ''
            }
        },
        prevPage() {
            this.current_page--
            this.getStatistics()
        },
        nextPage() {
            this.current_page++
            this.getStatistics()
        },
        getStatistics() {
                this.showloading = false
                for (let i = 0; i < this.statisticsData.length; i++) {
                    this.statisticsData[i].accounted = Number(this.statisticsData[i].accounted * 100).toFixed(4) + '%'
                }
                if (this.statisticsData.length == 0) {
                    this.showcontent = true
                }
        },
        toBlockInfo(value) {
            this.$router.push({ path: '/filenet_block_info', query: { search: value } })
        },
    }
}
</script>

<style scoped>
/* .statisticsTableTitle */

.statisticsTableTitle {
    height: 50px;
    background-color: #eff5ff;
    padding: 0 30px;
    color: #888;
}

.statisticsTableTitle li {
    float: left;
    font-weight: 400;
    line-height: 50px;
    width: 250px;
}

.statisticsTableTitle li:nth-child(5) {
    width: 80px;
}

.statisticsTable {
    padding: 0 30px;
}

.statisticsTable > .lili span {
    float: left;
    position: relative;
    width: 250px;
}

.statisticsTable > .lili span:nth-child(5) {
    width: 80px;
}
</style>