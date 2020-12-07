<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="modal-content box slide-down">
      <div class="header">
        <h3>Manage Group</h3>
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

      <hr>

      <button @click="handleSubmit(updateEarnDeductGroup)" class="button primary">Update</button>
      <button @click="handleSubmit(deleteEarnDeductGroup)" class="button alert">Delete Group</button>
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
hr{
  height: 1px;
}
button.button{
  margin-right: 10px;
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
  flex-wrap: wrap;
  .item {
    margin-bottom: 5px;
    padding: 5px 15px 5px 15px;
    height: 36px;
    margin-right: 5px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    white-space: nowrap;
    &.is-active {
      background-color: $sub-color;
      color: #fff;
    }
  }

}

</style>