<template>
  <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="box">
    <div class="box-header">
      <h3 class="box-title">Basic information</h3>
    </div>
    <div class="field">
      <label for="" class="label">Company name</label>
      <div class="control">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input v-model="form.basicInfo.name" type="text" class="input">
          <p class="has-text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Company industry</label>
      <div class="control">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input v-model="form.basicInfo.industry" class="input" type="text">
          <p class="has-text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
    </div>
    <div class="field">
      <label for="" class="label">Company Address</label>
      <div class="control">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <textarea v-model="form.basicInfo.address" class="textarea"></textarea>
          <p class="has-text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
      </div>
    </div>
    <h3 class="title">Contact Person</h3>
    <div class="columns" v-if="form.contactPerson">
      <div class="column">
        <div class="field">
          <label for="" class="label">Contact name</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.contactPerson.name" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="" class="label">Contact Email</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.contactPerson.email" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="" class="label">Contact Number</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.contactPerson.mobile" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </div>
    </div>

    <h3 class="title">Company Email</h3>
    <div class="columns" v-if="form.mailer">
      <div class="column">
        <div class="field">
          <label for="" class="label">From Name</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.mailer.name" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="" class="label">Company Email</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.mailer.email" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </div>
    </div>
    <h3 class="title">Financial Information</h3>
    <div class="columns"    v-if="form.financialInfo">
      <div class="column">
        <div class="field">
          <label for="" class="label">Bank name</label>
          <div class="control">
            <!--            <ValidationProvider rules="required" v-slot="{ errors }">-->
            <select

                class="input" v-model="form.financialInfo.bankId">
              <option :value="i._id" v-for="i in banks" :key="i._i">{{ i.name }}</option>
            </select>
            <!--              <p class="has-text-danger">{{ errors[0] }}</p>-->
            <!--            </ValidationProvider>-->
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label for="" class="label">Bank account number</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.financialInfo.accountNumber" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </div>
    </div>
    <button @click="handleSubmit(updateCompanyInfo)" class="button primary">Save</button>
  </ValidationObserver>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {getReuse} from "@/apis/reuse-api";

export default {
  computed: {
    ...mapGetters(['getCompany'])
  },
  data: () => ({
    industries: [],
    banks: [],
    form: {
      basicInfo: {
        name: '',
        address: '',
        industry: ''
      }
    }
  }),
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      try {
        await this.$store.dispatch('loading')
        await this.updateCompany(this.form)
        await this.$store.dispatch('completed')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async getBanks() {
      this.banks = await getReuse('Bank')
    }
  },
  async created() {
    await this.getBanks()

    this.form = {
      basicInfo: {
        name: this.getCompany.basicInfo.name,
        address: this.getCompany.basicInfo.address,
        industry: this.getCompany.basicInfo.industry
      },
      contactPerson: {
        name: this.getCompany.contactPerson.name,
        email: this.getCompany.contactPerson.email,
        mobile: this.getCompany.contactPerson.mobile
      },
      financialInfo: {
        bankId: this.getCompany.financialInfo.bankId ? this.getCompany.financialInfo.bankId._id : this.banks[0]._id,
        accountNumber: this.getCompany.financialInfo.accountNumber
      },
      mailer: {
        name: this.getCompany.mailer.name,
        email: this.getCompany.mailer.email
      }
    }


  }
}
</script>

<style lang="scss" scoped>
select {
  cursor: pointer;
}

.box-header {
  color: $font-color;
  margin-bottom: 20px;

  .box-title {
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 5px;;
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
</style>