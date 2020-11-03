<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-card slide-down">

      <ValidationObserver v-slot="{ handleSubmit }">
        <header class="modal-card-head">
          <h3>{{ isEditMode ? 'Edit Department' : 'Add Department' }}</h3>
          <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="" class="label">Department Name</label>
            <div class="control">
              <ValidationProvider name="Department Name" rules="required" v-slot="{ errors }">
                <input v-model="name" type="text" class="input">
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="isEditMode" @click="handleSubmit(updateDepartment)" class="button save-file">Update</button>
          <button v-else @click="handleSubmit(addDepartment)" class="button primary">Save</button>
        </footer>
      </ValidationObserver>
    </div>
    
  </div>
</template>

<script>
import {ADD_DEPRTMENT, UPDATE_DEPARTMENT} from "@/graphql/Department";

export default {
  props: ['isEditMode'],
  data: () => ({
    _id: '',
    name: ''
  }),
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    async addDepartment() {
      try {
        await this.$store.dispatch('loading')
        const res = await this.$apollo.mutate({
          mutation: ADD_DEPRTMENT,
          variables: {
            name: this.name
          }
        })
        const item = res.data.addDepartment
        await this.$store.dispatch('completed')
        this.$emit('PushItem', item)
        this.$emit('CloseModal')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async updateDepartment() {
      try {
        await this.$store.dispatch('loading')
        const res = await this.$apollo.mutate({
          mutation: UPDATE_DEPARTMENT,
          variables: {
            departmentId: this._id,
            name: this.name
          }
        })
        const item = res.data.updateDepartment
        if (item) {
          await this.$store.dispatch('completed')
          this.$emit('UpdateItem', item)
          this.$emit('CloseModal')
        }
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>