<template>
	<div class="transfertable">
		<section class="container-1200">
			<div class="alltrans" style="min-height:900px;">
				<div class="alltransTitle">
					<ul>
						<li>{{$t('txhash')}}</li>
						<li>{{$t('height')}}</li>
						<li>{{$t('timestamp')}}</li>
						<li>{{$t('from')}}</li>
						<li>{{$t('to')}}</li>
						<li>{{$t('value')}}</li>
					</ul>
				</div>
				<div class="alltransTable">
					<div class="lili" v-for="(info,index) in da" :key="index">
						<span class="canclick short" @click="toTransactionInfo(info.txid)">
							{{common.middleEllipsis(info.txid)}}
							<i>{{info.txid}}</i>
						</span>
						<span class="canclick" @click="toBlockInfo(info.height)">{{info.height}}</span>
						<span>{{common.formatTime(info.timestamp)}}</span>
						<span class="canclick short" @click="toAddress(info.from)">
							{{common.middleEllipsis(info.from)}}
							<i>{{info.from}}</i>
						</span>
						<span style="">- ></span>
						<span class="canclick short" @click="toAddress(info.to)">
							{{common.middleEllipsis(info.to)}}
							<i>{{info.to}}</i>
						</span>
						<span>{{common.reward(info.value)}} FN</span>
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
		</section>

		<div style="height:0;position: relative;z-index:100;" v-show="showloading">
			<i class="iconfont icon-loading xuanzhuan"
				style="color:#cdcdcd;font-size:100px;position: absolute;top:-650px;left:50%;"></i>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			da: [
                {
                    txid: "c7f526e21f5cd1820df29f9d7213b4582baad50e9912a6637e1ba3e4d2672d99",
                    from: "3bSAhsH2jHzjvKRQdGPUJTD5LPc1rve9ZWYBJcjusPjAgw41osocHcV",
                    to: "3eKRouQ1imoV1ZBA1qb9vucmsgtEMLPFic5UjwrrZadKJSeCyUf33XD",
                    height: 4396177,
                    timestamp: 1588234195,
                    value: 18800000,
                    tocount: 2
                },
                {
                    txid: "c7f526e21f5cd1820df29f9d7213b4582baad50e9912a6637e1ba3e4d2672d99",
                    from: "3bSAhsH2jHzjvKRQdGPUJTD5LPc1rve9ZWYBJcjusPjAgw41osocHcV",
                    to: "3eKRouQ1imoV1ZBA1qb9vucmsgtEMLPFic5UjwrrZadKJSeCyUf33XD",
                    height: 4396177,
                    timestamp: 1588234195,
                    value: 18800000,
                    tocount: 2
                }
            ],
			current_page: 1, //current page
			pages: "", //total pages
			changePage: '',//Jump page
			nowIndex: 0,
			search: "",
			showInfo: true,
			showloading: false,

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
	methods: {
		toTransactionInfo(value) {
			this.$router.push({ path: '/transferDetail', query: { txid: value } })
		},
		toBlockInfo(value) {
			this.$router.push({ path: '/filenet_block_info', query: { search: value } })
		},
		toAddress(value) {
			this.$router.push({ path: '/filenet_address_search', query: { search: value } })
		},
		jumpPage(id) {
			if (id) {
				this.da = []
				this.showloading = true
				this.current_page = id;
				this.changePage = ''
			}
		},
		prevPage() {
			this.current_page--
			this.jumpPage(this.current_page)
		},
		nextPage() {
			this.current_page++
			this.jumpPage(this.current_page)
		}
	},
	created() {
	}
}
</script>
