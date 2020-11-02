<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal()"></div>
  <div class="modal-content box slide-down">
    <div class="header">
        <h3>Edit Earning / Deduction</h3>
    </div>

    <div class="field">
        <label for="" class="label">Item Name</label>
        <div class="control">
            <input type="text" class="input">
        </div>
    </div>
    <div class="field">
        <label for="" class="label">Item Type</label>
        <div class="control switch">
            <input type="radio" name="type" id="earning" checked>
            <label for="earning">Earing</label>
            <input type="radio" name="type" id="deducting">
            <label for="deducting">Deducting</label>
        </div>
    </div>
    <div class="field">
        <label for="" class="label">TAX</label>
        <div class="control switch">
            <input type="radio" name="tax" class="checkbox" id="beforetax" checked>
            <label for="beforetax">Before TAX</label>
            <input type="radio" name="tax" class="checkbox" id="aftertax">
            <label for="aftertax">After TAX</label>
        </div>
    </div>
    <div class="field">
        <label for="" class="label">Item Group</label>
        <div class="control">
            <input type="text" class="input" placeholder="Item, Item">
        </div>
    </div>
    <button class="button primary">Save</button>
    <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
  </div>
</div>
</template>

<script>
    export default {
        props:[
            'modalClick'
        ],
        methods:{
            CloseModal(){
                this.$emit('CloseModal')
            },
        },
    }
</script>

<style lang="scss" scoped>
.switch{
    display: flex;
    align-items: center;
    label{
        width: 50%;
        height: 36px;
        background-color: $light-grey-color;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    input{
        display: none;
        &:checked + label{
            background-color: $sub-color;
            color: #fff;
        }
    }
}
</style>