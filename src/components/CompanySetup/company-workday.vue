<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Company Work Day</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sunt quo illum in repellendus alias corporis error facere nostrum quae aliquid illo blanditiis nihil consectetur expedita, amet officia optio eveniet?</p>
    </div>
      <div class="field">
        <label for="" class="label">Work Day / Month</label>
        <div class="control">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input v-model="workingDay" type="text" class="input">
            <p class="has-text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
      </div>
<!--      <div class="field">-->
<!--        <label class="label">Work Hours / Day</label>-->
<!--        <div class="control">-->
<!--          <ValidationProvider rules="required" v-slot="{ errors }">-->
<!--            <input v-model="workingDay" type="text" class="input">-->
<!--            <p class="has-text-danger">{{ errors[0] }}</p>-->
<!--          </ValidationProvider>-->
<!--        </div>-->
<!--      </div>-->


    

    <button @click="handleSubmit(updateCompanyInfo)" class="button">Save</button>
    </ValidationObserver>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import {loadingTimeout} from "@/config/variables";

export default {
  data: () => ({
    workingDay: null
  }),
  computed: {
    ...mapGetters(['getCompany'])
  },
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      this.$store.commit('SET_IS_LOADING', true)
      await this.updateCompany({ workingDay: parseInt(this.workingDay, 10) })
      setTimeout(() => {
        this.$store.commit('SET_IS_LOADING', false)
      }, loadingTimeout)
    }
  },
  created() {
    this.workingDay = this.getCompany.workingDay
  }
}
</script>

<style lang="scss" scoped>
.box-header{
  color: $font-color;
  margin-bottom: 20px;
  .box-title{
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 5px;;
  }
}

.input, .textarea{
  @include input;
}
label{
  font-weight: 700;
  p{
    font-weight: normal;
  }
}
.button{
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}
</style>