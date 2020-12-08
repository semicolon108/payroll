<template>
  <div class="customise-page">
    <div class="close-button" @click="CloseModal">
      <i class="fal fa-chevron-down"></i>
    </div>

    <div class="page-header">
      <div class="input-group">
        <input v-model="form.name" type="text" class="input no-input" value="Table Layout Name">
        <button class="button sub"
                  @click="updatePayrollLayout">
            Update
        </button>
        <button class="button grey"
                  @click="reset">
            Reset
        </button>
        <span></span>
      </div>
      
      <div class="field">
        <div class="control">
          <button class="button alert"
                  @click="deletePayrollLayout">
            Delete this layout
          </button>
          <button class="button primary"
                  @click="LayoutOption = 'createLayout'">
            Create New Layout
          </button>
        </div>
      </div>
    </div>


    <div class="items-list-container">

      <div class="selected-items">
        <h3 class="list-title">Drag to reroder an item</h3>
        <draggable class="selected-items-list"
                  v-model="form.layouts"
        >
          <div class="selected-item" v-for="(i, index) in form.layouts" :key="index">
            <span>{{ index + 1 }}.</span>
            <p>{{ convertName(i) }}</p>
            <i class="fal fa-times" @click="test()"></i>
          </div>
        </draggable>
      </div>

      <div class="unselect-items-list">
        <h3 class="list-title">Select Items to by shown in your table</h3>
        <div class="unselect-item-group-container">
          <div class="unselect-item-group" v-for="i in type" :key="i">
            <h3 class="group-name">{{i}}</h3>
            <ul class="active">
              <li v-for="item in items(i)" :key="item.name"
              >
                <input
                    @change="item.isSelected = !item.isSelected"
                    type="checkbox" :checked="item.isSelected" :id="item.name">
                <label
                    :for="item.name"
                    class="label">{{ item.name }}</label>
      
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <component
        :is="LayoutOption"
        @CloseLayoutOption="LayoutOption = ''"
        @CloseModal="CloseModal"
        :layouts="layouts"
    ></component>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import _ from 'lodash'
//import updateLayout from './update-layout'
import createLayout from './create-layout'
import {layoutData} from "@coms/PayrollCalculation/Payroll/Modal/layout-data";
import {getDefaultLayout, updatePayrollLayout, deletePayrollLayout} from '@/apis/payroll-layout-api'

export default {
  components: {
    draggable,
   // updateLayout,
    createLayout
  },
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    test(){
      alert('ok')
    },
    reset() {
       this.form.layouts = [
          'employeeCode',
          'fullName',
          'fullNameLao',
          'basicSalary',
          'thisMonthSalary',
          'position',
          'department',
          'salaryGrade',
          'earning',
          'deduction',
          'ssoPaidByEmp',
          'ssoPaidByCom',
          'OTHours',
          'OTAmount',
          'totalOTAmount',
          'deductibleBeforeTax',
          'deductibleAfterTax',
          'deductibleBeforeSSO',
          'salaryGrade',
          'startWorkingDate',
          'defaultWorkingDay',
          'actualWorkingDay',
          'taxForEachScale',
          'totalBeforeTax',
          'totalDueAsTax',
          'totalAfterTax',
          'totalAfterSSO',
          'netSalary'
    ]
    },
    async getDefaultLayout() {
      const defaultLayout = await getDefaultLayout()
      this.form = {
        layouts: defaultLayout.layouts,
        payrollLayoutId: defaultLayout._id,
        name: defaultLayout.name
      }
    },
    async updatePayrollLayout() {
      await updatePayrollLayout(this.form)
      this.$emit('CloseModal')
    },
    async deletePayrollLayout() {
        const isConfirmed = await this.$dialog.confirm()
        if(isConfirmed) {
        await deletePayrollLayout({
          payrollLayoutId: this.form.payrollLayoutId
        })
          this.$emit('CloseModal')
        }
      }
  },
  data: () => ({
    LayoutOption: '',
    layouts: [],
    DataSet: layoutData,

    form: {
      payrollLayoutId: '',
      name: '',
      layouts: []
    }
  }),
  watch: {
    DataSet: {
      handler(items) {
        items.map(i => {
          if (i.isSelected) this.form.layouts.push(i.key)
          else this.form.layouts = this.form.layouts.filter(o => o !== i.key)
          this.form.layouts = _.uniq(this.form.layouts)
        })
      },
      deep: true,
      immediate: true
    },
    'form.layouts': {
      handler(items) {
        this.DataSet.map(i => {
          if (items.includes(i.key)) {
            const curIdx = this.DataSet.findIndex(o => o.key === i.key)
            this.DataSet[curIdx].isSelected = true
          }else {
             const curIdx = this.DataSet.findIndex(o => o.key === i.key)
            this.DataSet[curIdx].isSelected = false
          }
        })
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    convertName() {
      return (key) => {
        const ret =  this.DataSet.find(i => i.key === key)
        return ret ? ret.name : null
      }
    },
    type() {
      const d = _.uniqBy(this.DataSet, 'type')
      return d.map(i => i.type)
    },
    items() {
      return (type) => {
        return this.DataSet.filter(i => i.type === type)
      }
    }
  },
  created() {
      this.form.layouts = []
    this.getDefaultLayout()
  
  }
}
</script>

<style lang="scss" scoped>
hr {
  height: 1px;
}

.items-list-container{
  display: flex;
  overflow: hidden;
  .list-title{
    font-size: 18px;
    color: $font-color;
    margin-bottom: 20px;
  }
  .selected-items{
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 70%;
    .selected-items-list{
      overflow: auto;
      .selected-item {
        height: 30px;
        border: 1px solid $border-color;
        cursor: pointer;
        display: flex;
        align-items: center;
        flex-grow: 1;
        width: 100%;
        margin-right: 10px;
        white-space: pre;
        white-space: nowrap;
        margin-bottom: 10px;
        span {
          background-color: $dark-primary-color;
          color: #fff;
          min-width: 30px;
          max-width: 30px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }
        p {
          margin: 0;
          padding: 0;
        }
        i{
          cursor: pointer;
          margin-left: auto;
          margin-right: 10px;
          color: $grey-color;
          z-index: 999;
        }
      }
    }
  }
  .unselect-items-list{
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    overflow: hidden;
    .unselect-item-group-container{
      overflow: auto;
    }
    .unselect-item-group {
      padding: 10px 0;
      margin: 0;
      border-bottom: 1px solid $light-grey-color;
      display: flex;
      flex-direction: column;
      &:first-child {
        border-top: 1px solid $light-grey-color;
      }
      h3 {
        margin: 0;
        font-size: 16px;
        color: $font-color;
        min-width: 200px;
        cursor: pointer;
      }
      ul {
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 0;
        overflow: hidden;
        &.active{
          margin-top: 10px;
          height: 100%;
        }
        li {
          cursor: pointer;
          list-style-type: none;
          margin: 5px 0;
          white-space: pre;
          width: 50%;
          input {
            display: none;

            &:checked ~ label::before {
              background-color: $primary-color;
            }
            &:checked ~ label::after {
              content: '';
              display: block;
              position: absolute;
              top: 4px;
              left: 7px;
              width: 5px;
              height: 11px;
              border: solid #fff;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
            }
          }
          label {
            font-weight: normal;
            position: relative;
            display: flex;
            flex-wrap: nowrap;
            white-space: nowrap;
            align-items: center;
            cursor: pointer;
            margin: 0;
            font-size: 14px;

            &::before {
              content: '';
              min-width: 18px;
              min-height: 18px;
              max-width: 18px;
              max-height: 18px;
              margin-right: 5px;
              display: block;
              border: 1px solid $border-color;
            }

            &::after {
              content: '';
              display: block;
              position: absolute;
              top: 4px;
              left: 7px;
              width: 5px;
              height: 11px;
              border: solid $light-grey-color;
              border-width: 0 2px 2px 0;
              transform: rotate(45deg);
            }
          }
        }
      }
    }
  }
}
.customise-page {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px 50px 30px;
  .page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .input-group{
      display: flex;
      align-items: center;
      position: relative;
      .no-input{
        font-size: 28px;
        font-weight: 700;
        padding: 0;
        background-color: #fff;
        border: none;
        box-shadow: none;
        &:valid{
          background-color: #fff;
        }
        &:focus ~ span::after{
          width: 100%;
          transition: 0.3s;
        }
      }
      span{
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: $border-color;
        position: absolute;
        bottom: 0;
        &::after{
          content: '';
          display: block;
          width: 0;
          height: 2px;
          background-color: $primary-color;
          position: absolute;
          bottom: 0;
        }
      }
    } // input-group
  }
}



// dragable
.selected-item.sortable-chosen {
  opacity: 1;
  background-color: $dark-primary-color;
  color: #fff;
}

.selected-item.sortable-ghost {
  opacity: 1;
  background-color: $primary-color;
  transform: scale(1.2);
}

.selected-item.ghost {
  opacity: 0;
}

.close-button {
  position: absolute;
  top: 0;
  right: 50%;
  background-color: $grey-color;
  min-height: 30px;
  width: 50px;
  z-index: 1;
  background-color: rgba($grey-color, .4);
  cursor: pointer;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 20px;
    color: $grey-color;
  }
}
</style>