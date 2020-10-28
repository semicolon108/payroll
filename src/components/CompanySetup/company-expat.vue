<template>
  <div class="box slide-up">
    <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="box slide-up">

    <div class="box-header">
      <h3 class="box-title">Expat Manager</h3>
    </div>

    <div class="field">
      <label for="" class="label">Does your company hire Expat?</label>
      <div class="control switch">
        <input type="radio" name="approved" id="need" :checked="!form.isHiringExpat">
        <label @click="form.isHiringExpat = false" for="need">No</label>
        <input type="radio" name="approved" id="unneed" :checked="form.isHiringExpat">
        <label @click="form.isHiringExpat = true" for="unneed">Yes</label>
      </div>
    </div>

    <h3 v-if="form.isHiringExpat" class="title">Work permit notification</h3>
    <div v-if="form.isHiringExpat" class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">Email to get notification</label>
                <div class="control">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input v-model="form.expatManager.notificationEmail" type="text" class="input">
                  </ValidationProvider>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">The notice period (Day)</label>
                <div class="control">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input v-model="form.expatManager.noticePeriodDay" type="text" class="input">
                  </ValidationProvider>
                </div>
            </div>
        </div>
    </div>


    <button @click="handleSubmit(updateCompanyInfo)" class="button">Save</button>

    </ValidationObserver>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import {getReuse} from "@/apis/reuse-api";

export default {
  computed: {
    ...mapGetters(['getCompany'])
  },
  data: () => ({
    form: {
      isHiringExpat: false,
      expatManager: {
        notificationEmail: '',
        noticePeriodDay: null
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
  },
  async created() {
     await getReuse('Bank')
      this.form = {
        isHiringExpat: this.getCompany.isHiringExpat,
        expatManager: {
          notificationEmail:  this.getCompany.expatManager.notificationEmail,
          noticePeriodDay: this.getCompany.expatManager.noticePeriodDay
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
    margin-bottom: 5px;
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

.button{
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch{
    display: flex;
    align-items: center;
    width: 50%;
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