<template>
<div class="modal is-active">
  <div class="modal-background" @click="CloseModal"></div>
  <div class="modal-content box slide-down">
    <div class="header">
        <h3>Add Earning / Deducting.</h3>
    </div>
    
    <div class="modal-form">
        <div class="columns is-multiline">
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">Employee Name + ID</label>
                    <div class="conttrol">
                        <input @focus="showDropdown = true" @blur="showDropdown = false" type="text" class="input" style="cursor: pointer" required>

                        <div class="dropdown-container" v-if="showDropdown">
                            <div class="dropdown-list">
                                <div class="dropdown-item" v-for="i in employee" :key="i.id">{{i.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    <label for="" class="label">Amount (LAK)</label>
                    <div class="conttrol">
                        <input type="text" class="input" required placeholder="0">
                    </div>
                </div>
            </div>
        </div>
    </div>
    

    <div class="btn-group">
        <button class="button primary">Save</button>
        <button class="button grey"  @click="CloseModal">Cancel</button>
    </div>
    <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
  </div>
</div>
</template>



<script>

// import Dropdown from "@coms/Reusable/Dropdown";

    export default {
      components: {
        // Dropdown
      },
        data: () => ({
            searchEmployee:[],
            employee : [
                {id: '093', name: 'Cheng Her'},
                {id: '091', name: 'Somyai Hersoukvong'},
                {id: '087', name: 'Bouathong Keomany'}
            ],
            showDropdown: false
        }),
        methods:{
            CloseModal(){
                this.$emit('CloseModal')
            },
        },
    }
</script>

<style lang="scss" scoped>
.modal-form{
    .field{
        position: relative;
        margin-bottom: 0;
    }
}  
.btn-group{
    margin-top: 20px;
    display: flex;
}

.dropdown-container{
    position: absolute;
    border: 1px solid $border-color;
    width: 100%;
    padding: 10px;
    background-color: #fff;
    z-index: 1;
    max-height: 150px;
    overflow: auto;
    .dropdown-item{
        cursor: pointer;
    }
}

</style>