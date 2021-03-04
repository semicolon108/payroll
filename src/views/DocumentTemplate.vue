<template>
    <div>
        <div class="page-header">
            <h3 class="page-title">Payslip Template</h3>
            <!-- <button class="button primary">Add Template</button> -->
        </div>
        <div class="flex">
            <div class="shadow w-1/2 m-2 relative"
             :class="{'border border-blue-600': !payslipTemplate.isDefault}">
                <div class="m-3">
                    <h2 class="font-bold"
                    :class="{'text-blue-800': !payslipTemplate.isDefault}"
                    >Default Template</h2>
                    <p class="text-gray-400 text-xs mt-2">This option is chosen by default (You can't modify it).</p>
                </div>
                <button class="border-r border-t p-2 "
                :class="{'bg-blue-800 text-white': !payslipTemplate.isDefault}"
                @click="setDefault(false)"
                >Set Default</button>
                <div class="absolute right-0 top-0 mt-4 mr-4  text-blue-800" >
                    <i class="fas fa-lg  fa-file-download cursor-pointer"></i>
                </div>
            </div>
               <div class="shadow w-1/2 m-2 relative"
               :class="{'border border-blue-600': payslipTemplate.isDefault}"
               >
                <div class="m-3">
                    <h2 class="font-bold"
                     :class="{'text-blue-800': payslipTemplate.isDefault}"
                    >Custom Template 
                       <span v-if="payslipTemplate._id" class="text-green-400">(READY TO USE)</span>
                     <span v-else class="text-red-400">(NOT READY)</span>
                  
                    </h2>
                    <p class="text-gray-400 text-xs mt-2">You can change what you want.</p>
                </div>
                <button 
                v-if="payslipTemplate._id"
                class="border-r border-t p-2 "
                 :class="{'bg-blue-800 text-white': payslipTemplate.isDefault}"
                 @click="setDefault(true)"
                
                >Set Default</button>
                  <div class="absolute right-0 top-0 mt-4 mr-4 text-blue-800 text-right" >
                    <i class="block fa-lg fas fa-file-download cursor-pointer"></i>
                    <button 
                    @click="$refs.fileInput.click()"
                    class="bg-gray-400 text-white px-2 py-1">Upload template</button>
                    <p v-if="payslipTemplate._id" class="text-xs mt-1 text-green-400">Template Size: ({{payslipTemplate.payslip.size | fileSize}})</p>
                </div>
            </div>
        </div>
        <input 
        ref="fileInput"
        @change="onFileChange"
        type="file" class="hidden">
    </div>
</template>

<script>
import {getPayslipTemplateApi, addOrUpdatePayslipTemplateApi} from '@/apis/payslip-template-api'
    export default {
        data: () => ({
            payslipTemplate: {
                isDefault: false
            },
            file: null
        }),
        created() {
           this.getPayslipTemplate()
        },
        methods: {
            setDefault(bool) {
                this.payslipTemplate.isDefault = bool
                this.addOrUpdatePayslipTemplate()
            },
            async getPayslipTemplate() {
                const payslipTemplate = await  getPayslipTemplateApi()
                if(payslipTemplate) this.payslipTemplate = payslipTemplate
            },
            async addOrUpdatePayslipTemplate() {
                const form = {
                    isDefault: this.payslipTemplate.isDefault,
                }
                if(this.file) form.fileInput = this.file

                await addOrUpdatePayslipTemplateApi(form)
                this.getPayslipTemplate()
            },

            async uploadImage(file) {
                try {
                    const formData = new FormData()
                    formData.append('imageFile', file)
                    const res = await this.$axios.post('upload-document', formData)
                    this.file = res.data.file
                    this.addOrUpdatePayslipTemplate()
                } catch (err) {
                    throw new Error(err)
                }
            },
            async onFileChange($event) {
                const file = $event.target.files[0];
                const extension = file.name.split('.').pop();
                if (extension === 'docx') {
                    await this.uploadImage(file)
                } else {
                    alert('Only Support DOCX Extension')
                }
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>