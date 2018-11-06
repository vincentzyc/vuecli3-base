<template>
  <div class="hello">
    <cube-button @click="sandglass()">sandglass-loading</cube-button>
    <cube-button type="submit" @click="snake()">snake-loading</cube-button>
    <cube-button :active="true" @click="tripleBounce()">triple-bounce-loading</cube-button>
    <cube-button icon="cubeic-right" @click="goAbouot()">goAbouot</cube-button>
    <cube-button :light="true">Light Button</cube-button>
    <cube-button :inline="true">Inline Button</cube-button>
    <cube-button :outline="true">Outline Button</cube-button>
    <cube-button :primary="true" @click="axiosPost()">axiosPost</cube-button>
    <cube-checkbox-group v-model="buttonStyle" :horizontal="true">
      <cube-checkbox label="inline">Inline</cube-checkbox>
      <cube-checkbox label="outline">Outline</cube-checkbox>
      <cube-checkbox label="primary">Primary</cube-checkbox>
    </cube-checkbox-group>
    <cube-button :inline="inlineStyle" :outline="outlineStyle" :primary="primaryStyle">Demo Button</cube-button>
    <cube-button :disabled="true">Disabled Button</cube-button>
  </div>
</template>

<script>
import jsonData from "@/assets/json/form.json";
export default {
    name: "HelloWorld",
    data() {
        return {
            buttonStyle: ["inline", "outline", "primary"],
            pickList: jsonData.pickList
        };
    },
    computed: {
        inlineStyle() {
            return this.buttonStyle.indexOf("inline") >= 0;
        },
        outlineStyle() {
            return this.buttonStyle.indexOf("outline") >= 0;
        },
        primaryStyle() {
            return this.buttonStyle.indexOf("primary") >= 0;
        }
    },
    methods: {
        sandglass() {
            this.$loading.open({
                text: "加载中...",
                type: "sandglass"
            });
            setTimeout(() => {
                this.$loading.close();
            }, 3000);
        },
        snake() {
            this.$loading.open();
            setTimeout(() => {
                this.$loading.close();
            }, 2000);
        },
        tripleBounce() {
            this.$loading.open({
                text: "正在提交...",
                type: "triple-bounce"
            });
            setTimeout(() => {
                this.$loading.close();
            }, 3000);
        },
        goAbouot() {
            this.$router.push("/about");
        },
        axiosPost() {
            this.$axios.post("xxx", "hello world").then(res => {
                console.log(res);
            }).catch(error=> {
                console.log(error);
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cube-btn {
    margin: 20px 0 0;
}
</style>
