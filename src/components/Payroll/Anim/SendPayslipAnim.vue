<template>
  <div v-if="isCalculating || afterCalculated" class="lottie-container is-active">
    <div class="bg"></div>
    <div class="box slide-down">
      <div v-if="isCalculating">
        <Calculating
            type="Calculating"/>
        <!--  <p>Sending...</p>-->
      </div>
      <div v-else-if="afterCalculated">
        <Completed
            type="Completed"/>
        <div style="display: flex; justify-content: center">
          <button @click="afterCalculated = false" class="button">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calculating from './Lottie/Loader'
import Completed from './Lottie/Loader'

export default {
  components: {
    Calculating,
    Completed
  },
  props: ['isCalculating'],
  data: () => ({
    afterCalculated: false
  }),
  watch: {
    isCalculating(val) {
      if (!val) {
        this.afterCalculated = true
      }
    },
    // afterCalculated(val) {
    //   if (val) setTimeout(() => {
    //     this.afterCalculated = false
    //   }, 1200)
    // }
  }
}
</script>

<style lang="scss" scoped>
.lottie-container {
  background-color: rgba(#000, .8);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .box {
    width: 400px;
    max-width: 500px;

    .lottie-box {
      height: 120px;
    }

    .msg {
      color: $font-color;
      text-align: center;

      h3 {
        font-size: 22px;
        font-weight: 700;
      }

      p {
        font-size: 16px;
      }

      .button {
        margin-top: 10px;
        background-color: $primary-color;
        color: #fff;
        border-radius: $radius;
        font-size: 18px;
      }
    }
  }
}
</style>