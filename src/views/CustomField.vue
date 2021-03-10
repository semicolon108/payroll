<template>
    <div>
        <div class="form-header">
            <div class="has-botton flex items-center">
                <h3>Custom Field</h3>
                <button 
                @click="fields.push(null)"
                class="button sub" >Add</button>
            </div>
            <p>Need help or have questions about uploading document? Call us at (856) 21 254709.</p>
        </div>
        <div class="flex flex-wrap">
            <div class="w-1/2 p-2 relative" v-for="(i, idx) in fields" :key="idx" >
                <input v-model="fields[idx]" type="text input " style="width: 100%; height: 40px" class="p-2">
                 <span  

                 @click="fields.splice(idx, 1)"
                 style="position: absolute;  right: 0; top: 0; margin-right: 10px; margin-top: 15px;"
                 class="icon alert 

                 cursor-pointer
                 text-red-500"><i class="fas fa-trash"></i></span>
            </div>
        </div>
        <div class="p-2">
            <button @click="addCustomField" type="button" class="button sub">Save</button>
        </div>
    </div>
</template>

<script>


import { getCustomFieldsApi, addCustomFieldApi } from '@/apis/custom-field-api'
export default {
    data: () => ({
        fields: [] 
    }),
    methods: {
        async getCustomFields() {
            const data = await getCustomFieldsApi()
            this.fields = data.fields
        },
        async addCustomField() {
            const form = {
                fields: this.fields
            }
            await addCustomFieldApi(form)
            this.getCustomFields()
        }
    },
    created() {
        this.getCustomFields()
    }
}
</script>
