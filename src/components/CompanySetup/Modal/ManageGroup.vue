<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="modal-content box slide-down">
      <div class="header">
        <i class="far fa-object-group"></i>
        <div>
          <h3>Manage Group</h3>
        </div>
      </div>

      <div class="field">
        <label for="" class="label">Group Name</label>
        <div class="control">
          <ValidationProvider rules="required" v-slot="{ errors }">
            <input v-model="form.name" type="text" class="input">
            <p class="has-text-danger">{{ errors[0] }}</p>
          </ValidationProvider>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Assigned Item</label>
        <div class="control switch">
          <div class="item" v-for="(i, idx) in earnDeducts"
               :key="idx"
               :class="{'is-active': form.earnDeductIds.includes(i._id)}"
               @click="pushOrSplice(i._id)"
          >
            <span>{{ i.name }}</span>
          </div>
        </div>
      </div>
      <button @click="handleSubmit(updateEarnDeductGroup)" class="button save-file">Update</button>
      <button @click="handleSubmit(deleteEarnDeductGroup)" class="button del">Delete Group</button>
      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </ValidationObserver>
  </div>
</template>

<script>

import {deleteEarnDeductGroup, updateEarnDeductGroup} from "@/apis/earn-deduct-group-api";

export default {
  props: [
    'modalClick'
  ],
  data: () => ({
    form: {
      earnDeductGroupId: '',
      name: '',
      earnDeductIds: []
    },
    earnDeducts: []
  }),
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    pushOrSplice(id) {
      const itemID = this.form.earnDeductIds.includes(id)
      if (!itemID) {
        this.form.earnDeductIds.push(id)
      } else {
        this.form.earnDeductIds = this.form.earnDeductIds.filter(i => i !== id)
      }
    },
    async updateEarnDeductGroup() {
      const item = await updateEarnDeductGroup(this.form)
      this.$emit('UpdateGroupItem', item)
      this.CloseModal()
    },
    async deleteEarnDeductGroup() {
      try {
        const item = await deleteEarnDeductGroup(this.form.earnDeductGroupId)
        this.$emit('SpliceGroupItem', item)
        this.CloseModal()
      } catch (err) {
        if (err.graphQLErrors[0].message === 'You cannot delete default group') {
          this.CloseModal()
          setTimeout(() => {
            alert(err.graphQLErrors[0].message)
          }, 100)
        }
      }
    }
  },
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

  button.button {
    border-radius: 0;

    &.save-file {
      margin-right: 5px;
      background-color: $primary-color;
      border-color: $primary-color;
      color: #fff;
    }

    &.del {
      background-color: $alert-color;
      background-color: $alert-color;
      border-color: $alert-color;
      color: #fff;

      &:disabled {
        background-color: $grey-color;
        color: $font-color;
        border-color: $grey-color;
      }
    }
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

.checkbox-item {
  input {
    display: none;

    &:checked ~ label {
      background-color: $sub-color;
      border-color: $sub-color;
      color: #fff;
    }
  }

  label {
    display: inline-block;
    cursor: pointer;
    padding: 5px 15px;
    border: 1px solid $border-color;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}

.switch {
  display: flex;
  align-items: center;

  .item {
    padding: 5px 15px 5px 15px;
    height: 36px;
    margin-right: 5px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &.is-active {
      background-color: $sub-color;
      color: #fff;
    }
  }

}

</style>