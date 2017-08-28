<template>
  <span
    class="mb-ripple"
    @click="click($event)"
    @mousedown="onMousedown($event)"
    @mouseout="onMouseup"
    @mouseup="onMouseup"
  >
    <slot></slot>
    <span class="mb-ripple-container">
      <span
        :class="['mb-ripple-content', {
          visible: isTouch,
          isAnimating: !isTouchMoment
        }]"
        :style="{
          transform: translate,
          width: rippleW + 'px',
          height: rippleW + 'px'
        }">
      </span>
    </span>
  </span>
</template>
<script>
export default {
  name: 'vue-ripper-effect',
  data() {
    return {
      translateX: 0,
      translateY: 0,
      isTouch: false,
      isTouchMoment: false,
      rippleW: 50
    }
  },
  computed: {
    translate() {
      return 'translate(-50%, -50%) translate(' + this.translateX + 'px,' + this.translateY + 'px)' + (this.isTouchMoment ? 'scale(0.0001, 0.0001)' : '')
    }
  },
  methods: {
    click(evt) {
      this.$emit('click', evt)
    },
    onMousedown(evt) {
      this.translateX = evt.offsetX
      this.translateY = evt.offsetY
      this.isTouch = true
      this.isTouchMoment = true
      setTimeout(_ => {
        this.isTouchMoment = false
      }, 0)
    },
    onMouseup() {
      this.isTouch = false
    }
  },
  mounted() {
    const w = this.$el.offsetWidth
    const h = this.$el.offsetHeight
    const r = Math.sqrt(w * w + h * h)
    this.rippleW = r * 2
  }
}
</script>
<style lang="scss">
.mb-ripple {
  width: auto;
  border: none;
  position: relative;
  margin: 0;
  display: inline-block;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  vertical-align: middle;

  &-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: block;
    overflow: hidden;
  }
  &-content {
    display: block;
    background-color: #000;
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }
}
.mb-ripple .isAnimating {
  transition:
    transform .5s cubic-bezier(0,0,.2,1),
    width .5s cubic-bezier(0,0,.2,1),
    height .5s cubic-bezier(0,0,.2,1),
    opacity 1s cubic-bezier(0,0,.2,1);
}
.mb-ripple .visible {
  opacity: 0.38;
}
</style>
