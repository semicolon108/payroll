<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-content box slide-down">
      <div class="header">
        <i class="fas fa-folder"></i>
        <div>
          <h3>Document Uploader</h3>
        </div>
      </div>

      <div class="upload-box">
        <div class="upload">
          <button class="button upload-btn">Select File</button>
          <span>Support .PDF .Docx .Excel .JPG .PNG. .GIF <br> Maximum file size 5mb</span>
          <input type="file" style="display: none">
        </div>
        <!-- hidden -->
        <input type="file" class="input is-hidden" ref="uploadFile">
      </div>

      <div class="files">
            <h3>Uploaded File</h3>
            <div class="file" v-for="(i , index) in 3" :key="index">
                <p>document-name.pdf</p>
                <div class="option">
                    <div class="alert slide-left" v-if="deleteFile">
                        <span @click="deleteFile = !deleteFile">Cancel</span>
                        <p class="confirm">Confirm</p>
                    </div>
                    <span v-if="!deleteFile" class="close slide-left" @click="deleteFile = true">
                        <i class="fas fa-times"></i>
                    </span>
                </div>
            </div>
        </div>

      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
  </div>
</template>

<script>

export default {
    data: () => ({
        deleteFile: false,
    }),
    methods:{
        CloseModal(){
            this.$emit('CloseModal')
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

  .files{
    h3{
        font-size: 16px;
        color: $font-color;
        margin-bottom: 10px;
        font-weight: 700;
    }
    .file{
        cursor: pointer;
        color: $font-color;
        display: flex;
        align-items: center;
        position: relative;
        padding: 5px 0;
        &:hover{
            font-weight: bold;
            color: $primary-color;
        }
        &:not(:last-child){
            margin-bottom: 5px;
        }
        .option{
            margin-left: auto;
            display: flex;
            align-items: center;
            .close{
                margin-left: auto;
                cursor: pointer;
            }
            .alert{
                display: flex;
                position: absolute;
                align-items: center;
                right: 0;
                z-index: 0;
                span{
                    cursor: pointer;
                }
                .confirm{
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