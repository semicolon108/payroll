<template>
<div class="container">
    <div class="page-header">
      <div class="header-start">
        <div class="header-title">
          <h3 class="xxl-title">Payroll Summary</h3>
        </div>
      </div>
      <div class="header-end">
         <div class="button-group">
          <button class="button" @click="isDoc = true"><i class="fal fa-hdd"></i>Store Document</button>
            <!-- <button 
            v-if="payrollEmps.isCalculated "
            @click="sendPayslipByEmps"
                  :disabled="!empsChosen.length"
                  class="button">Send Payslip
                 <span
                 class="border rounded-full w-8 bg-blue-600 p-1 text-white"
                 >{{empsChosen.length}}</span>
          </button>  -->
          <button
              v-if="!payrollEmps.isCalculated"
              @click="calcPayroll"
              class="button primary">
            Approve
          </button>
          <button
              v-else
              class="button primary"
              disabled
          >
            Approved
          </button>
        </div>
      </div>
    </div> <!-- Page Header -->


    <!-- summary start -->
    <div class="summary-container">
      <div class="columns is-mobile is-multiline">
        <div class="column is-4-desktop is-12-mobile">
          <ul class="_detail">
            <li class="label primary">
              <h3>Employee Wage</h3>
            </li>
            <li>
              <span>TAX</span>
              <span>{{ payrollEmps.employeeWage.tax }} ₭</span>
            </li>
            <li>
              <span>SSO Employee 5.5%</span>
              <span>{{ payrollEmps.employeeWage.ssoPaidByEmp }} ₭</span>
            </li>
            <li>
              <span>Earning (+)</span>
              <span>{{ payrollEmps.employeeWage.totalEarning }} ₭</span>
            </li>
            <li>
              <span>Deduction (-)</span>
              <span>{{ payrollEmps.employeeWage.totalDeduction }} ₭</span>
            </li>
            <li class="sum">
              <span>Employee Wage (Net pay)</span>
              <span>{{ payrollEmps.employeeWage.netPay }} ₭</span>
            </li>
          </ul>
        </div>
        <div class="column is-4-desktop is-12-mobile">
          <ul class="_detail">
            <li class="label primary">
              <h3>Total Payroll Cost</h3>
            </li>
            <li>
              <span>Employee Wage (Net pay)</span>
              <span>{{ payrollEmps.totalPayrollCost.netPay }} ₭</span>
            </li>
            <li>
              <span>SSO Employer 6%</span>
              <span>{{ payrollEmps.totalPayrollCost.ssoPaidByCom }} ₭</span>
            </li>
            <li class="sum">
              <span>Total Payroll Cost</span>
              <span>{{ payrollEmps.totalPayrollCost.totalPayrollCost }} ₭</span>
            </li>
          </ul>
        </div>

        <div class="column is-4-desktop is-12-mobile">
          <ul class="_detail">
            <li class="label primary">
              <h3>Payment Summary</h3>
            </li>
            <li>
              <span>Employee Wage (Net pay)</span>
              <span>{{ payrollEmps.paymentSummary.netPay }} ₭</span>
            </li>
            <li>
              <span>Income TAX</span>
              <span>{{ payrollEmps.paymentSummary.tax }} ₭</span>
            </li>
            <li>
              <span>Social Security 11.5%</span>
              <span>{{ payrollEmps.paymentSummary.totalSso }} ₭</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Summary end -->


    <div class="_tabs">
      <ul>
        <li 
          :class="{'is-active': i.name === layoutSelected}"
          v-for="i in layouts" :key="i._id">
          <a @click="setDefaultLayout(i._id)">
            {{i.name}}
          </a>
        </li>
        <li>
          <i class="fal fa-plus"></i>
        </li>
      </ul>
    </div>

    <div class="box">
      <div class="box-header">
        <div v-if="payrollEmps.hasExpat" class="button-group">
          <button
              @click="chooseTab = 'All'"
              class="button"
              :class="{'active': chooseTab === 'All'}"
          >All Employee
          </button>
          <button
              @click="chooseTab = 'Local'"
              class="button"
              :class="{'active': chooseTab === 'Local'}"
          >Local Employee
          </button>
          <button
              @click="chooseTab = 'Expat'"
              class="button"
              :class="{'active': chooseTab === 'Expat'}"
          >Expat Employee
          </button>
        <input v-model="searchText" type="text" class="input" placeholder="Search employee">
        </div>
        <div v-else class="button-group">
          <!-- <button v-if="payrollEmps.isCalculated" @click="checkAll" class="button">Check All</button> -->
          <input v-model="searchText" type="text" class="input" placeholder="Search employee">
        </div>
        <div class="option-group">
          <!-- Customise Table icons -->

          <button class="button" @click="isCustomise = true">
            <i class="fal fa-cog"></i>
            Edit Layout
          </button>
          <button class="button"
              v-click-outside="()=>{dropdownExport = false}"
              :class="{'primary' : dropdownExport}"
              @click="dropdownExport = !dropdownExport">
            <i class="fal fa-file-export"></i>Export
            <div v-if="dropdownExport" class="dropdown slide-up">
              <div class="dropdown-list">
                <div
                    @click="downloadPayrollList(i._id)"
                    v-for="i in layouts" :key="i._id"
                    class="dropdown-list-item"><i class="far fa-file-excel"></i>{{ i.name }}
                </div>
              </div>
            </div>
          </button>
          <!-- <button @click="downloadPayrollList" class="button"><i class="fas fa-file-pdf"></i> Export PDF</button> -->
        </div>
      </div> <!-- Box Header -->



      <div class="table-container">
          <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
            <thead >
            <tr>
              <!-- <th v-if="payrollEmps.isCalculated">Check</th>
              <th v-if="payrollEmps.isCalculated">Sending Status</th> -->
              <th v-for="(i, idx) in headers" :key="idx">{{ convertName(i) }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(i, idx) in filterItems" :key="idx">
              
      
              <!-- <td v-if="payrollEmps.isCalculated ">
                <div
                v-if="!i.isRequestSent && !i.isPayslipSent"
                @click="i.isActive = !i.isActive"
                class="checkbox-container">
                  <div class="checkbox" :class="{'active': i.isActive}"></div>
                </div>
              </td> -->
              <!-- <td v-if="payrollEmps.isCalculated">
                <p v-if="i.isPayslipSent" class="text-green-400">Sent</p>
                <p v-else-if="i.isRequestSent" class="text-yellow-400">Sending</p>
                <p v-else>Unsend</p>
              </td> -->
              <td v-for="(h, idx) in headers" :key="idx">{{ formatValue(i[h]) }}</td>
              <!-- <td>
                <button 
                @click="downloadPayslip(i.employeeId)"
                class="button text-sm">DOWNLOAD PAYSLIP</button>
              </td> -->
            </tr>
            </tbody>
          </table>
          <div v-else>
          <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3"  />
          </div>
      </div>
      
    </div>


    <document v-if="isDoc" @CloseModal="closeModal" />

    <transition name="slideup">

      <customise v-if="isCustomise" @CloseModal="closeModal" />

    </transition>

    <CalcAnim :isCalculating="isCalculating"/>
</div>
</template>
<script>
import document from './Modal/document'
import customise from './Modal/customise'
import { calcPayroll, getPayrollByEmps, sendPayslip, sendPayslipByEmps, sendRequestCalc } from "@/apis/payroll-api";
import { addOrUpdateActualWorkingDay } from "@/apis/actual-working-day-api";
import { addOrUpdateCompanyCurrency, getCompanyCurrencies } from "@/apis/company-currency-api"
import { mapGetters } from 'vuex'
import { loadingTimeout } from "@/config/variables";
import CalcAnim from "@coms/PayrollCalculation/Anim/CalcAnim";
import vClickOutside from 'v-click-outside'
import { getDefaultLayout, getPayrollLayouts, setDefaultLayout } from "@/apis/payroll-layout-api";
import { layoutData } from "@coms/PayrollCalculation/Payroll/Modal/layout-data";
import moment from 'moment'
//import Document from '../../Employee/document.vue'
import {getCustomFormulasApi} from '@/apis/custom-formula-api'
 import Loading from '@/components/Loading/SkeletonLoading'


export default {
  components: {
    document,
    CalcAnim,
    customise,
    Loading
    // Document
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: () => ({
    layoutData: [...layoutData],
    headers: [],

    dropdownExport: false,
    dropdownView: false,
    items: [],
    ModalClick: '',
    editWorkday: false,
    chooseTab: 'All',
    searchText: '',
    isMulti: false,
    compCurrencies: [],
    currencyIdx: '',
    isCalculating: false,


    payrollEmps: {
      employees: [],
      date: null,
      isApproved: false,
      isRequestSent: false,
      isRequestApproved: false,
      isCalculated: false,
      totalSalary: 0
    },

    layoutSelected: '',
    layouts: [],

    isCustomise: false,
    isDoc: false,
      isLoading: true
  }),
  computed: {
    ...mapGetters(['getCompany', 'getToken']),
    empsChosen() {
      const emps = this.items.filter(i => i.isActive)
      const empsMapped = emps.map(i => i.employeeId)
      return empsMapped ? empsMapped : []
    },
    convertName() {
      return (key) => {
        const ret =  this.layoutData.find(i => i.key === key)
        return ret ? ret.name : null
      }
    },
    formatValue() {
        return (value) => {
            let newValue = value
            if(typeof value === 'number') newValue = new Intl.NumberFormat().format(value)
           // else if(moment(value).isValid()) newValue = moment(value).format('DD-MM-YYYY')
            return newValue
        }
    },
    filterItems() {
      return this.items.filter(i => {
        switch (this.chooseTab) {
          case 'All':
            return i && i.fullName.toLowerCase().includes(this.searchText.toLowerCase()) || i.employeeCode.toLowerCase().includes(this.searchText.toLowerCase())
          case 'Local':
            return !i.isExpat && i.fullName.toLowerCase().includes(this.searchText.toLowerCase())
          case 'Expat':
            return i.isExpat && i.fullName.toLowerCase().includes(this.searchText.toLowerCase())
        }
      })
    }
  },
  methods: {
    closeModal() {
      this.isDoc = false
      this.isCustomise = false
      this.getPayrollByEmps()
      this.getDefaultLayout()
      this.getPayrollLayouts()
    },
    checkAll() {

      const filtered = this.items.reduce((filtered, item) => {
        if(!item.isActive) {
          let isActive = false
          if(!item.isRequestSent && !item.isPayslipSent) isActive = true
          const newItem = { ...item, isActive }
          filtered.push(newItem)
        }else {
          const newItem = { ...item, isActive: false }
          filtered.push(newItem)
        }
        return filtered
      }, [])
      this.items = filtered
    },
    async getDefaultLayout() {
      const data = await getDefaultLayout()
      this.layoutSelected = data.name
      this.headers = data.layouts
    },
    async getPayrollLayouts() {
      this.layouts = await getPayrollLayouts()
    },
    async downloadPayslip(id) {
      try {
          await this.$store.dispatch('loading')
        this.$axios.defaults.headers['Authorization'] = this.getToken
        const res = await this.$axios.post(`${this.$api}download-payslip/${this.$route.params.id}/${id}`, null, {
          responseType: 'blob'
        })
        const url = URL.createObjectURL(new Blob([res.data], {
          type: 'application/pdf'
        }))
        const link = window.document.createElement('a') // window was root
        link.href = url
        link.setAttribute('download', `Payslip-Preview.pdf`)
        window.document.body.appendChild(link)
        link.click()
        await this.$store.dispatch('completed')
      } catch(e) {
        
        throw new Error(e)
      }
    },
    async downloadBankTemplate() {
      try {
        await this.$store.dispatch('loading')
        this.$axios.defaults.headers['Authorization'] = this.getToken
        const res = await this.$axios.post(this.$api + 'download-bank-template/' + this.$route.params.id, null, {
          responseType: 'blob'
        })
        const url = URL.createObjectURL(new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }))
        const link = window.document.createElement('a') // window was root
        link.href = url
        link.setAttribute('download', `${this.getCompany.financialInfo.bankId.name}-Payroll-Template.xlsx`)
        window.document.body.appendChild(link)
        link.click()
        await this.$store.dispatch('completed')
        this.$dialog.alert('Exported')
      } catch (e) {
        await this.$store.dispatch('error')
        throw new Error(e)
      }
    },
    async downloadPayrollList(id) {
      try {
        await this.$store.dispatch('loading')
        this.$axios.defaults.headers['Authorization'] = this.getToken
        const res = await this.$axios.post(this.$api + 'download-payroll-list/' + this.$route.params.id + '/' + id, null, {
          responseType: 'blob'
        })
        const url = URL.createObjectURL(new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }))
        const link = window.document.createElement('a') // window was root
        link.href = url
        link.setAttribute('download', `Payroll-List.xlsx`)
        window.document.body.appendChild(link)
        link.click()
        await this.$store.dispatch('completed')
        this.$dialog.alert('Exported')
      } catch (e) {
        await this.$store.dispatch('error')
        throw new Error(e)
      }
    },
    async getCompanyCurrencies() {
      const data = await getCompanyCurrencies()
      this.isMulti = data.isMulti
      this.compCurrencies = data.currencies
      this.currencyIdx = 0
    },
    async getPayrollByEmps() {
      this.payrollEmps = await getPayrollByEmps(this.$route.params.id)
      this.items = this.payrollEmps.employees.map(i => {
      const filtered = i.customFormulas.filter(o => !o.isFinalNetPay)
      
      const customFormula = {}
      for(let n=0; n < filtered.length; n++) {
        customFormula[filtered[n].key] = parseInt(filtered[n].value, 10)
      }
        return {
          ...i,
          ...customFormula,
          isActive: false,
          isEditMode: false,
          startWorkingDate: moment(i.startWorkingDate).locale('lo').format('DD-MM-YYYY')
        }
      })

      setTimeout(() => {
          this.isLoading = false
        }, 400)
    },

    async getCustomFormulas() {
       const cusFormulas = await getCustomFormulasApi()

          let newKeys = []
          cusFormulas.map(i => {
              if(i.isFinalNetPay) return
              newKeys.push({
                  name: i.name,
                  key: i.name,
                  type: 'Custom Fields',
                  isSelected: true
              })
          })

          this.layoutData.unshift(...newKeys)
    },
    async sendRequestCalc() {
      const isConfirmed = await this.$dialog.confirm()
      if (isConfirmed) {
        try {
          await this.$store.dispatch('loading')
          await sendRequestCalc(this.$route.params.id)
          await this.$store.dispatch('completed')
          this.$dialog.alert('Request was sent')
          await this.getPayrollByEmps()
        } catch (e) {
          await this.$store.dispatch('error')
          throw new Error(e)
        }
      }
    },
    async sendPayslipByEmps() {
           const isConfirmed = await this.$dialog.confirm()
      if (isConfirmed) {
        this.isCalculating = true
        await this.$store.dispatch('loading')

        const form = {
          monthlyPaymentId: this.$route.params.id,
          employeeIds: this.empsChosen
        }

        await sendPayslipByEmps(form)

        this.getPayrollByEmps()

        await setTimeout(async () => {
          await this.$store.dispatch('stopLoading')
          this.isCalculating = false
        }, 1800)
      }
    },
    async sendPayslip() {
      const isConfirmed = await this.$dialog.confirm()
      if (isConfirmed) {
        this.isCalculating = true
        await this.$store.dispatch('loading')
        await sendPayslip(this.$route.params.id)
        await this.getPayrollByEmps()
        await setTimeout(async () => {
          await this.$store.dispatch('stopLoading')
          this.isCalculating = false
        }, 1800)
      }
    },
    async calcPayroll() {
      const isConfirmed = await this.$dialog.confirm()
      if (isConfirmed) {
        try {
          this.isCalculating = true
          this.$store.dispatch('loading')
          await calcPayroll(this.$route.params.id)
          await this.getPayrollByEmps()
          this.$store.dispatch('completed')
          await setTimeout(async () => {
            this.isCalculating = false
          }, 1800)
        } catch (e) {
          this.isCalculating = false
          await this.$store.dispatch('error')
          throw new Error(e)
        }
      }
    },
    async addOrUpdateActualWorkingDay(employeeId) {
      const workingDay = this.$refs[`input${employeeId}`][0].value
      const form = {
        monthlyPaymentId: this.$route.params.id,
        employeeId,
        workingDay: parseInt(workingDay, 10)
      }
      this.$store.commit('SET_IS_LOADING', true)
      await addOrUpdateActualWorkingDay(form)
      await this.getPayrollByEmps()
      setTimeout(() => {
        this.$store.commit('SET_IS_LOADING', false)
      }, loadingTimeout)
    },
    async updateCompanyCurrency() {
      const items = this.compCurrencies.map(i => {
        return {
          currencyId: i.currencyId._id,
          amount: parseInt(i.amount, 10)
        }
      })
      const form = {
        isMulti: this.isMulti,
        items
      }
      try {
        await this.$store.dispatch('loading')
        await addOrUpdateCompanyCurrency(form)
        await this.getPayrollByEmps()
        await this.$store.dispatch('completed')
      } catch (e) {
        await this.$store.dispatch('error')
        throw new Error(e)
      }
    },
    async setDefaultLayout(payrollLayoutId) {
      await setDefaultLayout({
        payrollLayoutId
      })
      this.getDefaultLayout()
    },

  },
  async created() {
   await this.getCompanyCurrencies()
   await this.getPayrollByEmps()
   await this.getPayrollLayouts()
   await this.getDefaultLayout()
   await this.getCustomFormulas()
    },
}
</script>

<style lang="scss" scoped>
._tabs{
  margin: 0;
  padding: 0;
  position: relative;
  // bottom: -1px;
  ul{
    padding: 0;
    margin: 0;
    display: flex;
    li{
      list-style-type: none;
      margin: 0 10px 0 0;
      padding: 10px 20px;
      border-left: 1px solid $border-color;
      border-top: 1px solid $border-color;
      border-right: 1px solid $border-color;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $border-color;
      a{
        color: #000;
      }
      &.is-active{
        box-shadow: 0 1px 0 0 #fff;
        background-color: #fff;
        border-left: 1px solid $border-color;
        border-top: 1px solid $border-color;
        border-right: 1px solid $border-color;
        a, i{
          color: $primary-color;
        }
      }
      &:last-child{
        background-color: $border-color;
        cursor: pointer;
        transition: all ease .3s;
        border-left: 1px solid $border-color;
        border-top: 1px solid $border-color;
        border-right: 1px solid $border-color;
        z-index: 0;
        i{
          font-size: 20px;
        }
        &:hover{
          color: #fff;
          background-color: $primary-color;
        }
      }
    } //li
  }
}
// .checkbox{
//   position: relative;
//   cursor: pointer;
//   transition: all ease-in-out .3s;
//   &:after{
//     content: "";
//     width: 18px;
//     height: 18px;
//     display: block;
//     border: 1px solid #ddd;
//   }
//   &:before{
//     content: "";
//     display: block;
//     position: absolute;
//     top: 1px;
//     left: 7px;
//     width: 5px;
//     height: 11px;
//     border: solid #ebebeb;
//     border-width: 0 2px 2px 0;
//     -webkit-transform: rotate(45deg);
//     transform: rotate(45deg);
//   }
//   &.active{
//     &:after{
//       background-color: #3663e0;
//       border-color: #3663e0;
//     }
//   }
// }

.summary-container{
  margin-bottom: 30px;
  ul._detail{
    margin: 0;
    padding: 20px;
    border: 1px solid $border-color;
    height: 100%;
    li{
      list-style-type: none;
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 1.8;
      display: flex;
      justify-content: space-between;
      position: relative;
      &:first-child{
        margin-bottom: 5px;
      }
      &.label{
        &.primary h3{
          color: $primary-color;
        }
        h3{
          font-size: 16px;
          margin-bottom: 5px;
        }
      }
      &.sum{
        font-weight: 700;
      }
    }
  }
}

// Header of table style
.box-header {
  margin-bottom: 30px;
  display: flex;

  .button-group {
    display: flex;

    button {
      border-radius: $radius;
      margin-right: 10px;

      &:focus {
        box-shadow: none;
      }

      i {
        margin-right: 5px;
      }

      &.active {
        background-color: $primary-color;
        color: #fff;
        border: 1px solid $primary-color;
      }
    }

    input {
      display: inline-block;
      border-radius: 0;
      @include input;
    }
  }

  .option-group {
    margin-left: auto;

    .button {
      border-radius: $radius;
      margin-left: 10px;

      &:focus {
        box-shadow: none;
      }

      i {
        margin-right: 5px;
      }
    }
  }
}


// Header of table style
.box-header {
  margin-bottom: 30px;
  display: flex;

  .button-group {
    display: flex;

    button {
      border-radius: $radius;
      margin-right: 10px;

      &:focus {
        box-shadow: none;
      }

      i {
        margin-right: 5px;
      }

      &.active {
        background-color: $primary-color;
        color: #fff;
        border: 1px solid $primary-color;
      }
    }

    input {
      display: inline-block;
      border-radius: 0;
      @include input;
    }
  }

  .option-group {
    margin-left: auto;

    .button {
      border-radius: $radius;
      margin-left: 10px;

      &:focus {
        box-shadow: none;
      }

      i {
        margin-right: 5px;
      }
    }
  }
}


// Table style
// .workday {
//   .edit {
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;

//     i {
//       cursor: pointer;
//       font-size: 12px;
//       margin-right: 5px;
//       color: $dark-grey-color;
//     }
//   }

//   .workdday-input {
//     display: flex;
//     align-items: center;
//     position: relative;

//     input {
//       font-size: 14px;
//       padding: 0 0 5px 5px;
//       border: none;
//       line-height: 0;
//       outline: none;
//       box-shadow: none;
//       border-bottom: 1px solid $sub-color;
//       border-radius: $radius;
//       text-align: right;
//       height: auto;
//     }

//     .save {
//       font-size: 12px;
//       padding: 3px 5px;
//       background-color: $sub-color;
//       color: #fff;
//       cursor: pointer;
//       margin-right: 5px;
//     }

//     span:last-child {
//       cursor: pointer;
//       margin-left: 5px;
//     }
//   }

// }

.table-container{
  overflow: auto;
}
// animation
.slideup-enter-active {
  transition: all .3s ease;
}

.slideup-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slideup-enter {
  transform: translateY(100px);
}

.slideup-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
</style>
