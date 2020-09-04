<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">TAX</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore facere quidem magnam, voluptatum non ipsam libero consequatur modi. Fuga unde voluptatibus vitae laborum eveniet excepturi tempora, maiores dignissimos consequatur nam.</p>
    </div>
    <div class="field">
      <label for="" class="label">TAX</label>
        <div class="control switch">
            <input @click="isTaxPaidByCompany = false" type="radio" name="tax" id="employeetax"  :checked="!isTaxPaidByCompany">
            <label for="employeetax">Employee pay</label>

            <input @click="isTaxPaidByCompany = true" type="radio" name="tax" id="employertax" :checked="isTaxPaidByCompany">
            <label for="employertax">Employer pay</label>
        </div>
    </div>
    <button @click="updateCompanyInfo" class="button">Save</button>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data: () => ({
    isTaxPaidByCompany: false
  }),
  computed: {
    ...mapGetters(['getCompany'])
  },
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      await this.updateCompany({ isTaxPaidByCompany: this.isTaxPaidByCompany })
      alert('Updated')
    }
  },
  created() {
    this.isTaxPaidByCompany = this.getCompany.isTaxPaidByCompany
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
label{
  font-weight: normal;
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