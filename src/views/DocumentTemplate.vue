<template>
<div>
    <div class="page-header">
        <h3 class="page-title">Payslip Template</h3>
        <!-- <button class="button primary">Add Template</button> -->
    </div>
    <div class="columns">
        <div class="column is-4-desktop">
            <div class="box" :class="{'primary': !payslipTemplate.isDefault}">

                <h3  class="title" :class="{'primary': !payslipTemplate.isDefault}">Default Template</h3>

                <button class="button"
                :class="{'primary': !payslipTemplate.isDefault}"
                @click="setDefault(false)"
                >Set Default</button>

                <div class="download">
                    <a download href="https://paytoday-bucket.s3-ap-southeast-1.amazonaws.com/payslip-templates/DefaultTemplate.docx">
                        <i class="fal fa-file-word"></i>
                    </a>
                </div>

            </div>
        </div>


        <div class="column is-4-desktop">
            <div class="box" :class="{'primary': payslipTemplate.isDefault}">     
                <h3 class="title"
                    :class="{'primary': payslipTemplate.isDefault}"
                    >Custom Template 
                    <span v-if="payslipTemplate._id" class="primary">(READY TO USE)</span>
                    <span v-else class="">(NOT READY)</span>
                </h3>

                <div class="buttons">
                    <button 
                    v-if="payslipTemplate._id"
                    class="button"
                    :class="{'primary': payslipTemplate.isDefault}"
                    @click="setDefault(true)"
                    >Set Default</button>


                    <div class="upload">
                        <button @click="$refs.fileInput.click()" class="button">Upload template</button>
                        <p v-if="payslipTemplate._id" class="text-xs mt-1 text-green-400">Template Size: ({{payslipTemplate.payslip.size | fileSize}})</p>
                    </div>
                </div>

                <div class="download">
                    <a v-if="payslipTemplate.payslip" download :href="payslipTemplate.payslip.src">
                        <i class="fal fa-file-word"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <input 
    ref="fileInput"
    @change="onFileChange"
    type="file" class="is-hidden">
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
.box{
    position: relative;
    transition: ease .2s;
    &.primary{
        box-shadow: 0 0 0 1px $primary-color;
    }
}
.title{
    font-size: $desktop-subtitle;
    margin-bottom: 20px;
    &.primary{
        color: $primary-color;
    }
    span{
        color: $grey-color;
        &.primary{
            color: $sub-color;
        }
    }
}
.buttons{
    display: flex;
    align-items: center;
    margin-bottom: 0;
    button{
        margin-right: 5px;
        margin-bottom: 0;
    }
    .upload{
        display: flex;
        align-items: center;
        p{
            margin: 0;
            font-size: 14px;
        }
    }
}

.download{
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 15px;
    background-color: $light-grey-color;
    font-size: 16px;
    a{
        color: #000;
    }
}
</style>