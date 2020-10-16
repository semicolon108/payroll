<template>
    <div class="lottie-container" :class="{'is-active' : modal}">
        <button class="button" @click="modal = !modal">Show</button>
        <div class="bg"></div>
        <div class="box slide-down" v-if="modal">
            <lottie 
            class="lottie-box"
            :options="{...defaultOptions, loop: true}"
            :height="120" :width="220"/>

            <div class="msg">
                <!-- Payslip sent -->
                <!-- <h3>Send Completed</h3>
                <p>Pay slip has been sent to employee's email</p> -->

                <h3>Add Employee Completed</h3>

                <button class="button">Okay</button>
            </div>
            
        </div>
    </div>
</template>

<script>
  import Lottie from './lottie.vue';

  export default {
    components: {
      'lottie': Lottie
    },
    data: () => ({
        modal: false,
        defaultOptions: {},
    }),
    created(){
        this.defaultOptions = {animationData: require('./completed.json')}
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