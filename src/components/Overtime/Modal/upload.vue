<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseModal"></div>
    <div class="modal-content box slide-down">
      <div class="header">
        <i class="fas fa-folder"></i>
        <div>
          <h3>Upload Overtime</h3>
          <p>Please download to fill Overtime information</p>
          <a
              @click="downloadTemplate" class="template-file"><i class="fas fa-file-excel"></i>Excel Template</a>
        </div>
      </div>

      <div class="upload-box">
        <div class="upload">
          <button class="button upload-btn" @click="$refs.FileInput.click()">Select File</button>
          <span>File support Excel</span>
          <input @change="chooseFile" ref="FileInput" type="file" style="display: none">
        </div>

        <!-- hidden -->
        <input type="file" class="input is-hidden" ref="uploadFile">
      </div>
      <button class="button save-file">Save</button>
      <button class="modal-close is-large" @click="CloseModal" aria-label="close"></button>
    </div>
    <Checker
        @CloseModal="isChecker = false; CloseModal()"
        @DataBack="dataBack"
        @ReUpload="$refs.FileInput.click()"
        v-if="isChecker" :data="data"/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import XLSX from 'xlsx'
import {uploadDeductible} from "@/apis/monthly-payment-employee";
import Checker from '@coms/Deductible/Modal/checker.vue'

export default {
  components: {
    Checker
  },
  data: () => ({
    data: [],
    isChecker: false,
  }),
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    CloseModal() {
      this.$emit('CloseModal')
    },
    async downloadTemplate() {
      this.$axios.defaults.headers['Authorization'] = this.getToken
      const res = await this.$axios.post(this.$api + 'download-deductable-template', null, {
        responseType: 'blob'
      })
      const url = URL.createObjectURL(new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'deductable-template.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    async chooseFile($file) {
      const file = $file.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        workbook.SheetNames.map(async (sheetName) => {
          const xlRowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          const jsonObject = JSON.stringify(xlRowObject);
          const parseJson = JSON.parse(jsonObject)
          if(!parseJson.length) return alert('Empty')
          if (parseJson.length) {
            const mapKey = parseJson.map(i => {
              return {
                employeeCode: i.EmployeeCode,
                type: i.Type,
                amount: i.Amount
              }
            })
            try {
              const data = await uploadDeductible(mapKey)
              this.data = {
                items: data.items,
                total: data.total,
                totalError: data.totalError
              }
              this.isChecker = true
            } catch (err) {
              const errorType = err.graphQLErrors[0].extensions.validationErrors
              if (errorType.typeErrors.length) {
                this.data = {
                  items: errorType.typeErrors,
                  total: errorType.total,
                  totalError: errorType.totalError,
                  isTypeError: true
                }
              } else if (errorType.employeeErrors.length) {
                this.data = {
                  items: errorType.employeeErrors,
                  total: errorType.total,
                  totalError: errorType.totalError,
                  isEmployeeError: true
                }
              }
              this.isChecker = true
            }
          }
        })
      }
      reader.onerror = (ex) => {
        alert(ex)
      }
      reader.readAsBinaryString(file)
      this.$refs.FileInput.value = null
    },
    dataBack(items) {
      this.$emit('DataBack', items)
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