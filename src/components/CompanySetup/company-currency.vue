<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Currency</h3>
      <p>Lorem ipsum dolor sit amet quo illum in repellendus alias corporis error facere nostrum quae aliquid illo
        blanditiis nihil consectetur expedita, amet officia optio eveniet?</p>
    </div>
    <div class="field">
      <label for="" class="label">Does your company use multiple currency?</label>
      <div class="control switch">
        <input @click="isMulti = false" type="radio" name="expat" id="expat-no" :checked="!isMulti">
        <label for="expat-no">No</label>

        <input @click="isMulti = true" type="radio" name="expat" id="expat-yes" :checked="isMulti">
        <label for="expat-yes">Yes</label>
      </div>
    </div>

    <div v-if="isMulti">
      <h3 class="title">Setup exchange rate</h3>
      <div class="currency" >
        <Draggable
            v-model="compCurrencies"
            v-bind="dragOptions"
            handle=".handle"
        >
          <div
              class="field has-addons"
               v-for="(i, idx) in compCurrencies"
               :key="i._id"
          >
            <p class="control">
                <span class="select">
                    <select v-model="i.currencyId._id">
                        <option v-for="i in filterCurrencies(i.currencyId._id)" :key="i._id" :value="i._id">{{
                            i.name
                          }}</option>
                    </select>
                </span>
            </p>
            <p class="control">
              <input v-model="i.amount" class="input" type="text" placeholder="Exchange rate">
            </p>
            <i class="fas fa-arrows-alt handle" style="cursor: move; font-size: 20px; color: #0253B3"></i>
            <i @click="spliceCurrency(idx)"
               class="fas fa-trash splice-icon"></i>
          </div>

        </Draggable>
        <button
            v-if="!isLimit"
            @click="pushCurrency" class="button" style="margin-top: 1rem">Add Currency
        </button>
      </div>
    </div>
    <button @click="addOrUpdateCompanyCurrency" class="button">Save</button>
  </div>
</template>

<script>

import {
  addOrUpdateCompanyCurrency,
  getCompanyCurrencies
} from "@/apis/company-currency-api";
import {getReuse} from "@/apis/reuse-api";
import Draggable from 'vuedraggable'


export default {
  components: {
    Draggable
  },
  data: () => ({
    compCurrencies: [],
    currencies: [],

    isMulti: true,

    isLimit: false,
    drag: false
  }),
  computed: {
    filterCurrencies() {
      return (curId) => {
        const mapIds = this.compCurrencies.map(i => i.currencyId._id)
        const me = this.currencies.filter(i => !mapIds.includes(i._id) || i._id === curId)
        return me
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  watch: {
    compCurrencies(items) {
      if (items.length === this.currencies.length) this.isLimit = true
      else this.isLimit = false
    }
  },
  methods: {
    async getCompanyCurrencies() {
      const data = await getCompanyCurrencies()
      this.isMulti = data.isMulti
      this.compCurrencies = data.currencies
    },
    async getCurrencies() {
      const currencies = await getReuse('Currency')
      this.currencies = currencies.filter((i, idx) => idx !== 0)
      this.form.currencyId = this.currencies[0]._id
    },
    async addOrUpdateCompanyCurrency() {
      const items = this.compCurrencies.map(i => {
        return {
          currencyId: i.currencyId._id,
          amount: parseInt(i.amount, 10)
        }
      })
      const form = {
        isMulti: this.isMulti,
        items
      }
      await addOrUpdateCompanyCurrency(form)
      alert('Updated')
    },
    pushCurrency() {
      const exceptCur = this.chooseCurrency()
      if (!exceptCur) {
        alert('Hiii')
        return
      }
      this.compCurrencies.push({
        currencyId: {
          _id: this.chooseCurrency()
        },
        amount: null
      })
    },
    spliceCurrency(idx) {
      this.compCurrencies.splice(idx, 1)
    },
    chooseCurrency() {
      const comCurrency = this.compCurrencies.map(i => i.currencyId._id)
      const exceptCur = this.currencies.filter(i => !comCurrency.includes(i._id))
      if (!exceptCur) return false
      return exceptCur[0]._id
    }
  },
  created() {
    this.getCurrencies()
    this.getCompanyCurrencies()
  }
}
</script>

<style lang="scss" scoped>
.splice-icon {
  color: $alert-color;
  cursor: pointer
}

.box-header {
  color: $font-color;
  margin-bottom: 20px;

  .box-title {
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 5px;
  }
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: $font-color;
  margin-bottom: 15px;
  margin-top: 30px;
}

.input, .textarea {
  @include input;
}

label {
  font-weight: normal;
}

.button {
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch {
  display: flex;
  align-items: center;
  width: 50%;

  label {
    width: 50%;
    height: 36px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  input {
    display: none;

    &:checked + label {
      background-color: $sub-color;
      color: #fff;
    }
  }
}

.currency {
  margin-bottom: 20px;
  width: 50%;

  .has-addons {
    align-items: center;

    i {
      margin-left: 10px;
    }
  }

  .control {
    &:last-child {
      width: 100%;
    }

    select {
      border-radius: 0;
    }

    input {
      border-radius: 0;
    }
  }

  button.button {
    background-color: $grey-color;
    border: none;
    color: $font-color;
  }
}
</style>