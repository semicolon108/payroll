<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Company Work Day</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sunt quo illum in repellendus alias corporis error facere nostrum quae aliquid illo blanditiis nihil consectetur expedita, amet officia optio eveniet?</p>
    </div>
    <div class="field">
      <label for="" class="label">Work Day</label>
      <div class="control">
        <input v-model="workingDay" type="text" class="input">
      </div>
    </div>

    <button @click="updateCompanyInfo" class="button">Save</button>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'

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
      await this.updateCompany({ workingDay: parseInt(this.workingDay, 10) })
      alert('Updated')
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
  font-weight: normal;
}
.button{
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}
</style>