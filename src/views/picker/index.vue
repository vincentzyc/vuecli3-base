<template>
  <base-page type="about-view" title="Picker">
    <div slot="content">
      <div class="picker-slot" :class="classNames" :style="flexStyle">
        <div ref="wrapper" class="picker-slot-wrapper" :class="{ dragging: dragging }" :style="{ width: mutatingValues.length*itemWidth + 'px' }">
          <div
            class="picker-item"
            v-for="itemValue in mutatingValues"
            :key="itemValue"
            :class="{ 'picker-selected': itemValue === currentValue }"
            :style="{ width: itemWidth + 'px' }"
          >{{ typeof itemValue === 'object' && itemValue[valueKey] ? itemValue[valueKey] : itemValue }}</div>
        </div>
      </div>
    </div>
  </base-page>
</template>

<script type="text/babel">
import draggable from './draggable';
import translateUtil from './translate';

const ITEM_WIDTH = 48;

export default {
  name: 'picker-slot',

  data() {
    return {
      defaultIndex: 2,
      itemWidth: ITEM_WIDTH,
      visibleItemCount: 5,
      currentValue: '',
      mutatingValues: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
      dragging: false,
      animationFrameId: null
    };
  },

  computed: {
    flexStyle() {
      return {
        'flex': this.flex,
        '-webkit-box-flex': this.flex,
        '-moz-box-flex': this.flex,
        '-ms-flex': this.flex
      };
    },
    classNames() {
      const PREFIX = 'picker-slot-';
      let resultArray = [];

      let textAlign = this.textAlign || 'center';
      resultArray.push(PREFIX + textAlign);

      if (this.divider) {
        resultArray.push(PREFIX + 'divider');
      }

      if (this.className) {
        resultArray.push(this.className);
      }

      return resultArray.join(' ');
    },
    valueIndex() {
      var valueKey = this.valueKey;
      if (this.currentValue instanceof Object) {
        for (var i = 0, len = this.mutatingValues.length; i < len; i++) {
          if (this.currentValue[valueKey] === this.mutatingValues[i][valueKey]) {
            return i;
          }
        }
        return -1;
      } else {
        return this.mutatingValues.indexOf(this.currentValue);
      }
    },
    dragRange() {
      var values = this.mutatingValues;
      var visibleItemCount = this.visibleItemCount;
      var itemWidth = this.itemWidth;

      return [-itemWidth * (values.length - Math.ceil(visibleItemCount / 2)), itemWidth * Math.floor(visibleItemCount / 2)];
    },
    minTranslateY() {
      return this.itemWidth * (Math.ceil(this.visibleItemCount / 2) - this.mutatingValues.length);
    },
    maxTranslateY() {
      return this.itemWidth * Math.floor(this.visibleItemCount / 2);
    }
  },

  methods: {
    value2Translate(value) {
      var values = this.mutatingValues;
      var valueIndex = values.indexOf(value);
      var offset = Math.floor(this.visibleItemCount / 2);
      var itemWidth = this.itemWidth;

      if (valueIndex !== -1) {
        return (valueIndex - offset) * -itemWidth;
      }
    },

    translate2Value(translate) {

      var itemWidth = this.itemWidth;
      translate = Math.round(translate / itemWidth) * itemWidth;
      // var index = -(translate - Math.floor(this.visibleItemCount / 2) * itemWidth) / itemWidth;
      var index = -(translate) / itemWidth;

      return this.mutatingValues[index];
    },

    initEvents() {
      var el = this.$refs.wrapper;
      var dragState = {};
      var pickerItems;
      // var velocityTranslate, prevTranslate, pickerItems;

      draggable(el, {
        start: (event) => {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = null;
          dragState = {
            range: this.dragRange,
            start: new Date(),
            startLeft: event.pageX,
            // startTop: event.pageY,
            // startTranslateTop: translateUtil.getElementTranslate(el).top,
            startTranslateLeft: translateUtil.getElementTranslate(el).left //add by zyc
          };
          pickerItems = el.querySelectorAll('.picker-item');
        },

        drag: (event) => {
          this.dragging = true;

          dragState.left = event.pageX;
          // dragState.top = event.pageY;

          // var deltaY = dragState.top - dragState.startTop;
          // var translate = dragState.startTranslateTop + deltaY;

          /* add by zyc */
          var deltaX = dragState.left - dragState.startLeft;
          var translateX = dragState.startTranslateLeft + deltaX;
          /* add by zyc */

          translateUtil.translateElement(el, translateX, null);


          // velocityTranslate = translate - prevTranslate || translate;

          // prevTranslate = translate;
        },

        end: (event) => {
          this.dragging = false;

          // var momentumRatio = 7;
          // // var currentTranslate = translateUtil.getElementTranslate(el).top;
          // var currentTranslate = translateUtil.getElementTranslate(el).left;
          // var duration = new Date() - dragState.start;
          // // let distance = Math.abs(dragState.startTranslateTop - currentTranslate);
          // let distance = Math.abs(dragState.startTranslateLeft - currentTranslate);
          // var itemWidth = this.itemWidth;
          // var visibleItemCount = this.visibleItemCount;

          // let rect, offset;
          // if (distance < 6) {
          //   rect = this.$el.getBoundingClientRect();
          //   offset = Math.floor((event.clientY - (rect.top + (visibleItemCount - 1) * itemWidth / 2)) / itemWidth) * itemWidth;

          //   if (offset > this.maxTranslateY) {
          //     offset = this.maxTranslateY;
          //   }

          //   velocityTranslate = 0;
          //   currentTranslate -= offset;
          // }

          // var momentumTranslate;
          // if (duration < 300) {
          //   momentumTranslate = currentTranslate + velocityTranslate * momentumRatio;
          // }

          // var dragRange = dragState.range;

          // this.$nextTick(() => {
          //   var translate;
          //   // if (momentumTranslate) {
          //   //   translate = Math.round(momentumTranslate / itemWidth) * itemWidth;
          //   // } else {
          //   //   translate = Math.round(currentTranslate / itemWidth) * itemWidth;
          //   // }
          //   translate = Math.round(currentTranslate / itemWidth) * itemWidth;
          //   // translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);

          //   // translateUtil.translateElement(el, null, translate);
          //   translateUtil.translateElement(el, translate, null);

          //   // this.currentValue = this.translate2Value(translate);
          //   console.log(translate);

          // });

          dragState = {};
        }
      });
    },

    doOnValueChange() {
      var value = this.currentValue;
      var wrapper = this.$refs.wrapper;

      translateUtil.translateElement(wrapper, this.value2Translate(value), null);
    }
  },

  mounted() {

    this.initEvents();
    this.doOnValueChange();

  },

  watch: {

    mutatingValues(val) {
      if (this.valueIndex === -1) {
        this.currentValue = (val || [])[0];
      }
    },
    currentValue(val) {
      this.doOnValueChange();
      this.$emit('input', val);
    },
    defaultIndex(val) {
      if ((this.mutatingValues[val] !== undefined) && (this.mutatingValues.length >= val + 1)) {
        this.currentValue = this.mutatingValues[val];
      }
    }
  }
};
</script>


<style>
.picker-slot {
  font-size: 18px;
  overflow: hidden;
  position: relative;
  max-height: 100%;
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
  transition-duration: 0.3s;
  transition-timing-function: ease-out;
  backface-visibility: hidden;
}

.picker-slot-wrapper.dragging,
.picker-slot-wrapper.dragging .picker-item {
  transition-duration: 0s;
}

.picker-item {
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
  color: #000;
  transform: translate3d(0, 0, 0) rotateX(0);
}

.picker-3d .picker-items {
  overflow: hidden;
  perspective: 700px;
}

.picker-3d .picker-item,
.picker-3d .picker-slot,
.picker-3d .picker-slot-wrapper {
  transform-style: preserve-3d;
}

.picker-3d .picker-slot {
  overflow: visible;
}

.picker-3d .picker-item {
  transform-origin: center center;
  backface-visibility: hidden;
  transition-timing-function: ease-out;
}
</style>