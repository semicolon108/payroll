<template>
<div>
  <div v-if="isCalculating" class="anim">
    <div class="anim-bg"></div>
    <img src="../../../../public/assets/gif/calc-anim.gif" alt="">
  </div>
  <div v-if="afterCalculated" class="anim">
    <div class="anim-bg"></div>
    <img src="../../../../public/assets/gif/done-calc-anim.gif" alt="">
  </div>
</div>
</template>

<script>
export default {
  props: ['isCalculating'],
  data: () => ({
    afterCalculated: false
  }),
  watch: {
    isCalculating(val) {
      if(!val) this.afterCalculated = true
    },
    afterCalculated(val) {
      if(val) setTimeout(() => {
        this.afterCalculated = false
      }, 1200)
    }
  }
}
</script>

<style lang="scss" scoped>
.anim {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  .anim-bg {

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 30%;
  }
  img {
    z-index: 999;
    border-radius: 20px;

  }
}

</style>