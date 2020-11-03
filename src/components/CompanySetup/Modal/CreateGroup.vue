<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal"></div>
  <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="modal-card slide-down">
    <div class="modal-card-head">
      <h3>Create Group</h3>
      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
    <section class="modal-card-body">
      <div class="field">
          <label for="" class="label">Group Name</label>
          <div class="control">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <input v-model="form.name" type="text" class="input">
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
      </div>
    </section>
    <div class="modal-card-foot">
      <button @click="handleSubmit(addEarnDeductGroup)" class="button primary">Save</button>
    </div>
    
  </ValidationObserver>
</div>
</template>

<script>
    import {addEarnDeductGroup} from "@/apis/earn-deduct-group-api";

    export default {
        props:[
            'modalClick'
        ],
      data: () => ({
        form: {
          name: '',
          earnDeductIds: []
        }
      }),
        methods:{
            CloseModal(){
                this.$emit('CloseModal')
            },
          async addEarnDeductGroup() {
             await addEarnDeductGroup(this.form)
            this.$emit('PushGroupItem')
            this.CloseModal()
          }
        },
    }
</script>

<style lang="scss" scoped>

</style>