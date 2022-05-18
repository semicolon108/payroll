<template>
  <div class="page-container">
    
    <div class="page-header border-bottom">
      <div class="header-start">
        <h3 class="page-title">Pension Fund</h3>
        <!-- <button class="button primary"><i class="fas fa-plus"></i> Add</button> -->
      </div>
      <div>
        <input v-model="searchText" type="text" class="input" placeholder="Search..." />
      </div>
      <!-- <div class="header-end">
        <button class="button primary">Active</button>
        <button class="button">History</button>
      </div> -->
    </div>

    <div class="page-content">
      <table class="table is-fullwidth" id="my-table">
        <thead>
          <tr class="sticky">
            <!-- <th class="is-xxs">Photo</th> -->
            <th class="is-xs">Employee ID</th>
            <th class="is-sm">Full Name</th>
            <!-- <th class="is-md is-hidden-mobile">Position</th> -->
            <th class="is-xxs is-center">Status</th>
             <th class="is-xxs is-center">Amount</th>
            <!-- <th class="is-xxs is-right">Option</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in newItems" :key="i._id">
            <td>
              {{ i.employeeCode }}
            </td>
               <td>
              {{ i.firstName + ' ' + i.lastName }}
            </td>
            <td :class=" pensionFund(i).isUsed ? 'has-text-primary' : 'has-text-danger'">
          {{ pensionFund(i).isUsed ? 'Active' : 'In Active' }}
            </td>
            <td>
                {{ pensionFund(i).value + '%' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {getCustomFormulasByNameApi} from '@/apis/custom-formula-api'
export default {
  data: () => ({
    items: [],
    searchText: ''
  }),
  computed: {
    pensionFund() {
      return (emp) => {
        const c = emp.customFields.length ? emp.customFields : []
        const obj =  c.find(i => i.key === 'Pension Fund')
        return obj ? obj : {}
      }
    },
    newItems() {
      return this.items.filter((i) => {
        return (
          i.employeeCode
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
             ||
          i.firstName
            .toLowerCase()
            .includes(this.searchText.toLowerCase())
        );
      });
    },

  },
  methods: {
    async getCustomFormulasByName() {
      const data = await getCustomFormulasByNameApi()
      this.items = data
      //this.items = data
    }
  },
  created() {
    this.getCustomFormulasByName()
  }

};
</script>

<style lang="scss" scoped>
.box-header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  .box-header-end {
    margin-left: auto;
    .field {
      margin: 0;
      display: inline-block;
      input {
        height: 2.5em;
      }
    }
  }
}
</style>