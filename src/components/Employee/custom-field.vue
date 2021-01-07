<template>
    <div>
        <div class="form-header">
            <div class="has-botton flex items-center">
                <h3>Custom Field</h3>
                <button class="button sub" >Add</button>
            </div>
            <p>Need help or have questions about uploading document? Call us at (856) 21 254709.</p>
        </div>
        <div class="flex flex-wrap">
    
            <div class="w-1/2 p-2" v-for="(i, idx) in fields" :key="idx" >
               <label for="">{{ i.key }}</label>
                <input v-model="i.value" type="text input " style="width: 100%; height: 40px">
            </div>
        </div>
        <div class="p-2">
                <button
            type="button" class="button sub">Save
        </button>
        </div>
    </div>
</template>

<script>

import { getCustomFieldsApi } from '@/apis/custom-field-api'
    export default {
        data: () => ({
            fields: [],
        }),
        methods: {
           async getCustomFields() {
               const data = await getCustomFieldsApi()
               this.fields = data.fields.map(i => ({ 
                   key: i,
                   value: ''
               }))
            }
        },
        created() {
           this.getCustomFields()
        }
    }
</script>

<style lang="scss" scoped>

</style>