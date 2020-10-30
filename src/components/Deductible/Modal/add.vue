<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal"></div>
  <div class="modal-content box slide-down">
    <div class="header">
        <!-- <i class="fas fa-receipt"></i> -->
        <div>
            <h3>Add Earning / Deducting.</h3>
        </div>
    </div>
    
    <div class="modal-form">
        <div class="columns is-multiline">
            <div class="column is-6">
                <div class="field" style="position: relative;">
                    <label for="" class="label">Employee Name + ID</label>
                    <div class="conttrol">
                        <input type="text" class="input" style="cursor: pointer" disabled required>
                    </div>
                  <Dropdown />
                </div>
            </div>
<!--            <div class="column is-6">-->
<!--                <div class="field">-->
<!--                    <label for="" class="label">Payment Date</label>-->
<!--                    <div class="conttrol">-->
<!--                        <input type="text" class="input" required>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">Earning / Deducting</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option>Select category</option>
                                <option>Earn | Meal</option>
                                <option>Deduct| Leave without notice</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">Amount</label>
                    <div class="conttrol">
                        <input type="text" class="input" required placeholder="0">
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    <div class="btn-group">
        <button class="button">Save Changes</button>
        <button class="button"  @click="CloseModal">Cancel</button>
    </div>
    <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
  </div>
</div>
</template>



<script>

import Dropdown from "@coms/Reusable/Dropdown";

    export default {
      components: {
        Dropdown
      },
        data: () => ({
            employee : false,
        }),
        methods:{
            CloseModal(){
                this.$emit('CloseModal')
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
        label{
            color: $font-color;
            font-weight: normal;
        }
        input{
            @include input;
        }
        .select{
            width: 100%;
            &:after{
                border-color: $grey-color !important;
            }
            select{
                width: 100%;
                border-radius: $radius;
                border: 1px solid $border-color;
                background-color: $input-color;
            }
        }
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

.btn-group{
    margin-top: 20px;
    display: flex;
    .button{
        border-radius: 0;
        &:first-child{
            margin-right: 10px;
            @include primary-btn;
        }
    }
}
    


</style>