<template>
  <div class="box slide-up">
    <div class="columns">
      <div class="column">
        <div class="box-header">

          <h3 class="box-title">Earning / Deduction</h3>
          <span @click="ModalClick = 'AddItem'"><i class="fas fa-plus"></i></span>
          <div class="button-group">
            <button class="button" @click="showGroup = !showGroup">Manage Group</button>
            <button class="button"
                    @click="openCreateGroupModal"
                    :class="{'create' : itemSelected.length}"
                    :disabled="itemSelected.length ? false : true">Create Group
            </button>
          </div>
        </div>
        <div class="group-list slide-down" v-if="showGroup">

          <div v-for="i in earnDeductGroups" :key="i._id" class="group-item">
            <span>{{ i.name }}</span>
            <span class="count">{{ i.earnDeductsCount }}</span>
            <span @click="editGroup(i)">
                                  <i class="fas fa-cog"></i>
                              </span>
          </div>

        </div>
        <table class="table is-fullwidth">
          <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Group</th>
            <th class="is-sm">TAX</th>
            <th class="is-xs">Option</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="i in earnDeducts" :key="i._id">
            <td class="check">
              <input ref="Checkbox" type="checkbox" name="" :id="i._id">
              <label :for="i._id" @click="itemSelect(i._id)">{{ i.name }}</label>
            </td>
            <td>{{ i.type }}</td>
            <td>{{ i.groups | perttyArray }}</td>
            <td>{{ i.isBeforeTax ? 'BeforeTAX' : 'AfterTAX' }}</td>
            <td>
              <div class="icon-group">
                <span @click="editItem(i)"><i class="fas fa-pen"></i></span>
                <span @click="deleteItem(i)"><i class="fas fa-trash"></i></span>
              </div>
            </td>
          </tr>
          <!--                    <tr>-->
          <!--                        <td class="check">-->
          <!--                            <input type="checkbox" name="" id="check2">-->
          <!--                            <label for="check2" @click="itemSelect('2')">Top up</label>-->
          <!--                        </td>-->
          <!--                        <td>Earning</td>-->
          <!--                        <td>Ungroup</td>-->
          <!--                        <td>After TAX</td>-->
          <!--                        <td>-->
          <!--                            <div class="icon-group">-->
          <!--                                <span>-->
          <!--                                    <span @click="ModalClick = 'EditItem'"><i class="fas fa-pen"></i></span>-->
          <!--                                    <span @click="ModalClick = 'DeleteItem'"><i class="fas fa-trash"></i></span> -->
          <!--                                </span>-->
          <!--                            </div>-->
          <!--                        </td>-->
          <!--                    </tr>-->
          </tbody>
        </table>
      </div>




      <component
          ref="Modal"
          @PushItem="pushItem"
          @PushGroupItem="pushGroupItem"
          @UpdateItem="updateItem"
          @SpliceItem="spliceItem"
          @UpdateGroupItem="updateGroupItem"
          @SpliceGroupItem="spliceGroupItem"
          :is="ModalClick" @CloseModal="ModalClick = ''"/>
    </div>
  </div>
</template>

<script>
import AddItem from '@coms/CompanySetup/Modal/AddItem';
import EditItem from '@coms/CompanySetup/Modal/EditItem';
import CreateGroup from '@coms/CompanySetup/Modal/CreateGroup';
import ManageGroup from '@coms/CompanySetup/Modal/ManageGroup';
import DeleteItem from '@coms/CompanySetup/Modal/DeleteItem';
import {getEarnDeducts} from "@/apis/earn-deduct-api";
import {getEarnDeductGroups} from "@/apis/earn-deduct-group-api";


export default {
  components: {
    AddItem,
    EditItem,
    CreateGroup,
    ManageGroup,
    DeleteItem
  },
  data: () => ({
    showGroup: false,
    itemSelected: [],
    ModalClick: '',
    earnDeducts: [],
    earnDeductGroups: [],
  }),
  filters: {
    perttyArray(arr) {
      if (arr.length) return arr.map(i => i.name).join(', ')
      return 'Ungroup'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    itemSelect(id) {
      const itemID = this.itemSelected.includes(id)
      if (!itemID) {
        this.itemSelected.push(id)
      } else {
        this.itemSelected = this.itemSelected.filter(i => i !== id)
      }
    },
    async getData() {
      this.earnDeducts = await getEarnDeducts()
      this.earnDeductGroups = await getEarnDeductGroups()
    },
    openCreateGroupModal() {
      this.ModalClick = 'CreateGroup'
      this.$nextTick(() => {
        this.$refs.Modal.form.earnDeductIds = this.itemSelected
      })
    },
    async pushItem(item) {
      this.earnDeducts.push(item)
      this.earnDeductGroups = await getEarnDeductGroups()
    },
    async updateItem(item) {
      const curIdx = this.earnDeducts.findIndex(i => i._id === item._id)
      this.earnDeducts.splice(curIdx, 1, item)
      this.earnDeductGroups = await getEarnDeductGroups()
    },
    pushGroupItem() {
      this.itemSelected = []
      this.$refs.Checkbox.map(i => {
        i.checked = false
      })
      this.getData()
    },
    async updateGroupItem(item) {
      const curIdx = this.earnDeductGroups.findIndex(i => i._id === item._id)
      this.earnDeductGroups.splice(curIdx, 1, item)
      this.earnDeducts = await getEarnDeducts()
    },
    async spliceGroupItem(item) {
      const curIdx = this.earnDeductGroups.findIndex(i => i._id === item._id)
      this.earnDeductGroups.splice(curIdx, 1)
      this.earnDeducts = await getEarnDeducts()
    },
    spliceItem(earnDeductId) {
      const curIdx = this.earnDeducts.findIndex(i => i._id === earnDeductId)
      this.earnDeducts.splice(curIdx, 1)
    },

    editItem(item) {
      this.ModalClick = 'AddItem'
      this.$nextTick(() => {
        this.$refs.Modal.isEditMode = true
        this.$refs.Modal.form = {
          earnDeductId: item._id,
          name: item.name,
          type: item.type,
          isBeforeTax: item.isBeforeTax,
          earnDeductGroupIds: item.groups.map(i => i._id)
        }
      })
    },
    deleteItem(item) {
      this.ModalClick = 'DeleteItem'
      this.$nextTick(() => {
        this.$refs.Modal.earnDeductId = item._id
        this.$refs.Modal.name = item.name
      })
    },

    editGroup(item) {
      this.ModalClick = 'ManageGroup'
      this.$nextTick(() => {
        this.$refs.Modal.form = {
          name: item.name,
          earnDeductGroupId: item._id,
          earnDeductIds: item.earnDeductIds.map(i => i._id)
        }
        this.$refs.Modal.earnDeducts = item.earnDeductIds
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-header {
  display: flex;
  color: $font-color;
  margin-bottom: 20px;
  align-items: center;

  .box-title {
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
  }

  span {
    cursor: pointer;
    margin-left: 10px;
    padding: 5px 8px;
    color: #fff;
    background-color: $primary-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.button-group {
  display: flex;
  margin-left: auto;

  button.button {
    border-radius: $radius;
    border: 1px solid $border-color;
    margin-left: 10px;
    transition: all ease-in-out .2s;
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
      color: $font-grey-color;
    }
  }
}

.table {
  color: $font-color;

  thead {
    tr {
      th {
        width: 30%;
        border-width: 1px;

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

        &.check {
          input {
            display: none;

            &:checked ~ label::before {
              background-color: $primary-color;
            }

            &:checked ~ label::after {
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
          }
        }

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