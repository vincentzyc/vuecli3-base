
<template>
  <base-page type="scroll-view" title="Scroll" class="option-demo">
    <div slot="content" class="scroll-wrapper">
      <div class="demo">
        <div class="title">horizontal Scroll Picker</div>
        <cube-scroll
          ref="scroll"
          direction="horizontal"
          class="horizontal-scroll-list-wrap"
          :style="{ width: itemWidth*showNumber + 'px'}"
          :options="{
          swipeTime:500
        }"
        >
          <div ref="wrapper" class="picker-slot-wrapper" :style="{width: (items.length+showNumber-1) * itemWidth + 'px'}">
            <div class="picker-item" :style="{width: itemWidth * (showNumber - 1) / 2 + 'px'}"></div>
            <div
              class="picker-item"
              v-for="(item,key) in items"
              :key="item"
              :class="{ 'picker-selected': item === currentValue }"
              :style="{ width: itemWidth + 'px' }"
              @click="handClick(key)"
            >{{item === currentValue ? item + "岁":item}}</div>
            <div class="picker-item" :style="{width: itemWidth * (showNumber - 1) / 2 + 'px'}"></div>
          </div>
        </cube-scroll>
      </div>
    </div>
  </base-page>
</template>

<script type="text/ecmascript-6">
const ITEM_WIDTH = 48;
const SHOW_NUMBER = 7;
const items = function () {
  let arr = [];
  for (let index = 22; index < 59; index++) {
    arr.push(index)
  }
  return arr
}
export default {
  data() {
    return {
      showNumber: SHOW_NUMBER,
      itemWidth: ITEM_WIDTH,
      items: items(),
      defaultIndex: 7,
      currentIndex: 0,
      BScoll: null,
      draging: false,
      scrollEndTimer: null,
      scrollX: null
    }
  },
  computed: {
    currentValue() {
      return this.items[this.currentIndex]
    }
  },
  methods: {
    handClick(key) {
      this.currentIndex = key
      this.scrollX = -this.currentIndex * this.itemWidth;
      this.BScoll.scrollTo(this.scrollX, 0, 150);
    },
    setCurrentIndex(x) {
      let scrollNewX = Math.abs(x) + this.itemWidth / 2;
      this.currentIndex = Math.floor(scrollNewX / this.itemWidth);

      console.log(this.currentIndex * this.itemWidth);

      this.scrollX = -this.currentIndex * this.itemWidth;

      this.BScoll.scrollTo(this.scrollX, 0, 200);

      console.log('所选项', this.currentValue);
      // this.$emit('input', val);
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.BScoll = this.$refs.scroll.scroll;

      this.BScoll.on('touchEnd', pos => {
        this.draging = false;
        console.log('鼠标/手指离开', pos);
      })

      this.BScoll.on('scrollEnd', pos => {
        clearTimeout(this.scrollEndTimer);
        this.scrollEndTimer = setTimeout(() => {
          if (this.draging || this.scrollX === pos.x) return false;
          console.log('111111111111111111111滚动结束11111111111111111111', pos);
          this.draging = false;
          this.setCurrentIndex(pos.x);
        }, 30);
      })

      this.BScoll.on('beforeScrollStart', () => {
        this.draging = true;
        console.log('滚动开始之前');
      })
      // this.BScoll.on('scrollStart', () => {
      //   console.log('滚动开始时');
      // })

      this.BScoll.on('scrollCancel', () => {
        this.draging = false;
        console.log('滚动被取消');
      })

      if (this.defaultIndex >= 0) {
        this.currentIndex = this.defaultIndex;
        this.BScoll.scrollTo(-this.currentIndex * this.itemWidth, 0);
      }

    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">

.picker-slot-wrapper {
  white-space: nowrap;
  transition: 0.3s;
}

.picker-item {
  text-align: center;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #707274;
  box-sizing: border-box;
  backface-visibility: hidden;
}

.picker-item.picker-selected {
  color: rgb(214, 131, 23);
}

.horizontal-scroll-list-wrap {
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 50px auto;
  border-radius: 20px;

  // &::after {
  // content: '';
  // position: absolute;
  // height: 100%;
  // width: 1px;
  // left: 50%;
  // top: 0;
  // background: #f00;
  // }
  .cube-scroll-content {
    display: inline-block;
  }

  .list-wrapper {
    padding: 0 10px;
    line-height: 60px;
    white-space: nowrap;
  }

  .list-item {
    display: inline-block;
  }
}
</style>