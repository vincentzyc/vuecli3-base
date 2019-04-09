
<template>
  <base-page type="scroll-view" title="Scroll" class="option-demo">
    <div slot="content" class="scroll-wrapper">
      <div class="demo">
        <div class="text-center">horizontal Scroll Picker</div>
        <horizontal-picker
          v-model="hpicker"
          :pickerStyle="{color:'#409eff',fontSize:'20px'}"
          :data="items"
          :defaultIndex="defaultIndex"
          :itemWidth="itemWidth"
          :showNumber="showNumber"
          style="margin:50px auto"
        >
          <!-- <template slot-scope="{item}">{{item === hpicker ? item + "岁":item}}</template> -->
        </horizontal-picker>
      </div>
    </div>
  </base-page>
</template>

<script type="text/ecmascript-6">
// const items = function () {
//   let arr = [];
//   for (let index = 22; index < 59; index++) {
//     arr.push(index)
//   }
//   return arr
// }
export default {
  data() {
    return {
      itemWidth: 80,
      showNumber: 4,
      defaultIndex: 3,
      items: ['1000', '3000', '5000', '10000', '30000', '50000', '10万', '10万以上'],
      hpicker: ""
    }
  },
  methods: {

  }
}
</script>