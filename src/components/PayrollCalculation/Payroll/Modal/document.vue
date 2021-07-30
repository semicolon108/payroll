<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-content slide-down box" :class="{'before-close' : BeforeClose}">
      <div class="header">
        <h3>Document Uploader</h3>
      </div>

      <div class="upload-box">
        <div class="upload">
          <button @click="$refs.fileInput.click()" class="button upload-btn">Select File</button>
          <span>Support .PDF .DOCX .XLSX <br> Maximum file size 5mb</span>
          <input type="file" style="display: none">
        </div>
        <!-- hidden -->
        <input
            @change="chooseFile"
            type="file" class="input is-hidden" ref="fileInput">
      </div>

      <!-- <div class="files">
        <h3>Uploaded File</h3>
        <div class="file" v-for="(i , index) in items" :key="index">
          <a download :href="i.fileId.src">{{ i.name }}</a>
          <div class="option">
            <div class="alert slide-left" v-if="i.isDeleteMode">
              <span @click="i.isDeleteMode = !i.isDeleteMode">Cancel</span>
              <p @click="deleteMonthlyDoc(i._id)" class="confirm">Confirm</p>
            </div>
            <span v-if="!i.isDeleteMode" class="close slide-left" @click="i.isDeleteMode = true">
                  <i class="fas fa-times"></i>
              </span>
          </div>
        </div>
      </div> -->

      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>

import {addMonthlyDocument, deleteMonthlyDocument, getMonthlyDocuments} from "@/apis/monthly-document-api";

export default {
  data: () => ({
    deleteFile: false,
    items: [],
    BeforeClose : false
  }),
  created() {
    this.getMonthlyDocs()
  },
  methods: {
    CloseModal() {
      this.BeforeClose = true
      setTimeout(()=> this.$emit('CloseModal') , 120)
    },
    async getMonthlyDocs() {
      this.items = await getMonthlyDocuments(this.$route.params.id)
      this.items = this.items.map(i => {
        return {
          ...i,
          isDeleteMode: false
        }
      })
    },
    async chooseFile($event) {
      const file = $event.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$axios.post('upload-document', formData)
      this.$refs.fileInput.value = null
      const fileInput = res.data.file
      await this.addMonthlyDoc(file.name, fileInput)
    },
    async addMonthlyDoc(name, fileInput) {
      const form = {
        monthlyPaymentId: this.$route.params.id,
        name,
        fileInput
      }
      try {
        await this.$store.dispatch('loading')
        const data = await addMonthlyDocument(form)
        await this.$store.dispatch('completed')
        this.items.push(data)
        this.items = this.items.map(i => {
          return {
            ...i,
            isDeleteMode: false
          }
        })
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }

    },
    async deleteMonthlyDoc(id) {
      try {
        await this.$store.dispatch('loading')
        await deleteMonthlyDocument(id)
        await this.$store.dispatch('completed')
        const curIdx = this.items.findIndex(i => i._id === id)
        this.items.splice(curIdx, 1)
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-content {
  border-radius: 0;
  position: relative;
  padding: 40px;
  color: $font-color;
  overflow: hidden;
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

    .template-file {
      display: inline-block;
      margin-top: 10px;
      padding: 5px 10px;
      background-color: $sub-color;
      color: #fff;
      cursor: pointer;
      font-size: 14px;

      i {
        color: #fff;
        font-size: 14px;
        margin: 0 5px 0 0;
      }
    }
  }

  .field {
    margin-bottom: 20px;

    label {
      color: $font-color;
      font-weight: normal;
    }

    input {
      box-shadow: none;
      box-shadow: unset;
      border-radius: 0;
      border-color: $border-color;

      &:focus {
        border-color: $sub-color;
      }
    }
  }

  .upload-box {
    margin: 20px 0;
    width: 100%;
    height: 150px;
    border: 2px dashed $primary-color;
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

  .files {
    h3 {
      font-size: 16px;
      color: $font-color;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .file {
      cursor: pointer;
      color: $font-color;
      display: flex;
      align-items: center;
      position: relative;
      padding: 5px 0;

      &:hover {
        font-weight: bold;
        color: $primary-color;
      }

      &:not(:last-child) {
        margin-bottom: 5px;
      }

      .option {
        margin-left: auto;
        display: flex;
        align-items: center;

        .close {
          margin-left: auto;
          cursor: pointer;
        }

        .alert {
          display: flex;
          position: absolute;
          align-items: center;
          right: 0;
          z-index: 0;

          span {
            cursor: pointer;
          }

          .confirm {
            margin-left: 10px;
            padding: 4px 8px;
            background-color: $alert-color;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
          }
        }
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
  top: 0;
  right: 0;
  z-index: 1;
  height: 40px;
  max-height: 40px;
  max-width: 40px;
  min-height: 40px;
  min-width: 40px;
  width: 40px;
  border-radius: 0 0 0 5px;
  background-color: $border-color;
  &::after {
    background-color: $grey-color;
  }
  &::before {
    background-color: $grey-color;
  }
}




.before-close{
  animation-name: before-close;
}
@keyframes before-close {
  0%{
    transform: translateY(0);
  }
  100%{
    transform: translateY(-100px);
  }
}
</style>