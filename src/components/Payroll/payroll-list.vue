<template>
  <div class="slide-up">
    <div class="page-header">
      <h3 class="page-title">Payroll</h3>
    </div>
    <div class="box current">
        <h3 class="box-title">Current Payroll</h3>
        <div class="summary-container">
            <div class="summary-items">
                <div class="summary-item">
                    <span>Total Employees</span>
                    <h3>{{currentItem.employeeCount }}</h3>
                </div>
                <div class="summary-item">
                    <span>Total SSO</span>
                    <h3>{{ currentItem.totalSso | currency }}</h3>
                </div>
                <div class="summary-item">
                    <span>Total TAX</span>
                    <h3>{{ currentItem.totalTax | currency }}</h3>
                </div>
                <div class="summary-item">
                    <span>Total Net Salary</span>
                    <h3>{{ currentItem.totalSalary | currency }}</h3>
                </div>
            </div>
          <div
              v-if="currentItem.isApproved"
              @click="$router.push({ name: 'payrollCalculation', params: { id: currentItem.monthlyPaymentId } })"
              class="summary-option">
            <span>Calculate</span>
          </div>
            <div v-else class="summary-option"
                 @click="alert = 'checkDeductible'; monthlyPaymentId = currentItem.monthlyPaymentId "
            >
                <span>Calculate</span>
            </div>
        </div>
    </div>

    <div class="box">
      <h3 class="box-title">Previous Payroll</h3>
      <table class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th>Payment date</th>
          <th class="is-right">No. of employee</th>
          <th class="is-right">Total SSO</th>
          <th class="is-right">Total TAX</th>
          <th class="is-right">Total Salary</th>
          <th class="is-sm is-right">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="i in exceptCurrent" :key="i._id">
          <td>{{ i.paymentDate | moment }}</td>
          <td class="is-right">{{ i.employeeCount }}</td>
          <td class="is-right">{{ i.totalSso | currency }}</td>
          <td class="is-right">{{ i.totalTax | currency }}</td>
          <td class="is-right">{{ i.totalSalary | currency }}</td>
          <td class="is-right">
            <div v-if="i.isApproved" class="option is-primary">
              <router-link :to="{ name: 'payrollCalculation', params: { id: i.monthlyPaymentId } }">
                <i class="fas fa-expand"></i>
                <span>Check</span>
              </router-link>
            </div>
            <div v-else class="option is-primary">
              <a @click="alert = 'checkDeductible'; monthlyPaymentId = i.monthlyPaymentId ">
                <i class="fas fa-calculator"></i>
                <span>Calculate</span>
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <component :is="alert" @CloseAlert="alert=''" :monthlyPaymentId="monthlyPaymentId"></component>
  </div>
</template>

<script>
import checkDeductible from './Modal/check-deductible';
import {getPayrollByMonths} from "@/apis/payroll-api";

export default {
  components:{
    checkDeductible
  },
  filters: {
    currency(number) {
      return new Intl.NumberFormat().format(number) + ' LAK'
    }
  },
  computed: {
    currentItem() {
      return this.items[0]
    },
    exceptCurrent() {
      return this.items.filter((i, idx) => idx !== 0)
    }
  },
  data: () => ({
    items: [],
    alert: ''
  }),
  methods: {
    async getPayrowByMonths() {
      this.items = await getPayrollByMonths()
    }
  },
  created() {
    this.getPayrowByMonths()
  }
}
</script>

<style lang="scss" scoped>
.box.current{
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