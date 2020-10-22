<template>
  <div>
    <Lottie
        v-if="type === 'Calculating'"
        class="lottie-box"
        :options="{...calculatingOptions, loop: true}"
        :height="220" :width="220"
    />
    <Lottie
        v-if="type === 'EmailSent'"
        class="lottie-box"
        :options="{...emailSentOptions, loop: true}"
        :height="220" :width="220"
    />
    <Lottie
        v-if="type === 'Completed'"
        class="lottie-box"
        :options="{...completedOptions, loop: false}"
        :height="220" :width="220"
    />
  </div>
</template>

<script>
import Lottie from './Lottie.vue';

export default {
  props: ['type'],
  components: {
    Lottie
  },
  data: () => ({
    completedOptions: {},
    emailSentOptions: {},
    calculatingOptions: {}
  }),
  created(){
    this.completedOptions = { animationData: require(`./json/completed.json`) }
    this.emailSentOptions = { animationData: require('./json/email-sent.json') }
    this.calculatingOptions = { animationData: require('./json/rocket.json') }
  }

}
</script>

