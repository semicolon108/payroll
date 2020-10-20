<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <div class="modal-content box slide-down">
        <div class="header">
          <i class="fas fa-sitemap"></i>
          <div>
            <h3>{{ isEditMode ? 'Edit Position' : 'Add Position' }}</h3>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Position</label>
          <div class="control">
            <ValidationProvider name="Position" rules="required" v-slot="{ errors }">
              <input v-model="name" type="text" class="input" placeholder="Enter position name">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Select Department</label>
          <div class="control">
            <div class="select">
              <ValidationProvider name="Department" rules="required" v-slot="{ errors }">
                <select v-model="departmentId">
                  <option v-for="i in departments" :key="i._id" :value="i._id">{{ i.name }}</option>
                </select>
              </ValidationProvider>
            </div>
          </div>
        </div>
        <button v-if="isEditMode" @click="handleSubmit(updatePosition)" class="button save-file">Update</button>
        <button v-else @click="handleSubmit(addPosition)" class="button save-file">Save</button>
        <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
      </div>
    </ValidationObserver>

  </div>
</template>

<script>
import {GET_DEPARTMENTS} from "@/graphql/Department";
import {ADD_POSITION, UPDATE_POSITION} from "@/graphql/Position";

export default {
  props: ['isEditMode'],
  data: () => ({
    departments: [],
    departmentId: ''
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
        this.departmentId = this.departments[0]._id
      } catch (err) {
        throw new Error(err)
      }
    },
    async addPosition() {
      try {
       await this.$store.dispatch('loading')
        const res = await this.$apollo.mutate({
          mutation: ADD_POSITION,
          variables: {
            departmentId: this.departmentId,
            name: this.name
          }
        })
        const item = res.data.addPosition
        if (item) {
          await this.$store.dispatch('completed')
          this.$emit('PushItem', item)
          this.$emit('CloseModal')
        }

      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async updatePosition() {
      try {
        await this.$store.dispatch('loading')
        const res = await this.$apollo.mutate({
          mutation: UPDATE_POSITION,
          variables: {
            positionId: this._id,
            name: this.name,
            departmentId: this.departmentId
          }
        })
        const item = res.data.updatePosition
        await this.$store.dispatch('completed')
        this.$emit('CloseModal')
        this.$emit('UpdateItem', item)
      } catch (err) {
        await this.$store.dispatch('error')
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

.modal-content {
  border-radius: 0;
  position: relative;
  padding: 40px;
  color: $font-color;

  .header {
    margin-bottom: 20px;

    i {
      font-size: 30px;
      margin-bottom: 20px;
      color: $sub-color;
    }

    h3 {
      font-size: 24px;
      font-weight: 700;
      color: $font-color;
    }

    p {
      color: $font-color;
    }
  }

  .field {
    margin-bottom: 20px;

    label {
      color: $font-color;
      font-weight: normal;
    }

    input {
      @include input;
    }
  }

  .save-file {
    border-radius: 0;
    background-color: $primary-color;
    border-color: $primary-color;
    color: #fff;
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  z-index: 1;
  height: 40px;
  max-height: 40px;
  max-width: 40px;
  min-height: 40px;
  min-width: 40px;
  width: 40px;

  &:hover {
    background-color: $border-color;
  }

  &::after {
    background-color: $grey-color;
  }

  &::before {
    background-color: $grey-color;
  }
}


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