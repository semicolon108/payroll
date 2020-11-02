<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-content box slide-down">
      <div class="header">
        <h3>Edit Position</h3>
      </div>
      <div class="field">
        <label for="" class="label">Position</label>
        <div class="control">
          <input v-model="name" type="text" class="input" placeholder="Enter position name">
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Select Department</label>
        <div class="control">
          <div class="select">
            <select v-model="departmentId">
              <option v-for="i in departments" :key="i._id" :value="i._id">{{ i.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <button @click="updatePosition" class="button primary">Update</button>
      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import {GET_DEPARTMENTS} from "@/graphql/Department";
import {UPDATE_POSITION} from "@/graphql/Position";

export default {
  data: () => ({
    _id: '',
    name: '',
    departmentId: '',
    departments: []
  }),
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    async getDepartments() {
      try {
        const res = await this.$apollo.query({
          query: GET_DEPARTMENTS
        })
        this.departments = res.data.getDepartments
      } catch (err) {
        throw new Error(err)
      }
    },
    async updatePosition() {
      try {
        const res = await this.$apollo.mutate({
          mutation: UPDATE_POSITION,
          variables: {
            positionId: this._id,
            name: this.name,
            departmentId: this.departmentId
          }
        })
        const item = res.data.updatePosition
        this.$emit('CloseModal')
        this.$emit('UpdateItem', item)
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  created() {
    this.getDepartments()
  }
}
</script>

<style lang="scss" scoped>

.select {
  width: 100%;

  &:after {
    border-color: $grey-color !important;
  }

  select {
    width: 100%;
    border: 1 pxs solid $border-color;
    border-radius: $radius;
  }
}
</style>