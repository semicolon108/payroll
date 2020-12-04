<template>
  <div>
    <div class="form-header">
      <h3>Hiring Detail</h3>
      <p>Please enter the hiring detail below. The information entered in previous steps is saved and
        you can always come back to complete this screen from the employees page.</p>
    </div>
    <ValidationObserver slim ref="refForm">
      <div class="form">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Contract Type</label>
              <div class="control">
                <div class="select">
                  <ValidationProvider name="Contract Type" rules="required" v-slot="{ errors }">
                    <select v-model="form.isOpenContract" class="select" name="" id="">
                      <!--                      <option v-for="i in contactTypes" :key="i._id" :value="i._id">-->
                      <!--                        {{ i.name }}-->
                      <!--                      </option>-->
                      <option selected name="open" :value="true">Open Contract</option>
                      <option name="fixed" :value="false">Fixed Contract</option>
                    </select>
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <!-- column -->

          <!-- Date of joinig-->
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Date of Joining</label>
              <ValidationProvider name="Date of Joining" rules="required|isDate" v-slot="{ errors }">
                <DatePicker v-model="form.dateOfJoining" :defaultValue="defaultValue.dateOfJoining"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="column is-4" :style="form.isOpenContract ? 'opacity: 30%' : null">
            <div class="field">
              <label for="" class="label">Contract End Date</label>
              <ValidationProvider name="Until Date / End Date" rules="isDateOrNull" v-slot="{ errors }">
                <DatePicker v-model="form.contractEndDate" :defaultValue="defaultValue.contractEndDate"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Probation End Date</label>
              <ValidationProvider name="Probation End Date" rules="isDateOrNull" v-slot="{ errors }">
                <DatePicker v-model="form.probationEndDate" :defaultValue="defaultValue.probationEndDate"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Position</label>
              <div class="control">
                <div class="select">
                  <ValidationProvider name="Position" rules="required" v-slot="{ errors }">
                    <select v-model="form.positionId">
                      <option v-for="i in positions" :key="i._id" :value="i._id">
                        {{ i.name }}
                      </option>
                    </select>
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Work Day</label>
              <div class="control">
                <ValidationProvider name="Work Day" rules="required|numeric" v-slot="{ errors }">
                  <input v-model="form.workingDay" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Working Location</label>
              <div class="control">
                <div class="select">
                  <ValidationProvider name="Working Location" rules="required" v-slot="{ errors }">
                    <select v-model="form.provinceId" class="select">
                      <option v-for="i in provinces" :key="i._id" :value="i._id">
                        {{ i.name }}
                      </option>
                    </select>
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <label for="" class="label">Salary
              <div v-if="hasHiringDetail">
                <button @click="isSalaryAdjustmentModal = true">Adjust Salary</button>
                <button @click="isAdjustmentHistoriesModal = true" style="margin-left: 5px">Histories</button>
              </div>
            </label>

            <div class="field has-addons">
              <div class="control">
                <div class="select">
                  <ValidationProvider name="File" rules="required" v-slot="{ errors }">
                    <select v-if="companyCurrency && companyCurrency.isMulti" v-model="form.currencyId">
                      <option
                          v-for="i in comCurrencies"
                          :value="i._id"
                          :key="i._id">{{ i.name }}
                      </option>
                    </select>
                    <select v-else v-model="form.currencyId">
                      <option
                          :value="comCurrencies[0]._id"
                          :key="comCurrencies[0]._id">{{ comCurrencies[0].name }}
                      </option>
                    </select>
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
              <div class="control is-expanded">
                <ValidationProvider name="Salary" rules="required" v-slot="{ errors }">
                  <currency-input
                      v-model="form.salary"
                      class="input"
                      :allow-negative="false"
                      :value-range="{ min: 0 }"
                      :distraction-free="false"
                      :currency="{ prefix: '', suffix: '' }"
                      :value-as-integer="true"
                      :precision="0"
                      :disabled="hasHiringDetail"
                  />
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>


          <div class="column">
            <div class="field">
              <label class="label">Salary Grade</label>
              <div class="control">
                <ValidationProvider name="Salary Grade" rules="required" v-slot="{ errors }">
                  <input v-model="form.salaryGrade" type="text" class="input">
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>

        <div v-if="employee.isExpat">
          <hr>
          <h3 class="form-title">Work Permit Notification</h3>
          <div class="columns">
            <div class="column">
              <div class="field">
                <label class="label">Start Date</label>
                <ValidationProvider name="Start Date" rules="required|isDate" v-slot="{ errors }">
                  <DatePicker v-model="form.workPermit.startDate" :defaultValue="defaultValue.workPermit.startDate"/>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">End Date</label>
                <ValidationProvider name="End Date" rules="required|isDate" v-slot="{ errors }">
                  <DatePicker v-model="form.workPermit.endDate" :defaultValue="defaultValue.workPermit.endDate"/>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Days of notify</label>
                <div class="control">
                  <ValidationProvider name="Days of notify" rules="required|numeric" v-slot="{ errors }">
                    <input v-model="form.workPermit.daysOfNotify" type="text" class="input">
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <button type="button" @click="saveOnly" class="button save-btn">Update
        </button>
      </div>
    </ValidationObserver>
    <SalaryAdjustmentModal v-if="isSalaryAdjustmentModal"
                           @CloseModal="isSalaryAdjustmentModal = false"
                           @AdjustSalary="isSalaryAdjustmentModal = false; getData() ;$refs.refForm.reset()"
    />
    <AdjustmentHistoriesModal v-if="isAdjustmentHistoriesModal"
                              @CloseModal="isAdjustmentHistoriesModal = false"


    />
  </div>
</template>

<script>

import DatePicker from "@/utils/DatePicker";
import {getReuse} from "@/apis/reuse-api";
import {mapGetters} from 'vuex'

import {addOrUpdateHirringDetail, getHirringDetail} from "@/apis/hirring-detail-api";
import {getPositions} from "@/apis/position-api";
import {getCompanyCurrencies} from "@/apis/company-currency-api";
import {GET_EMPLOYEE} from "@/graphql/Employee";
import SalaryAdjustmentModal from '@/components/Employee/Modal/salary-adjustment-modal'
import AdjustmentHistoriesModal from '@coms/Employee/Modal/adjusment-histories-modal'


export default {
  components: {
    DatePicker,
    SalaryAdjustmentModal,
    AdjustmentHistoriesModal
  },
  data: () => ({
    SelectActive: false,
    positions: [],
    provinces: [],
    contactTypes: [],
    currencies: [],

    form: {
      dateOfJoining: null,
      probationEndDate: null,
      positionId: '',
      provinceId: '',
      workingDay: null,
      salary: null,
      salaryGrade: '',
      isOpenContract: true,
      workPermit: {
        startDate: null,
        endDate: null,
        daysOfNotify: null
      }
    },
    isEditMode: false,

    defaultValue: {
      dateOfJoining: null,
      probationEndDate: null,
      workPermit: {},
      contactDetail: {}
    },

    companyCurrency: [],
    employee: {},

    isSalaryAdjustmentModal: false,
    isAdjustmentHistoriesModal: false,

    hasHiringDetail: false,

  }),
  computed: {
    ...mapGetters(['getCompany']),
    comCurrencies() {
      const comCur = this.companyCurrency.currencies.map(i=>(
          {
            _id: i.currencyId._id,
            name: i.currencyId.name
          }
      ))
      comCur.unshift(this.currencies[0])
      return comCur
    }
  },
  methods: {
    select() {
      this.SelectActive = !this.SelectActive
    },
    async getData() {
      this.positions = await getPositions()
      this.provinces = await getReuse('Province')
      this.contactTypes = await getReuse('ContactType')
      const data = await getHirringDetail(this.$route.params.id)
      if (data) {
        this.hasHiringDetail = true
        this.isEditMode = true
        this.form = {
          ...data,
          workPermit: {
            startDate: data.workPermit.startDate,
            endDate: data.workPermit.endDate,
            daysOfNotify: data.workPermit.daysOfNotify
          },
        }
        this.defaultValue = {
          dateOfJoining: data.dateOfJoining,
          probationEndDate: data.probationEndDate,
          contractEndDate: data.contractEndDate,
          workPermit: data.workPermit,
        }
      } else {
        this.form = {
          ...this.form,
          positionId: this.positions[0]._id,
          provinceId: this.provinces[0]._id,
          currencyId: this.currencies[0]._id,
        }
      }
    },
    async addOrUpdateHirringDetail() {
      try {
        await this.$store.dispatch('loading')
        this.form.employeeId = this.$route.params.id
        this.form.workingDay = parseInt(this.form.workingDay, 10)
        this.form.salary = parseInt(this.form.salary, 10)
        this.form.workPermit.daysOfNotify = parseInt(this.form.workPermit.daysOfNotify, 10)
        await addOrUpdateHirringDetail(this.form)
        await this.$store.dispatch('completed')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async saveAndContinue() {
      const isValid = await this.$refs.refForm.validate()
      if (!isValid) return
      await this.addOrUpdateHirringDetail()
      await this.$router.push({name: 'earning', params: {id: this.$route.params.id}})
    },
    async saveOnly() {
      const isValid = await this.$refs.refForm.validate()
      if (!isValid) return
      await this.addOrUpdateHirringDetail()
    },
    async getEmployee() {
      try {
        const res = await this.$apollo.query({
          query: GET_EMPLOYEE,
          variables: {
            employeeId: this.$route.params.id
          }
        })
        this.employee = res.data.getEmployee
      } catch (err) {
        throw new Error(err)
      }
    },
    async getCurrencies() {
      this.currencies = await getReuse('Currency')
    },
    async getCompanyCurrencies() {
      this.companyCurrency = await getCompanyCurrencies()
    }
  },
  created() {
    window.scrollTo(0, 0)
    this.getCurrencies()
    this.getCompanyCurrencies()
    this.getData()
    this.getEmployee()
  }
}
</script>

<style lang="scss" scoped>
.form-title-wraper {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  .form-title {
    margin: 0;
  }

  .switch-btn {
    margin-left: 10px;
    display: flex;
    width: 80px;
    position: relative;

    input {
      display: none;

      &:checked ~ label {
        background-color: $primary-color;
      }

      &:checked ~ label::after {
        left: auto;
        right: 3px;
      }
    }

    label {
      transition: all 0.1s ease 0.1s;
      background-color: $grey-color;
      border-radius: 40px;
      position: relative;
      width: 45px;
      height: 26px;

      &::after {
        transition: all 0.1s ease 0.1s;
        content: '';
        position: absolute;
        left: 3px;
        top: 3px;
        width: 20px;
        height: 20px;
        background-color: $light-grey-color;
        border-radius: 50%;
      }
    }
  }
}

</style>