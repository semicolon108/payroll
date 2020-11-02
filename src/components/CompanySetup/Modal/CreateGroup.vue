<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal"></div>
  <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="modal-content box slide-down">
    <div class="header">
      <h3>Create Group</h3>
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
    <button @click="handleSubmit(addEarnDeductGroup)" class="button primary">Save</button>
    <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
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
.modal-content{
    border-radius: 0;
    position: relative;
    padding: 40px;
    color: $font-color;
    .header{
        margin-bottom: 20px;
        i{
            font-size: 30px;
            margin-bottom: 20px;
            color: $sub-color;
        }
        h3{
            font-size: 24px;
            font-weight: 700;
            color: $font-color;
        }
        p{
            color: $font-color;
        }
    }
    .field{
        margin-bottom: 20px;
        label{
            color: $font-color;
            font-weight: normal;
        }
        input{
            @include input;
        }
    }

    .save-file{
        border-radius: 0;
        background-color: $primary-color;
        border-color: $primary-color;
        color: #fff;
    }
}
</style>