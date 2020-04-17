<template>
    <div class="packingnodetable">
        <section class="container-1200">
            <div class="allpacking" style="min-height:900px;">
                <div class="allpackingTitle">
                    <ul>
                        <li>{{$t('rank')}}</li>
                        <li>{{$t('packingNodeName')}}</li>
                        <li>{{$t('status')}}</li>
                        <li>{{$t('countryRegion')}}</li>
                        <li>{{$t('walletAddress')}}</li>
                        <li class="ticketCount">
                            {{$t('SameMonthVotes')}} 
                            <img v-show="sortType === 0" @click="changeSort(2)" src="@/assets/images/default.png"
                                alt="">
                            <img v-show="sortType === 2" @click="changeSort(1)" src="@/assets/images/desc.png" alt="">
                            <img v-show="sortType === 1" @click="changeSort(2)" src="@/assets/images/asc.png" alt="">
                        </li>
                        <li>{{$t('GTMProportion')}}</li>
                         <li class="ticketCount">
                            {{$t('lastMonthVotes')}} 
                            <img v-show="nextSortType === 0"  @click="nextChangeSort(4)" src="@/assets/images/default.png"
                                alt="">
                            <img v-show="nextSortType === 4"  @click="nextChangeSort(3)" src="@/assets/images/desc.png" >
                            <img v-show="nextSortType === 3"  @click="nextChangeSort(4)" src="@/assets/images/asc.png" >
                        </li>
                        <li>{{$t('dailyBlock')}}</li>
                        <li>{{$t('operation')}}</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lang: '',
            sortType: 0,
            nextSortType: 0
       }
    },
    watch: {
        '$i18n.locale': function (newval, oldval) {
            this.lang = newval
        },
    },
    computed: {
    },
    methods: {	
        changeSort (val) {
            this.sortType = val
        },
        nextChangeSort (val) {
            this.nextSortType = val
        }
    },
    created() {
        this.lang = localStorage.getItem('language')
    },
}
</script>

<style scoped>
span.state {
    padding: 20px 0;
}
.allpackingTable-canclick-title{
    float: left;
    width: 70px;
    font-weight: 500;
    font-style:normal;    
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.allpackingTable-canclick-title:hover{
    text-decoration: underline;
}
.allpackingTable-canclick-title i{
    left: 17px;
}
span.state>i i{
    display: block;
    /* width: 71px; */
    height: 26px;
    border: 1px solid #1319ad;
    border-radius: 4px;
    line-height: 26px;
    text-align: left;
    font-style: normal;
    color: #1319ad;
    padding-left: 10px;
    padding-right: 10px;
    float: left;
}
span.state>i>.backup {
    /* border-color: #db2f2c; */
    border-color: #3d3d3d;
    color: #3d3d3d;
    /* text-align: left; */
    /* width: 50px; */
}
span.state>i div {
    height: 26px;
    line-height: 26px;
    padding-right: 10px;
    float: left;
}

.ticketCount img {
    width: 8px;
    height: 11px;
    cursor: pointer;
}
/* 悬停时打包节点背景变成蓝色 */
.superNode .lili:hover{
    background: #EFF5FF;
}

 .search-input{
    width: 318px;
    height: 33px;
    display: flex;
    align-items: center;  
    position: absolute;
    right:0;
    top:-100px;
}
.search-input> input{
    width:296px;
    height:33px;
    padding-left:35px;
    padding-right:50px;
    background:rgba(245,249,253,1);
    border-radius:4px; 
    border:0;
    box-sizing: border-box;
    outline: none;
}
.search-input .search-input-border{
    margin-right: 26px;
    width: 2px;
    height: 26px;
    background:rgba(225,225,225,1);
}
.search-input .search-input-delete{
    width: 33px;
    height: 33px;
    line-height: 33px;
    position: absolute;
    right: 0px;
}
.search-input .search-input-delete>img{
    width:8px;
    height:8px;  
}
.search-input .icon-sousuo-copy{
    color:#999;
    width: 14px;
    height: 14px;
    position: absolute;
    top: 7px;
    left: 38px;
} 
</style>