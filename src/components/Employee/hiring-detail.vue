<template>
  <div>
    <div class="form-header">
      <h3>Employee Information</h3>
      <p>Please enter the employee personal information below. The information entered in previous steps is saved and
        you can always come back to complete this screen from the employees page.</p>
    </div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <div class="form">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Contract Type</label>
              <div class="control">
                <div class="select">
                  <ValidationProvider name="Contract Type" rules="required" v-slot="{ errors }">
                    <select v-model="isOpenContract" class="select" name="" id="">
                      <!--                      <option v-for="i in contactTypes" :key="i._id" :value="i._id">-->
                      <!--                        {{ i.name }}-->
                      <!--                      </option>-->
                      <option selected name="open" :value="true">Open Contract</option>
                      <option  name="fixed" :value="false">Fixed Contract</option>
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
          <div class="column is-4" :style="isOpenContract ? 'opacity: 30%' : null">
            <div class="field">
              <label for="" class="label">Contract End Date</label>
              <ValidationProvider name="Until Date / End Date" rules="required|isDate" v-slot="{ errors }">
                <DatePicker v-model="form.contactDetail.endDate" :defaultValue="defaultValue.contactDetail.endDate"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Probation End Date</label>
              <ValidationProvider name="Probation End Date" rules="required|isDate" v-slot="{ errors }">
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
            <label for="" class="label">Salary</label>
            <div class="field has-addons">
              <div class="control">
                <div class="select">
                  <ValidationProvider name="File" rules="required" v-slot="{ errors }">
                    <select v-if="companyCurrencies.isMulti" v-model="form.currencyId">
                      <option

                          v-for="i in currencies"
                          :value="i._id"
                          :key="i._id">{{ i.name }}
                      </option>
                    </select>
                    <select v-else v-model="form.currencyId">
                      <option
                          :value="currencies[0]._id"
                          :key="currencies[0]._id">{{ currencies[0].name }}
                      </option>
                    </select>
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
              <div class="control is-expanded">
                <input v-model="form.salary" type="text" class="input" required>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <!-- Contract detail -->
<!--        <h3 class="form-title">Contract Detail</h3>-->
<!--        <div class="columns is-multiline">-->
<!--&lt;!&ndash;          <div class="column is-4">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="field">&ndash;&gt;-->
<!--&lt;!&ndash;              <label for="" class="label">Contract Type</label>&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="control">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="select">&ndash;&gt;-->
<!--&lt;!&ndash;                  <ValidationProvider name="Contract Type" rules="required" v-slot="{ errors }">&ndash;&gt;-->
<!--&lt;!&ndash;                    <select v-model="isOpenContract" class="select" name="" id="">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                      <option v-for="i in contactTypes" :key="i._id" :value="i._id">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                        {{ i.name }}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;                      </option>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                      <option selected name="open" :value="true">Open Contract</option>&ndash;&gt;-->
<!--&lt;!&ndash;                      <option  name="fixed" :value="false">Fixed Contract</option>&ndash;&gt;-->
<!--&lt;!&ndash;                    </select>&ndash;&gt;-->
<!--&lt;!&ndash;                    <p class="has-text-danger">{{ errors[0] }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;                  </ValidationProvider>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div> &lt;!&ndash; column &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="column is-4" v-if="!isOpenContract">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="field">&ndash;&gt;-->
<!--&lt;!&ndash;              <label for="" class="label">Effective Date / Start Date</label>&ndash;&gt;-->
<!--&lt;!&ndash;              <ValidationProvider name="Effective Date / Start Date" rules="required|isDate" v-slot="{ errors }">&ndash;&gt;-->
<!--&lt;!&ndash;              <DatePicker v-model="form.contactDetail.startDate" :defaultValue="defaultValue.contactDetail.startDate"/>&ndash;&gt;-->
<!--&lt;!&ndash;                <p class="has-text-danger">{{ errors[0] }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;              </ValidationProvider>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="column is-4" v-if="!isOpenContract">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="field">&ndash;&gt;-->
<!--&lt;!&ndash;              <label for="" class="label">Until Date / End Date</label>&ndash;&gt;-->
<!--&lt;!&ndash;              <ValidationProvider name="Until Date / End Date" rules="required|isDate" v-slot="{ errors }">&ndash;&gt;-->
<!--&lt;!&ndash;                <DatePicker v-model="form.contactDetail.endDate" :defaultValue="defaultValue.contactDetail.endDate"/>&ndash;&gt;-->
<!--&lt;!&ndash;                <p class="has-text-danger">{{ errors[0] }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;              </ValidationProvider>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div> &lt;!&ndash; column &ndash;&gt;&ndash;&gt;-->
<!--        </div>-->
<!--        <hr>-->
        <div class="columns" v-show="employee.isExpat">
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
                <DatePicker v-model="form.workPermit.endDate" :defaultValue="defaultValue.workPermit.startDate"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">Days of notify</label>
              <div class="control">
                <ValidationProvider name="End Date" rules="required|numeric" v-slot="{ errors }">
                <input v-model="form.workPermit.daysOfNotify" type="text" class="input">
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
        <button type="button" @click="handleSubmit(addOrUpdateHirringDetail)" class="button save-btn">Save and Continue
        </button>
      </div>
    </ValidationObserver>
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


export default {
  components: {
    DatePicker
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
      isExpat: true,
      contactDetail: {
        contactTypeId: null,
        mobile: null,
        startDate: null,
        endDate: null
      },
      workPermit: {
        startDate: null,
        endDate: null,
        daysOfNotify: null
      },
    },
    isEditMode: false,

    defaultValue: {
      dateOfJoining: null,
      probationEndDate: null,
      workPermit: {},
      contactDetail: {}
    },

    companyCurrencies: [],

    employee: {},
    isOpenContract: true

  }),
  computed: {
    ...mapGetters(['getCompany'])
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
        this.isEditMode = true
        this.form = {
          ...data,
          contactDetail: {
            contactTypeId: data.contactDetail.contactTypeId,
            mobile: data.contactDetail.mobile,
            startDate: data.contactDetail.startDate,
            endDate: data.contactDetail.endDate
          },
          workPermit: {
            startDate: data.workPermit.startDate,
            endDate: data.workPermit.endDate,
            daysOfNotify: data.workPermit.daysOfNotify
          }
        }
        this.defaultValue = {
          dateOfJoining: data.dateOfJoining,
          probationEndDate: data.probationEndDate,
          contactDetail: data.contactDetail,
          workPermit: data.workPermit,
        }
      } else {
        this.form = {
          ...this.form,
          positionId: this.positions[0]._id,
          provinceId: this.provinces[0]._id,
          currencyId: this.currencies[0]._id,
          contactDetail: {
            contactTypeId: this.contactTypes[0]._id
          }
        }
      }
    },
    async addOrUpdateHirringDetail() {
      this.form.employeeId = this.$route.params.id
      this.form.workingDay = parseInt(this.form.workingDay, 10)
      this.form.salary = parseInt(this.form.salary, 10)
      this.form.workPermit.daysOfNotify = parseInt(this.form.workPermit.daysOfNotify, 10)
      await addOrUpdateHirringDetail(this.form)
      await this.$router.push({name: 'earning', params: {id: this.$route.params.id}})
    },
    async getEmployee() {
      try {
        const res = await this.$apollo.query({
          query: GET_EMPLOYEE,
          variables: {
            employeeId: this.$route.params.id
          }
        })
        this.employee =  res.data.getEmployee
      } catch (err) {
        throw new Error(err)
      }
    },
    async getCurrencies() {
      this.currencies = await getReuse('Currency')
    },
    async getCompanyCurrencies() {
      this.companyCurrencies = await getCompanyCurrencies()
    }
  },
  created() {
    this.getCurrencies()
    this.getCompanyCurrencies()
    this.getData()
    this.getEmployee()
    window.scrollTo(0, 0)
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