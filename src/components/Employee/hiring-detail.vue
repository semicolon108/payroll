<template>
  <div>
    <div class="form-header">
      <h3>Employee Information</h3>
      <p>Please enter the employee personal information below. The information entered in previous steps is saved and
        you can always come back to complete this screen from the employees page.</p>
    </div>
    <form action="" class="form">
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Date of Joining</label>
            <DatePicker v-model="form.dateOfJoining" :defaultValue="defaultValue.dateOfJoining" />
          </div>
        </div>
        <div class="column is-4">
          <div  class="field">
            <label for="" class="label">Probation End Date</label>
            <DatePicker v-model="form.probationEndDate"  :defaultValue="defaultValue.probationEndDate" />
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Position</label>
            <div class="control">
              <div class="select">
                <select v-model="form.positionId">
                  <option v-for="i in positions" :key="i._id" :value="i._id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Work Day</label>
            <div class="control">
              <input v-model="form.workingDay" type="text" class="input" required>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Working Location</label>
            <div class="control">
              <div class="select">
                <select v-model="form.provinceId" class="select">
                  <option v-for="i in provinces" :key="i._id" :value="i._id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <label for="" class="label">Salary</label>
          <div class="field has-addons">
            <p class="control">
              <span class="select">
                <select>
                  <option>$</option>
                  <option>£</option>
                  <option>€</option>
                </select>
              </span>
            </p>
            <div class="control is-expanded">
              <input v-model="form.salary" type="text" class="input" required>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Contract Type</label>
            <div class="control">
              <div class="select">
                <select v-model="form.contactTypeId" class="select" name="" id="">
                  <option v-for="i in contactTypes" :key="i._id" :value="i._id">
                    {{ i.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr>


      <!-- Contract detail -->
      <h3 class="form-title">Contract Detail</h3>
      <div class="columns is-multiline">
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Contract Number</label>
            <div class="control">
              <input v-model="form.contactNumber" type="text" class="input" required>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Effective Date / Start Date</label>
            <DatePicker v-model="form.startDate"  :defaultValue="defaultValue.startDate" />
          </div>
        </div>
        <div class="column is-4">
          <div  class="field">
            <label for="" class="label">Until Date / End Date</label>
            <DatePicker v-model="form.endDate"  :defaultValue="defaultValue.endDate" />
          </div>
        </div>
      </div>

      <hr>

      <div class="form-title-wraper">
        <h3 class="form-title">Work Permit</h3>
        <div class="control switch-btn">
          <input type="checkbox" id="expat">
          <label for="expat"></label>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Start Date</label>
            <div class="control">
              <input type="text" class="input">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">End Date</label>
            <div class="control">
              <input type="text" class="input">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Days of notify</label>
            <div class="control">
              <input type="text" class="input">
            </div>
          </div>
        </div>
      </div>


      <button type="button" @click="addOrUpdateHirringDetail" class="button save-btn">Save and Continue</button>
    </form>
  </div>
</template>

<script>


import DatePicker from "@/utils/DatePicker";
import {getReuse} from "@/apis/reuse-api";
import {addOrUpdateHirringDetail, getHirringDetail} from "@/apis/hirring-detail-api";

export default {
  components: {
    DatePicker
  },
  data: () => ({
    SelectActive: false,
    positions: [],
    provinces: [],
    contactTypes: [],
    form: {
      dateOfJoining: null,
      probationEndDate: null,
      positionId: '',
      provinceId: '',
      workingDay: null,
      salary: null,
      contactTypeId: '',
      contactNumber: '',
      startDate: null,
      endDate: null
    },
    isEditMode: false,

    defaultValue: {
      dateOfJoining: null,
      probationEndDate: null,
      startDate: null,
      endDate: null
    }
  }),
  methods: {
    select() {
      this.SelectActive = !this.SelectActive
    },
    async getData() {
      this.positions = await getReuse('Position')
      this.provinces = await getReuse('Province')
      this.contactTypes = await getReuse('ContactType')
      const data = await getHirringDetail(this.$route.params.id)
      if (data) {
        this.isEditMode = true
        this.form = {
          ...data, ...{
            positionId: data.positionId._id,
            provinceId: data.provinceId._id,
            contactTypeId: data.contactTypeId._id
          }
        }
        this.defaultValue = {
          dateOfJoining: data.dateOfJoining,
          probationEndDate: data.probationEndDate,
          startDate: data.startDate,
          endDate: data.endDate
        }
      } else {
        this.form = {
          positionId: this.positions[0]._id,
          provinceId: this.provinces[0]._id,
          contactTypeId: this.contactTypes[0]._id,
        }
      }
    },
    async addOrUpdateHirringDetail() {
      this.form.employeeId = this.$route.params.id
      this.form.workingDay = parseInt(this.form.workingDay, 10)
      this.form.salary = parseInt(this.form.salary, 10)
      await addOrUpdateHirringDetail(this.form)
      await this.$router.push({name: 'earning', params: {id: this.$route.params.id}})
    }
  },
  created() {
    this.getData()
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped>
.form-title-wraper{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .form-title{
    margin: 0;
  }
  .switch-btn{
    margin-left: 10px;
    display: flex;
    width: 80px;
    position: relative;
    input{
      display: none;
      &:checked ~ label{
        background-color: $primary-color;
      }
      &:checked ~ label::after{
        left: auto;
        right: 3px;
      }
    }
    label{
      transition: all 0.1s ease 0.1s;
      background-color: $grey-color;
      border-radius: 40px;
      position: relative;
      width: 45px;
      height: 26px;
       &::after{
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