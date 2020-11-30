<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeLayoutOption"></div>
    <div class="modal-card slide-down">
      <div class="modal-card-head">
        <h3>Update Layout</h3>
        <button class="modal-close is-large" @click="closeLayoutOption" aria-label="close"></button>
      </div>

      <section class="modal-card-body">
        <div class="field">
          <label for="" class="label">Select layout to update</label>
          <div class="control">
            <div class="select">
              <select v-model="layoutSelected">
                <option v-for="i in payrollLayouts" :key="i._id" :value="i._id" >{{ i.name }}</option>
              </select>
            </div>
          </div>
          <input type="text" v-model="name">
          <button @click="deletePayrollLayout">delete this layout</button>
        </div>
      </section>
      <div class="modal-card-foot">
        <button @click="updatePayrollLayout" class="button primary">Update Layout</button>
      </div>

    </div>

  </div>
</template>

<script>

import {deletePayrollLayout, getPayrollLayouts, updatePayrollLayout} from "@/apis/payroll-layout-api";

export default {
  props: ['updateLayoutModal', 'layouts'],
  data: () => ({
    name: '',
    payrollLayouts: [],
    layoutSelected: ''
  }),
watch: {
  layoutSelected(value) {
    if(value) this.name = this.payrollLayouts.find(i => i._id === value).name
  }
},
  methods: {
    closeLayoutOption() {
      this.$emit('CloseLayoutOption')
    },
    async updatePayrollLayout() {
      await updatePayrollLayout({
        payrollLayoutId: this.layoutSelected,
        name: this.name,
        layouts: this.layouts
      })
      this.$emit('CloseModal')
    },
    async deletePayrollLayout() {
      const isConfirmed = await this.$dialog.confirm()
      if(isConfirmed) {
       await deletePayrollLayout({
         payrollLayoutId: this.layoutSelected
       })
        this.$emit('CloseModal')
      }
    }
  },
  async created() {
    this.payrollLayouts = await getPayrollLayouts()
    this.layoutSelected = this.payrollLayouts[0]._id
  }
}
</script>

<style lang="scss" scoped>

</style>