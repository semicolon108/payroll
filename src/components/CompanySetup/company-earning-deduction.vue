<template>
  <div class="page-container">
    <div class="page-header border-bottom">
      <div class="header-start">
        <h3 class="page-title">Earning / Deduction</h3>
        <button class="button primary"><i class="fas fa-plus"></i> Add</button>
      </div>
      <div class="header-end">
        <button class="button primary" @click="Group = true">
          Manage Group
        </button>
      </div>
    </div>
    <div class="page-content">
      <table class="table is-fullwidth" id="my-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th class="is-md is-right">Group</th>
            <th class="is-xs is-right">Item Type</th>
            <th class="is-xs is-right">TAX</th>
            <th class="is-xs is-right">Option</th>
          </tr>
        </thead>
        <tbody>
          eiei
          <tr v-for="(i, index) in 10" :key="index">
            <td>ນຳມັນ / Fuel</td>
            <td>
              <div class="icons">
                <span class="tag" @click="AssignGroup()">Default</span>
                <span class="icon hover-primary" @click="AssignGroup()">
                  <i class="fas fa-plus"></i>
                </span>
              </div>
            </td>
            <td><span class="tag">Earning</span></td>
            <td><span class="tag">Include</span></td>
            <td>
              <div class="icons right">
                <span class="icon hover-primary">
                  <i class="fas fa-pen bubble"></i>
                </span>
                <span class="icon alert hover-alert">
                  <i class="fas fa-trash"></i>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <Assign v-if="Assign" @CloseModal="Assign = false" />
    </div>
  </div>
</template>

<script>
import Assign from "./Modal/AssignEarningDeductionGroup";
export default {
  components: {
    Assign,
  },
  data: () => ({
    Assign: false,
  }),
  methods: {
    AssignGroup() {
      this.Assign = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.icons.right {
  justify-content: flex-end;
}

.button-group {
  display: flex;
  margin-left: auto;
}

.button {
  border-radius: $radius;
  border: 1px solid $border-color;
  margin-left: 10px;
  transition: all ease-in-out 0.2s;
  color: $font-color;
  box-shadow: none;
  &:hover {
    outline: none;
  }
  &.create {
    background-color: $primary-color;
    color: #fff;
    border: 1px solid $primary-color;
  }
  &:disabled {
    background-color: $grey-color;
    color: $font-color;
  }
}

.group-list {
  display: flex;
  margin-bottom: 20px;
  .group-item {
    cursor: pointer;
    padding: 5px 15px;
    border: 1px solid $border-color;
    display: flex;
    align-items: center;
    &:first-child {
      background-color: $light-grey-color;
    }
    &:not(:first-child) {
      margin-left: 5px;
    }
    .count {
      margin-left: 8px;
      color: $primary-color;
      font-weight: 700;
    }
    i {
      cursor: pointer;
      font-size: 14px;
      margin-left: 5px;
      color: $dark-grey-color;
    }
  }
}

.check {
  position: relative;
  input {
    display: none;
    &:checked ~ label::before {
      background-color: $primary-color;
      border-color: $primary-color;
    }
    &:checked ~ label::after {
      content: "";
      display: block;
      position: absolute;
      top: 7px;
      left: 7px;
      width: 5px;
      height: 11px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  label {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0 10px 0 0;
    &::before {
      content: "";
      width: 18px;
      height: 18px;
      display: block;
      border: 1px solid $border-color;
      margin-right: 10px;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 7px;
      left: 7px;
      width: 5px;
      height: 11px;
      border: solid $light-grey-color;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
}
</style>