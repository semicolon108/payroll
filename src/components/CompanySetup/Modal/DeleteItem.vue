<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal()"></div>
    <div class="modal-content box slide-down">
      <div class="header">
        <h3>Delete</h3>
        <p>Are you sure to delete "({{ name }})"</p>
      </div>
      <button @click="deleteEarnDeduct" class="button primary">Confirm</button>
      <button class="button" @click="CloseModal">Cencel</button>
      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import {deleteEarnDeduct} from "@/apis/earn-deduct-api";

export default {
  props: [
    'modalClick'
  ],
  data: () => ({
    earnDeductId: '',
    name: ''
  }),
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    async deleteEarnDeduct() {
      try {
        await deleteEarnDeduct(this.earnDeductId)
        this.$emit('SpliceItem', this.earnDeductId)
        this.CloseModal()
      } catch (err) {
        this.CloseModal()
        setTimeout(() => {
          if (err.graphQLErrors[0].message === 'You need to delete earn/deduct from this group first') {
            alert(err.graphQLErrors[0].message + ': ' + err.graphQLErrors[0].extensions.earnDeductGroupsExist.map(i => i.name))
          }
        }, 100)
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

  button.button {
    border-radius: 0;
    border: 1px solid $border-color;
    margin-right: 10px;
  }
}


</style>