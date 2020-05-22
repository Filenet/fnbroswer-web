<template>
    <div style="min-height:900px;">
        <div v-show="!showcontent">
            <div class="contribsTop">
                <div class="contribslink">
                    <div>
                        <p @click="tominer" :class="{actived:isminer,forbid:isminerforbid}" class="firstp">
                            {{$t('contribminer')}}</p>
                    </div>
                    <div>
                        <p @click="tonode" :class="{actived:isnode,forbid:isnodeforbid}">{{$t('contribsupernode')}}</p>
                    </div>
                </div>
                <div style="height:290px;position: relative;z-index:100;" v-show="showloading">
                    <i class="iconfont icon-loading xuanzhuan"
                        style="color:#cdcdcd;font-size:100px;position: absolute;top:60px;left:50%;"></i>
                </div>
                <div v-show="!showloading">
                    <div style="padding:20px 30px;" class="contrisdetail contrisdetail-miner">
                        <div class="col-sm-3 hidden2-su-xs">{{$t('mineraddress')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{address}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('nodecount')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{contribData.nodecount}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('TotalContrib')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{contribData.totalcontrib}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('validbalance')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            {{common.reward(contribData.validbalance)}} FN</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('height')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            <div class="inputheight">
                                <input type="text" v-model="cxheight" @keyup.enter='$event.target.blur'
                                    @blur="searchHeight" maxlength="9">
                                <span @click="toup(cxheight+1)">&lt;</span>
                                <span @click="tonext(cxheight-1)">&gt;</span>
                            </div>
                        </div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('Credit')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            {{Number(contribData.credit).toFixed(1)}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('votenumber')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            {{common.reward(contribData.votenumber).toFixed(4)}}</div>
                    </div>
                    <div style="padding:20px 30px;display:none;" class="contrisdetail contrisdetail-node">
                        <div class="col-sm-3 hidden2-su-xs">{{$t('SuperNodeAddress')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{contribsnode_data.address}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('nodecount')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{contribsnode_data.nodecount}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('TotalContrib')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{contribsnode_data.totalcontrib}}
                        </div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('validbalance')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            {{common.reward(contribsnode_data.validbalance)}} FN</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('height')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            <div class="inputheight">
                                <input type="text" v-model="cxheight" @keyup.enter='$event.target.blur'
                                    @blur="searchHeight" maxlength="9">
                                <span @click="toup(cxheight+1)">&lt;</span>
                                <span @click="tonext(cxheight-1)">&gt;</span>
                            </div>
                        </div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('Credit')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">{{contribsnode_data.credit}}</div>
                        <div class="col-sm-3 hidden2-su-xs">{{$t('votenumber')}}:</div>
                        <div class="col-sm-9 cbs" style="word-wrap: break-word;">
                            {{common.reward(contribsnode_data.votenumber).toFixed(4)}}</div>
                    </div>
                </div>
            </div>

            <div class="contribsBottom">
                <div class="kuanggong" v-show="isminer">
                    <div class="contribtitle">
                        <ul>
                            <li>{{$t('NodeId')}}</li>
                            <li>&nbsp;</li>
                            <li>{{$t('contribs')}}</li>
                        </ul>
                    </div>
                    <div class="addContable" v-show="showtable">
                        <div class="lili" v-for="(item,index) in contribDatalist" :key="index">
                            <span>
                                {{item.nodeId}}
                            </span>
                            <span>&nbsp;</span>
                            <span>
                                {{item.usedCap}}
                            </span>
                        </div>
                    </div>

                </div>

                <div class="jiedian" v-show="isnode">
                    <div class="contribtitle">
                        <ul>
                            <li>{{$t('mineraddress')}}</li>
                            <li>{{$t('validbalance')}}</li>
                            <li>{{$t('votenumber')}}</li>
                        </ul>
                    </div>
                    <div class="addContable" v-show="showtable">
                        <div class="lili" v-for="(item,index) in jiedianDatalist" :key="index">
                            <span style="width:440px;" class="canclick" @click="toaddress(item.address)">
                                {{item.address}}
                            </span>
                            <span style="text-align: left;">
                                {{common.reward(item.validbalance)}} FN
                            </span>
                            <span style="text-align: left;">
                                {{common.reward(item.votenumber).toFixed(4)}}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="page" v-show="show">
                    <div class="pageList">
                        <span v-show="current_page>5" class="jump" @click="jumpPage(1)">1</span>
                        <span class="ellipsis" v-show="eFont">...</span>
                        <span class="jump" v-for="(num,index) in indexS" :key="index"
                            :class="{bgPrimary:current_page==num}" @click="jumpPage(num)">{{num}}</span>
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
        </div>

        <div v-show="showcontent" style="text-align:center;font-size:24px;line-height: 200px;">
            {{content}}
        </div>

        <div style="height:0;position: relative;z-index:100;" v-show="showloading">
            <i class="iconfont icon-loading xuanzhuan"
                style="color:#cdcdcd;font-size:100px;position: absolute;top:200px;left:50%;"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: ['address', 'contrib'],
    data() {
        return {
            current_page: 1, //current page
            pages: "", //total pages
            changePage: '',//Jump page
            nowIndex: 0,
            search: "",
            pageSize: 10,
            contribData: {
                nodecount: 0, 
                totalcontrib: 0,  
                validbalance: 0,  
                credit: 0,  
                votenumber: 0,  
                contribs: []  
            },
            cxheight: 0,  
            cxhash: 0,  
            showloading: false,
            height: 0,  
            content: `Current address has no transaction data！`,
            showtable: true,  
            detail: '',  
            showdetail: false,  
            showright: false, 
            showleft: false,
            current_height: '',  
            istoup: 1,   
            isminer: true,
            isnode: false,
            contribsnode_data: {
                address: 0,
                credit: 0,
                nodecount: 0,
                minercount: 0,
                totalcontrib: 0,
                validbalance: 0,
                votenumber: 0,
                minercount: 0
            },
            type: 0,
            showcontent: false,
            isminerforbid: false,
            isnodeforbid: false,
            jiedianData: [],
            cxheightinput: 0,
            cxheightmax: 0,
            contribDatalist: [],
            jiedianDatalist: [],
        }
    },
    mounted() {
        if (this.contrib) {
            var contrib_data = JSON.parse(localStorage.getItem('contrib'))

            this.showloading = false
            if (contrib_data != null) {
                this.type = contrib_data.type
                this.cxhash = contrib_data.fnv2Cxinfo.cxhash
                this.cxheight = contrib_data.fnv2Cxinfo.height
                this.cxheightmax = contrib_data.fnv2Cxinfo.height
                this.cxheightinput = contrib_data.fnv2Cxinfo.height
                if (this.type == 1) {
                    this.contribData = contrib_data.fnv2Cxinfo.miners
                    this.contribsnode_data = contrib_data.fnv2Cxinfo.agents
                    this.contribsnode_data.minercount = contrib_data.fnv2Cxinfo.minercount
                    this.jiedianData = contrib_data.fnv2Cxinfo.votingInformations
                    if (this.isminer) {
                        this.pages = Math.ceil(this.contribData.contribs.length / 20)
                        this.current_page = 1
                        if (this.contribData.contribs.length <= 20) {
                            this.contribDatalist = this.contribData.contribs
                        } else {
                            for (var i = 0; i < 20; i++) {
                                this.contribDatalist.push(this.contribData.contribs[i])
                            }
                        }
                    }

                }
                if (this.type == 2) {
                    this.contribsnode_data = contrib_data.fnv2Cxinfo.agents
                    this.contribsnode_data.minercount = contrib_data.fnv2Cxinfo.minercount
                    this.jiedianData = contrib_data.fnv2Cxinfo.votingInformations
                    this.isminerforbid = true
                    this.tonode()
                }
                if (this.type == 3) {
                    this.contribData = contrib_data.fnv2Cxinfo.miners
                    if (!contrib_data.fnv2Cxinfo.agents) {
                        this.isnodeforbid = true
                    } else {
                        this.contribsnode_data = contrib_data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = contrib_data.fnv2Cxinfo.minercount
                        this.jiedianData = contrib_data.fnv2Cxinfo.votingInformations
                        this.isnodeforbid = false
                    }
                    if (this.isminer) {
                        this.pages = Math.ceil(this.contribData.contribs.length / 20)
                        this.current_page = 1
                        if (this.contribData.contribs.length <= 20) {
                            this.contribDatalist = this.contribData.contribs
                        } else {
                            for (var i = 0; i < 20; i++) {
                                this.contribDatalist.push(this.contribData.contribs[i])
                            }
                        }
                    }
                }
            } else {
                this.showright = true
                this.showcontent = true
            }
        }
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
        address: {
            handler(newValue, oldValue) {
                this.getAddContribs()   // 
            }
        },
        contrib: {
            handler(newValue, oldValue) {
                var contrib_data = JSON.parse(localStorage.getItem('contrib'))
                this.showloading = false
                this.type = contrib_data.type
                if (contrib_data != null) {
                    this.type = contrib_data.type
                    if (this.type == 1) {
                        this.cxhash = contrib_data.fnv2Cxinfo.cxhash
                        this.cxheight = contrib_data.fnv2Cxinfo.height
                        this.cxheightmax = contrib_data.fnv2Cxinfo.height
                        this.cxheightinput = contrib_data.fnv2Cxinfo.height
                        this.contribData = contrib_data.fnv2Cxinfo.miners
                        this.contribsnode_data = contrib_data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = contrib_data.fnv2Cxinfo.minercount
                        this.jiedianData = contrib_data.fnv2Cxinfo.votingInformations
                    }
                    if (this.type == 3 && !contrib_data.fnv2Cxinfo.agents) {
                        this.cxhash = contrib_data.fnv2Cxinfo.cxhash
                        this.cxheight = contrib_data.fnv2Cxinfo.height
                        this.cxheightmax = contrib_data.fnv2Cxinfo.height
                        this.cxheightinput = contrib_data.fnv2Cxinfo.height
                        this.contribData = contrib_data.fnv2Cxinfo.miners
                        this.isnodeforbid = true
                    } else if (this.type == 3 && contrib_data.fnv2Cxinfo.agents) {
                        this.cxhash = contrib_data.fnv2Cxinfo.cxhash
                        this.cxheight = contrib_data.fnv2Cxinfo.height
                        this.cxheightmax = contrib_data.fnv2Cxinfo.height
                        this.cxheightinput = contrib_data.fnv2Cxinfo.height
                        this.contribData = contrib_data.fnv2Cxinfo.miners
                        this.contribsnode_data = contrib_data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = contrib_data.fnv2Cxinfo.minercount
                        this.jiedianData = contrib_data.fnv2Cxinfo.votingInformations
                        this.isnodeforbid = false
                    }
                    if (this.type == 2) {
                        this.cxhash = contrib_data.fnv2Cxinfo.cxhash
                        this.cxheight = contrib_data.fnv2Cxinfo.height
                        this.cxheightmax = contrib_data.fnv2Cxinfo.height
                        this.cxheightinput = contrib_data.fnv2Cxinfo.height
                        this.contribsnode_data = contrib_data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = contrib_data.fnv2Cxinfo.minercount
                        this.jiedianData = contrib_data.fnv2Cxinfo.votingInformations
                        this.isminerforbid = true
                        this.tonode()
                    }
                } else {
                    this.showright = true
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
                if (this.isminer) {
                    this.contribDatalist = []
                    var size = id * 20
                    if (size < this.contribData.contribs.length) {
                        for (var i = size - 20; i < size; i++) {
                            this.contribDatalist.push(this.contribData.contribs[i])
                        }
                    } else {
                        for (var i = size - 20; i < this.contribData.contribs.length; i++) {
                            this.contribDatalist.push(this.contribData.contribs[i])
                        }
                    }
                }

                if (this.isnode) {
                    this.jiedianDatalist = []
                    var size = id * 20
                    if (size < this.jiedianData.length) {
                        for (var i = size - 20; i < size; i++) {
                            this.jiedianDatalist.push(this.jiedianData[i])
                        }
                    } else {
                        for (var i = size - 20; i < this.jiedianData.length; i++) {
                            this.jiedianDatalist.push(this.jiedianData[i])
                        }
                    }
                }
                this.changePage = ''
            }
        },
        prevPage() {
            this.current_page--
            this.getAddContribs()
        },
        nextPage() {
            this.current_page++
            var id = this.current_page

            if (this.isminer) {
                this.contribDatalist = []
                var size = id * 20
                if (size < this.contribData.contribs.length) {
                    for (var i = size - 20; i < size; i++) {
                        this.contribDatalist.push(this.contribData.contribs[i])
                    }
                } else {
                    for (var i = size - 20; i < this.contribData.contribs.length; i++) {
                        this.contribDatalist.push(this.contribData.contribs[i])
                    }
                }
            }

            if (this.isnode) {
                this.jiedianDatalist = []
                var size = id * 20
                if (size < this.jiedianData.length) {
                    for (var i = size - 20; i < size; i++) {
                        this.jiedianDatalist.push(this.jiedianData[i])
                    }
                } else {
                    for (var i = size - 20; i < this.jiedianData.length; i++) {
                        this.jiedianDatalist.push(this.jiedianData[i])
                    }
                }
            }
        },
        getAddContribs() {
            this.$axios.get(`/api/v1/fnv2Cxinfo/${this.address}/${this.height}`).then(res => {
                if (res.data.data) {
                    this.showloading = false
                    this.type = res.data.data.type
                    if (this.type == 1) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribData = res.data.data.fnv2Cxinfo.miners
                        this.contribsnode_data = res.data.data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = res.data.data.fnv2Cxinfo.minercount
                        this.jiedianData = res.data.data.fnv2Cxinfo.votingInformations
                        if (this.isminer) {
                            this.pages = Math.ceil(this.contribData.contribs.length / 20)
                            this.current_page = 1
                            if (this.contribData.contribs.length <= 20) {
                                this.contribDatalist = this.contribData.contribs
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.contribDatalist.push(this.contribData.contribs[i])
                                }
                            }
                        }
                        if (this.isnode) {
                            this.pages = Math.ceil(this.jiedianData.length / 20)
                            this.current_page = 1
                            if (this.jiedianData.length <= 20) {
                                this.jiedianDatalist = this.jiedianData
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.jiedianDatalist.push(this.jiedianData[i])
                                }
                            }
                        }

                    }
                    if (this.type == 3 && !res.data.data.fnv2Cxinfo.agents) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribData = res.data.data.fnv2Cxinfo.miners
                        this.isnodeforbid = true
                        if (this.isminer) {
                            this.pages = Math.ceil(this.contribData.contribs.length / 20)
                            this.current_page = 1
                            if (this.contribData.contribs.length <= 20) {
                                this.contribDatalist = this.contribData.contribs
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.contribDatalist.push(this.contribData.contribs[i])
                                }
                            }
                        }
                        if (this.isnode) {
                            this.pages = Math.ceil(this.jiedianData.length / 20)
                            this.current_page = 1
                            if (this.jiedianData.length <= 20) {
                                this.jiedianDatalist = this.jiedianData
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.jiedianDatalist.push(this.jiedianData[i])
                                }
                            }
                        }
                    } else if (this.type == 3 && res.data.data.fnv2Cxinfo.agents) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribData = res.data.data.fnv2Cxinfo.miners
                        this.contribsnode_data = res.data.data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = res.data.data.fnv2Cxinfo.minercount
                        this.jiedianData = res.data.data.fnv2Cxinfo.votingInformations
                        this.isnodeforbid = false
                        if (this.isminer) {
                            this.pages = Math.ceil(this.contribData.contribs.length / 20)
                            this.current_page = 1
                            if (this.contribData.contribs.length <= 20) {
                                this.contribDatalist = this.contribData.contribs
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.contribDatalist.push(this.contribData.contribs[i])
                                }
                            }
                        }
                        if (this.isnode) {
                            this.pages = Math.ceil(this.jiedianData.length / 20)
                            this.current_page = 1
                            if (this.jiedianData.length <= 20) {
                                this.jiedianDatalist = this.jiedianData
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.jiedianDatalist.push(this.jiedianData[i])
                                }
                            }
                        }
                    }
                    if (this.type == 2) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribsnode_data = res.data.data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = res.data.data.fnv2Cxinfo.minercount
                        this.jiedianData = res.data.data.fnv2Cxinfo.votingInformations
                        // this.showcontent=true
                        this.isminerforbid = true
                        this.tonode()
                    }
                } else {
                    this.showloading = false
                    alert('This height no contribsData')
                    this.cxheight = this.cxheightmax
                    this.height = this.cxheightmax
                    this.showleft = false
                    this.getAddContribsadd()
                }
            })
        },
        getAddContribsadd() {
            this.$axios.get(`/api/v1/fnv2CxinfoAdd/${this.address}/${this.height}`).then(res => {
                if (res.data.data) {
                    this.showloading = false
                    this.type = res.data.data.type
                    if (this.type == 1) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribData = res.data.data.fnv2Cxinfo.miners
                        this.contribsnode_data = res.data.data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = res.data.data.fnv2Cxinfo.minercount
                        this.jiedianData = res.data.data.fnv2Cxinfo.votingInformations
                        if (this.isminer) {
                            this.pages = Math.ceil(this.contribData.contribs.length / 20)
                            this.current_page = 1
                            if (this.contribData.contribs.length <= 20) {
                                this.contribDatalist = this.contribData.contribs
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.contribDatalist.push(this.contribData.contribs[i])
                                }
                            }
                        }
                        if (this.isnode) {
                            this.pages = Math.ceil(this.jiedianData.length / 20)
                            this.current_page = 1
                            if (this.jiedianData.length <= 20) {
                                this.jiedianDatalist = this.jiedianData
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.jiedianDatalist.push(this.jiedianData[i])
                                }
                            }
                        }
                    }
                    if (this.type == 3 && !res.data.data.fnv2Cxinfo.agents) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribData = res.data.data.fnv2Cxinfo.miners
                        this.isnodeforbid = true
                        if (this.isminer) {
                            this.pages = Math.ceil(this.contribData.contribs.length / 20)
                            this.current_page = 1
                            if (this.contribData.contribs.length <= 20) {
                                this.contribDatalist = this.contribData.contribs
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.contribDatalist.push(this.contribData.contribs[i])
                                }
                            }
                        }
                        if (this.isnode) {
                            this.pages = Math.ceil(this.jiedianData.length / 20)
                            this.current_page = 1
                            if (this.jiedianData.length <= 20) {
                                this.jiedianDatalist = this.jiedianData
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.jiedianDatalist.push(this.jiedianData[i])
                                }
                            }
                        }
                    } else if (this.type == 3 && res.data.data.fnv2Cxinfo.agents) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribData = res.data.data.fnv2Cxinfo.miners
                        this.contribsnode_data = res.data.data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = res.data.data.fnv2Cxinfo.minercount
                        this.jiedianData = res.data.data.fnv2Cxinfo.votingInformations
                        this.isnodeforbid = false
                        if (this.isminer) {
                            this.pages = Math.ceil(this.contribData.contribs.length / 20)
                            this.current_page = 1
                            if (this.contribData.contribs.length <= 20) {
                                this.contribDatalist = this.contribData.contribs
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.contribDatalist.push(this.contribData.contribs[i])
                                }
                            }
                        }
                        if (this.isnode) {
                            this.pages = Math.ceil(this.jiedianData.length / 20)
                            this.current_page = 1
                            if (this.jiedianData.length <= 20) {
                                this.jiedianDatalist = this.jiedianData
                            } else {
                                for (var i = 0; i < 20; i++) {
                                    this.jiedianDatalist.push(this.jiedianData[i])
                                }
                            }
                        }
                    }
                    if (this.type == 2) {
                        this.cxhash = res.data.data.fnv2Cxinfo.cxhash
                        this.cxheight = res.data.data.fnv2Cxinfo.height
                        this.cxheightinput = res.data.data.fnv2Cxinfo.height
                        this.contribsnode_data = res.data.data.fnv2Cxinfo.agents
                        this.contribsnode_data.minercount = res.data.data.fnv2Cxinfo.minercount
                        this.jiedianData = res.data.data.fnv2Cxinfo.votingInformations
                        // this.showcontent=true
                        this.isminerforbid = true
                        this.tonode()
                    }
                } else {
                    this.showloading = false
                    alert('This height no contribsData')
                    this.cxheight = this.cxheightmax
                    this.height = this.cxheightmax
                    this.showleft = false
                    this.getAddContribsadd()
                }
            })
        },
        toContribDetail(cxid, nodeId) {
            this.$router.push({ path: '/contribDetail', query: { cxid: cxid, nodeId: nodeId } })
        },
        toblock(value) {
            this.$router.push({ path: '/filenet_block_info', query: { search: value } })
        },
        tonext(value) {
            this.showleft = true
            if (value <= 1850001) {
                this.showright = true
                return;
            }
            this.height = value
            this.contribDatalist = []
            this.jiedianDatalist = []
            this.type = 0
            this.showloading = true
            this.pages = 0
            this.getAddContribs();
        },
        toup(value) {
            if (this.cxheight == this.cxheightmax) {
                this.showleft = false
            }
            this.height = value
            this.contribDatalist = []
            this.jiedianDatalist = []
            this.type = 0
            this.showloading = true
            this.pages = 0
            this.getAddContribsadd();
        },
        tominer() {
            if (this.showloading) {
                return
            }
            if (this.isminerforbid) {
                return
            }
            this.isminer = true
            this.isnode = false
            document.getElementsByClassName('contrisdetail-miner')[0].style.display = "block"
            document.getElementsByClassName('contrisdetail-node')[0].style.display = "none"

            this.contribDatalist = []

            if (this.isminer) {
                this.pages = Math.ceil(this.contribData.contribs.length / 20)
                this.current_page = 1
                if (this.contribData.contribs.length <= 20) {
                    this.contribDatalist = this.contribData.contribs
                } else {
                    for (var i = 0; i < 20; i++) {
                        this.contribDatalist.push(this.contribData.contribs[i])
                    }
                }
            }
        },
        tonode() {
            if (this.showloading) {
                return
            }
            if (this.isnodeforbid) {
                return
            }
            this.isminer = false
            this.isnode = true
            document.getElementsByClassName('contrisdetail-node')[0].style.display = "block"
            document.getElementsByClassName('contrisdetail-miner')[0].style.display = "none"

            this.jiedianDatalist = []
            if (this.isnode) {
                this.pages = Math.ceil(this.jiedianData.length / 20)
                this.current_page = 1
                if (this.jiedianData.length <= 20) {
                    this.jiedianDatalist = this.jiedianData
                } else {
                    for (var i = 0; i < 20; i++) {
                        this.jiedianDatalist.push(this.jiedianData[i])
                    }
                }
            }

        },
        searchHeight() {
            if (this.cxheight == this.cxheightinput) {
                return
            }
            if (this.cxheight == '' || this.cxheight > this.cxheightmax) {
                this.cxheight = this.cxheightmax
            }
            if (this.cxheight == this.cxheightmax) {
                this.showleft = false
            } else {
                this.showleft = true
            }
            this.height = this.cxheight
            this.contribDatalist = []
            this.jiedianDatalist = []
            this.type = 0
            this.showloading = true
            this.pages = 0
            this.getAddContribsadd()
        },
        toaddress(value) {
            this.$router.push({ path: '/filenet_address_search', query: { search: value } })
        }
    }
}
</script>
<style scoped>
.contribslink {
    height: 51px;
    display: flex;
}
p.actived {
    background: #dbecf6;
    color: #42a0cd !important;
}
.forbid {
    cursor: no-drop !important;
    color: #ccc;
}
.contribslink > div {
    width: 50%;
}
.contribslink > div > p {
    width: 100%;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
    box-shadow: 0px -1px 0px 0px rgba(229, 229, 229, 0.5);
    border-bottom: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    color: #827f7f;
}
.firstp {
    border-left: none !important;
}
.inputheight {
    width: 70px;
    border-radius: 3px;
    box-sizing: border-box;

    border: 1px solid #ddd;
    position: relative;
}
.inputheight > input {
    border: none;
    outline: none;
    width: 100%;
}
.inputheight > input:focus {
    font-weight: 700;
}
.inputheight > span {
    position: absolute;
    right: -15px;
    width: 11px;
    height: 18px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    font-size: 12px;
    line-height: 13px;
    font-weight: bolder;
    color: #666;
    text-align: center;
    transform: rotate(90deg);
    cursor: pointer;
}
.inputheight > span:nth-child(2) {
    top: -4px;
    border-right: 0;
}
.inputheight > span:nth-child(3) {
    bottom: -4px;
    border-left: 0;
}
.contribsTop,
.contribsBottom {
    border: 1px solid rgba(204, 204, 204, 1);
}
.contribsTop {
    margin-bottom: 20px;
}
</style>