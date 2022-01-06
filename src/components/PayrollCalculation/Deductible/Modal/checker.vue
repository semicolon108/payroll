<template>
  <div id="checker">
    <div class="checker-header">
      <h3>Validate Uploaded Deductable Data</h3>
      <div class="button-group">
        <button @click="$emit('CloseModal')" class="button">Cancel</button>
        <button @click="$emit('ReUpload')" class="button is-sub">Re-Upload</button>
        <button
            v-if="data.totalError === 0"
            @click="addDeductible"
            class="button is-primary">Save
        </button>
      </div>
    </div>

    <div class="columns status-boxs">
      <div class="column is-3">
        <div class="box">
          <span>Number Of Information</span>
          <h3>{{ data.total }}</h3>
        </div>
      </div>
      <div class="column is-3">
        <div class="box error">
          <span>Number of Error Found</span>
          <h3>{{ data.totalError }}</h3>
        </div>
      </div>
    </div>

    <div class="box">
      <table class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th class="is-xxs">Column</th>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Earning / Deuction Type</th>
          <th class="is-sm is-right">Amount (LAK)</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, idx) in data.items" :key="idx">
          <td>{{ i.column }}</td>
          <td
              :class="{'error-item': data.isEmployeeError }"
          >{{ i.employeeCode }}
          </td>
          <td>{{ i.fullName }}</td>
          <td>
          <span
              :class="{'error-item': data.isTypeError }"
          >
              {{ i.earnDeductName }}
            <br>
            <!--                            <span v-if="i.groups" style="font-size: .6rem">("{{i.type}}" is not in "{{i.groups}}")</span>-->
          </span>
          </td>
          <td class="is-right">{{ i.amount }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { addDeductible } from "@/apis/monthly-payment-employee";
import { calcPayroll } from "@/apis/payroll-api";
export default {
  props: ['data'],
  methods: {
    async calcPayroll() {
        await calcPayroll(this.$route.params.id)
        this.$router.push({...this.$route, query: { resetTotal: true }})
    },
    async addDeductible() {
      const mapItems = this.data.items.map(i => {
       const amount = i.amount
        return {
          employeeCode: i.employeeCode,
          type: i.type,
          amount
        }
      })
      const form = {
        monthlyPaymentId: this.$route.params.id,
        items: mapItems
      }
      try {
        this.$store.dispatch('loading')
        await addDeductible(form)
        await this.calcPayroll()
        this.$store.dispatch('completed')
        this.$router.push({...this.$route, query: { resetTotal: true }})
        } catch(e) {
          this.$store.dispatch('error')
          throw new Error(e)
        }

      this.$emit('DataBack')
      this.$emit('CloseModal')
    }
  }
}
</script>

<style lang="scss" scoped>
#checker {
  color: $font-color;
  background-color: #fff;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  padding: 40px;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  .box{
    overflow-x: scroll;
  }
}

.checker-header {
  display: flex;
  margin-bottom: 30px;

  .button-group {
    display: block;
    margin-left: auto;

    .button {
      margin-left: 10px;
      border-radius: 0;
      border: 1px solid $border-color;
      background-color: $light-grey-color;

      &.is-primary {
        background-color: $primary-color;
        border-color: $primary-color;
        color: #fff;
      }

      &.is-sub {
        background-color: $sub-color;
        border-color: $sub-color;
        color: #fff;
      }
    }
  }

  h3 {
    font-size: 20px;
    color: $font-color;
    font-weight: 700;
  }
}

.status-boxs {
  color: $font-color;

  .box {
      overflow-x: scroll;

    h3 {
      font-size: 30px;
      font-weight: bold;
      margin: 0;
      line-height: 1;
    }

    &.error {
      background-color: $alert-color;
      color: #fff;
    }
  }
}

.error-item {
  color: $alert-color;
  text-decoration: underline;
}
</style>