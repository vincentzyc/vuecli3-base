<template>
    <cube-page type="home-view" title="HOME">
        <div slot="content">
            <div class="text-center">
                <img alt="Vue logo" src="../assets/img/logo.png">
            </div>
            <HelloWorld />
        </div>
        <cube-view></cube-view>
    </cube-page>
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
