<template>
    <div>
        <div class="form-header">
            <div class="has-botton flex items-center">
                <h3>Custom Field</h3>
            </div>
            <p>Need help or have questions about custom field? Call us at (856) 21 254709.</p>
        </div>
 
        <div class="flex flex-wrap">
            <div class="w-1/2 p-2" v-for="(i, idx) in fields" :key="idx">
                <label for="">{{ i.key }}</label>
                <input v-model="i.value" type="text input " style="width: 100%; height: 40px" class="p-2">
       <div v-if="getCompany.private && getCompany.private.isPensionFund">
                    <div class="toggle">
                    <div class="select-toggle">
                        <input v-model="i.isUsed" type="checkbox" id="pension" />
                        <label for="pension">Is Active</label>
                    </div>
                </div>
                <div class="toggle">
                            <div class="select-toggle">
                  <input v-model="i.isPercent" type="checkbox" id="percent" />
                  <label for="percent">Is Percent</label>
                </div>
                </div>
       </div>
            </div>
              
        </div>


          <!-- <div class="column is-4" 

          >
            <div class="field">
              <label for="" class="label">Pension Fund (%)</label>
              <div class="control toggle">
                <input  type="text" class="input" />
                <div class="select-toggle">
                  <input type="checkbox" id="pension" />
                  <label for="pension">Active</label>
                </div>
              </div>
            </div>
          </div> -->
     
        <div class="p-2">
            <button 
            @click="updateCustomFieldsByEmp"
            type="button" class="button sub">Save
            </button>
        </div>
    </div>
</template>


<script>
import { getCustomFieldsApi } from '@/apis/custom-field-api'
import {getEmployeeApi, updateCustomFieldsByEmpApi} from '@/apis/employee-api'
import { mapGetters } from "vuex";
export default {
    data: () => ({
        fields: [] 
    }),
    computed: {
        ...mapGetters(["getCompany"]),
    },
    
    methods: {
        async getCustomFields() {
            const data = await getCustomFieldsApi()
            this.fields = data.fields.map(i => ({
                key: i,
                value: ''
            }))
        },
        async getEmployee() {
            const emp = await getEmployeeApi(this.$route.params.id)
            const customFields = emp.customFields
            if(this.fields.length) {
                this.fields = this.fields.map(i => {
                    let p = customFields.find(o => o.key === i.key)
                    const value = p ? p.value : ''
                    const isUsed = p ? p.isUsed : undefined
                    const isPercent = p ? p.isPercent : undefined
                    return {
                        key: i.key,
                        value,
                        isUsed,
                        isPercent
                    }
                })
            }
        },
        async updateCustomFieldsByEmp() {
            const form = {
                employeeId: this.$route.params.id,
                customFields: this.fields
            }
                        try {
                    await this.$store.dispatch("loading");

                await updateCustomFieldsByEmpApi(form)
                    await this.$store.dispatch("completed");
                } catch (err) {
                    await this.$store.dispatch("error");
                    throw new Error(err);
                }
                    }
    },
   async created() {
        await this.getCustomFields()
        this.getEmployee()
    }
}
</script>

<style lang="scss" scoped>



.toggle {
  display: flex;
}

.select-toggle {
  margin-left: 10px;
  display: flex;
  label {
    position: relative;
    display: flex;
    align-items: center;
    &::before {
      margin-right: 5px;
      cursor: pointer;
      content: "";
      display: block;
      width: 20px;
      height: 20px;
      border: 1px solid $border-color;
      background-color: $placeholder-color;
    }
  }

  input {
    display: none;
    cursor: pointer;
    position: relative;
    &:checked ~ label::after {
      content: "";
      position: absolute;
      left: 5px;
      top: 20px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
        4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
      transform: rotate(45deg);
    }
    &:checked ~ label::before {
      background-color: $primary-color;
    }
  }
  }
</style>

