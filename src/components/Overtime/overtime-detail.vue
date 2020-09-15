<template>
  <div>
    <span @click="$router.back()" class="back">Back</span>
    <div class="page-header">
      <div class="header-start">
        <div class="header-title">
          <h3 class="xxl-title">Sep 30, 2020</h3>
          <div class="button-group">
            <button class="button" @click="ModalClick = 'Add'">Add</button>
            <button class="button" @click="ModalClick = 'Upload'">Upload</button>
          </div>
        </div>
      </div>
      <div class="header-end">
        <button class="button">Approve</button>
      </div>
    </div>
    <div class="box slide-up">
      <table class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th class="is-xs">Employee ID</th>
          <th>Full Name</th>
          <th class="is-sm is-right">150% / Hours</th>
          <th class="is-sm is-right">200% / Hours</th>
          <th class="is-sm is-right">250% / Hours</th>
          <th class="is-sm is-right">300% / Hours</th>
          <th class="is-sm is-right">Status</th>
          <th class="is-xxs is-right">Option</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <span>0001</span>
          </td>
          <td>
            <span>Anousone Luangkhot</span>
          </td>
          <td class="is-right">
            <span>3,000,000</span>
          </td>
          <td class="is-right">
            <span>3,000,000</span>
          </td>
          <td class="is-right">
            <span>3,000,000</span>
          </td>
          <td class="is-right">
            <span>3,000,000</span>
          </td>
          <td class="is-right">
             <span><i class="fas fa-check-circle"></i></span>
          </td>
          <td>
            <div class="icons">
              <span class="icon" @click="ModalClick = 'Edit'"><i class="fas fa-pen"></i></span>
              <span class="icon"><i class="fas fa-trash"></i></span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <component :is="ModalClick" @CloseModal="ModalClick=''"></component>
  </div>
</template>

<script>
import Add from './Modal/add'
import Upload from './Modal/upload'

export default {
  components:{
    Add,
    Upload
  },
  data: () => ({
    ModalClick: '',
  }),
}
</script>

<style lang="scss" scoped>
.is-deduction {
  color: $alert-color;
}
.is-earning {
  color: $primary-color;
}
th {
  span {
    margin-bottom: 5px;
    display: block;
  }
  input {
    @include input;
    &:focus {
      border: 1px solid $primary-color;
      box-shadow: none;
    }
  }
}
.back {
  cursor: pointer;
  color: $font-grey-color;
  display: flex;
  align-items: center;
  &::before {
    content: '';
    display: inline-block;
    border-right: 2px solid $font-grey-color;
    border-bottom: 2px solid $font-grey-color;
    width: 8px;
    height: 8px;
    transform: rotate(-225deg);
    margin-right: 3px;
  }
}
th {
  .button {
    border-radius: $radius;
    border: 1px solid $border-color;
    background-color: $primary-color;
    color: #fff;
    &:focus {
      box-shadow: none;
    }
    &:disabled {
      color: $font-color;
      background-color: $grey-color;
      i{
        margin-right: 5px;
      }
    }
  }
}
td {
  .button {
    border-radius: $radius;
    border: 1px solid $border-color;
    background-color: $light-grey-color;
    &:focus {
      box-shadow: none;
    }
  }
  .approved {
    color: $primary-color;
  }
}
</style>