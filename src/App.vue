<template>
    <div id="app">
        <div class="jb-content">
            <!-- <cube-scroll ref="scroll"> -->
            <div class="text-center">
                <img alt="Vue logo" src="@/assets/img/logo.png">
            </div>
            <HelloWorld />
            <!-- </cube-scroll> -->
        </div>
        <cube-view></cube-view>
    </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "app",
  components: {
    HelloWorld
  }
  // mounted() {
  //     this.$nextTick(function() {
  //         window.addEventListener("load", () => {
  //             this.$refs.scroll.refresh();
  //         });
  //     });
  // }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app, body, html {
    height: 100%;
}

.jb-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
