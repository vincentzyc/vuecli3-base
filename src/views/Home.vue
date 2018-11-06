<template>
  <div class="home">
    <div class="text-center">
      <img alt="Vue logo" src="../assets/img/logo.png">
    </div>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "home",
    components: {
        HelloWorld
    }
};
</script>
