<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal()"></div>
  <div class="modal-content box slide-down">
    <div class="header">
        <i class="fas fa-pen"></i>
        <div>
            <h3>Edit Earning / Deduction</h3>
        </div>
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
    <button class="button save-file">Save</button>
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
.modal-close{
    position: absolute;
    top: 20px;
    z-index: 1;
    height: 40px;
    max-height: 40px;
    max-width: 40px;
    min-height: 40px;
    min-width: 40px;
    width: 40px;
    &:hover{
        background-color: $border-color;
    }
    &::after{
        background-color: $grey-color;
    }
    &::before{
        background-color: $grey-color;
    }
}

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