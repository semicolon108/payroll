<template>
  <div>
    <div>
      <div class="form-header">
        <div>
          <h3>Allowance</h3>
          <button
              v-if="!customAllowances.length"
              @click="addCustomAllo"
              class="button">Add custom item</button>
        </div>
        <p>Please choose at least one earning group below</p>
        <ul class="allowance-list">
          <li v-for="i in earnDeductGroups" :key="i._id" class="allowance-list-item">
            <p @click="changeGroup(i._id)"
               :class="{'is-active': groupSelected === i._id}"
            >{{ i.name }}</p>
          </li>
        </ul>
      </div>

      <!-- Allowance group -->
      <div class="form">
        <div class="columns is-multiline">
          <div v-for="(i) in allowances" :key="i._id" class="column is-6">
            <div class="field">
              <label class="label">
                {{ i.earnDeductId.name }}
                <!--              ({{ i.earnDeductId.groups.map(i => i.name).join(', ') }})-->
              </label>
              <input v-model="i.amount" type="text" class="input" placeholder="Enter default amount">
            </div>
          </div>
        </div>
      </div>

    </div>

    <div
        v-if="customAllowances.length"
        class="box">
      <div class="form-header">
        <h3>Custom Allowance</h3>
        <p>These allowances will ...</p>
      </div>

      <!-- Custom allowance group -->
      <div class="form">
        <div  class="columns is-multiline"
              v-for="(i, idx) in customAllowances"
              :key="i._id">
          <div class="column is-2 custom">
            <div class="field">
              <label class="label">Name</label>
              <div class="contro">
                <input v-model="i.name" type="text" class="input" placeholder="Enter default amount">
              </div>
            </div>
          </div>
          <div class="column is-3 custom">
              <div class="field">
                <label class="label">Amount</label>
                <div class="contro">
                  <input v-model="i.amount" type="text" class="input" placeholder="Enter default amount">
                </div>
              </div>
          </div>
          <div class="column is-3 custom">
              <div class="field">
                <label class="label">Type</label>
                <div class="control">
                  <div class="select">
                    <select v-model="i.type">
                      <option v-for="(i, idx) in types" :key="idx" :value="i">{{ i }}</option>
                    </select>
                  </div>
                </div>
              </div>
          </div>
          <div class="column is-3 custom">
              <div class="field">
                <label class="label">TAX Calculation</label>
                <div class="control">
                  <div class="select">
                    <select v-model="i.isBeforeTax">
                      <option :value="true">Before TAX</option>
                      <option :value="false">After TAX</option>
                    </select>
                  </div>
                </div>
              </div>
          </div>
          <div class="column is-1">
            <div class="field">
                <label class="label">Option</label>
                <div
                    @click="spliceCustomAllo(idx)"
                    class="control has-icon">
                  <i class="fas fa-trash"></i>
                </div>
              </div>
          </div>
        </div> <!-- Columns -->
        <button
            @click="addCustomAllo"
            type="button" class="button add-btn">Add</button>
      </div>
    </div>
    <button @click="addOrUpdateAllowance" type="button" class="button save-btn">Save and Continue</button>
  </div>
</template>

<script>
import {getEarnDeductGroups} from "@/apis/earn-deduct-group-api";
import {addOrUpdateAllowance, getAllowance} from "@/apis/allowance-api";
import { getCustomAllowance, addOrUpdateCustomAllowance} from "@/apis/custom-allowance-api";

export default {
  data: () => ({
    earnDeductGroups: [],
    groupSelected: '',
    allowances: [],
    fakes: [],
    customAlloId: '',
    customAllowances: [],

    types: ['Earning', 'Deduction'],

  }),
  async created() {
    await this.getEarnDeductGroups()
    await this.getAllowance()
    await this.getCustomAllowance()
  },
  // computed: {
  //   getCurrentGroup() {
  //     const me = this.earnDeductGroups.find(i => i._id === this.groupSelected)
  //     if (me) return me.earnDeductIds
  //     return []
  //   }
  // },
  methods: {
    async getEarnDeductGroups() {
      this.earnDeductGroups = await getEarnDeductGroups()
      this.changeGroup(this.earnDeductGroups[0]._id)
    },
    async addOrUpdateAllowance() {
      const allowances = this.allowances.map(i => {
        return {
          earnDeductId: i.earnDeductId._id,
          amount: parseInt(i.amount)
        }
      })
      const form = {
        earnDeductGroupId: this.groupSelected,
        employeeId: this.$route.params.id,
        allowances,
      }
      await addOrUpdateAllowance(form)
      await this.addOrUpdateCustomAllowance()
      alert('Saved')

    },
    async getAllowance() {
      const data = await getAllowance(this.$route.params.id)
      this.changeGroup(data.earnDeductGroupId._id)
      this.allowances = data.allowances
    },
    async getCustomAllowance() {
      const data = await getCustomAllowance(this.$route.params.id)
      this.customAlloId = data._id
      this.customAllowances = data.customAllowances.map(i => {
        return {
          type: i.type,
          name: i.name,
          isBeforeTax: i.isBeforeTax,
          amount: parseInt(i.amount, 10)
        }
      })
    },
    async addOrUpdateCustomAllowance() {
      const form = {
        employeeId: this.$route.params.id,
        items: this.customAllowances ? this.customAllowances.map(i => {
          return {
            type: i.type,
            name: i.name,
            isBeforeTax: i.isBeforeTax,
            amount: parseInt(i.amount, 10)
          }
        }) : []
      }
      const data = await addOrUpdateCustomAllowance(form)
      console.log(data)
    },
    changeGroup(id) {
      this.groupSelected = id
      const me = this.earnDeductGroups.find(i => i._id === id).earnDeductIds
      this.allowances = me.map(i => {
        return {
          earnDeductId: {
            _id: i._id,
            name: i.name,
            groups: i.groups
          },
          amount: 0,
        }
      })
    },
    addCustomAllo() {
      const obj = {
        name: '',
        amount: null,
        type: 'Earning',
        isBeforeTax: true
      }
      this.customAllowances.push(obj)
    },
    spliceCustomAllo(idx) {
      this.customAllowances.splice(idx, 1)
    }
  },
}
</script>

<style lang="scss" scoped>
.form-header{
  div{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    h3{
      margin: 0;
    }
    button{
      margin-left: 10px;
      border-radius: 0;
      border: none;
      background-color: $sub-color;
      color: #fff;
    }
  }
}
.allowance-list {
  display: flex;
  margin-top: 20px;

  p {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    display: block;
    padding: 8px 15px;
    background-color: $border-color;

    &.is-active {
      background-color: $sub-color;
      color: #fff;
    }
  }
}

.control.has-icon{
  display: flex;
  align-items: center;
  i{
    padding: 10px;
    cursor: pointer;
    &:hover{
      color: $alert-color;
    }
  }
}

.box {
  margin-top: 30px;
  margin-bottom: 0;
  color: $font-color;
  border: 1px solid $sub-color;
}
.button{
  border-radius: 0;
  border: none;
  background-color: $sub-color;
  color: #fff;
  &.save-btn{
    background-color: $primary-color;
    color: #fff;
    margin-top: 30px;
    &:hover{
        box-shadow: none;
        outline: none;
    }
    &:focus{
        box-shadow: none;
        outline: none;
    }
  }
}


</style>