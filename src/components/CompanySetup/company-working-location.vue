<template>
<div class="box">
    <div class="box-header">
        <h3 class="box-title">Working Location</h3>
        <div class="button-group">
            <button class="button primary" @click="ModalClick()">Add Location</button>
        </div>
    </div>
    <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Location Name</th>
            <th class="is-xs">Employee</th>
            <th class="is-xxs is-right">Option</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Headquarters Office</td>
            <td>150</td>
            <td class="is-right">
              <div class="icon-group">
                <span @click="ModalClick()"><i class="fas fa-pen"></i></span>
                <span><i class="fas fa-trash"></i></span>
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
.table {
  color: $font-color;
  th,td{
      &.is-right{
          text-align: right;
      }
  }
  thead {
    tr {
      th {
        width: 30%;
        border-width: 1px;
        white-space: nowrap;
        &.is-xxs {
          width: 3%;
        }
        &.is-xs {
          width: 8%;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        border-width: 1px;
        .icon-group {
          color: $font-grey-color;
          i {
            font-size: 14px;
            padding: 0 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>