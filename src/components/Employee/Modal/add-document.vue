<template>
  <div class="modal" :class="{'is-active' : modalClick === true}">
    <div class="modal-background" @click="CloseModal()"></div>
    <div class="modal-content box">
      <div class="header">
        <i class="fas fa-folder"></i>
        <div>
          <h3>Upload your document</h3>
          <p>Please select file to upload</p>
        </div>
      </div>

      <div class="upload-box">
        <div class="upload">
          <button class="button upload-btn" @click="chooseFile">Select File</button>
          <span v-if="file">{{file.name}}</span>
          <span v-else>File support PDF, DOC, DOCX</span>
        </div>

        <!-- hidden -->
        <input @change="onFileChange" type="file" class="input is-hidden" ref="FileInput">
      </div>

      <div class="field">
        <label for="" class="label">File Name</label>
        <div class="control">
          <input v-model="name" type="text" class="input">
        </div>
      </div>
      <button @click="addDocument" class="button save-file">Save</button>
      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>
import {addDocument} from "@/apis/document-api";

export default {
  props: [
    'modalClick'
  ],
  data: () => ({
    name: '',
    file: null
  }),
  methods: {
    CloseModal() {
      this.$emit('CloseModal', 'false')
    },
    Upload() {
      this.$refs.uploadFile.click()
    },
    async addDocument() {
      const form = {
        employeeId: this.$route.params.id,
        name: this.name,
        fileInput: this.file
      }
      const item = await addDocument(form)
      this.$emit('PushItem', item)
      this.CloseModal()
    },
    async uploadImage(file) {
      try {
        const formData = new FormData()
        formData.append('imageFile', file)
        const res = await this.$axios.post('upload-document', formData)
        this.file = res.data.file
      } catch (err) {
        throw new Error(err)
      }
    },
    chooseFile() {
      this.$refs.FileInput.click()
    },
    async onFileChange($event) {
      const file = $event.target.files[0];
      const extension = file.name.split('.').pop();
      if (extension === 'pdf' || extension === 'doc' || extension === 'docx') {
        await this.uploadImage(file)
      } else {
        alert('Not Image')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-content {
  border-radius: 0;
  position: relative;
  padding: 40px;
  color: $font-color;

  .header {
    i {
      font-size: 30px;
      margin-bottom: 20px;
      color: $sub-color;
    }

    h3 {
      font-size: 24px;
      font-weight: 700;
      color: $font-color;
    }

    p {
      color: $font-color;
    }
  }

  .field {
    margin-bottom: 20px;

    label {
      color: $font-color;
      font-weight: normal;
    }

    input {
      @include input;
    }
  }

  .upload-box {
    margin: 20px 0;
    width: 100%;
    height: 150px;
    border: 2px dashed $border-color;
    display: flex;
    justify-content: center;

    .upload {
      display: flex;
      align-items: center;

      .upload-btn {
        border-radius: 0;
        background-color: $border-color;
        color: $font-color;
        border: none;

        &:focus {
          border: none;
        }
      }

      span {
        font-size: 14px;
        margin-left: 10px;
      }
    }
  }

  .save-file {
    border-radius: 0;
    background-color: $primary-color;
    border-color: $primary-color;
    color: #fff;
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  z-index: 1;
  height: 40px;
  max-height: 40px;
  max-width: 40px;
  min-height: 40px;
  min-width: 40px;
  width: 40px;

  &:hover {
    background-color: $border-color;
  }

  &::after {
    background-color: $grey-color;
  }

  &::before {
    background-color: $grey-color;
  }
}
</style>