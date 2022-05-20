<template>
  <div class="page-container">
    <div class="page-header">
      <h3 class="page-title">Personal Income TAX</h3>
    </div>
    <div class="page-content">
      <div class="field">
        <label for="" class="label">How TAX is paid?</label>
        <div class="control switch">
          <input
            @click="isTaxPaidByCompany = false"
            type="radio"
            name="tax"
            id="employeetax"
            :checked="!isTaxPaidByCompany"
          />
          <label for="employeetax">Employee pay</label>

          <input
            @click="isTaxPaidByCompany = true"
            type="radio"
            name="tax"
            id="employertax"
            :checked="isTaxPaidByCompany"
          />
          <label for="employertax">Employer pay</label>
        </div>
      </div>
      <button @click="updateCompanyInfo" class="button primary">Save</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    isTaxPaidByCompany: false,
  }),
  computed: {
    ...mapGetters(["getCompany"]),
  },
  methods: {
    ...mapActions(["updateCompany"]),
    async updateCompanyInfo() {
      try {
        await this.$store.dispatch("loading");
        await this.updateCompany({
          isTaxPaidByCompany: this.isTaxPaidByCompany,
        });
        await this.$store.dispatch("completed");
      } catch (err) {
        await this.$store.dispatch("error");
        throw new Error(err);
      }
    },
  },
  created() {
    this.isTaxPaidByCompany = this.getCompany.isTaxPaidByCompany;
  },
};
</script>

<style lang="scss" scoped>
.field {
  width: 50%;
}
.input,
.textarea {
  @include input;
}
.button {
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch {
  display: flex;
  align-items: center;
  label {
    width: 50%;
    height: 36px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  input {
    display: none;
    &:checked + label {
      background-color: $sub-color;
      color: #fff;
    }
  }
}
</style>