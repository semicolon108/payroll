<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeLayoutOption"></div>
    <div class="modal-card slide-down">
      <div class="modal-card-head">
        <h3>Create New Layout</h3>
        <button class="modal-close is-large" @click="closeLayoutOption" aria-label="close"></button>
      </div>

      <section class="modal-card-body">
        <div class="field">
          <label for="" class="label">Enter the name of new layout</label>
          <div class="control">
            <input v-model="name" type="text" class="input">
          </div>
        </div>
      </section>
      <div class="modal-card-foot">
        <button
            @click="addPayrollLayout"
            class="button primary">Create New Layout</button>
      </div>

    </div>

  </div>
</template>

<script>

import {addPayrollLayout} from "@/apis/payroll-layout-api";

export default {
  props: ['layouts'],
  data: () => ({
    name: ''
  }),
  methods: {
    async addPayrollLayout() {
      await addPayrollLayout({
        name: this.name,
        layouts: this.layouts
      })
     this.$emit('CloseModal')
    },
    closeLayoutOption() {
      this.$emit('CloseLayoutOption')
    },
  },


}
</script>

<style lang="scss" scoped>

</style>