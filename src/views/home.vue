<template>
  <base-page type="home-view" title="HOME">
    <div slot="content">
      <div class="text-center">
        <img alt="Vue logo" src="../assets/img/logo.png">
      </div>
      <HelloWorld/>
    </div>
    <base-view></base-view>
  </base-page>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/hello-world.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
