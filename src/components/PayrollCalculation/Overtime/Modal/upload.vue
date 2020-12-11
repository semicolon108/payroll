<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card slide-down">
      <div class="modal-card-head">
          <h3>Upload OT</h3>
          <p>Please download to fill earning / deduction information</p>
          <a @click="downloadTemplate" class="template-file"><i class="fas fa-file-excel"></i>Excel Template</a>
          <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
      </div>
      <section class="modal-card-body">
        <div class="upload-box">
          <div class="upload">
            <button class="button upload-btn" @click="$refs.FileInput.click()">Select File</button>
            <span v-if="!hasFile">File support Excel</span>
            <span v-else>Choosen</span>
            <input @change="chooseFile" ref="FileInput" type="file" style="display: none">
          </div>

          <!-- hidden -->
          <input type="file" class="input is-hidden" ref="uploadFile">
        </div>
      </section>
      <div class="modal-card-foot">
        <button @click="uploadOT" class="button primary">Save</button>
      </div>
    </div>
    <!--    <div @click="items = []" v-if="items.length" style="position: fixed; bottom: 0; left: 0; right: 0; top: 0; background-color: #fff">-->
    <!--      <table>-->
    <!--        <thead>-->
    <!--        <tr>-->
    <!--          <th>Column</th>-->
    <!--          <th>Employee Code</th>-->
    <!--          <th>Type</th>-->
    <!--          <th>Amount</th>-->
    <!--        </tr>-->
    <!--        </thead>-->
    <!--        <tbody>-->
    <!--        <tr  v-for="(i, idx) in items" :key="idx">-->
    <!--          <td style="width: 100px">{{ i.column }}</td>-->
    <!--          <td style="width: 200px">{{ i.employeeCode }}</td>-->
    <!--          <td style="width: 150px">{{ i.earnDeductName }}</td>-->
    <!--          <td style="width: 100px">{{ i.amount }}</td>-->
    <!--        </tr>-->
    <!--        </tbody>-->
    <!--      </table>-->
    <!--    </div>-->
<!--    <Checker-->
<!--        @CloseModal="isChecker = false; CloseModal()"-->
<!--        @DataBack="dataBack"-->
<!--        @ReUpload="$refs.FileInput.click()"-->
<!--        v-if="isChecker" :data="data"/>-->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import XLSX from 'xlsx'
//import Checker from '@coms/PayrollCalculation/Deductible/Modal/checker.vue'
import {uploadOT} from "@/apis/ot-api";

export default {
  components: {
    //Checker
  },
  data: () => ({
    data: [],
    isChecker: false,
    form: {},
    hasFile: false
  }),
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    closeModal() {
      this.$emit('CloseModal')
    },
    async downloadTemplate() {
      try {
        await this.$store.dispatch('loading')
        this.$axios.defaults.headers['Authorization'] = this.getToken
        const res = await this.$axios.post(this.$api + 'download-ot-template', null, {
          responseType: 'blob'
        })
        const url = URL.createObjectURL(new Blob([res.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'ot-template.xlsx')
        document.body.appendChild(link)
        link.click()
        await this.$store.dispatch('completed')
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async uploadOT() {
      try {
          this.$store.dispatch('loading')
      await uploadOT(this.form)
       this.$store.dispatch('completed')
      this.$router.push({...this.$route, query: { resetTotal: true }})
      this.$emit('UploadOT')
      } catch(e) {
         this.$store.dispatch('error')
        throw new Error(e)
      }
    },
    async chooseFile($file) {
      const file = $file.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        workbook.SheetNames.map(async (sheetName, index) => {
          if(index > 0) return
          const xlRowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          const jsonObject = JSON.stringify(xlRowObject);
          const parseJson = JSON.parse(jsonObject)

          if(!parseJson.length) return alert('Empty')
          if (parseJson.length) {
           const items = parseJson.map(i => {
              const objToArr = Object.entries(i).map(([rate, hours]) => ({rate: parseFloat(rate), hours}));
              const filter = objToArr.filter((_, idx) => idx !== 0)
              return {
                employeeCode: i['Employee Code'].split("'").pop(),
                OTHours: filter
              }
            })

            const form = {
              monthlyPaymentId: this.$route.params.id,
              items
            }
                  

           this.form = form
            this.hasFile = true

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

  .template-file {
    display: inline-block;
    margin-top: 10px;
    padding: 5px 10px;
    background-color: $sub-color;
    color: #fff;
    cursor: pointer;
    i {
      color: #fff;
      margin: 0 5px 0 0;
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
</style>