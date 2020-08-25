<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Earning / Deduction</h3>
    </div>

    <div class="box slide-up">
      <table class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th class="is-sm">Payment Date</th>
          <th class="is-right">Earning</th>
          <th class="is-right">Deduction</th>
          <th class="is-sm is-right">Status</th>
          <th class="is-xs is-right">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i) in monthlyPayments" :key="i._id">
          <td>{{ i.paymentDate | moment }}</td>
          <td class="is-right">200,000</td>
          <td class="is-right">50,000</td>
          <td class="is-right">
            <div class="status" :class="{'approved': i.isApproved}">
              <span><i class="fas fa-check-circle"></i></span>
              <span>Approved</span>
            </div>
          </td>
          <td class="is-right">
            <div class="button-group">
              <button class="button" @click="$router.push({name:'deductable_detail', params: { id: i._id }})">Check</button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {getMonthlyPayments} from "@/apis/monthly-payment-api";
import moment from 'moment'

export default {
  data: () => ({
    monthlyPayments: []
  }),
  filters: {
    moment(date) {
      return moment(date).format('ll')
    }
  },
  created() {
    this.getMonthlyPayments()
  },
  methods: {
    async getMonthlyPayments() {
      this.monthlyPayments = await getMonthlyPayments()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>