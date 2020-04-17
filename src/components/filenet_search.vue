<template>
    <div>
        <userhead :isIndex='isIndex'></userhead>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lang: '',
            isIndex: '',
        };
    },
    watch: {
        '$i18n.locale': function (newval, oldval) {
            this.lang = newval
        },

    },
    created() {
        
    },

    mounted() {
        this.lang = localStorage.getItem('language')
    },
    methods: {
    },
};
</script>

<style scope>
.tabtable-contain {
    position: relative;
}
.tabtable-contain span {
    position: absolute;
    left: 20px;
    top: 49px;
    color: #ea181d;
    line-height: 11px;
    font-size: 12px;
    font-weight:400;
}
</style>