<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Company Work Day</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sunt quo illum in repellendus alias corporis error facere nostrum quae aliquid illo blanditiis nihil consectetur expedita, amet officia optio eveniet?</p>
    </div>
    <div class="field">
      <label for="" class="label">Work Day</label>
      <div class="control">
        <input v-model="company.name" type="text" class="input">
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