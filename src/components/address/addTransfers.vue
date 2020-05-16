<template>
    <div>
        <div class="cssBorderContanier" v-for="(item,index) in addTransData" :key="index">
            <div class="addhash">
                <span class="canclick" @click="toTransDetail(item.txid,item.from)">{{item.txid}}</span>
                <i>{{common.formatTime(item.timestamp)}}</i>
            </div>
            <div class="addtable">
                <div>
                    <span class='canclick' @click="toAddress(item.from)">
                        {{item.from}}
                    </span>
                    <span class="imgrow">
                        <img src="../../assets/images/red.png" alt="" style="width:18px;" v-show="item.from==address">
                        <img src="../../assets/images/green.png" alt="" style="width:18px;" v-show="item.from!=address">
                    </span>
                </div>
                <div class="addtableright">
                    <div>
                        <div v-for="(item,index) in item.transferDetails" :key="index">
                            <span class='canclick'  @click="toAddress(item.to)">{{item.to}}</span>
                            <span>{{common.getnum(common.reward(item.value))}} FN</span>
                        </div>
                    </div>
                    <div>
                        <span :class="item.from==address?'to':'from'">
                            <span v-show="item.from==address">-</span>
                            {{common.getnum(common.reward(item.from==address?item.value:item.transferDetails[0].value))}} FN
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="showcontent" style="text-align:center;font-size:24px;line-height: 200px;">
                {{content}}
        </div>
        <div class="page" v-show="show">
            <div class="pageList">
                <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
                <span class="ellipsis"  v-show="eFont">...</span>
                <span class="jump" v-for="(num,index) in indexS" :key="index" :class="{bgPrimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
                <span class="ellipsis"  v-show="eBehind">...</span>
                <span :class="{disabled:pend}" class="jump" @click="nextPage">&gt;</span>
                <span v-show="current_page<pages-4" class="jump" @click="jumpPage(pages)">&gt;&gt;</span>
                <span class="jumpPoint">Turn To:</span>
               <span class="jumpInput"><input type="text" @keyup.enter="jumpPage(changePage)" v-model="changePage"></span>
                <span class="jump goBtn" @click="jumpPage(changePage)">GO</span>
            </div>
        </div>
        <div style="height:0;position: relative;z-index:100;" v-show="showloading">
            <i class="iconfont icon-loading xuanzhuan" style="color:#cdcdcd;font-size:100px;position: absolute;top:200px;left:50%;"></i>
        </div>
    </div>
</template>
<script>
import { log } from 'util';
export default {
    props:['address','transfer'],
    data(){
        return{
            current_page: 1, //current page
            pages: "", //total pages
            changePage:'',//Jump page
            nowIndex:0,
            search:"",
            pageSize:10,
            addTransData:[],
            showloading:true,
            content: `Current address has no transaction data！`,
            showcontent:false
        }
    },
    created(){
        if(this.transfer){
            var transfer_data = JSON.parse(localStorage.getItem('transfer'))
            this.showloading = false
            this.pages = transfer_data.pageTotalsize
            this.addTransData = transfer_data.list
            if(!this.addTransData.length){
                this.showcontent = true
            }
        }
    },
    watch:{
        address:{
            handler(newValue,oldValue){
            }
        },
        transfer:{
            handler(newValue,oldValue){
                var transfer_data = JSON.parse(localStorage.getItem('transfer'))
                this.showloading = false
                this.pages = transfer_data.pageTotalsize
                this.addTransData = transfer_data.list
                if(!this.addTransData.length){
                    this.showcontent = true
                }
            }
        },
        changePage(){
            this.changePage=String(this.changePage).replace(/\D|^0/g,'')
            if(this.changePage>this.pages){
                this.changePage = this.pages
            }
        }
    },
    computed:{
        show:function(){
            return this.pages && this.pages !=1;
        },
        pStart: function() {
            return this.current_page == 1;
        },
        pend: function() {
            return this.current_page == this.pages;
        },
        eFont: function() {
            if (this.pages <= 7) return false;
            return this.current_page > 5
        },
        eBehind: function() {
            if (this.pages <= 7) return false;
            var nowAy = this.indexS;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexS: function() {
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
    methods:{
        jumpPage(id){
            if(id){
                this.pages = 0
                this.showloading = true
                this.addTransData = []
                this.current_page = id;
                this.getAddTransfers()
                this.changePage = ''
            }
        },
        prevPage(){
            this.pages = 0
            this.current_page--
            this.showloading = true
            this.addTransData = []
            this.getAddTransfers()
        },
        nextPage(){
            this.pages = 0
            this.showloading = true
            this.addTransData = []
            this.current_page++
            this.getAddTransfers()
        },
        getAddTransfers(){
           
        },
        toTransDetail(txid,from){
            this.$router.push({path: '/transferDetail', query: {txid: txid}})
        },
        toBlockInfo(value){
            this.$router.push({path: '/filenet_block_info', query: {search: value}})
        },
        toAddress (value){
            this.$router.push({path: '/filenet_address_search', query: {search: value}})
            localStorage.setItem('addressactive', 0)
            setTimeout(() => {
                window.location.reload()
            }, 200);
        },
    }
}
</script>
<style scoped>
    .addtable {
        position: relative;
    }
    .imgrow {
        position: absolute;
        top: 26%;
        left: 44%;
        transform: translate(-50%,-50%);
    }
   
</style>