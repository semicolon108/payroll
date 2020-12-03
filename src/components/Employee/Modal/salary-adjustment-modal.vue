<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card slide-down">

      <ValidationObserver v-slot="{ handleSubmit }">
        <header class="modal-card-head">
          <h3>Salary Adjustment</h3>
          <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="" class="label">Type</label>
            <div class="control">
              <div class="select">
                <ValidationProvider name="Type" rules="required" v-slot="{ errors }">
                  <select v-model="form.type" class="select">
                    <option value="Increase">Increase</option>
                    <option value="Decrease">Decrease</option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="field">
            <label for="" class="label">Reference Date</label>
            <div class="control">
              <ValidationProvider name="Reference Date" rules="isDateOrNull" v-slot="{ errors }">
                <DatePicker v-model="form.refDate"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="field">
            <label class="label">Amount</label>
            <div class="control">
              <ValidationProvider name="Amount" rules="required|numeric" v-slot="{ errors }">
                <currency-input
                    v-model="form.adjustmentAmount"
                    class="input"
                    :allow-negative="false"
                    :value-range="{ min: 0 }"
                    :distraction-free="false"
                    :currency="{ prefix: '', suffix: '' }"
                    :value-as-integer="true"
                    :precision="0"
                />
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="field">
            <label class="label">Before / After Adjustment</label>
            <div class="control columns" style="margin: 5px 0 5px">
              <input :value="beforeAdjustment | currency" type="text" class="input" disabled>
              <input :value="afterAdjustment | currency" type="text" class="input" disabled>
            </div>
          </div>
          <div class="field">
            <label class="label">Memo</label>
            <div class="control">
              <ValidationProvider name="Memo" rules="required" v-slot="{ errors }">
                <input v-model="form.memo" type="text" class="input">
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="handleSubmit(adjustSalary)" class="button primary">Save</button>
        </footer>
      </ValidationObserver>
    </div>

  </div>
</template>

<script>
import DatePicker from "@/utils/DatePicker";
import {adjustSalary, getHirringDetail} from "@/apis/hirring-detail-api";

export default {
  props: ['isEditMode'],
  components: {DatePicker},
  data: () => ({
    hiringDetail: {},
    form: {
      type: 'Increase'
    },
    beforeAdjustment: null
  }),
  computed: {
    afterAdjustment() {
      let calc = 0
      if(this.form.type === 'Increase') calc =  parseInt(this.beforeAdjustment, 10) + parseInt(this.form.adjustmentAmount, 10)
      else calc = parseInt(this.beforeAdjustment, 10) - parseInt(this.form.adjustmentAmount, 10)
      return calc ? calc : ''
    }
  },
  methods: {
    closeModal() {
      this.$emit('CloseModal')
    },
    async getHiringDetail() {
      const data = await getHirringDetail(this.$route.params.id)
      this.hiringDetail = {
        ...data,
        workPermit: {
          startDate: data.workPermit.startDate,
          endDate: data.workPermit.endDate,
          daysOfNotify: data.workPermit.daysOfNotify
        },
      }
      this.beforeAdjustment = this.hiringDetail.salary
    },
   async adjustSalary() {
        this.form.employeeId = this.$route.params.id
        this.form.adjustmentAmount = parseInt(this.form.adjustmentAmount, 10)
        await adjustSalary(this.form)
        this.$emit('AdjustSalary')
    }

  },
  created() {
    this.getHiringDetail()
  }
}
</script>

<style lang="scss" scoped>
</style>