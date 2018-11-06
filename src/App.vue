<template>
  <div id="app">
    <transition name="opacity">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
    name: "app",
    watch: {
        $route() {
            window.scrollTo(0, 0);
        }
    }
};
</script>