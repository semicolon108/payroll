<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Basic information</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique aspernatur repudiandae ab officia inventore at impedit ipsa! Exercitationem, placeat, ducimus possimus molestiae ratione rerum, explicabo beatae ipsum maiores odio dolor!</p>
    </div>
    <div class="field">
      <label for="" class="label">Company name</label>
      <div class="control">
        <input v-model="form.basicInfo.name" type="text" class="input">
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Company industry</label>
      <div class="control">
        <input  type="text" class="input">
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Company Address</label>
      <div class="control">
        <textarea v-model="form.basicInfo.address" class="textarea"></textarea>
      </div>
    </div>
    <h3 class="title">Contact Person</h3>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">Contact name</label>
                <div class="control">
                    <input v-model="form.contactPerson.name" type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">Contact Email</label>
                <div class="control">
                    <input v-model="form.contactPerson.email"  type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">Contact Number</label>
                <div class="control">
                    <input v-model="form.contactPerson.mobile"  type="text" class="input" disabled>
                </div>
            </div>
        </div>
    </div>

    <h3 class="title">Company Email</h3>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">From Name</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">Company Email</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
    </div>
    <h3 class="title">Financial Information</h3>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">Bank name</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">Bank account number</label>
                <div class="control">
                    <input v-model="form.financialInfo.accountNumber" type="text" class="input" disabled>
                </div>
            </div>
        </div>
    </div>
    <button class="button">Save</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {updateCompany} from "@/apis/company-api";

export default {
  computed: {
    ...mapGetters(['getCompany'])
  },
  data: () => ({
    form: {
      basicInfo: {
        name: '',
        address: ''
      }
    }
  }),
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      await updateCompany(this.form)
      alert('Updated')
    }
  },
  created() {
    this.form  = {
      basicInfo: {
        name: this.getCompany.basicInfo.name,
        address: this.getCompany.basicInfo.address
      },
      contactPerson: {
        name: this.getCompany.contactPerson.name,
        email: this.getCompany.contactPerson.email,
        mobile: this.getCompany.contactPerson.mobile
      },
      financialInfo: {
        accountNumber: this.getCompany.financialInfo.accountNumber
      }
    }
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
.title{
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 15px;
    margin-top: 30px;
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