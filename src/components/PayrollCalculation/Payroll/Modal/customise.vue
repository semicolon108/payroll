<template>
  <div class="customise-page">

    <div class="close-button" @click="CloseModal">
      <i class="fal fa-chevron-down"></i>
    </div>

    <section class="section">
      <div class="container">
        <div class="page-header">


          <h3>Customise Table and Export Layout</h3>
          <div class="field">
            <div class="control">
              <button class="button"
                      @click="LayoutOption = 'updateLayout'">
                Update Existing Layout
              </button>

              <button class="button primary"
                      @click="LayoutOption = 'createLayout'">
                Create New Layout
              </button>
            </div>
          </div>
        </div>
        <hr>
        <draggable class="selected-items-list"
                   v-model="layouts"
        >
          <div class="selected-item" v-for="(i, index) in layouts" :key="index">
            <span>{{ index + 1 }}.</span>
            <p>{{ i }}</p>
          </div>
        </draggable>


        <div class="unselect-items-list">
          <div class="container">
            <div class="unselect-item-group" v-for="i in type" :key="i">
              <h3 class="group-name">
                {{ i }}
              </h3>
              <ul>
                <li v-for="item in items(i)" :key="item.fieldItem"

                >
                  <input
                      @change="item.isSelected = !item.isSelected"
                      type="checkbox" :checked="item.isSelected" :id="item.fieldItem">
                  <label

                      :for="item.fieldItem"
                      class="label">{{ item.fieldItem }}</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <component :is="LayoutOption" @CloseLayoutOption="LayoutOption = ''"></component>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import _ from 'lodash'
import updateLayout from './update-layout'
import createLayout from './create-layout'

export default {
  components: {
    draggable,
    updateLayout,
    createLayout
  },
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
  },
  data: () => ({
    LayoutOption: '',
    layouts: [],
    DataSet: [
      {
        "fieldItem": "Employee ID",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Names and Surnames (English)",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Names and Surnames (Laos)",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Position",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Department",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Salary Grade",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Start Working Date",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Basic Salary",
        "type": "Salary",
        isSelected: false
      },
      {
        "fieldItem": "Default Working Day / Month",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "Actual Work Day This month",
        "type": "Employee Info",
        isSelected: false
      },
      {
        "fieldItem": "This Month Salary",
        "type": "Salary",
        isSelected: false
      },
      {
        "fieldItem": "Earning / Deduction Before SSO",
        "type": "Earning / Deduction",
        isSelected: false
      },
      {
        "fieldItem": "Company SSO 6%",
        "type": "SSO",
        isSelected: false
      },
      {
        "fieldItem": "Employee SSO 5.5%",
        "type": "SSO",
        isSelected: false
      },
      {
        "fieldItem": "Total After SSO",
        "type": "Salary",
        isSelected: false
      },
      {
        "fieldItem": "OT Work (Hrs) * 5",
        "type": "OT",
        isSelected: false
      },
      {
        "fieldItem": "OT Amount (LAK) * 5",
        "type": "OT",
        isSelected: false
      },
      {
        "fieldItem": "Total OT Amount",
        "type": "OT",
        isSelected: false
      },
      {
        "fieldItem": "Earning / Deduction Before TAX",
        "type": "Earning / Deduction",
        isSelected: false
      },
      {
        "fieldItem": "Total before TAX",
        "type": "Salary",
        isSelected: false
      },
      {
        "fieldItem": "% Tax for Each Scale (LAK) * 5",
        "type": "TAX",
        isSelected: false
      },
      {
        "fieldItem": "Total Due as Tax",
        "type": "TAX",
        isSelected: false
      },
      {
        "fieldItem": "Total (After Tax+SSO)",
        "type": "Salary",
        isSelected: false
      },
      {
        "fieldItem": "Earning / Deduction After TAX ",
        "type": "Earning / Deduction",
        isSelected: false
      },
      {
        "fieldItem": "Final Net Pay",
        "type": "Salary",
        isSelected: false
      }
    ]
  }),
  watch: {
    DataSet: {
      handler(items) {
        items.map(i => {
          if(i.isSelected) this.layouts.push(i.fieldItem)
          else this.layouts = this.layouts.filter(o => o !== i.fieldItem)
          this.layouts = _.uniq(this.layouts)
        })
      },
      deep: true,
      immediate: true
    },
    layouts: {
      handler(items) {
       this.DataSet.map(i => {
           if(items.includes(i.fieldItem)) {
             const curIdx = this.DataSet.findIndex(o => o.fieldItem === i.fieldItem)
             this.DataSet[curIdx].isSelected = true
           }
           //   return {
           //   ...i,
           //   isSelected: true
           // }
          // else return i
        })
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
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
    this.layouts = [
      'Employee ID',
      'Names and Surnames (English)',
      "Names and Surnames (Laos)",
      "Position",
      "Department",
      "Salary Grade",
      "Start Working Date",
      "Basic Salary",
      "Default Working Day / Month",
      "Actual Work Day This month",
      "This Month Salary",
      "Earning / Deduction Before SSO",
      "Company SSO 6%",
      "Employee SSO 5.5%",
      "Total After SSO",
      "OT Work (Hrs) * 5",
      "OT Amount (LAK) * 5",
      "Total OT Amount",
      "Earning / Deduction Before TAX",
      "Total before TAX",
      "% Tax for Each Scale (LAK) * 5",
     "Total Due as Tax",
      "Total (After Tax+SSO)",
      "Earning / Deduction After TAX ",
      "Final Net Pay",

    ]
  }
}
</script>

<style lang="scss" scoped>
hr {
  height: 1px;
}

.customise-page {
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .page-header {
    display: flex;
    align-items: center;

    .field {
      margin-left: auto;
    }

    .control {
      display: flex;
      align-items: center;

      label {
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }
}

.selected-items-list {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  margin: 20px 0;
  box-sizing: border-box;

  .selected-item {
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    color: #fff;
    background-color: $primary-color;
    margin-right: 10px;
    white-space: pre;
    white-space: nowrap;
    margin-bottom: 8px;

    span {
      background-color: $dark-primary-color;
      min-width: 30px;
      max-width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      padding: 5px 10px;
    }
  }
}

.unselect-items-list {
  height: 0;

  &.active {
    height: auto;
  }

  .unselect-item-group {
    padding: 10px 0;
    margin: 0;
    border-bottom: 1px solid $light-grey-color;
    display: flex;

    &:first-child {
      border-top: 1px solid $light-grey-color;
    }

    h3 {
      font-size: 16px;
      color: $font-color;
      min-width: 200px;
    }

    ul {
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      li {
        list-style-type: none;
        margin: 5px 0;
        white-space: pre;
        width: 33.33%;

        input {
          display: none;

          &:checked ~ label::before {
            background-color: $primary-color;
          }

          &:checked ~ label::after {
            content: '';
            display: block;
            position: absolute;
            top: 3px;
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
            top: 3px;
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

// dragable
.selected-item.sortable-chosen {
  opacity: 1;
  background-color: $dark-primary-color;
}

.selected-item.sortable-ghost {
  opacity: 1;
  background-color: $sub-color;
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
  min-height: 50px;
  width: 80px;
  z-index: 1;
  min-height: 50px;
  width: 80px;
  background-color: rgba($grey-color, .4);
  cursor: pointer;
  border-radius: 0 0 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 40px;
    color: $grey-color;
  }
}
</style>