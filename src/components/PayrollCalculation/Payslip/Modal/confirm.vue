<template>
<div class="modal is-active">
    <div class="modal-background" @click="CloseModal()"></div>
    <div class="modal-content slide-down">
        <div class="box">
            <button @click="CloseModal()" class="modal-close is-large" aria-label="close"></button>
            <h3>Are you sure?</h3>
            <p>You are going to resend payslip to all of your candidates <span>30/30</span></p>
            <button @click="CloseModal()" class="button primary">Confirm</button>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        methods: {
            CloseModal(){
                this.$emit('Close')
            }
        },
    }
</script>

<style lang="scss" scoped>
.modal-background{
    background-color: rgba(#000000, .3);
    cursor: pointer;
}
.box{
    position: relative;
    padding: 40px;
    h3{
        margin: 0 0 10px 0;
    }
    span{
        color: $primary-color;
        font-weight: 700;
        cursor: pointer;
    }
}
</style>