<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-start">
        <h3 class="page-title">Payslip Template</h3>
      </div>
      <div class="header-end">
        <a
          class="button primary"
          download
          href="https://paytoday-bucket.s3-ap-southeast-1.amazonaws.com/payslip-templates/DefaultTemplate.docx"
        >
          <i class="fal fa-file-word"></i>
          Sample Template
        </a>
      </div>
    </div>

    <div class="page-content">
      <!-- Box -->
      <div class="box">
        <h3 class="title">Paylip Template</h3>
        <div class="buttons">
          <button @click="$refs.fileInput.click()" class="button grey">
            Upload template
          </button>
          <p v-if="payslipTemplate._id" class="text-xs mt-1 text-green-400">
            File size: ({{ payslipTemplate.payslip.size | fileSize }})
          </p>
        </div>
        <a
          class="download"
          v-if="payslipTemplate.payslip"
          download
          :href="payslipTemplate.payslip.src"
        >
          <i class="fal fa-file-word"></i>
        </a>
      </div>
      <!-- Box -->

      <input
        ref="fileInput"
        @change="onFileChange"
        type="file"
        class="is-hidden"
      />
    </div>
  </div>
</template>

<script>
import {
  getPayslipTemplateApi,
  addOrUpdatePayslipTemplateApi,
} from "@/apis/payslip-template-api";
export default {
  data: () => ({
    payslipTemplate: {
      isDefault: false,
      isLoading: true
    },
    file: null,
    isExistTemplate: false
  
  }),
  created() {
    this.getPayslipTemplate();
  },
  methods: {
    setDefault(bool) {
      this.payslipTemplate.isDefault = bool;
      this.addOrUpdatePayslipTemplate();
    },
    async getPayslipTemplate() {
      const payslipTemplate = await getPayslipTemplateApi();
      this.isLoading = false
      if (payslipTemplate) {
        this.payslipTemplate = payslipTemplate
        this.isExistTemplate = true
      }
    },
    async addOrUpdatePayslipTemplate() {
      const form = {
        isDefault: this.payslipTemplate.isDefault,
      };
      if (this.file) form.fileInput = this.file;

      await addOrUpdatePayslipTemplateApi(form);
      this.getPayslipTemplate();
    },

    async uploadImage(file) {
      try {
        const formData = new FormData();
        formData.append("imageFile", file);
        const res = await this.$axios.post("upload-document", formData);
        this.file = res.data.file;
        this.addOrUpdatePayslipTemplate();
      } catch (err) {
        throw new Error(err);
      }
    },
    async onFileChange($event) {
      const file = $event.target.files[0];
      const extension = file.name.split(".").pop();
      if (extension === "docx") {
        await this.uploadImage(file);
      } else {
        alert("Only Support DOCX Extension");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 30px;
  position: relative;
  transition: ease 0.2s;
}
.title {
  @include lg-font;
  font-weight: 700;
  margin-bottom: 15px;
  color: $primary-color;
}
.buttons {
  display: flex;
  align-items: center;
  margin-bottom: 0;
  .button {
    margin-right: 5px;
    margin-bottom: 0;
    @include md-font;
  }
  p {
    color: $alert-color;
  }
}

.download {
  position: absolute;
  top: 0;
  right: 0;
  background-color: $light-grey-color;
  @include md-font;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: $primary-color;
    i {
      color: #fff;
    }
  }
  i {
    color: $primary-color;
  }
}
</style>