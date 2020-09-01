<template>
  <div>
    <div class="page-header">
      <div class="header-start">
        <span @click="$router.back()" class="back">Back</span>
        <div class="header-title">
          <h3 class="xxl-title">{{ date | momentV2 }}</h3>
          <div class="button-group">
            <button class="button" @click="ModalClick = 'Add'">Add</button>
            <button class="button" @click="ModalClick = 'Upload'">Upload</button>
          </div>
        </div>
      </div>
    </div>
    <div class="box slide-up">
      <table class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th class="is-xs">
            <span>Employee ID</span>
            <input type="text" class="input" placeholder="Search ID">
          </th>
          <th>
            <span>Full Name</span>
            <input type="text" class="input" placeholder="Search employee">
          </th>
          <th>
            <span>Item Name</span>
            <input type="text" class="input" placeholder="Search item name">
          </th>
          <th class="is-sm">
            <span>Item Category</span>
            <input type="text" class="input" placeholder="Item category">
          </th>
          <th class="is-sm is-right">Amount</th>
          <th class="is-right">
            <span>Action</span>
            <button v-if="items[0].isApproved" class="button"
              :disabled="items[0].isApproved">
              <i class="fas fa-check-circle"></i>
              Approved
            </button>
            <button v-else
                    @click="approveDeductible"
                    class="button pending">Approve All</button>
          </th>
          <th class="is-xxs is-right">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, index) in items" :key="index">
          <td>{{ i.employee.employeeCode }}</td>
          <td>{{ i.employee.fullName }}</td>
          <td>{{ i.earnDeduct.name }}</td>
          <td>
            <span>{{ i.earnDeduct.type }}</span>
          </td>
          <td class="is-right">
            <span
                :class="[{ 'is-earning': i.earnDeduct.type === 'Earning' }, { 'is-deduction': i.earnDeduct.type === 'Deduction' } ]">{{
                i.earnDeduct.chooseAmount
              }}</span>
          </td>
          <td class="is-right">
            <span v-if="i.isApproved" class="approved"><i class="fas fa-check-circle"></i></span>
            <span v-else class=""><i class="fas fa-check-circle"></i></span>
            <!--                            <button class="button" v-if="!i.isApproved">Approve</button>-->
          </td>
          <td>
            <div class="icons">
              <span class="icon" @click="ModalClick = 'Edit'"><i class="fas fa-pen"></i></span>
              <span class="icon"><i class="fas fa-trash"></i></span>
            </div>
          </td>
        </tr>
        <!--                    <tr v-for="(n, index) in 7" :key="index">-->
        <!--                        <td>E129S</td>-->
        <!--                        <td>Anousone Luangkhot</td>-->
        <!--                        <td>Leave Without Notice</td>-->
        <!--                        <td>-->
        <!--                            <span class="deduct">Deduction</span>-->
        <!--                        </td>-->
        <!--                        <td class="is-right">-->
        <!--                            <span class="deduct">- 445,000</span>-->
        <!--                        </td>-->
        <!--                        <td class="is-right">-->
        <!--                            <span v-if="Approved" class="approved"><i class="fas fa-check-circle"></i></span>-->
        <!--                            <button class="button" v-if="!Approved">Approve</button>-->
        <!--                        </td>-->
        <!--                        <td>-->
        <!--                            <div class="icons">-->
        <!--                                <span class="icon" @click="ModalClick = 'Edit'"><i class="fas fa-pen"></i></span>-->
        <!--                                <span class="icon"><i class="fas fa-trash"></i></span>-->
        <!--                            </div>-->
        <!--                        </td>-->
        <!--                    </tr>-->
        </tbody>
      </table>
    </div>
    <component :is="ModalClick" @CloseModal="ModalClick=''"
               @DataBack="getMonthlyPaymentEmployees"
    ></component>
  </div>
</template>

<script>
import Edit from '@coms/Deductible/Modal/edit.vue'
import Add from '@coms/Deductible/Modal/add.vue'
import Upload from '@coms/Deductible/Modal/upload.vue'
import {approveDeductible, getMonthlyPaymentEmployees} from "@/apis/monthly-payment-employee";
import moment from "moment";
export default {
  components: {
    Edit,
    Add,
    Upload
  },
  data: () => ({
    selectMonth: false,
    selectYear: false,
    ModalClick: '',
    Approved: true,
    items: [],
    date: null
  }),
  filters: {
    momentV2(date) {
      return moment(date).format('LL')
    }
  },
  created() {
    this.getMonthlyPaymentEmployees()
  },
  methods: {
    async getMonthlyPaymentEmployees() {
      try {
        const { employees, date } = await getMonthlyPaymentEmployees(this.$route.params.id)
        this.items = employees
        this.date = date
      } catch (err) {
        throw new Error(err)
      }
    },
    async approveDeductible() {
      try {
        await approveDeductible(this.$route.params.id)
        await this.getMonthlyPaymentEmployees()
      } catch (err) {
        throw new Error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.is-deduction {
  color: $alert-color;
}
.is-earning {
  color: $primary-color;
}
th {
  span {
    margin-bottom: 5px;
    display: block;
  }
  input {
    @include input;
    &:focus {
      border: 1px solid $primary-color;
      box-shadow: none;
    }
  }
}
.back {
  cursor: pointer;
  color: $font-grey-color;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    border-right: 2px solid $font-grey-color;
    border-bottom: 2px solid $font-grey-color;
    width: 8px;
    height: 8px;
    transform: rotate(-225deg);
    margin-right: 3px;
  }
}
th {
  .button {
    border-radius: $radius;
    border: 1px solid $border-color;
    background-color: $primary-color;
    color: #fff;
    &:focus {
      box-shadow: none;
    }
    &:disabled {
      color: $font-color;
      background-color: $grey-color;
      i{
        margin-right: 5px;
      }
    }
  }
}
td {
  .button {
    border-radius: $radius;
    border: 1px solid $border-color;
    background-color: $light-grey-color;
    &:focus {
      box-shadow: none;
    }
  }
  .approved {
    color: $primary-color;
  }
}
</style>