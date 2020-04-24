<template>
	<div class="newblocktable">
		<section class="container-1200">
			<div class="allblock" style="min-height:900px;">
				<div class="allBlockTitle">
					<ul>
						<li>{{$t('height')}}</li>
						<li>{{$t('timestamp')}}</li>
						<li>{{$t('transfercount')}}</li>
						<li>{{$t('miner')}}</li>
						<li>{{$t('reward')}}</li>
					</ul>
				</div>
				<div class="allBlockTable">
					<div class="lili" v-for="(info,index) in da" :key="index">
						<span class="canclick" @click="toBlockInfo(info.height)">
							{{info.height}}
						</span>
						<span>{{common.formatTime(info.timestamp)}}</span>
						<span>{{info.transfercount}}</span>
						<span class="canclick" @click="toAddress(info.miner)">
							{{info.miner}}
						</span>
						<span>{{common.reward(info.reward)}} FN</span>
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

		<!-- loding -->
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
					height: 646464,
					total: 667867673000000000,
					reward: 85000000000,
					timestamp: 1587708978,
					transfercount: 0,
					approvecount: 0,
					proxycount: 0,
					rxcount: 0,
					txroot: "0000000000000000000000000000000000000000000000000000000000000000",
					rxroot: "0000000000000000000000000000000000000000000000000000000000000000",
					cxhash: "0000000000000000000000000000000000000000000000000000000000000000",
					miner: "agasdasfsdfsdfsdfasfasdfsdfsdfdfsdfsdfdfjuhkhk",
					extra: "0000000000000000000000000000000000000000000000000000000000000000",
					prevhash: "sfsfsdgdfgdfgdfdfhrfthfghjgjgjhghkghkjhkhkjhk",
					hash: "6dsg4sdg74d6f1gfg7dsf4g5f4g1dfgd4fg4d6fgd4g6d1gfg",
				},
				{
					height: 655212,
					total: 107575285000000000,
					reward: 85678000000000,
					timestamp: 55778575,
					transfercount: 0,
					approvecount: 0,
					proxycount: 0,
					rxcount: 0,
					txroot: "0000000000000000000000000000000000000000000000000000000000000000",
					rxroot: "0000000000000000000000000000000000000000000000000000000000000000",
					cxhash: "0000000000000000000000000000000000000000000000000000000000000000",
					miner: "agasdasfsdfsdfsdfasfasdfsdfsdfdfsdfsdfdfjuhkhk",
					extra: "0000000000000000000000000000000000000000000000000000000000000000",
					prevhash: "sfsfsdgdfgdfgdfdfhrfthfghjgjgjhghkghkjhkhkjhk",
					hash: "6dsg4sdg74d6f1gfg7dsf4g5f4g1dfgd4fg4d6fgd4g6d1gfg",
				},
			],
			current_page: 1,
			pages: "", 
			changePage: '',
			nowIndex: 0,
			search: "",
			showloading: false,
			timer: ''
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
				this.da = res.data.data.list
				this.showloading = false
				this.pages = res.data.data.pageTotalsize;
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
		},

	},
	created() {
		
	}
}
</script>
