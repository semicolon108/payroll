<template>
  <div>
    <div class="page-header">
      <div class="header-start">
        <div class="header-title">
          <h3 class="xxl-title">Earning / Deduction</h3>
        </div>
        <div class="button-group">
<!--            <button class="button primary" @click="ModalClick = 'Add'">Add</button>-->
            <button
            v-if="!isApproved" 
                class="button primary" @click="ModalClick = 'Upload'">Upload</button>
          </div>
      </div>
    </div>
    <div class="box">
      <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th class="is-xs">
            <span>Employee ID</span>
            <input v-model="searchItem.emId" type="text" class="input" placeholder="Search ID">
          </th>
          <th>
            <span>Full Name</span>
            <input v-model="searchItem.emName" type="text" class="input" placeholder="Search employee">
          </th>
          <th>
            <span>Item Name</span>
            <input v-model="searchItem.itemName" type="text" class="input" placeholder="Search item name">
          </th>
          <th class="is-sm">
            <span>Item Category</span>
            <input v-model="searchItem.itemType" type="text" class="input" placeholder="Item category">
          </th>
          <th class="is-sm is-right">Amount</th>
          <!-- <th class="is-right">
            <span>Status</span>
          </th> -->
<!--          <th v-if="isApproved" class="is-xxs is-right">Option</th>-->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, idx) in newItems" :key="idx">
          <td  :style="isCustomAllo(i.earnDeduct._id) ? 'color: red': null">{{ i.employee.employeeCode }}</td>
          <td :style="isCustomAllo(i.earnDeduct._id) ? 'color: red': null">{{ i.employee.fullName }}</td>
          <td :style="isCustomAllo(i.earnDeduct._id) ? 'color: red': null">{{ i.earnDeduct.name }}</td>
          <td>
            <span>{{ i.earnDeduct.type }}</span>
          </td>
          <td class="is-right">
            <span
                :class="[
                    { 'is-earning': i.earnDeduct.type === 'Earning' },
                    { 'is-deduction': i.earnDeduct.type === 'Deduction' }
                  ]">{{ i.earnDeduct.chooseAmount | currency }}</span>
          </td>
          <!-- <td class="is-right">
            <span v-if="isApproved" class="approved"><i class="fas fa-check-circle"></i></span>
            <span v-else class=""><i class="fas fa-check-circle"></i></span>
          </td> -->
          <td>
          </td>
        </tr>
        </tbody>
      </table>
         <div v-else>
            <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3"  />
           </div>
    </div>
    <component :is="ModalClick" @CloseModal="ModalClick=''"
               @DataBack="getMonthlyPaymentEmployees"
    ></component>
  </div>
</template>

<script>
import Add from '@coms/PayrollCalculation/Deductible/Modal/add.vue'
import Upload from '@coms/PayrollCalculation/Deductible/Modal/upload.vue'
import {approveDeductible, getMonthlyPaymentEmployees} from "@/apis/monthly-payment-employee";
 import Loading from '@/components/Loading/SkeletonLoading'


//  import Loading from '@/components/Loading/SkeletonLoading'
export default {
  components: {
    Add,
    Upload,
   // isLoading
   Loading
  },
  data: () => ({
    selectMonth: false,
    selectYear: false,
    ModalClick: '',
    Approved: true,
    items: [],
    date: null,
    isApproved: true,

    searchItem: {
      emId: '',
      emName: '',
      itemName: '',
      itemType: ''
    },
    isLoading: true
  }),
  computed: {
    isCustomAllo() {
      return (id,) => {
        if(!id) return true
        return false
      }
    },
    newItems() {
      return this.items.filter(i => {
        return i.employee.employeeCode.toLowerCase().includes(this.searchItem.emId.toLowerCase()) &&
               i.employee.fullName.toLowerCase().includes(this.searchItem.emName.toLowerCase()) &&
               i.earnDeduct.name.toLowerCase().includes(this.searchItem.itemName.toLowerCase()) &&
               i.earnDeduct.type.toLowerCase().includes(this.searchItem.itemType.toLowerCase())
      })
    }
  },
  created() {
    this.getMonthlyPaymentEmployees()
  },
  methods: {
    async getMonthlyPaymentEmployees() {
      try {
        const { employees, date, isApproved } = await getMonthlyPaymentEmployees(this.$route.params.id)
        this.items = employees
        this.date = date
        this.isApproved = isApproved

  
               setTimeout(() => {
                this.isLoading = false
             }, 400)
      } catch (err) {
        throw new Error(err)
      }
    },
    async approveDeductible() {
      try {
      await this.$store.dispatch('loading')
        await approveDeductible(this.$route.params.id)
        await this.$store.dispatch('completed')
        this.$dialog.alert('Approved')
        await this.getMonthlyPaymentEmployees()
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
        // if (err.graphQLErrors[0]) {
        //   alert(err.graphQLErrors[0].message)
        // }
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
  display: inline-block;
  color: $dark-grey-color;
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
</style>