<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal()"></div>
  <div class="modal-content box slide-down">
    <div class="header">
        <div>
            <h3>Add Overtime</h3>
        </div>
    </div>
    
    <div class="modal-form">
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="field">
                    <label for="" class="label">Employee Name + ID</label>
                    <div class="conttrol">
                        <input type="text" class="input" required>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">150% / Hours</label>
                    <div class="control">
                        <input type="text" class="input" required placeholder="Enter OT hours">
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">200% / Hours</label>
                    <div class="conttrol">
                        <input type="text" class="input" required placeholder="Enter OT hours">
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">250% / Hours</label>
                    <div class="conttrol">
                        <input type="text" class="input" required placeholder="Enter OT hours">
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">300% / Hours</label>
                    <div class="conttrol">
                        <input type="text" class="input" required placeholder="Enter OT hours">
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    <div class="btn-group">
        <button class="button">Save Changes</button>
        <button class="button"  @click="CloseModal()">Cancel</button>
    </div>
    <button class="modal-close is-large" @click="CloseModal()" aria-label="close"></button>
  </div>
</div>
</template>

<script>
    export default {
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