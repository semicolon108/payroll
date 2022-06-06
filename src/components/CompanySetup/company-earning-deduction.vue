<template>
    <div class="page-container">
        <div class="page-header border-bottom">
            <div class="header-start">
                <h3 class="page-title">Earning / Deduction</h3>
                <button @click="isShowAddItemModal = true" class="button primary"><i class="fas fa-plus"></i> Add</button>
            </div>
            <div class="header-end">
                <button class="button primary" @click="showGroup = !showGroup">
                          Manage Group
                        </button>
                <button class="button" @click="openCreateGroupModal" :class="{ create: itemSelected.length }" :disabled="itemSelected.length ? false : true">
                            Create Group
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
            <!-- <button class="button grey" style="margin-left: 5px"><i class="fas fa-plus"></i></button> -->
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
                    <tr v-for="(i, index) in earnDeducts" :key="index">
                        <td class="wrap">
                            <div class="check">
                                <input ref="Checkbox" type="checkbox" name="" :id="i._id" />
                                <label :for="i._id" @click="itemSelect(i._id)">{{
                                        i.name
                                      }}</label>
                            </div>
                        </td>
                        <!-- <td>{{ i.name }}</td> -->
                        <td>
                            <div class="icons">
                                <span v-for="o in i.groups" :key="o._id" class="tag" @click="assignGroup(i.groups, index)">{{ o.name }}</span>
                                <span class="icon hover-primary" @click="assignGroup(i.groups, index)">
                                  <i class="fas fa-plus"></i>
                                </span>
                            </div>
                        </td>
                        <td><span class="tag">{{ i.type }}</span></td>
    
                        <td><span class="tag">{{ i.isBeforeTax ? 'Include' : 'Not Include'}}</span></td>
                        <td>
                            <div class="icons right">
                                <span @click="editItem(i.groups, index)" class="icon hover-primary">
                                  <i class="fas fa-pen bubble"></i>
                                </span>
                                <span @click="deleteItem(i)" class="icon alert hover-alert">
                                  <i class="fas fa-trash"></i>
                                </span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Assign v-if="Assign" @CloseModal="onModalClosed" ref="assignGroupModal" />
            <AddItem v-if="isShowAddItemModal" ref="addItemModal" @CloseModal="onAddItemModalClosed" />
            <DeleteItem v-if="isShowDeleteItemModal" ref="deleteItemModal" @CloseModal="onDeleteItemModalClosed" />
            <ManageGroup v-if="isShowManageGroupModal" ref="manageGroupModal" @CloseModal="onManageGroupModalClosed" />
            <CreateGroup v-if="isShowCreateGroupModal" ref="createGroupModal" @CloseModal="onCreateGroupModalClosed" />
        </div>
    </div>
</template>

<script>
import Assign from "./Modal/AssignEarningDeductionGroup";
import { getEarnDeducts } from "@/apis/earn-deduct-api";
import { getEarnDeductGroups } from "@/apis/earn-deduct-group-api";
import AddItem from "@coms/CompanySetup/Modal/AddItem";
import DeleteItem from "@coms/CompanySetup/Modal/DeleteItem";
import ManageGroup from "@coms/CompanySetup/Modal/ManageGroup";
import CreateGroup from "@coms/CompanySetup/Modal/CreateGroup";
export default {
    components: {
        Assign,
        AddItem,
        DeleteItem,
        ManageGroup,
        CreateGroup
    },
    data: () => ({
        Assign: false,
        isShowAddItemModal: false,
        isShowDeleteItemModal: false,
        isShowManageGroupModal: false,
        isShowCreateGroupModal: false,
        earnDeducts: [],
        earnDeductGroups: [],
        itemSelected: [],
        showGroup: false
    }),
    created() {
        this.getData()
    },

    methods: {
        onAddItemModalClosed() {
            this.isShowAddItemModal = false
            this.getData()
        },
        onDeleteItemModalClosed() {
            this.isShowDeleteItemModal = false
            this.getData()
        },
        onManageGroupModalClosed() {
this.isShowManageGroupModal = false
  this.getData()
        },
        onCreateGroupModalClosed() {
            this.isShowCreateGroupModal = false
            this.getData()
        },
        onModalClosed() {
            this.Assign = false
            this.getData()
        },
        async getData() {
            this.earnDeducts = await getEarnDeducts();
            this.earnDeductGroups = await getEarnDeductGroups();
        },
        openCreateGroupModal() {
            this.isShowCreateGroupModal = true
            this.$nextTick(() => {
                this.$refs.createGroupModal.form.earnDeductIds = this.itemSelected;
            });
        },

      editGroup(item) {
      this.isShowManageGroupModal = true;
      this.$nextTick(() => {
        this.$refs.manageGroupModal.form = {
          name: item.name,
          earnDeductGroupId: item._id,
          earnDeductIds: item.earnDeductIds.map((i) => i._id),
        };
        this.$refs.manageGroupModal.earnDeducts = item.earnDeductIds;
      });
    },
        itemSelect(id) {
            const itemID = this.itemSelected.includes(id);
            if (!itemID) {
                this.itemSelected.push(id);
            } else {
                this.itemSelected = this.itemSelected.filter((i) => i !== id);
            }
        },

        editItem(selectedGroups, idx) {
            this.isShowAddItemModal = true;
            this.$nextTick(() => {

                const earnDeductGroupIds = selectedGroups.map(i => i._id)
                const earnDeduct = this.earnDeducts[idx]
                this.$refs.addItemModal.isEditMode = true
                this.$refs.addItemModal.form = {
                    earnDeductId: earnDeduct._id,
                    name: earnDeduct.name,
                    type: earnDeduct.type,
                    isBeforeTax: earnDeduct.isBeforeTax,
                    isBeforeSso: earnDeduct.isBeforeSso,
                    earnDeductGroupIds: earnDeductGroupIds,
                }
            })
        },
        deleteItem(item) {
            this.isShowDeleteItemModal = true
            this.$nextTick(() => {
                this.$refs.deleteItemModal.earnDeductId = item._id;
                this.$refs.deleteItemModal.name = item.name;
            });
        },
        assignGroup(selectedGroups, idx) {
            this.Assign = true;
            this.$nextTick(() => {
                this.$refs.assignGroupModal.earnDeductGroups = [...this.earnDeductGroups]
                // this.$refs.assignGroupModal.selectedGroups = [...selectedGroups]
                const earnDeductGroupIds = selectedGroups.map(i => i._id)
                const earnDeduct = this.earnDeducts[idx]

                this.$refs.assignGroupModal.form = {
                    earnDeductId: earnDeduct._id,
                    name: earnDeduct.name,
                    type: earnDeduct.type,
                    isBeforeTax: earnDeduct.isBeforeTax,
                    isBeforeSso: earnDeduct.isBeforeSso,
                    earnDeductGroupIds: earnDeductGroupIds,
                }
            })
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
        &:checked~label::before {
            background-color: $primary-color;
            border-color: $primary-color;
        }
        &:checked~label::after {
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