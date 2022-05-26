<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-start">
        <h3 class="page-title">Custom Field</h3>
        <button @click="fields.push(null)" class="button primary">Add</button>
      </div>
      <div class="header-end">
        <button @click="addCustomField" type="button" class="button primary">
          Save
        </button>
      </div>
    </div>

    <div class="page-content">
      <div class="field has-addons" v-for="(i, idx) in fields" :key="idx">
        <p class="control is-expanded">
          <input v-model="fields[idx]" type="text input " class="input" />
        </p>
        <p class="control">
          <a class="button" @click="fields.splice(idx, 1)"
            ><i class="fas fa-trash bubble"></i>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getCustomFieldsApi, addCustomFieldApi } from "@/apis/custom-field-api";
export default {
  data: () => ({
    fields: [],
  }),
  methods: {
    async getCustomFields() {
      const data = await getCustomFieldsApi();
      this.fields = data.fields;
    },
    async addCustomField() {
      
      const form = {
        fields: this.fields,
      };
       await this.$store.dispatch("loading");
      await addCustomFieldApi(form);
       await this.$store.dispatch("completed");
      this.getCustomFields();
    },
  },
  created() {
    this.getCustomFields();
  },
};
</script>
<style lang="scss">
input.input {
  border: 1px solid $border-color;
  box-shadow: none;
  border-radius: 0;
}
.has-addons .button {
  border-radius: 0;
  border-color: $border-color;
  i {
    color: $alert-color;
    margin: 0;
  }
}
</style>