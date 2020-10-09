<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-content box slide-down">

      <ValidationObserver v-slot="{ handleSubmit }">
        <div class="header">
          <i class="fas fa-sitemap"></i>
          <div>
            <h3>{{ isEditMode ? 'Edit Department' : 'Add Department' }}</h3>
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Department Name</label>
          <div class="control">
            <ValidationProvider name="Department Name" rules="required" v-slot="{ errors }">
              <input v-model="name" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <button v-if="isEditMode" @click="handleSubmit(updateDepartment)" class="button save-file">Update</button>
        <button v-else @click="handleSubmit(addDepartment)" class="button save-file">Save</button>
        <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import {ADD_DEPRTMENT, UPDATE_DEPARTMENT} from "@/graphql/Department";
import {loadingTimeout} from "@/config/variables";

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
        this.$store.commit('SET_IS_LOADING', true)
        const res = await this.$apollo.mutate({
          mutation: ADD_DEPRTMENT,
          variables: {
            name: this.name
          }
        })
        const item = res.data.addDepartment
        this.$emit('PushItem', item)
        this.$emit('CloseModal')
        setTimeout(() => {
          this.$store.commit('SET_IS_LOADING', false)
        }, loadingTimeout)
      } catch (err) {
        throw new Error(err)
      }
    },
    async updateDepartment() {
      try {
        this.$store.commit('SET_IS_LOADING', true)
        const res = await this.$apollo.mutate({
          mutation: UPDATE_DEPARTMENT,
          variables: {
            departmentId: this._id,
            name: this.name
          }
        })
        const item = res.data.updateDepartment
        if(item) {
          this.$emit('UpdateItem', item)
          this.$emit('CloseModal')
          setTimeout(() => {
            this.$store.commit('SET_IS_LOADING', false)
          }, loadingTimeout)
        }
      } catch (err) {
        throw new Error(err)
      }
    }
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
</style>