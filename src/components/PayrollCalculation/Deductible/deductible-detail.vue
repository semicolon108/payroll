<template>
  <div class="container">
    <div class="page-header no-border no-padding margin-bottom-20 no-shadow">
      <div class="header-start">
        <div class="header-title">
          <h3>Earning / Deduction</h3>
        </div>
        <div class="button-group">
          <!-- <button
              v-if="!isApproved" 
              class="button primary" @click="ModalClick = 'Upload'">
              <i class="fal fa-cloud-upload"></i>Upload
          </button> -->
          <button class="button primary" @click="ModalClick = 'Upload'">
            <i class="fal fa-cloud-upload"></i>Upload
          </button>
        </div>
      </div>
      <!-- header-start -->
    </div>

    <div class="summary-container">
      <div class="columns is-mobile is-multiline">
        <div class="column is-3-desktop is-12-mobile">
          <ul class="_detail">
            <li class="total">
              <h3>Grand Total</h3>
              <h1>{{ totalDeductible | currency }} ₭</h1>
            </li>
          </ul>
        </div>
        <div class="column is-12-mobile">
          <ul class="_detail">
            <li class="label primary">
              <h3>Earning (+)</h3>
            </li>
            <li v-for="i in earnings" :key="i.name">
              <span>{{ i.name }}</span>
              <span>{{ i.total | currency }} ₭</span>
            </li>
            <li class="sum">
              <span>Grand Total</span>
              <span>{{ totalEarnings | currency }} ₭</span>
            </li>
          </ul>
        </div>
        <div class="column is-12-mobile">
          <ul class="_detail">
            <li class="label alert">
              <h3>Deduction (-)</h3>
            </li>
            <li v-for="i in deductions" :key="i.name">
              <span>{{ i.name }}</span>
              <span>{{ i.total | currency }} ₭</span>
            </li>
            <li class="sum">
              <span>Grand Total</span>
              <span>{{ totalDeductions | currency }} ₭</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <h3 class="sub-title">Employee Detail</h3>

    <div class="box">
      <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
        <thead>
          <tr>
            <th class="is-xs">
              <span>Employee ID</span>
              <input
                v-model="searchItem.emId"
                type="text"
                class="input"
                placeholder="Search ID"
              />
            </th>
            <th>
              <span>Full Name</span>
              <input
                v-model="searchItem.emName"
                type="text"
                class="input"
                placeholder="Search employee"
              />
            </th>
            <th>
              <span>Item Name</span>
              <input
                v-model="searchItem.itemName"
                type="text"
                class="input"
                placeholder="Search item name"
              />
            </th>
            <th class="is-sm">
              <span>Item Category</span>
              <input
                v-model="searchItem.itemType"
                type="text"
                class="input"
                placeholder="Item category"
              />
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
            <td :style="isCustomAllo(i.earnDeduct._id) ? 'color: red' : null">
              {{ i.employee.employeeCode }}
            </td>
            <td :style="isCustomAllo(i.earnDeduct._id) ? 'color: red' : null">
              {{ i.employee.fullName }}
            </td>
            <td :style="isCustomAllo(i.earnDeduct._id) ? 'color: red' : null">
              {{ i.earnDeduct.name }}
            </td>
            <td>
              <span>{{ i.earnDeduct.type }}</span>
            </td>
            <td class="is-right">
              <span
                :class="[
                  { 'is-earning': i.earnDeduct.type === 'Earning' },
                  { 'is-deduction': i.earnDeduct.type === 'Deduction' },
                ]"
                >{{ i.earnDeduct.chooseAmount | currency }}</span
              >
            </td>
            <!-- <td class="is-right">
            <span v-if="isApproved" class="approved"><i class="fas fa-check-circle"></i></span>
            <span v-else class=""><i class="fas fa-check-circle"></i></span>
          </td> -->
            <td></td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <Loading v-for="n in 7" :key="n" style="height: 60px" class="mb-3" />
      </div>
    </div>
    <component
      :is="ModalClick"
      @CloseModal="ModalClick = ''"
      @DataBack="getMonthlyPaymentEmployees"
    ></component>
  </div>
</template>

<script>
import Add from "@coms/PayrollCalculation/Deductible/Modal/add.vue";
import Upload from "@coms/PayrollCalculation/Deductible/Modal/upload.vue";
import {
  approveDeductible,
  getMonthlyPaymentEmployees,
} from "@/apis/monthly-payment-employee";
import Loading from "@/components/Loading/SkeletonLoading";

//  import Loading from '@/components/Loading/SkeletonLoading'
export default {
  components: {
    Add,
    Upload,
    // isLoading
    Loading,
  },
  data: () => ({
    selectMonth: false,
    selectYear: false,
    ModalClick: "",
    Approved: true,
    items: [],
    date: null,
    isApproved: true,

    earnings: [],
    totalEarnings: null,
    totalDeductible: null,

    searchItem: {
      emId: "",
      emName: "",
      itemName: "",
      itemType: "",
    },
    isLoading: true,
  }),
  computed: {
    isCustomAllo() {
      return (id) => {
        if (!id) return true;
        return false;
      };
    },
    newItems() {
      return this.items.filter((i) => {
        return (
          i.employee.employeeCode
            .toLowerCase()
            .includes(this.searchItem.emId.toLowerCase()) &&
          i.employee.fullName
            .toLowerCase()
            .includes(this.searchItem.emName.toLowerCase()) &&
          i.earnDeduct.name
            .toLowerCase()
            .includes(this.searchItem.itemName.toLowerCase()) &&
          i.earnDeduct.type
            .toLowerCase()
            .includes(this.searchItem.itemType.toLowerCase())
        );
      });
    },
  },
  created() {
    this.getMonthlyPaymentEmployees();
  },
  methods: {
    async getMonthlyPaymentEmployees() {
      try {
        const {
          employees,
          date,
          isApproved,
          earnings,
          totalEarnings,
          deductions,
          totalDeductions,
          totalDeductible,
        } = await getMonthlyPaymentEmployees(this.$route.params.id);
        this.items = employees;
        this.date = date;
        this.isApproved = isApproved;
        this.earnings = earnings;
        this.totalEarnings = totalEarnings;
        this.deductions = deductions;
        this.totalDeductions = totalDeductions;
        this.totalDeductible = totalDeductible;

        setTimeout(() => {
          this.isLoading = false;
        }, 400);
      } catch (err) {
        throw new Error(err);
      }
    },
    async approveDeductible() {
      try {
        await this.$store.dispatch("loading");
        await approveDeductible(this.$route.params.id);
        await this.$store.dispatch("completed");
        this.$dialog.alert("Approved");
        await this.getMonthlyPaymentEmployees();
      } catch (err) {
        await this.$store.dispatch("error");
        throw new Error(err);
        // if (err.graphQLErrors[0]) {
        //   alert(err.graphQLErrors[0].message)
        // }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.is-deduction {
  color: $alert-color;
}
.is-earning {
  color: $primary-color;
}
.sub-title {
  font-size: 16px;
  margin: 0 0 10px 0;
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
    content: "\f053";
    font-family: FontAwesome;
    margin-right: 5px;
    font-size: 14px;
  }
}

.summary-container {
  margin-bottom: 30px;
  ul._detail {
    margin: 0;
    padding: 20px;
    border: 1px solid $border-color;
    height: 100%;
    li {
      list-style-type: none;
      margin: 0;
      padding: 0;
      font-size: 14px;
      line-height: 1.8;
      display: flex;
      justify-content: space-between;
      &.total {
        flex-direction: column;
        justify-content: center;
        height: 100%;
        h3 {
          font-size: 16px;
          margin: 0 0 5px 0;
        }
        h1 {
          margin: 0;
          font-weight: 700;
        }
      }
      &.label {
        &.primary h3 {
          color: $primary-color;
        }
        &.alert h3 {
          color: $alert-color;
        }
        h3 {
          font-size: 16px;
          margin-bottom: 5px;
        }
      }
      &.sum {
        font-weight: 700;
      }
    }
  }
}
</style>