<template>
<div class="box">
    <div class="box-header">
        <h3 class="box-title">Working Location</h3>
        <div class="button-group">
            <button class="button primary" @click="ModalClick()">Add Location</button>
        </div>
    </div>
    <table class="table has-border is-fullwidth" id="my-table">
        <thead>
          <tr>
            <th>Location Name</th>
            <th class="is-md">Province</th>
            <th class="is-sm">No. of employee</th>
            <th class="is-xxs is-right">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Headquarters Office</td>
            <td>Vientiane Capital</td>
            <td>150</td>
            <td class="is-right">
              <div class="icons">
                <span class="icon" @click="ModalClick()"><i class="fas fa-pen"></i></span>
                <span class="icon alert"><i class="fas fa-trash"></i></span>
              </div>
            </td>
          </tr>
        </tbody>
    </table>
    <AddLocation @CloseModal="ModalAddLocation = false" v-if="ModalAddLocation"/>
</div>
</template>

<script>
import AddLocation from './Modal/AddLocation'
export default {
    components:{
        AddLocation
    },
    data: () => ({
        ModalAddLocation: false
    }),
    methods:{
        ModalClick(){
            this.ModalAddLocation = true
        }
    }
}
</script>

<style lang="scss" scoped>
select {
  cursor: pointer;
}

.box-header {
  display: flex;
  color: $font-color;
  margin-bottom: 20px;
  align-items: center;
  .box-title {
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-right: 10px;
  }
}
</style>