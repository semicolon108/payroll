<template>
<div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
      <div class="modal-card">
          <div class="modal-card-head">
            <h3>Customize Working Day</h3>
            <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
        </div>
        <section class="modal-card-body">
            <div class="field">
                <label for="" class="label">Group Name</label>
                <div class="control">
                    <input type="text" class="input" placeholder="Contract Staff">
                </div>
            </div>
            <div class="field">
                <label for="" class="label">Work Day</label>
                <div class="control">
                    <input type="text" class="input" placeholder="e.g 30">
                </div>
            </div>
            <div class="field">
                <label for="" class="label">OT Day</label>
                <div class="control">
                    <input type="text" class="input" placeholder="e.g 30">
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