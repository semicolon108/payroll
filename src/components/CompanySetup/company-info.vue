<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Company Info</h3>
    </div>
    <div class="field">
      <label for="" class="label">Company name</label>
      <div class="control">
        <input v-model="company.name" type="text" class="input">
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Company industry</label>
      <div class="control">
        <input type="text" class="input">
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Company Address</label>
      <div class="control">
        <textarea class="textarea"></textarea>
      </div>
    </div>
    <button class="button">Save</button>
  </div>
</template>

<script>
import {GET_COMPANY} from "@/graphql/Company";

export default {
  data: () => ({
    company: {}
  }),
  methods: {
    async getCompany() {
      try {
        const res = await this.$apollo.query({
          query: GET_COMPANY
        })
        this.company = res.data.getCompany
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  created() {
    this.getCompany()
  }
}
</script>

<style lang="scss" scoped>
.box-header{
  display: flex;
  color: $font-color;
  margin-bottom: 20px;
  align-items: center;
  .box-title{
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
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