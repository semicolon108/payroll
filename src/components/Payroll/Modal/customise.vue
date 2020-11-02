<template>
<div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-content box slide-down">
        <div class="header">
            <i class="fas fa-table"></i>
            <h3>Customisze Table</h3>
            <div class="modal-close-btn" @click="CloseModal"></div>
        </div>

        <div class="table-items">
            <draggable class="table-item-list"
                v-model="tableSelectedItems"
                v-bind="dragOptions"
                @start="drag = true"
                @end="drag = false"
            >
                <h3>Select and reorder columns</h3>
                <div 
                 @click="remove(idx, 'tableSelectedItems', 'tableUnselectedItems')"
                class="table-item" v-for="(i, idx) in tableSelectedItems" :key="idx">
                    <label v-if="i" class="checked" :for="i.tblItem">
                        {{i.tblItem}}
                    </label>
                </div>
                
            </draggable>

            <div class="table-item-list">
                <h3>Unselect items</h3>
                <div
                @click="remove(idx, 'tableUnselectedItems', 'tableSelectedItems')"
                 class="table-item" v-for="(i, idx) in tableUnselectedItems" :key="idx">
                    <label v-if="i" :for="i.tblItem" >
                        {{i.tblItem}}
                    </label>
                </div>
            </div>
        </div>

        <button class="button is-primary">Save</button>		
    </div>
</div>
</template>

<script>
import draggable from "vuedraggable";

export default {
    components:{
        draggable
    },
    data: () => ({
        tableSelectedItems:[
            {tblItem: 'Employee'},
            {tblItem: 'Work Day'},
            {tblItem: 'Basic Salary'},
            {tblItem: 'Earning (LAK)'},
            {tblItem: 'Deduction (LAK)'},
            {tblItem: 'Total Earning / Deduction (LAK)'}
    
        ],
        tableUnselectedItems:[
            
            {tblItem: 'SSO Company'},
            {tblItem: 'SSO Employee' },
            {tblItem: 'TAX (LAK)'},
            {tblItem: 'Net Salary (LAK)'}
        ],
    }),
    computed:{
        // drag animation
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost",
            };
        },

        // end
        
    },
    methods:{
        CloseModal() {
            this.$emit('CloseModal')
        },
        remove(idx, splice, push) {
            this[push].push(this[splice][idx])
            this[splice].splice(idx, 1)

        }
    }
}
</script>

<style lang="scss" scoped>
.modal-content {
  border-radius: 0;
  position: relative;
  padding: 40px;
  color: $font-color;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}
.header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    i {
        font-size: 30px;
        color: $sub-color;
        margin-right: 10px;
    }

    h3 {
        font-size: 24px;
        font-weight: 700;
        color: $font-color;
    }
    p {
        color: $font-color;
    }  
    .modal-close-btn {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1;
        height: 40px;
        width: 40px;
        border-radius: 0 0 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: $border-color;
        &:before{
            position: absolute;
            content: '';
            width: 1px;
            height: 25px;
            width: 2px;
            transform: rotate(45deg);
            transform-origin: center center;
            background-color: $grey-color;
        }
        &:after{
            position: absolute;
            content: '';
            width: 1px;
            height: 25px;
            width: 2px;
            transform: rotate(-45deg);
            transform-origin: center center;
            background-color: $grey-color;
        }
    }
}
.table-items{
    overflow: auto;
    .table-item-list{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        h3{
            font-weight: 700;
            margin-bottom: 5px;
        }
        .table-item{
            flex-grow: 1;
            width: 100%;
            padding: 5px 0;
            cursor: pointer;
            &.sortable-chosen{
                background-color: $light-grey-color;
                opacity: 1 !important;
                padding: 10px;
            }
            &.ghost{
                opacity: 0;
            }
            
            label {
                position: relative;
                display: flex;
                align-items: center;
                cursor: pointer;
                margin: 0;
                &::before {
                    content: '';
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                    display: block;
                    border: 1px solid $border-color;
                }
                &::after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 5px;
                    left: 7px;
                    width: 5px;
                    height: 11px;
                    border: solid $light-grey-color;
                    border-width: 0 2px 2px 0;
                    transform: rotate(45deg);
                }
                &.checked {
                    &:before {
                        background-color: $primary-color;
                        border-color: $primary-color;
                    }
                }
                &.checked{
                    &:after {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 5px;
                        left: 7px;
                        width: 5px;
                        height: 11px;
                        border: solid #fff;
                        border-width: 0 2px 2px 0;
                        transform: rotate(45deg);
                    }
                }
            }
        }
    }
}

button.button.is-primary{
    background-color: $primary-color;
    margin-top: 20px;
    border-radius: 0;
}
</style>