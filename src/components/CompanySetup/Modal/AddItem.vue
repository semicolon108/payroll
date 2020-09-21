<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <ValidationObserver v-slot="{ handleSubmit }" tag="div" class="modal-content box slide-down">
      <div class="header">
        <i class="fas fa-suitcase"></i>
        <div>
          <h3>Add Earning / Deduction</h3>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Item Name</label>
        <div class="control">
        <ValidationProvider rules="required" v-slot="{ errors }">
          <input v-model="form.name" type="text" class="input">
          <p class="has-text-danger">{{ errors[0] }}</p>
        </ValidationProvider>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Item Type</label>
        <div class="control switch" >
          <div class="item"  v-for="(i, idx) in types" :key="idx"
               :class="{'is-active': form.type === i}"
               @click="form.type = i">
            <span>{{ i }}</span>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">TAX</label>
        <div class="control switch" >
          <div class="item"  v-for="(i, idx) in taxs" :key="idx"
               :class="{'is-active': form.isBeforeTax === i.key}"
               @click="form.isBeforeTax = i.key">
            <span>{{ i.name }}</span>
          </div>
        </div>
      </div>
      <div class="field">
        <label for="" class="label">Item Group</label>
        <div class="control">
<!--          <input type="text" class="input" placeholder="Item, Item">-->
        </div>
          <div>

<!--            <label-->
<!--                :for="i._id" @click="itemSelect(i._id)"-->
<!--                v-for="i in earnDeductGroups"-->
<!--                :key="i._id">{{  i.name  }}-->
<!--              <input  type="checkbox" name="" :id="i._id">-->
<!--            </label>-->
            <div class="items">
              <div class="item"
                   :for="i._id"
                   v-for="i in earnDeductGroups"
                   :key="i._id">
<!--                <input ref="Checkbox" type="checkbox" class="checkbox" :id="i._id">-->
                <p :class="{ 'is-active': form.earnDeductGroupIds.includes(i._id) }" @click="itemSelect(i._id)">{{  i.name  }}</p>
              </div>
            </div>
          </div>
      </div>
      <button v-if="isEditMode" @click="handleSubmit(updateEarnDeduct)" class="button save-file">Update</button>
      <button v-else @click="handleSubmit(addEarnDeduct)" class="button save-file">Save</button>
      <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
    </ValidationObserver>
  </div>
</template>

<script>
import {addEarnDeduct, updateEarnDeduct} from "@/apis/earn-deduct-api";
import {getEarnDeductGroups} from "@/apis/earn-deduct-group-api";

export default {
  data: () => ({
    form: {
      earnDeductId: undefined,
      name: '',
      type: 'Earning',
      isBeforeTax: true,
      earnDeductGroupIds: []
    },
    earnDeductGroups: [],
    isEditMode: false,
    types: ['Earning', 'Deduction'],
    taxs: [
      { key: true, name: 'Before TAX' },
      { key: false, name: 'After TAX' }
    ]
  }),
  created() {
    this.getData()
  },
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    itemSelect(id) {
      const itemId = this.form.earnDeductGroupIds.includes(id)
      if(!itemId){
        this.form.earnDeductGroupIds.push(id)
      }else{
        this.form.earnDeductGroupIds = this.form.earnDeductGroupIds.filter(i => i !== id)
      }
    },
    async addEarnDeduct() {
      const item = await addEarnDeduct(this.form)
      this.$emit('PushItem', item)
      this.CloseModal()
    },
    async updateEarnDeduct() {
      const item = await updateEarnDeduct(this.form)
      this.$emit('UpdateItem', item)
      this.CloseModal()
    },
    async getData() {
      this.earnDeductGroups = await getEarnDeductGroups()
    }
  },
}
</script>

<style lang="scss" scoped>
.items{
  display: flex;
  .item{
    cursor: pointer;
    p{
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 10px 20px;
      background-color: $light-grey-color;
      color: #000;
    }
    .is-active{
      background-color: $primary-color;
      color: #fff;
    }
  }
}

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

.switch {
  display: flex;
  align-items: center;

  .item {
    width: 50%;
    height: 36px;
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