<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Earning / Deduction</h3>
    </div>

    <div class="box current">
      <h3 class="box-title">Current Earning / Deduction List</h3>
      <div class="summary-container">
          <div class="summary-items">
            <div class="summary-item">
                  <span>Total Employees</span>
                  <h3>30</h3>
              </div>
              <div class="summary-item">
                  <span>Earning</span>
                  <h3>3,000,000</h3>
              </div>
              <div class="summary-item">
                  <span>Deduction</span>
                  <h3>3,000,000</h3>
              </div>
              <div class="summary-item">
                  <span>Status</span>
                  <h3> {{ getCurrent.isApproved ? 'Approved' : 'Unapproved' }}</h3>
              </div>
          </div>
          <div
              @click="$router.push({name:'deductable_detail', params: { id: getCurrent._id }})"
              class="summary-option">
              <span >Calculate</span>
          </div>
      </div>
  </div> <!-- Current Box -->


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
        <tr v-for="(i) in getExceptCurrent" :key="i._id">
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
  computed: {
    getCurrent() {
      return this.monthlyPayments.find((i, idx) => idx === 0)
    },
    getExceptCurrent() {
      return this.monthlyPayments.filter((i, idx) => idx !== 0)
    }
  },
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
.box{
    &.current{
        padding: 0;
        box-shadow: none;
        border: none;
        .box-title{
            font-weight: normal;
            font-size: 14px;
            margin: 0px;
            background-color: $primary-color;
            color: #fff;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px 3px 0 0;
        }
        .summary-container{
            display: flex;
            .summary-option{
                background-color: $primary-color;
                color: #fff;
                padding: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            .summary-items{
                border: 1px solid $primary-color;
                padding: 10px;
                flex-grow: 1;
                display: flex;
                color: $font-color;
                .summary-item{
                    flex-grow: 1;
                span{
                    font-size: 14px;
                    color: $font-grey-color;
                }
                h3{
                    font-size: 18px;
                    font-weight: 700;
                    color: $primary-color;;
                }
            }
        }
        }
    }
    .box-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
        color: $font-color;
    }
}


.option {
  color: $primary-color;
  white-space: pre;
  display: inline-block;
  cursor: pointer;
  border: none;

  &.is-primary {
    padding: 5px 15px;
    background-color: $primary-color;
    color: #fff;
  }

  a {
    color: #fff;
  }

  span {
    margin-left: 5px;
  }
}
</style>