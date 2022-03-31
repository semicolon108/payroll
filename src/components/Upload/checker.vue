<template>
  <div id="checker">
    <div class="checker-header">
      <h3>Validate Uploaded Data</h3>
      <div class="button-group">
        <button @click="$emit('closeModal')" class="button">Cancel</button>
        <button @click="$emit('reUpload')" class="button is-sub">
          Re-Upload
        </button>
        <button
          v-if="data.totalError === 0"
          @click="upload"
          class="button is-primary"
        >
          Save
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
            
<th>Column</th>
            <th>Employee ID</th>
             
            <th v-if="data.totalError !== 0">Errors count</th>
            <th class="is-sm is-right">Amount (LAK)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(i, idx) in data.items" :key="idx">

           <td>
              {{ i.index ? i.index + 2 : idx + 2 }}
            </td>
            <!-- <td>{{ i.column }}</td> -->
            <td :class="{ 'error-item': data.totalError !== 0 && i.errors.includes('Invalid employee code') }">
              {{ i.employeeCode }} 
            </td>
          
            <td v-if="data.totalError !== 0" class="error-item">{{i.errors.length}}</td>
            <td
            :class="{ 'error-item': data.totalError !== 0 && i.errors.includes('Invalid number') }"
             class="is-right">{{ i.amount }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// import { addDeductible } from "@/apis/monthly-payment-employee";
// s
 import { uploadEmployeesSalaryApi } from "@/apis/upload-api"
export default {
  props: ["data", 'type'],
  methods: {
    async upload() {
      const form = {
          condition: 'Confirm',
          type: this.type,
          employees: this.data.items
      }

      try {
        this.$store.dispatch("loading");

        await uploadEmployeesSalaryApi(form)

        this.$store.dispatch("completed");
     //   this.$router.push({ ...this.$route, query: { resetTotal: true } });
      } catch (e) {
        this.$store.dispatch("error");
        throw new Error(e);
      }

      this.$emit("closeModal");
    },
  },
};
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
  .box {
    overflow-x: scroll;
  }
}

.checker-header {
  display: flex;
  margin-bottom: 30px;

  .button-group {
    display: flex;
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