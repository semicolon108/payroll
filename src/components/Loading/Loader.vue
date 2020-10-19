<template>
  <div class="lottie-container is-active"
  v-if="$store.getters.isLoading"
  >
    <div class="bg"></div>
    <div class="box slide-down">

      <Completed
          v-if="$store.getters.isCompleted"
          class="lottie-box"
          :options="{...completedOptions, loop: true}"
          :height="120" :width="220"/>


      <Loading

          v-else
          class="lottie-box"
          :options="{...loadingOptions, loop: true}"
          :height="120" :width="220"/>
<!--      <lottie-->
<!--          v-else-->
<!--          class="lottie-box"-->
<!--          :options="{...loadingOptions, loop: true}"-->
<!--          :height="120" :width="220"/>-->

      <div class="msg">
        <!-- Payslip sent -->
        <!-- <h3>Send Completed</h3>
        <p>Pay slip has been sent to employee's email</p> -->
        <br>
        <h3>Loading...</h3>
        <!--                <button class="button">Okay</button>-->
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import Completed from './lottie.vue';
import Loading from './lottie'

export default {
  components: {
    Completed,
    Loading
  },
  data: () => ({
    completedOptions: {},
    loadingOptions: {}
  }),
  // watch: {
  //   async '$store.getters.isLoading' (val) {
  //     if(!val) {
  //       this.isCompleted = true
  //       setTimeout(() => {
  //         this.isCompleted = false
  //       }, 1200)
  //     }
  //   }
  // },
  created(){
    this.loadingOptions = { animationData: require(`./email-sent.json`) }
    this.completedOptions = { animationData: require(`./completed.json`) }
  }

}
</script>

<style lang="scss" scoped>
.lottie-container{
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
  .box{
    width: 400px;
    max-width: 500px;
    .lottie-box{
      height: 120px;
    }
    .msg{
      color: $font-color;
      text-align: center;
      h3{
        font-size: 22px;
        font-weight: 700;
      }
      p{
        font-size: 16px;
      }
      .button{
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