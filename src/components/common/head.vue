<template>
    <section class="container-1920" style="background-color: #0f205f;">
        <nav class="navbar container-1200">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link to="/" class="logoimg">
                        <!-- <img src="../../assets/images/LOGO-white.png" alt="LOGO" width="143"> -->
                        <img src="../../assets/images/LOGO-white.png" alt="LOGO" style="margin-left:12px;">
                    </router-link>
                    <a href="javascript:void(0);" @click="toindex" class="firstlink index">
                        {{$t('header.index')}}
                    </a>
                    <a href="http://filenet.io/page/index_EN" target="_blank" class="firstlink">
                        <!-- <a href="http://127.0.0.1:5501/templates/index_EN.html" target="_blank" class="firstlink"> -->
                        {{$t('header.filenet')}}
                    </a>
                </div>
                <div class="search">
                    <div class="searchinput">
                        <input type="search" :placeholder="$t('header.search')" v-model="search"
                            @keyup.enter="toSearch">
                        <button class="btnsearch" @click="toSearch">
                            <i class="iconfont icon-sousuo-copy" style="color:#1C2340;font-size:24px;"></i>
                        </button>
                    </div>
                    <div class="language">
                        <div class="zhzhzh" @click="change(1)">
                            <img src="../../assets/images/china.jpg" alt="">
                            <span style="margin-left:10px;">CH</span>
                        </div>
                    </div>
                    <div class="language hover">
                        <div class="zhzhzh" @click="change(2)">
                            <img src="../../assets/images/china.jpg" alt="">
                            <span style="margin-left:10px;">CH</span>
                        </div>
                        <div class="enenen" @click="change(3)">
                            <img src="../../assets/images/us.jpg" alt="">
                            <span style="margin-left:10px;">EN</span>
                        </div>
                    </div>
                    <div class="language">
                        <div class="zhzhzh" @click="change(4)">
                            <img src="../../assets/images/us.jpg" alt="">
                            <span style="margin-left:10px;">EN</span>
                        </div>
                    </div>
                    <div class="language hover">
                        <div class="zhzhzh" @click="change(3)">
                            <img src="../../assets/images/us.jpg" alt="">
                            <span style="margin-left:10px;">EN</span>
                        </div>
                        <div class="zhzhzh" @click="change(2)">
                            <img src="../../assets/images/china.jpg" alt="">
                            <span style="margin-left:10px;">CH</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </section>
</template>
<script>
export default {
    props: ['isIndex'],
    data() {
        return {
            search: ''
        }
    },
    mounted() {
        var language;
        if (localStorage.getItem('language')) {
            language = localStorage.getItem('language')
            if (language != 'en') {
                this.$i18n.locale = 'zh'
                document.getElementsByClassName('language')[0].style.display = 'block'
                document.getElementsByClassName('language')[1].style.display = 'none'
                document.getElementsByClassName('language')[2].style.display = 'none'
                document.getElementsByClassName('language')[3].style.display = 'none'
            } else {
                this.$i18n.locale = 'en'
                document.getElementsByClassName('language')[0].style.display = 'none'
                document.getElementsByClassName('language')[1].style.display = 'none'
                document.getElementsByClassName('language')[2].style.display = 'block'
                document.getElementsByClassName('language')[3].style.display = 'none'
            }
        } else {
            localStorage.setItem('language', 'en')
            this.$i18n.locale = 'en'
            document.getElementsByClassName('language')[0].style.display = 'none'
            document.getElementsByClassName('language')[1].style.display = 'none'
            document.getElementsByClassName('language')[2].style.display = 'block'
            document.getElementsByClassName('language')[3].style.display = 'none'
        }
    },
    methods: {
        toSearch() {
            this.search = this.search.trim()
            if (this.search == '') {
                return
            }
            if (this.search.length == 64) {
               console.log(1111111)
            } else if (this.search.length == 55) {
                console.log(5555555555)
            } else {
                this.$router.push('/error')
            }
        },
        change(id) {
            if (id == 1) {
                document.getElementsByClassName('language')[0].style.display = 'none'
                document.getElementsByClassName('language')[1].style.display = 'block'
                document.getElementsByClassName('language')[2].style.display = 'none'
                document.getElementsByClassName('language')[3].style.display = 'none'
            }
            if (id == 4) {
                document.getElementsByClassName('language')[0].style.display = 'none'
                document.getElementsByClassName('language')[1].style.display = 'none'
                document.getElementsByClassName('language')[2].style.display = 'none'
                document.getElementsByClassName('language')[3].style.display = 'block'
            }
            //CH
            if (id == 2) {
                this.$i18n.locale = 'zh'
                localStorage.setItem('language', 'zh')
                document.getElementsByClassName('language')[0].style.display = 'block'
                document.getElementsByClassName('language')[1].style.display = 'none'
                document.getElementsByClassName('language')[2].style.display = 'none'
                document.getElementsByClassName('language')[3].style.display = 'none'
            }
            
            if (id == 3) {
                this.$i18n.locale = 'en'
                localStorage.setItem('language', 'en')
                document.getElementsByClassName('language')[0].style.display = 'none'
                document.getElementsByClassName('language')[1].style.display = 'none'
                document.getElementsByClassName('language')[2].style.display = 'block'
                document.getElementsByClassName('language')[3].style.display = 'none'
            }
        },
        toindex() {
            this.$router.push('/');
        }
    }
}
</script>
