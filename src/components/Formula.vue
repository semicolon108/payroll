<template>
  <div>
    <div
      class="group"
      v-for="(i, index) in 1"
      :key="index"
      :style="isFormulaError ? `border: 2px solid red;` : ``"
    >
      <span class="del"><i class="fa-solid fa-trash"></i></span>
      <div class="formula margin-bottom-30">
        <div class="formula-header">
          <input type="text" class="section-title" placeholder="Group Title" />

          <fieldset>
            <div class="select">
              <select>
                <option>0</option>
                <option>1</option>
                <option>2</option>
              </select>
            </div>
          </fieldset>

          <button class="button primary">Save</button>
        </div>
        <p style="font-size: 10px">Generate code: {{ formulas }}</p>
        <br />
        <p v-if="isFormulaError" style="color: red">Formula Error</p>

        <draggable
          class="formula-box"
          :list="formulas"
          group="people"
          @change="log"
          :style="isFormulaError ? `border: 2px solid red;` : ``"
        >
          <div v-for="(i, idx) in formulas" :key="idx">
            <span v-if="!isSymbol(i)" class="handle">
              {{ rename(i) }}
            </span>
            <div  v-else>

                <span
                @click="openSymbolByIndex === idx ? openSymbolByIndex = null : openSymbolByIndex = idx"
                    class="operator">
                    <i :class="`fa-solid fa-${ rename(i) === '+' ? 'plus' :  rename(i) === '-' ? 'minus' :  rename(i) === '*' ? 'multiply' :  'divide'}`"></i>
                </span>
            
                <div style="display: flex"
                v-if="openSymbolByIndex === idx"
                >


                <span
                    @click="formulas[idx] = o; openSymbolByIndex = null"
                v-for="o in ['+', '-', '*', '/'].filter(p => p !== rename(i))"
                :key="o"
                    class="operator">
                    <i :class="`fa-solid fa-${ o === '+' ? 'plus' :  o === '-' ? 'minus' :  o === '*' ? 'multiply' :  'divide'}`"></i>
                </span>



            </div>
            
            </div>
          </div>
        </draggable>
                  

        <!-- <li>earningBeforeTax</li>
                    <li class="operator"><i class="fa-solid fa-plus"></i></li>
                    <li>earningBeforeTax</li> -->
      </div>
          <div class="allowance">
                    <h1 class="section-title">System Fields</h1>
                    <draggable class="formula-box" :list="keysNotInFormula" group="people">
                        <div v-for="(i, idx) in keysNotInFormula" :key="idx">
                            <span class="item">
                        {{rename(i)}}
                    </span>
                </div>

            </draggable>
        </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

const renameKeys = [
  {
    key: "basicSalary",
    name: "Basic Salary",
  },
      {
        name: "This Month Salary",
        key: 'thisMonthSalary',
    },
  {
    key: "tax",
    name: "Tax",
  },
  {
    key: "ssoPaidByEmp",
    name: "Employee SSO 5.5%",
  },
  {
       name: "Total Due as Tax",
        key: 'totalDueAsTax',
  },
  {
     key: "finalNetPay",
     name: "Final Net Pay",
  },
    {
        key: 'earningBeforeSso',
        name: 'Earning Before SSO Calculation',
    },
    {
        key: 'earningAfterSso',
        name: 'Earning After SSO and Before TAX Calculation',
    },
    {
        key: 'earningAfterTax',
        name: 'Earning After TAX Calculation',
    },

         {
        key: 'deductionBeforeSso',
        name: 'Deduction Before SSO Calculation',

    },
    {
        key: 'deductionAfterSso',
        name: 'Deduction After SSO and Before TAX Calculation',
    },
    {
        key: 'deductionAfterTax',
        name: 'Deduction After TAX Calculation',
    },
];

export default {
  components: {
    draggable,
  },

  data: () => ({
    formulas: [
        "thisMonthSalary", 
        "+", 
        "earningBeforeSso", 
        "-", 
        "deductionBeforeSso",
        "-", 
        "ssoPaidByEmp", 
        "+",
        "earningAfterSso",
        '-',
        "deductionAfterSso",
        "-", 
        "tax",
        "+",
        "earningAfterTax", 
        "-", 
        "deductionAfterTax"

    ],
    symbols: ["+", "-", "*", "/"],
    keys: [
      "basicSalary",
      "tax",
      "ssoPaidByEmp",
     // "finalNetPay",
      // 'ssoPaidByCom',
      "totalDueAsTax",

    
      "earningBeforeSso",
      "earningAfterSso",
        "earningAfterTax",

    
      "deductionBeforeSso",
      "deductionAfterSso",
        "deductionAfterTax",
    ],
    formulasWithSymbols: [],
    isFormulaError: false,
    openSymbolByIndex: null
  }),
  computed: {
    rename() {
      return (key) => {
        const obj = renameKeys.find((i) => i.key === key);
        return obj ? obj.name : key;
      };
    },
    isSymbol() {
      return (key) => this.symbols.includes(key);
    },
    keysNotInFormula() {
      return this.keys.filter((i) => !this.formulas.includes(i));
    },
  },
  methods: {
    log(item) {
      // Check add and remove
      if (item.added) {
        const {
          // element,
          newIndex,
        } = item.added;
        if (this.formulas.length !== 1) {
          this.formulas.splice(newIndex, 0, "+");
        }
      } else if (item.removed) {
        const {
          //element,
          oldIndex,
        } = item.removed;

        if (oldIndex === 0) {
          this.formulas.splice(0, 1);
        } else {
          this.formulas.splice(oldIndex - 1, 1);
        }
      }

      // Array validator

      const errors = [];

      for (let i = 0; i < this.formulas.length; i++) {
        const key = this.formulas[i];
        const nextKey = this.formulas[i + 1];

        if (
          (this.symbols.includes(key) && this.symbols.includes(nextKey)) ||
          (this.symbols.includes(key) && i === 0) ||
          (this.symbols.includes(key) && i === this.formulas.length - 1)
        ) {
          errors.push(i);
        }
      }

      this.isFormulaError = errors.length ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.group {
  margin-bottom: 30px;
  border-radius: 5px;
  padding: 30px;
  background-color: $light-bg-color;
  position: relative;
  border: 1px solid $border-color;
  .del {
    position: absolute;
    top: 0;
    right: 0;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba($dark-grey-color, 0.1);
    border-radius: 0 0 0 5px;
    cursor: pointer;
    i {
      color: $alert-color;
    }
  }
  .formula {
    .formula-header {
      display: flex;
      align-items: flex-end;
      margin-bottom: 20px;
      input {
        height: 100%;
      }
      .select {
        text-align: center;
        &::after {
          display: none;
        }
        select {
          padding-left: 10px;
          padding-right: 10px;
          text-align: center;
          option {
            text-align: center;
          }
        }
      }
    }
    .formula-box {
      background-color: $light-grey-color;
      padding: 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      border: 1px solid $border-color;
      border-radius: 5px;
      div > span {
        cursor: pointer;
        background-color: $primary-color;
        color: #fff;
        @include sm-font;
        margin: 0;
        border-radius: 5px;
        padding: 8px 15px;
        display: flex;
        align-items: center;
      }
      .operator {
        background-color: rgba($grey-color, 0.5);
        color: $font-color;
        position: relative;
        i {
          @include sm-font;
        }
        ul {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 3px;
          top: 43px;
          left: 0;
          li {
            display: inline-block;
            background-color: $grey-color !important;
            color: $font-color;
          }
        }
      }
       .operatorX {
        background-color: rgba($grey-color, 0.5);
        color: $font-color;
        position: relative;
        i {
          @include sm-font;
        }
        ul {
          position: absolute;
          display: flex;
          flex-direction: column;
          gap: 3px;
          top: 43px;
          left: 0;
          li {
            display: inline-block;
            background-color: $grey-color !important;
            color: $font-color;
          }
        }
      }
    }
  } // fomula
  .allowance {
    .formula-box {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      div > span {
        cursor: pointer;
        background-color: $light-grey-color;
        @include sm-font;
        margin: 0;
        border-radius: 5px;
        display: flex;
        align-items: center;
        padding: 8px 15px;
        &.used {
          background-color: $warning-color;
        }
      }
    }
  }
}

.section-title {
  width: 50%;
  font-weight: 700;
  @include md-font;
  border-width: 0 0 1px 0;
  background-color: transparent !important;
}
</style>