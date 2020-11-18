<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseLayoutOption"></div>
      <div class="modal-card slide-down">
        <div class="modal-card-head">
          <h3>Update Layout</h3>
          <button class="modal-close is-large" @click="CloseLayoutOption" aria-label="close"></button>
        </div>

        <section class="modal-card-body">
          <div class="field">
            <label for="" class="label">Select layout to update</label>
            <div class="control">
              <div class="select">
                  <select>
                    <option></option>
                  </select>
              </div>
            </div>
          </div>
        </section>
        <div class="modal-card-foot">
          <button class="button primary">Update Layout</button>
        </div>
        
      </div>

  </div>
</template>

<script>

export default {
    props:['updateLayoutModal'],
    methods:{
        CloseLayoutOption() {
            this.$emit('CloseLayoutOption')
        },
    },
}
</script>

<style lang="scss" scoped>

</style>