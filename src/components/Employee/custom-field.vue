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
            </div>
        </div>
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

export default {
    data: () => ({
        fields: [] 
    }),
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
                    let value = customFields.find(o => o.key === i.key)
                    value = value ? value.value : ''
                    return {
                        key: i.key,
                        value
                    }
                })
            }
        },
        async updateCustomFieldsByEmp() {
            const form = {
                employeeId: this.$route.params.id,
                customFields: this.fields
            }
            await updateCustomFieldsByEmpApi(form)
        }
    },
   async created() {
        await this.getCustomFields()
        this.getEmployee()
    }
}
</script>

<style lang="scss" scoped>

</style>

