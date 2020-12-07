<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Social Security Organization (SSO)</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo modi illum pariatur. Officiis numquam, id exercitationem sequi nihil ad nisi incidunt? Minus maxime distinctio in quis. Perferendis pariatur voluptatibus delectus.</p>
    </div>
    <div class="field">
      <label for="" class="label">SSO</label>
      <div class="control switch">
          <input @click="isSsoPaidByCompany = false" type="radio" name="sso" id="employee" :checked="!isSsoPaidByCompany">
          <label for="employee">Employee pay 5.5%</label>

          <input @click="isSsoPaidByCompany = true"  type="radio" name="sso" id="employer" :checked="isSsoPaidByCompany">
          <label for="employer">Company pay 11.5%</label>
      </div>
    </div>
    <button @click="updateCompanyInfo" class="button primary">Save</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  data: () => ({
    isSsoPaidByCompany: false
  }),
  computed: {
    ...mapGetters(['getCompany'])
  },
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      try {
        await this.$store.dispatch('loading')
        await this.updateCompany({ isSsoPaidByCompany: this.isSsoPaidByCompany })
        await this.$store.dispatch('completed')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    }
  },
  created() {
    this.isSsoPaidByCompany = this.getCompany.isSsoPaidByCompany
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
.field{
  width: 50%;
}
.input, .textarea{
  @include input;
}
.button{
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch{
    display: flex;
    align-items: center;
    label{
        width: 50%;
        height: 36px;
        background-color: $light-grey-color;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    input{
        display: none;
        &:checked + label{
            background-color: $sub-color;
            color: #fff;
        }
    }
}
</style>