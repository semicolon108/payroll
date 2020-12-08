<template>
  <div class="box">
    <div class="box-header">
      <h3 class="box-title">Payroll Rule</h3>
    </div>
    <div class="field">
      <label for="" class="label">Does your company need an approval before sending paylip?</label>
      <div class="control switch">
        <input type="radio" name="approved" id="need" :checked="!isApprovedBeforeCalc">
        <label @click="isApprovedBeforeCalc = false" for="need">No</label>
        <input type="radio" name="approved" id="unneed" :checked="isApprovedBeforeCalc">
        <label @click="isApprovedBeforeCalc = true" for="unneed">Yes</label>
      </div>
    </div>

    <div v-if="isApprovedBeforeCalc" style="margin-bottom: 15px">
      <h3 class="title">Authority</h3>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label for="" class="label">Authority Name</label>
            <div class="control">
              <input v-model="form.authorityName" type="text" class="input">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="" class="label">Authority Email</label>
            <div class="control">
              <input v-model="form.authorityEmail" type="text" class="input">
            </div>
          </div>
        </div>
      </div>

      <h3 class="title">Payroll Manager</h3>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label for="" class="label">Name</label>
            <div class="control">
              <input v-model="form.payrollManagerName" type="text" class="input">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label for="" class="label">Email</label>
            <div class="control">
              <input v-model="form.payrollManagerEmail" type="text" class="input">
            </div>
          </div>
        </div>
      </div>
    </div>


    <button @click="updateCompanyInfo" class="button primary">Save</button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    form: {
      authorityName: '',
      authorityEmail: '',
      payrollManagerName: '',
      payrollManagerEmail: ''
    },
    isApprovedBeforeCalc: false
  }),
  computed: {
    ...mapGetters(['getCompany'])
  },
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      try {
        await this.$store.dispatch('loading')
        await this.updateCompany({
          payrollRule: this.form,
          isApprovedBeforeCalc: this.isApprovedBeforeCalc
        })
        await this.$store.dispatch('completed')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
  },
  created() {
    this.form = {
      authorityName: this.getCompany.payrollRule.authorityName,
      authorityEmail: this.getCompany.payrollRule.authorityEmail,
      payrollManagerName: this.getCompany.payrollRule.payrollManagerName,
      payrollManagerEmail: this.getCompany.payrollRule.payrollManagerEmail
    }
    this.isApprovedBeforeCalc = this.getCompany.isApprovedBeforeCalc
  }
}
</script>

<style lang="scss" scoped>
.box-header {
  color: $font-color;
  margin-bottom: 20px;

  .box-title {
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 5px;
  }
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: $font-color;
  margin-bottom: 15px;
  margin-top: 30px;
}

.input, .textarea {
  @include input;
}

.button {
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch {
  display: flex;
  align-items: center;
  width: 50%;

  label {
    width: 50%;
    height: 36px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  input {
    display: none;

    &:checked + label {
      background-color: $sub-color;
      color: #fff;
    }
  }
}
</style>