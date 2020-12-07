<template>
  <div>
    <div class="page-header">
      <div class="header-start">
        <div class="header-title">
          <h3 class="xxl-title">Payroll</h3>
        </div>
      </div>
    </div>

    <!-- Box control -->
    <div class="box control">
      <div class="box-control-header">

        <div class="exchange_rate">
          <ValidationObserver
              v-if="isMulti"
              v-slot="{ handleSubmit }" tag="div" style="display: flex">
                  <span class="select">
                    <select v-model="currencyIdx">
                      <option v-for="(i, idx) in compCurrencies" :value="idx" :key="i._id">
                        {{ i.currencyId.name }}
                      </option>
                    </select>
                  </span>
            <ValidationProvider name="Contract Number" rules="required|numeric" v-slot="{ errors }">
              <input v-model="compCurrencies[currencyIdx].amount" type="text" class="input" required>
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
            <button
                @click="handleSubmit(updateCompanyCurrency)"
                :disabled="payrollEmps.isCalculated"
                class="button">Update
            </button>
          </ValidationObserver>
        </div>

        <div
            v-if="getCompany.isApprovedBeforeCalc"
            class="button-group">
          <button class="button" @click="ModalClick = 'document'"><i class="fal fa-hdd"></i>Store Document</button>

          <button
              :disabled="!payrollEmps.isCalculated"
              @click="downloadBankTemplate"
              class="button"><i class="fal fa-file-excel"></i>
            Export Payroll's Template
          </button>

          <button v-if="payrollEmps.isPayslipSent"
                  disabled
                  class="button">Payslip already sent
          </button>
          <button
              v-else
              @click="sendPayslip"
              class="button"
              :disabled="!payrollEmps.isCalculated"
          >Send Payslip
          </button>

          <button
              v-if="!payrollEmps.isRequestSent"
              @click="sendRequestCalc"
              class="button primary">Send Request
          </button>

          <button
              v-else-if="payrollEmps.isRequestSent && !payrollEmps.isRequestApproved"
              class="button primary">Wait for approval
          </button>
          <button
              v-else-if="payrollEmps.isRequestApproved && !payrollEmps.isCalculated"
              @click="calcPayroll"
              class="button is-primary">Calculate
          </button>
          <button
              v-else
              class="button is-primary"
              disabled
          >
            Calculated
          </button>
        </div>




        <div v-else class="button-group">

          <button class="button" @click="ModalClick = 'document'"><i class="fal fa-hdd"></i>Store Document</button>
          <button
              :disabled="!payrollEmps.isCalculated"
              @click="downloadBankTemplate"
              class="button"><i class="fal fa-file-excel"></i>
            Export Payroll's Template
          </button>

          <button v-if="payrollEmps.isPayslipSent"
                  disabled
                  class="button">Payslip already sent
          </button>
          <button
              v-else
              @click="sendPayslip"
              class="button"
              :disabled="!payrollEmps.isCalculated"
          >Send Payslip
          </button>


          <button
              v-if="!payrollEmps.isCalculated"
              @click="calcPayroll"
              class="button is-primary">
            Calculate
          </button>
          <button
              v-else
              class="button is-primary"
              disabled
          >
            Calculated
          </button>
        </div>
      </div>
    </div> <!-- box control -->
    <!-- Box control -->

    <div
        style="max-width: 800vw; overflow-x: auto"
        class="box">
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
          <input v-model="searchText" type="text" class="input" placeholder="Search employee">
        </div>
        <div class="option-group">
          <!-- Customise Table icons -->

          <button class="button" @click="ModalClick = 'customise'">
            <i class="fal fa-cog"></i>
            Custom Layout
          </button>
          <button class="button"
                  v-click-outside="()=>{dropdownView = false}"
                  :class="{'primary' : dropdownView}"
                  @click="dropdownView = !dropdownView">
            <i class="fal fa-table"></i>Table Layout
            <div v-if="dropdownView" class="dropdown slide-up">
              <div class="dropdown-list">
                <div
                    v-for="i in layouts" :key="i._id"
                    @click="setDefaultLayout(i._id)"
                    class="dropdown-list-item"><i class="far fa-file-excel"></i>{{  i.name }}
                </div>
                <!--                  <div class="dropdown-list-item"><i class="far fa-file-excel"></i>SSO Report</div>-->
                <!--                  <div class="dropdown-list-item"><i class="far fa-file-excel"></i>TAX Report</div>-->
              </div>
            </div>
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





        <table class="table is-fullwidth" id="my-table">
          <thead >
          <tr>
            <th v-for="(i, idx) in headers" :key="idx">{{ convertName(i) }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, idx) in payrollEmps.employees" :key="idx">
            <td v-for="(h, idx) in headers" :key="idx">{{ formatValue(i[h]) }}</td>
          </tr>
          </tbody>
        </table>

    </div>
    <transition name="slideup">
      <component :is="ModalClick" @CloseModal="closeModal"
      :defaultLayout="headers"
      ></component>
    </transition>
    <CalcAnim :isCalculating="isCalculating"/>
  </div>
</template>
<script>
import document from './Modal/document'
import customise from './Modal/customise'
import {calcPayroll, getPayrollByEmps, sendPayslip, sendRequestCalc} from "@/apis/payroll-api";
import {addOrUpdateActualWorkingDay} from "@/apis/actual-working-day-api";
import {addOrUpdateCompanyCurrency, getCompanyCurrencies} from "@/apis/company-currency-api"
import {mapGetters} from 'vuex'
import {loadingTimeout} from "@/config/variables";
import CalcAnim from "@coms/PayrollCalculation/Anim/CalcAnim";
import vClickOutside from 'v-click-outside'
import {getDefaultLayout, getPayrollLayouts, setDefaultLayout} from "@/apis/payroll-layout-api";
import {layoutData} from "@coms/PayrollCalculation/Payroll/Modal/layout-data";
//import moment from 'moment'

export default {
  components: {
    document,
    CalcAnim,
    customise
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: () => ({
    layoutData: layoutData,
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
    layouts: []
  }),
  computed: {
    ...mapGetters(['getCompany', 'getToken']),
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
            return i && i.fullName.toLowerCase().includes(this.searchText.toLowerCase())
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
      this.ModalClick = ''
      this.getPayrollByEmps()
      this.getDefaultLayout()
      this.getPayrollLayouts()
    },
    async getDefaultLayout() {
      const data = await getDefaultLayout()
      this.layoutSelected = data._id
      this.headers = data.layouts
    },
    async getPayrollLayouts() {
      this.layouts = await getPayrollLayouts()
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
        return {
          ...i,
          isEditMode: false
        }
      })
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
          await this.$store.dispatch('loading')
          await calcPayroll(this.$route.params.id)
          await this.getPayrollByEmps()
          await setTimeout(async () => {
            await this.$store.dispatch('stopLoading')
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
    }
  },
  async created() {
    this.getCompanyCurrencies()
    this.getPayrollByEmps()
    this.getDefaultLayout()
    this.getPayrollLayouts()
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  background-color: #fff;
  border: 1px solid $border-color;
  box-shadow: 0 5px 10px 0 rgba($grey-color, 0.5);
  position: absolute;
  top: 45px;
  right: 0;
  min-width: 240px;
  max-width: 300px;
  padding: 10px;
  z-index: 999;

  .dropdown-list {
    z-index: 999;
    color: $font-color;
    text-align: left;
    width: 100%;

    .dropdown-list-item {
      margin: 0;
      padding: 10px 30px;

      &:hover {
        background-color: $primary-color;
        color: #fff;
      }

      i {
        margin: 0 5px 0 0;
        padding: 0;
      }
    }
  }
}

.box.control {
  background-color: rgba($primary-color, 0.1);

  .box-control-header {
    display: flex;
    align-items: center;
    margin: 0;

    .exchange_rate {
      margin-right: auto;
      position: relative;
      display: flex;
      align-items: center;

      span {
        white-space: nowrap;
      }

      input {
        margin-left: -2px;
        @include input;
        border: 1px solid $sub-color;
      }

      button {
        border-radius: 0;
        border: none;
        background-color: $sub-color;
        color: #fff;
      }
    }

    .button-group {
      button {
        margin-right: 10px;
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
#my-table {
  .status {
    i {
      color: $font-grey-color;
    }
  }

  .is-approved {
    i {
      color: $primary-color;
    }
  }
}

label {
  position: relative;

  &::before {
    cursor: pointer;
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    border: 1px solid $border-color;
    background-color: $placeholder-color;
  }
}

.workday {
  .edit {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    i {
      cursor: pointer;
      font-size: 12px;
      margin-right: 5px;
      color: $font-grey-color;
    }
  }

  .workdday-input {
    display: flex;
    align-items: center;
    position: relative;

    input {
      font-size: 14px;
      padding: 0 0 5px 5px;
      border: none;
      line-height: 0;
      outline: none;
      box-shadow: none;
      border-bottom: 1px solid $sub-color;
      border-radius: $radius;
      text-align: right;
      height: auto;
    }

    .save {
      font-size: 12px;
      padding: 3px 5px;
      background-color: $sub-color;
      color: #fff;
      cursor: pointer;
      margin-right: 5px;
    }

    span:last-child {
      cursor: pointer;
      margin-left: 5px;
    }
  }

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