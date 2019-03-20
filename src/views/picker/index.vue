<template>
  <base-page type="about-view" title="Picker">
    <div slot="content">
      <div class="pick-content" :style="{ width: itemWidth*showNumber + 'px'}">
        <!-- <div class="pcenter"></div> -->
        <!-- 中线标识 -->
        <div ref="container" class="picker-slot">
          <div ref="wrapper" class="picker-slot-wrapper" :style="{width: (items.length+1) * itemWidth + 'px'}">
            <div class="picker-item" :style="{width: itemWidth * (showNumber - 1) / 2 + 'px'}"></div>
            <div
              class="picker-item"
              v-for="item in items"
              :key="item"
              :class="{ 'picker-selected': item === currentValue }"
              :style="{ width: itemWidth + 'px' }"
            >{{item === currentValue ? item + "岁":item}}</div>
            <div class="picker-item" :style="{width: itemWidth * (showNumber - 1) / 2 + 'px'}"></div>
          </div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script type="text/babel">
import draggable from './draggable';
import translateUtil from './translate';

const ITEM_WIDTH = 68;
const SHOW_NUMBER = 5;
const items = function () {
  let arr = [];
  for (let index = 22; index < 59; index++) {
    arr.push(index)
  }
  return arr
}

export default {
  name: 'picker-slot',

  data() {
    return {
      showNumber: SHOW_NUMBER,
      itemWidth: ITEM_WIDTH,
      items: items(),
      defaultIndex: 7,
      currentIndex: 0,
      dragging: false,
      scrollLeftTimer: null,
      scrollElementTimer: null
    };
  },

  computed: {
    currentValue() {
      return this.items[this.currentIndex]
    }
  },

  methods: {
    initEvents() {
      let elWrapper = this.$refs.wrapper;
      let elContainer = this.$refs.container;
      let dragState = {}, posLeft = elContainer.scrollLeft;

      draggable(elWrapper, {
        start: (event, touchEvent) => {
          // clearTimeout(this.scrollLeftTimer);
          // clearTimeout(this.scrollElementTimer);
          cancelAnimationFrame(this.scrollLeftTimer);
          cancelAnimationFrame(this.scrollElementTimer);
          dragState = {
            isDrag: true,
            startLeft: event.pageX,
            startTop: event.pageY
          };
        },

        drag: (event, touchEvent) => {
          this.dragging = true;

          dragState.left = event.pageX;
          dragState.top = event.pageY;

          let deltaX = dragState.left - dragState.startLeft;
          let translate = dragState.startTranslateLeft + deltaX;

          let preventRightScroll = elContainer.scrollLeft === 0 && deltaX > 0;
          let preventLeftScroll = elContainer.scrollLeft === (this.items.length - 1) * this.itemWidth && deltaX < 0;

          if (preventRightScroll || preventLeftScroll) {
            touchEvent ? touchEvent.preventDefault() : event.preventDefault();
            dragState.isDrag = false;
          }
        },

        end: (event, touchEvent) => {
          this.dragging = false;
          console.log('touchEnd', dragState.isDrag);
          if (dragState.isDrag) this.isScrolling(elContainer);
          dragState = {};
        }
      });
    },
    isScrolling(el) {
      let sLeft = el.scrollLeft;

      cancelAnimationFrame(this.scrollLeftTimer);
      let scrollingFn = () => {
        if (sLeft !== el.scrollLeft) {
          console.log("滑动中");
          sLeft = el.scrollLeft;
          this.scrollLeftTimer = requestAnimationFrame(scrollingFn);
        } else {
          console.log("滑动结束");
          this.setCurrentIndex(sLeft + this.itemWidth / 2);
          cancelAnimationFrame(this.scrollLeftTimer);
        }
      }
      this.scrollLeftTimer = requestAnimationFrame(scrollingFn);

      // clearTimeout(this.scrollLeftTimer);
      // let scrollingFn = () => {
      //   setTimeout(() => {
      //     if (sLeft !== el.scrollLeft) {
      //       console.log("滑动中");
      //       sLeft = el.scrollLeft;
      //       scrollingFn();
      //     } else {
      //       console.log("滑动结束");
      //       this.setCurrentIndex(sLeft + this.itemWidth / 2);
      //     }
      //   }, 30);
      // }
      // scrollingFn()
    },
    setCurrentIndex(x) {
      this.currentIndex = Math.floor(x / this.itemWidth);
      this.scrollElement(this.$refs.container, this.currentIndex * this.itemWidth, 5);
      console.log('所选项', this.currentValue);
      // this.$emit('input', val);
    },
    scrollElement(el, x = 0, rang = 20) {
      if (rang === 0) return el.scrollLeft = x;

      cancelAnimationFrame(this.scrollElementTimer);
      let scrollElFn = () => {
        let oLeft = el.scrollLeft, change = 0;
        if (oLeft > x) {
          change = oLeft - x > rang ? rang : oLeft - x;
          el.scrollLeft = oLeft - change;
          this.scrollElementTimer = requestAnimationFrame(scrollElFn);
        } else if (oLeft < x) {
          change = x - oLeft > rang ? rang : x - oLeft;
          el.scrollLeft = oLeft + change;
          this.scrollElementTimer = requestAnimationFrame(scrollElFn);
        } else {
          cancelAnimationFrame(this.scrollElementTimer);
        }
      }
      this.scrollElementTimer = requestAnimationFrame(scrollElFn);

      // clearTimeout(this.scrollElementTimer);
      // let scrollElFn = () => {
      //   setTimeout(() => {
      //     let oLeft = el.scrollLeft, change = 0;
      //     if (oLeft > x) {
      //       change = oLeft - x > rang ? rang : oLeft - x;
      //       el.scrollLeft = oLeft - change;
      //       scrollElFn();
      //     } else if (oLeft < x) {
      //       change = x - oLeft > rang ? rang : x - oLeft;
      //       el.scrollLeft = oLeft + change;
      //       scrollElFn();
      //     } else {
      //       clearTimeout(this.scrollElementTimer);
      //     }
      //   }, 16);
      // }
      // scrollElFn()

    }
  },

  mounted() {
    this.$nextTick(function () {
      this.initEvents();
      if (this.defaultIndex >= 0) {
        this.currentIndex = this.defaultIndex;
        this.scrollElement(this.$refs.container, this.defaultIndex * this.itemWidth, 0);
      }
    })
  },
  created() {

  }
};
</script>


<style>
.pick-content {
  overflow: hidden;
  margin: 50px auto;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 20px;
  height: 50px;
}
.picker-slot {
  font-size: 18px;
  position: relative;
  width: 100%;
  overflow: auto;
  transition: 0.5s;
  -webkit-overflow-scrolling: touch;
   padding-bottom: 20px;
}
.picker-slot::-webkit-scrollbar {
  display: none;
}

.pcenter {
  position: absolute;
  height: 100%;
  width: 1px;
  left: 50%;
  background: #f00;
}
.picker-slot.picker-slot-left {
  text-align: left;
}

.picker-slot.picker-slot-center {
  text-align: center;
}

.picker-slot.picker-slot-right {
  text-align: right;
}

.picker-slot.picker-slot-divider {
  color: #000;
  display: flex;
  align-items: center;
}

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
  left: 0;
  top: 0;
  width: 100px;
  box-sizing: border-box;
  transition-duration: 0.3s;
  backface-visibility: hidden;
}

.picker-slot-absolute .picker-item {
  position: absolute;
}

.picker-item.picker-item-far {
  pointer-events: none;
}

.picker-item.picker-selected {
  color: rgb(214, 131, 23);
}
</style>