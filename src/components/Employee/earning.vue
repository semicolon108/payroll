<template>
    <ValidationObserver ref="refForm" class="form">
      <div class="form-header">
        <div class="has-button">
          <h3>Earning / Deduction</h3>
          <button
              v-if="!customAllowances.length"
              @click="addCustomAllo"
              class="button sub">Add custom item
          </button>
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
              <ValidationProvider :name="i.earnDeductId.name " rules="required" v-slot="{ errors }">
                <currency-input
                    v-model="i.amount"
                    class="input"
                    :allow-negative="false"
                    :value-range="{ min: 0 }"
                    :distraction-free="false"
                    :currency="{ prefix: '', suffix: ' LAK' }"
                    :value-as-integer="true"
                    :precision="0"
                    placeholder="Enter default amount"
                />
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </div>
      </div>
    <div
        v-if="customAllowances.length"
        class="box">
      <div class="form-header">
        <h3>Custom Earning / Deduction</h3>
        <p>These Earning / Deduction will ...</p>
      </div>

      <!-- Custom allowance group -->
      <div class="form">
        <div class="columns is-multiline"
             v-for="(i, idx) in customAllowances"
             :key="idx">
          <div class="column is-2 custom">
            <div class="field">
              <label class="label">Name</label>
              <div class="contro">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <input v-model="i.name"
                         type="text" class="input" placeholder="Enter name">
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-3 custom">
            <div class="field">
              <label class="label">Amount</label>
              <div class="contro">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <currency-input
                      v-model="i.amount"
                      class="input"
                      :allow-negative="false"
                      :value-range="{ min: 0 }"
                      :distraction-free="false"
                      :currency="{ prefix: '', suffix: '' }"
                      :value-as-integer="true"
                      :precision="0"
                      placeholder="Enter default amount"
                  />
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-3 custom">
            <div class="field">
              <label class="label">Type</label>
              <div class="control">
                <div class="select">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                  <select v-model="i.type">
                    <option v-for="(i, idx) in types" :key="idx" :value="i">{{ i }}</option>
                  </select>
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-3 custom">
            <div class="field">
              <label class="label">TAX Calculation</label>
              <div class="control">
                <div class="select">

                  <ValidationProvider rules="required" v-slot="{ errors }">
                  <select v-model="i.isBeforeTax">
                    <option :value="true">Before TAX</option>
                    <option :value="false">After TAX</option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>

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
            type="button" class="button sub">Add
        </button>
      </div>
    </div>
    <hr>
    <button @click="saveOnly" type="button" class="button primary">Update</button>
    </ValidationObserver>
</template>

<script>
import {getEarnDeductGroups} from "@/apis/earn-deduct-group-api";
import {addOrUpdateAllowance, getAllowance} from "@/apis/allowance-api";
import {getCustomAllowance, addOrUpdateCustomAllowance} from "@/apis/custom-allowance-api";
import {loadingTimeout} from "@/config/variables";

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
      this.$store.commit('SET_IS_LOADING', true)
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
      try {
        await this.$store.dispatch('loading')
        await addOrUpdateAllowance(form)
        await this.$store.dispatch('completed')
      }catch (err) {
        if (err.graphQLErrors[0]) {
          alert(err.graphQLErrors[0].message)
          await this.$store.dispatch('error')
          return
        }
      }
      await this.addOrUpdateCustomAllowance()
      setTimeout( () => {
        this.$store.commit('SET_IS_LOADING', false)
      }, loadingTimeout)

    },

    async saveAndContinue() {
      const isValid = await this.$refs.refForm.validate()
      if(!isValid) return
      await this.addOrUpdateAllowance()
      await this.$router.push({name: 'document', params: {id: this.$route.params.id}})

    },
    async saveOnly() {
      const isValid = await this.$refs.refForm.validate()
      if(!isValid) return
      await this.addOrUpdateAllowance()
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
      await addOrUpdateCustomAllowance(form)
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

.control.has-icon {
  display: flex;
  align-items: center;

  i {
    padding: 10px;
    cursor: pointer;

    &:hover {
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


</style>