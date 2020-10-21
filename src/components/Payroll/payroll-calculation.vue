<template>
  <div class="slide-left" id="page-container">
    <div class="box fullpage">
      <div class="page-header bottom">
        <div class="header-start">
          <div class="header-start">
            <span @click="$router.back()" class="back">Back</span>
            <div class="header-title">
              <h3 class="xxl-title">{{ payrollEmps.date | moment }}</h3>
            </div>
          </div>

        </div>
        <div class="header-end">
          <p class="sm-title">Payroll Cost (LAK)</p>
          <h3 class="xl-title">{{ payrollEmps.totalSalary | currency }}</h3>
        </div>
      </div>
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
            <button class="button" @click="ModalClick = 'document'">Document</button>

            <button
                :disabled="!payrollEmps.isCalculated"
                @click="downloadBankTemplate"
                class="button"><i class="fas fa-file-excel"></i>
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
                class="button is-primary">Send Request
            </button>
            <button
                v-else-if="payrollEmps.isRequestSent && !payrollEmps.isRequestApproved"
                class="button is-primary">Wait for approval
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

            <button

                @click="calcPayroll"
                class="button is-primary">Test Calculate
            </button>
          </div>


          <div v-else class="button-group">
            <button class="button" @click="ModalClick = 'document'">Document</button>
            <button
                :disabled="!payrollEmps.isCalculated"
                @click="downloadBankTemplate"
                class="button"><i class="fas fa-file-excel"></i>
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
            <input v-model="searchText" type="text" class="input" placeholder="Search employee">
          </div>
          <div class="option-group">
            <button @click="downloadPayrollList" class="button"><i class="fas fa-file-pdf"></i> Export PDF</button>
          </div>
        </div>
        <table class="table is-fullwidth" id="my-table">
          <thead>
          <tr>
            <th>Employee</th>
            <th class="is-right is-xs">Work Day</th>
            <th class="is-right">Basic Salary</th>
            <!--            <th class="is-right">Earning (LAK)</th>-->
            <!--            <th class="is-right">Deduction (LAK)</th>-->
            <th class="is-right">SSO Com</th>
            <th class="is-right">SSO Emp</th>
            <th class="is-right">TAX (LAK)</th>
            <th class="is-right">Net Salary (LAK)</th>
            <th class="is-right">Status</th>
            <th class="is-right">View</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(i, idx) in filterItems" :key="idx">
            <td>{{ i.fullName }}</td>
            <td class="is-right">
              <div class="workday">
                <div v-if="!i.isEditMode" class="edit">
                  <span v-if="!payrollEmps.isCalculated" @click="i.isEditMode = true"><i class="fas fa-pen"></i></span>
                  <span>{{ i.workingDay }}</span>
                </div>
                <div class="workdday-input" v-if="i.isEditMode">
                  <span @click="addOrUpdateActualWorkingDay(i.employeeId)" class="save">Save</span>
                  <input
                      :ref="`input${i.employeeId}`"
                      :value="i.workingDay"
                      class="input"
                      type="text"
                      style="width: 30px"
                  >
                  <span @click="i.isEditMode = false">&times;</span>
                </div>
              </div>
            </td>
            <td class="is-right">{{ i.basicSalary | currency }}</td>
            <!--            <td class="is-right">{{ i.earningAmount | currency }}</td>-->
            <!--            <td class="is-right">{{ i.deductionAmount | currency }}</td>-->
            <td class="is-right">{{ i.ssoPaidByCom | currency }}</td>
            <td class="is-right">{{ i.ssoPaidByEmp | currency }}</td>
            <td class="is-right">{{ i.tax | currency }}</td>
            <td class="is-right">{{ i.netSalary | currency }}</td>
            <td class="is-right status " :class="{'is-approved':  i._id}">
              <i v-if="i._id" class="fas fa-check-circle"></i>
              <i v-else class="far fa-check-circle"></i>
            </td>
            <td class="is-right">
              <div class="icons">
                <span class="icon"><i class="fas fa-search"></i></span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <component :is="ModalClick" @CloseModal="ModalClick=''"></component>
    <CalcAnim :isCalculating="isCalculating"/>
  </div>
</template>
<script>
import document from './Modal/document'
import {calcPayroll, getPayrollByEmps, sendPayslip, sendRequestCalc} from "@/apis/payroll-api";
import {addOrUpdateActualWorkingDay} from "@/apis/actual-working-day-api";
import {addOrUpdateCompanyCurrency, getCompanyCurrencies} from "@/apis/company-currency-api"
import {mapGetters} from 'vuex'
import {loadingTimeout} from "@/config/variables";
import CalcAnim from "@coms/Payroll/Anim/CalcAnim";

export default {
  components: {
    document,
    CalcAnim
  },
  data: () => ({
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
    }
  }),
  computed: {
    ...mapGetters(['getCompany', 'getToken']),
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
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async downloadPayrollList() {
      try {
        await this.$store.dispatch('loading')
        this.$axios.defaults.headers['Authorization'] = this.getToken
        const res = await this.$axios.post(this.$api + 'download-payroll-list/' + this.$route.params.id, null, {
          responseType: 'blob'
        })
        const url = URL.createObjectURL(new Blob([res.data], {
          type: 'application/pdf'
        }))
        const link = window.document.createElement('a') // window was root
        link.href = url
        link.setAttribute('download', `Payroll-List.pdf`)
        window.document.body.appendChild(link)
        link.click()
        await this.$store.dispatch('completed')
        this.$dialog.alert('Exported')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
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
        } catch (err) {
          await this.$store.dispatch('error')
          throw new Error(err)
        }


      }
    },
    async sendPayslip() {
      const isConfirmed = confirm('Sure ?')
      if (isConfirmed) {
        this.$store.commit('SET_IS_LOADING', true)
        await sendPayslip(this.$route.params.id)
        await this.getPayrollByEmps()
        setTimeout(() => {
          this.$store.commit('SET_IS_LOADING', false)
        }, loadingTimeout)
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
          await setTimeout(async() => {
            await this.$store.dispatch('completed')
            this.isCalculating = false
            setTimeout(() => {
              this.$dialog.alert('Calculated')
            }, 1400)
          }, 1800)


        } catch (err) {
          this.isCalculating = false
         await this.$store.dispatch('error')
          throw new Error(err)
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
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
  },
  created() {
    this.getCompanyCurrencies()
    this.getPayrollByEmps()
  }
}
</script>

<style lang="scss" scoped>
.back {
  cursor: pointer;
  display: inline-block;
  color: $font-grey-color;

  &:hover {
    color: $primary-color;
  }

  &::before {
    content: '\f053';
    font-family: FontAwesome;
    margin-right: 5px;
    font-size: 14px;
  }
}

#page-container {
  background-color: #fff;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100%;

  .box.fullpage {
    padding: 50px;
  }
}

.page-header.bottom {
  align-items: flex-end;
  color: $font-color;

  .header-end {
    margin-left: auto;
    text-align: right;
  }

  .sm-title {
    color: $font-grey-color;

  }

  .xl-title {
    font-size: 22px;
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  .xxl-title {
    font-size: 28px;
    margin: 0;
    padding: 0;
    font-weight: 700;
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
        border-radius: $radius;
        margin-right: 10px;

        &:focus {
          box-shadow: none;
        }

        i {
          margin-right: 5px;
        }

        &.is-primary {
          background-color: $primary-color;
        }
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
</style>