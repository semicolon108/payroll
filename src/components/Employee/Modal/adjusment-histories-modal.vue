<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card slide-down" style="width: 1000px; height: 500px; overflow-y: auto">
      <header class="modal-card-head">
        <h3>Adjustment Histories</h3>
        <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <table class="table is-fullwidth" id="my-table">
          <thead >
          <tr>
            <th v-for="(i, idx) in headers" :key="idx">{{ i.name }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, idx) in salaryHistories" :key="idx">
            <td v-for="(h, idx) in headers" :key="idx">{{ i[h.key] }}</td>
          </tr>
          </tbody>
        </table>
      </section>

    </div>
  </div>
</template>

<script>
import {getHirringDetail} from "@/apis/hirring-detail-api";
import moment from 'moment'

export default {
  data: () => ({
    hiringDetail: {},
    form: {
      type: 'Increase'
    },

    headers: [
      {
        key: 'type',
        name: 'Type'
      },
      {
        key: 'refDate',
        name: 'Reference Date'
      },
      {
        key: 'adjustmentAmount',
        name: 'Amount'
      },
      {
        key: 'beforeAdjustment',
        name: 'Before Adjustment'
      },
      {
        key: 'afterAdjustment',
        name: 'After Adjustment'
      },
      {
        key: 'memo',
        name: 'Memo'
      },
    ],
    salaryHistories: []
  }),
  methods: {
    closeModal() {
      this.$emit('CloseModal')
    },
    async getHiringDetail() {
      const data = await getHirringDetail(this.$route.params.id)
      this.salaryHistories = data.salaryHistories
      this.hiringDetail = {
        ...data,
        workPermit: {
          startDate: data.workPermit.startDate,
          endDate: data.workPermit.endDate,
          daysOfNotify: data.workPermit.daysOfNotify
        },
      }
      this.salaryHistories = this.salaryHistories.map(i => ({
        ...i,
        adjustmentAmount: new Intl.NumberFormat().format(i.adjustmentAmount),
        refDate: moment(i.refDate).locale('lo').format('DD-MM-YYYY'),
        beforeAdjustment: new Intl.NumberFormat().format(i.beforeAdjustment),
        afterAdjustment: new Intl.NumberFormat().format(i.afterAdjustment)
      }))
    }
  },
  created() {
    this.getHiringDetail()
  }
}
</script>

<style lang="scss" scoped>
</style>