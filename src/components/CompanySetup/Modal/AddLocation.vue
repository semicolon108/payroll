<template>
<div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
      <div class="modal-card">
          <div class="modal-card-head">
            <h3>Add Working Location</h3>
            <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
        </div>
        <section class="modal-card-body">
            <div class="field">
                <label for="" class="label">Location Name</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Headquarters">
                </div>
            </div>
        </section>
        <div class="modal-card-foot">
          <button class="button primary">Save</button>
        </div>
      </div>
  </div>
</template>

<script>
    export default {
        methods:{
            CloseModal() {
                this.$emit('CloseModal')
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>