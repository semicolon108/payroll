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
              <select v-model="form.positionId" class="select">
                <option v-for="i in positions" :key="i._id" :value="i._id">
                  {{ i.name }}
                </option>
              </select>
              <!--                            <input type="text" class="input" required>-->
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Work Day</label>
            <div class="control">
              <input v-model="form.workDay" type="text" class="input" required>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Working Location</label>
            <div class="control">
              <select v-model="form.provinceId" class="select">
                <option v-for="i in provinces" :key="i._id" :value="i._id">
                  {{ i.name }}
                </option>
              </select>
              <!--                            <input type="text" class="input" required>-->
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Salary</label>
            <div class="control">
              <input v-model="form.salary" type="text" class="input" required>
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label for="" class="label">Contract Type</label>
            <div class="control">
              <select v-model="form.contactTypeId" class="select" name="" id="">
                <option v-for="i in contactTypes" :key="i._id" :value="i._id">
                  {{ i.name }}
                </option>
              </select>
              <!--                            <div class="select-container">-->
              <!--                                &lt;!&ndash; Select Label &ndash;&gt;-->
              <!--                                &lt;!&ndash; <input type="text" class="input"> &ndash;&gt;-->
              <!--                                -->
              <!--                                <div class="select-label"-->
              <!--                                    :class="{'active' : SelectActive}"-->
              <!--                                    @click="select()">-->
              <!--                                    <span>Select Contract type</span>-->
              <!--                                    <span><i class="fas fa-caret-down"></i></span>-->
              <!--                                </div>-->
              <!--                                -->
              <!--                                <div class="select-list-box" :class="{'active' : SelectActive}">-->
              <!--                                    &lt;!&ndash; Select list &ndash;&gt;-->
              <!--                                    <div class="select-list">-->
              <!--                                        <div class="select-item" v-for="(n,idx) in 4" :key="idx">Contract type 1</div>-->
              <!--                                    </div>-->
              <!--                                </div>-->
              <!--                            </div>-->
            </div>
          </div>
        </div>
      </div>

      <hr>

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
      workDay: null,
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
      this.form.workDay = parseInt(this.form.workDay, 10)
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
.select-container {
  position: relative;

  .select-list-box {
    box-sizing: border-box;
    box-shadow: 0 0 10px 0 rgba(149, 149, 149, 0.5);
    display: none;
    border: 1px solid $border-color;
    background-color: #fff;
    z-index: 1;
    position: absolute;
    padding: 20px;
    width: 100%;
    margin-top: 5px;

    &.active {
      display: block;
    }

    .select-list {
      .select-item {
        padding: 8px 0;
        cursor: pointer;
        transition: all ease-in-out .1s;

        &:hover {
          color: $primary-color;
        }
      }
    }
  }

  .select-label {
    // color: $primary-color;
    position: relative;
    cursor: pointer;
    border: 1px solid $border-color;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;

    i {
      margin-right: 10px;
      transition: .2s ease;
    }

    &.active i {
      transition: .2s ease;
      transform: rotate(180deg);
    }
  }
}

</style>