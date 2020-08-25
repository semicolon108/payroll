<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal()"></div>
    <div class="modal-content box slide-down">
      <div class="header">
        <i class="fas fa-sitemap"></i>
        <div>
          <h3>Add Department</h3>
        </div>
      </div>

      <div class="field">
        <label for="" class="label">Department Name</label>
        <div class="control">
          <input v-model="name" type="text" class="input">
        </div>
      </div>
      <button @click="addDepartment" class="button save-file">Save</button>
      <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import {ADD_DEPRTMENT} from "@/graphql/Department";

export default {
  data: () => ({
    name: ''
  }),
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    async addDepartment() {
      try {
        const res = await this.$apollo.mutate({
          mutation: ADD_DEPRTMENT,
          variables: {
            name: this.name
          }
        })
        const item = res.data.addDepartment
        this.$emit('PushItem', item)
        this.$emit('CloseModal')
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