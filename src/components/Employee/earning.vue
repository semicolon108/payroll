<template>
  <div>
    <div class="form-header">
      <h3>Allowance</h3>
      <p>Please choose at least one earning group below</p>
      <ul class="allowance-list">
        <li v-for="i in earnDeductGroups" :key="i._id" class="allowance-list-item">
          <p @click="changeGroup(i._id)"
             :class="{'is-active': groupSelected === i._id}"
          >{{ i.name }}</p>
        </li>
      </ul>
    </div>
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
      <button @click="addOrUpdateAllowance" type="button" class="button save-btn">Save and Continue</button>
    </div>
  </div>
</template>

<script>
import {getEarnDeductGroups} from "@/apis/earn-deduct-group-api";
import {addOrUpdateAllowance, getAllowance} from "@/apis/allowance-api";

export default {
  data: () => ({
    earnDeductGroups: [],
    groupSelected: '',
    allowances: [],
    fakes: []
  }),
  async created() {
    await this.getEarnDeductGroups()
    await this.getAllowance()
  },
  computed: {
    getCurrentGroup() {
      const me = this.earnDeductGroups.find(i => i._id === this.groupSelected)
      if (me) return me.earnDeductIds
      return []
    }
  },
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
    },
    async getAllowance() {
      const data = await getAllowance(this.$route.params.id)
      this.changeGroup(data.earnDeductGroupId._id)
      this.allowances = data.allowances
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

</style>