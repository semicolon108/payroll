<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card slide-down">
      <div class="modal-card-head">
        <h3>Upload Salary</h3>
        <p>Please download template</p>
        
        <a 
         @click="downloadTemplate" 
       
        class="template-file"><i class="fas fa-file-excel"></i>Excel Template</a>
        <button
          class="modal-close is-large"
          @click="closeModal"
          aria-label="close"
        ></button>

    <select name="" id="" v-model="type">
      <option value="Set">Set</option>
       <option value="Increase">Increase</option>
        <option value="Decrease">Decrease</option>
    </select>
      </div>
      <section class="modal-card-body">
        <div class="upload-box">
          <div class="upload">
            <button class="button upload-btn" @click="$refs.FileInput.click()">
              Select File
            </button>
            <span>File support Excel</span>
            <input
              @change="chooseFile"
              ref="FileInput"
              type="file"
              style="display: none"
            />
          </div>
          <!-- hidden -->
          <input type="file" class="input is-hidden" ref="uploadFile" />
        </div>
      </section>
      <div class="modal-card-foot">
        <button class="button primary">Save</button>
      </div>
    </div>
    <Checker
      @closeModal="
        isChecker = false;
        closeModal();
      "

      :type="type"

      @reUpload="$refs.FileInput.click()"
      v-if="isChecker"
      :data="data"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import XLSX from "xlsx"
 import { uploadEmployeesSalaryApi } from "@/apis/upload-api"
import Checker from "@coms/Upload/checker.vue"


export default {
  components: {
    Checker
  },
  data: () => ({
    data: [],
    isChecker: false,
    type: 'Set'//Set, Increase, Decrease
  }),
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    closeModal() {
      this.$emit("closeModal")
    },
    async downloadTemplate() {
      try {
        await this.$store.dispatch("loading");
        this.$axios.defaults.headers["Authorization"] = this.getToken;
        const res = await this.$axios.post(
          this.$api + "/download-salary-template",
          {
            monthlyPaymentId: this.$route.params.id
          }, 
          {
            responseType: 'blob'
          }
        );
        const url = URL.createObjectURL(
          new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "salary-template.xlsx");
        document.body.appendChild(link);
        link.click();
        await this.$store.dispatch("completed")
      } catch (err) {
        await this.$store.dispatch("error")
        throw new Error(err);
      }
    },
    async chooseFile($file) {
      const file = $file.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
        });
        workbook.SheetNames.map(async (sheetName, index) => {
          if (index > 0) return;
          const xlRowObject = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          const jsonObject = JSON.stringify(xlRowObject);
          const parseJson = JSON.parse(jsonObject);

          if (!parseJson.length) return alert("Empty");
          if (parseJson.length) {

            const items = []
     
            parseJson.map((i) => {

              const keys = Object.keys(i)

              const keysFiltered = keys.filter(o => o !== 'Employee Code' && o !== 'Full Name')
              
               keysFiltered.map(() => {
                const item = {
                  employeeCode: i['Employee Code'],
                  amount: i['Amount'],
                  //.toFixed(2)
                }
                items.push(item)
              })
    
            })

            const form = {
              condition: 'Check',
              type: this.type,
              employees: items
            }

            try {
              await this.$store.dispatch("loading")
              await uploadEmployeesSalaryApi(form)
              await this.$store.dispatch("completed")

            //  console.log(form)
              this.data = {
                items: form.employees,
                total: form.employees.length,
                totalError: 0,
              }

              this.isChecker = true
            } catch (err) {
             await this.$store.dispatch("error");
              const errorType =
                err.graphQLErrors[0].extensions.validationErrors;

                this.data = {
                  items: errorType,
                  total: form.employees.length,
                  totalError: errorType.length,
                
                }
              // if (errorType.typeErrors.length) {
              //   // this.data = {
              //   //   items: errorType.typeErrors,
              //   //   total: errorType.total,
              //   //   totalError: errorType.totalError,
              //   //   isTypeError: true,
              //   // };
              // } else if (errorType.employeeErrors.length) {
              //   this.data = {
              //     items: errorType.employeeErrors,
              //     total: errorType.total,
              //     totalError: errorType.totalError,
              //     isEmployeeError: true,
              //   };
              // }
              this.isChecker = true;
            }
          }
        });
      };
      reader.onerror = (ex) => {
        alert(ex);
      };
      reader.readAsBinaryString(file);
      this.$refs.FileInput.value = null;
    },
    // dataBack(items) {
    //   this.$emit("DataBack", items);
    // }
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