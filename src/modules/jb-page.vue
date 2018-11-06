<template>
    <div class="jb-page">
        <header class="header" v-if="title">
            <h1>{{title}}</h1>
            <i @click="$router.back()" class="cubeic-back"></i>
        </header>
        <div class="wrapper">
            <div class="scroll-wrapper">
                <cube-scroll ref="scroll">
                    <slot></slot>
                </cube-scroll>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: "jb-page",
    props: {
        title: {
            type: String,
            default: ""
        }
    },
    mounted() {
        this.$nextTick(function() {
            window.addEventListener("load", () => {
                this.$refs.scroll.refresh();
            });
        });
    }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.jb-page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .wrapper {
        height: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;

        .content {
            margin: 10px;
            height: 100%;
        }
    }
}

.scroll-wrapper {
    height: 100%;
}
</style>