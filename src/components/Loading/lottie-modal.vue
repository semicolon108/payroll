<template>
    <div class="lottie-container is-active">
        <div class="bg"></div>
        <div class="box slide-down" v-if="modal">
          <lottie
              v-if="$store.getters.isLoading"
              class="lottie-box"
              :options="{...loadingOptions, loop: true}"
              :height="120" :width="220"

          />

            <lottie
                v-else
            class="lottie-box"
            :options="{...defaultOptions, loop: false}"
            :height="120" :width="220"/>

            <div class="msg">
                <!-- Payslip sent -->
                <!-- <h3>Send Completed</h3>
                <p>Pay slip has been sent to employee's email</p> -->
              <br>
              {{ $store.getters.type }}
                <h3>Loading</h3>
<!--                <button class="button">Okay</button>-->
              <br>
            </div>
        </div>
    </div>
</template>

<script>
  import Lottie from './lottie.vue';

  export default {
    props: ['type'],
    components: {
      'lottie': Lottie
    },
    data: () => ({
        modal: true,
        defaultOptions: {},
        loadingOptions: {}
    }),
    created(){
      this.loadingOptions = { animationData: require(`./email-sent.json`) }
      const arr = [
        { fileName: 'email-sent.json', name: 'EmailSent' },
        { fileName: 'completed.json', name: 'Completed' }
      ]
      const choosen = arr.find(i => i.name === this.type)
      this.defaultOptions = { animationData: require(`./${choosen.fileName}`) }
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