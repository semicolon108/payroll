<template>
  <ValidationObserver v-slot="{ handleSubmit }" class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Company Work Day</h3>
    </div>
    <div class="field">
      <!-- <div class="control">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input v-model="workingDay" type="text" class="input">
          <p class="has-text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
      </div> -->
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Group Name</th>
            <th class="is-xs">Employee</th>
            <th class="is-xs">Workday</th>
            <th class="is-xs">OT Day</th>
            <th class="is-xs is-right">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Default</td>
            <td>150</td>
            <td>30</td>
            <td>30</td>
            <td>
              <div class="icon-group">
                <span @click="EditWorkDay()"><i class="fas fa-pen"></i></span>
                <span><i class="fas fa-trash"></i></span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--      <div class="field">-->
    <!--        <label class="label">Work Hours / Day</label>-->
    <!--        <div class="control">-->
    <!--          <ValidationProvider rules="required" v-slot="{ errors }">-->
    <!--            <input v-model="workingDay" type="text" class="input">-->
    <!--            <p class="has-text-danger">{{ errors[0] }}</p>-->
    <!--          </ValidationProvider>-->
    <!--        </div>-->
    <!--      </div>-->

    <!-- Modal -->
    <WorkDay @CloseModal="Modal = false" v-if="Modal"/>
    <!-- Modal -->

    <button @click="handleSubmit(updateCompanyInfo)" class="button primary">Save</button>
  </ValidationObserver>
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import WorkDay from './Modal/WorkDay.vue'

export default {
  components: { WorkDay },
  data: () => ({
    Modal: false,
    workingDay: null
  }),
  computed: {
    ...mapGetters(['getCompany'])
  },
  methods: {
    ...mapActions(['updateCompany']),
    async updateCompanyInfo() {
      try {
        await this.$store.dispatch('loading')
        await this.updateCompany({workingDay: parseInt(this.workingDay, 10)})
        await this.$store.dispatch('completed')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    EditWorkDay(){
      this.Modal = true
    },
  },
  created() {
    this.workingDay = this.getCompany.workingDay
  }
}
</script>

<style lang="scss" scoped>
.box-header {
  color: $font-color;
  margin-bottom: 20px;

  .box-title {
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 5px;;
  }
}

.table {
  color: $font-color;
  thead {
    tr {
      th {
        width: 30%;
        border-width: 1px;
        white-space: nowrap;
        &.is-xxs {
          width: 3%;
        }
        &.is-xs {
          width: 8%;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        border-width: 1px;
        .icon-group {
          color: $font-grey-color;

          i {
            font-size: 14px;
            padding: 0 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}


</style>