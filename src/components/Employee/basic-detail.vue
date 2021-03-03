<template>
  <div>
    <div class="form-header">
      <h3>Personal Information</h3>
      <p>Need help or have questions about adding employees? Call us at (856) 21 254709.</p>
    </div>
    <ValidationObserver slim ref="refForm">
      <div class="form">
        <div class="columns is-multiline">
          <div class="column is-12">
            <div class="field">
              <!-- <label for="" class="label">Photo</label> -->
              <div class="control upload">
                
                <div v-if="isEditMode && !file" class="photo"
                     :style="{ 'background-image': 'url(' + placeholder + ')' }"
                ></div>
                <div v-else class="photo"
                     :style="{ 'background-image': 'url(' +  profileImage + ')' }"
                ></div>

                <input
                    ref="FileInput"
                    @change="onFileChange"
                    type="file" class="input">
                <div class="upload-label">

                  <ValidationProvider name="File"  v-slot="{ errors }">
                    <input v-if="isEditMode && !file" v-model="image.src" type="text" style="display: none">
                    <input v-else v-model="file" type="text" style="display: none">
                    <p class="has-text-danger">{{ errors[0] }}</p>
                  </ValidationProvider>

                  <div>
                    <h3>Employee Photo</h3>
                    <p v-if="isEditMode">file size: {{ image.size | readSize }}</p>
                    <p v-else>
                      {{
                        file ? file.name : 'Support file .jpg .gif .png | maximum size 5mb'
                      }}</p>
                    <p v-if="file">{{ file.size | readSize }}</p>
                  </div>
                  <button class="button sub" @click="chooseFile">Add Photo</button>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Employee ID</label>
              <div class="control">
                <ValidationProvider name="Employee ID" rules="required" v-slot="{ errors }">
                  <input v-model="form.employeeCode" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">First Name</label>
              <div class="control">
                <ValidationProvider name="firstName" rules="required" v-slot="{ errors }">
                  <input v-model="form.firstName" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Last Name</label>
              <div class="control">
                <ValidationProvider name="lastName" rules="required" v-slot="{ errors }">
                  <input v-model="form.lastName" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>

          <div class="column is-4">
            <div class="field">
              <label for="" class="label">First Name (Lao)</label>
              <div class="control">
                <ValidationProvider name="firstNameLao" v-slot="{ errors }">
                  <input v-model="form.firstNameLao" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Last Name (Lao)</label>
              <div class="control">
                <ValidationProvider name="lastNameLao" v-slot="{ errors }">
                  <input v-model="form.lastNameLao" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label class="label">Gender</label>
              <div class="control switch">
                <div class="item" v-for="i in genders" :key="i._id"
                       @click="form.genderId = i._id"
                       :class="{'is-active': form.genderId === i._id}"
                >
                  <span>{{ i.name }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Date of Birth</label>
              <ValidationProvider name="Date of Birth" rules="isDateOrNull" v-slot="{ errors }">
                <DatePicker v-model="form.dateOfBirth" :defaultValue="defaultValue.dateOfBirth" class="control date"/>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Marital Status</label>
              <div class="select">
                <ValidationProvider name="Marital Status"  v-slot="{ errors }">
                  <select v-model="form.maritalStatusId" class="control select" style="width: 100%">
                    <option v-for="i in maritalStatuses" :value="i._id" :key="i._id" type="text" class="input" required>
                      {{ i.name }}
                    </option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Nationality</label>
              <div class="select">
                <ValidationProvider name="Nationality" rules="required" v-slot="{ errors }">
                  <select v-model="form.isExpat" class="control select" style="width: 100%">
                    <option :value="false" class="input">
                      Lao
                    </option>
                    <option :value="true" class="input">
                      Foreigner
                    </option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Contact Number</label>

              <div class="control">
                <ValidationProvider name="Contact Number" rules="required" v-slot="{ errors }">
                  <input v-model="form.mobile" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">ID card / Passport No.</label>
              <div class="control">
                <ValidationProvider name="ID card / Passport No." v-slot="{ errors }">
                  <input v-model="form.idCardOrPassport" type="text" class="input">
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Email</label>
              <div class="control">
                <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
                  <input v-model="form.email" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Social security ID</label>
              <div class="control toggle">
                <ValidationProvider name="Social security ID" v-slot="{ errors }">
                  <input v-model="form.ssoId" type="text" class="input"
                  :disabled="!form.isSso"
                  >
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
                <div class="sso-toggle">
                  <input v-model="form.isSso" type="checkbox" id="sso" checked>
                  <label for="sso">Use</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr>

        <h3 class="form-title">Emergency Contact</h3>
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Full Name</label>
              <div class="control">
                <ValidationProvider name="EmergencyContact Full Name"  v-slot="{ errors }">
                  <input v-model="form.emergencyContact.fullName" type="text" class="input" >
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Relationship</label>
              <div class="select">
                <ValidationProvider name="Full Name"  v-slot="{ errors }">
                  <select v-model="form.emergencyContact.relationshipId" class="control select" style="width: 100%;">
                    <option :value="null" type="text" class="input" selected>None</option>
                    <option v-for="i in relationships" :value="i._id" :key="i._id" type="text" class="input" >
                      {{ i.name }}
                    </option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Contact Number</label>
              <div class="control">
                <ValidationProvider name="EmergencyContact Contact Number 2"  v-slot="{ errors }">
                  <input v-model="form.emergencyContact.contactNumber" type="text" class="input" >
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="form-title">Bank Account</div>
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Bank Name</label>
              <div class="select">
                <ValidationProvider name="Bank Name" rules="required" v-slot="{ errors }">
                  <select v-model="form.bankAccount.bankId" class="control select" style="width: 100%;">
                    <option v-for="i in banks" :value="i._id" :key="i._id" type="text" class="input" required>
                      {{ i.name }}
                    </option>
                  </select>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Account Name</label>
              <div class="control">
                <ValidationProvider name="Account Name" rules="required" v-slot="{ errors }">
                  <input v-model="form.bankAccount.accountName" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="field">
              <label for="" class="label">Account Number</label>
              <div class="control">
                <ValidationProvider name="Account Number" rules="required" v-slot="{ errors }">
                  <input v-model="form.bankAccount.accountNumber" type="text" class="input" required>
                  <p class="has-text-danger">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
        <button v-if="isEditMode" @click="saveOnly" type="button" class="button primary">Update</button>
        <button v-else @click="saveAndContinue" type="button" class="button primary">Save and continue</button>
      </div>
    </ValidationObserver>
  </div>
</template>

<script>
import {readableBytes} from "@/utils/read-file";
import {GET_REUSES} from "@/graphql/Reuse";
import DatePicker from "@/utils/DatePicker";
import {ADD_EMPLOYEE, GET_EMPLOYEE, UPDATE_EMPLOYEE} from "@/graphql/Employee";


export default {
  components: {
    DatePicker
  },
  data: () => ({
    form: {
      isExpat: false,

      employeeCode: '',

      genderId: '',
      maritalStatusId: '',
      nationalityId: '',
      relationshipId: '',

      firstName: '',
      lastName: '',
      firstNameLao: '',
      lastNameLao: '',
      dateOfBirth: '',
      mobile: '',
      idCardOrPassport: '',
      email: '',
      ssoId: '',
      isSso: false,
      emergencyContact: {
        fullName: '',
        relationshipId: '',
        contactNumber: ''
      },
      bankAccount: {
        bankId: '',
        accountName: '',
        accountNumber: ''
      }
    },
    file: null,
    genders: [],
    maritalStatuses: [],
    nationalities: [],
    relationships: [],
    isEditMode: false,
    image: {},

    defaultValue: {
      dateOfBirth: ''
    },

    banks: []
  }),
  computed: {
    profileImage() {
      if (!this.file) return this.placeholder
      return this.$baseUrl + '/' + this.file.name
    },
    placeholder() {
      if(this.image.src) return this.image.src
      if(this.gender === 'Male') return require('../../../public/assets/img/male-avatar.png')
      return require('../../../public/assets/img/female-avatar.png')
    },
    gender() {
      const gender = this.genders.find(i => i._id === this.form.genderId)
      return gender ? gender.name : null
    }
  },
  filters: {
    readSize(num) {
      return readableBytes(num)
    }
  },
  async created() {
    await this.reuseGet('Gender', 'genders', 'genderId')
    await this.reuseGet('MaritalStatus', 'maritalStatuses', 'maritalStatusId')
    await this.reuseGet('Nationality', 'nationalities', 'nationalityId')
     await this.reuseGet('Relationship', 'relationships')
    await this.reuseGet('Bank', 'banks', 'bankAccount', 'bankId')
    if (this.$route.params.id) {
      this.isEditMode = true
      const data = await this.getEmployee(this.$route.params.id)
      this.image = data.image ? data.image : {}
      this.form = {
        employeeCode: data.employeeCode,
        firstName: data.firstName,
        lastName: data.lastName,
        firstNameLao: data.firstNameLao,
        lastNameLao: data.lastNameLao,
        dateOfBirth: data.dateOfBirth,
        mobile: data.mobile,
        idCardOrPassport: data.idCardOrPassport,
        email: data.email,
        ssoId: data.ssoId,
        isSso: data.isSso,
        emergencyContact: {
          fullName: data.emergencyContact.fullName,
          contactNumber: data.emergencyContact.contactNumber,
          relationshipId: data.emergencyContact.relationshipId
        },
        bankAccount: {
          bankId: data.bankAccount.bankId,
          accountName: data.bankAccount.accountName,
          accountNumber: data.bankAccount.accountNumber
        },
        genderId: data.genderId,
        maritalStatusId: data.maritalStatusId,
        nationalityId: data.nationalityId,
        isExpat: data.isExpat
      }
      this.defaultValue.dateOfBirth = this.form.dateOfBirth
    } else {
      this.form = {
        ...this.form, ...{
          genderId: this.form.genderId,
          maritalStatusId: this.form.maritalStatusId,
          nationalityId: this.form.nationalityId,

          // firstName: "Phongvilai 55",
          // lastName: "NOYPHA",
          // dateOfBirth: null,
          // contactName: "Bounlath",
          // idCardOrPassport: "2343434343643346",
          // email: "toto@gmail.com",
          // ssoId: "P000822",
          // isSso: true,
          // emergencyContact: {
          //   fullName: "Phongvilai Toto",
          //   relationshipId: this.form.emergencyContact.relationshipId,
          //   contactNumber: "23443"
          // },
          // bankAccount: {
          //   bankName: "BCEL",
          //   accountName: "Phongvilai toto",
          //   accountNumber: "00990983282930"
          // }
        }
      }
    }
  },
  watch: {
    'form.isSso'(val) {
      if(!val) this.form.ssoId = null
    }
  },
  
  methods: {
    async uploadImage(file) {
      try {
        const formData = new FormData()
        formData.append('imageFile', file)
        const res = await this.$axios.post('upload-image', formData)
        this.file = res.data.file
      } catch (err) {
        throw new Error(err)
      }
    },
    async reuseGet(type, arr, selected, nestedSelected) {
      try {
        const res = await this.$apollo.query({
          query: GET_REUSES,
          variables: {
            type
          }
        })
        this[arr] = res.data.getReuses
        if (nestedSelected)  this.form[selected][nestedSelected] = this[arr][0]._id
        else this.form[selected] = this[arr][0]._id
      } catch (err) {
        throw new Error(err)
      }
    },
    async addEmployee() {
      try {
        await this.$store.dispatch('loading')
        const res = await this.$apollo.mutate({
          mutation: ADD_EMPLOYEE,
          variables: {
            employeeCode: this.form.employeeCode,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            firstNameLao: this.form.firstNameLao,
            lastNameLao: this.form.lastNameLao,
            dateOfBirth: this.form.dateOfBirth,
            mobile: this.form.mobile,
            idCardOrPassport: this.form.idCardOrPassport,
            email: this.form.email,
            ssoId: this.form.ssoId,
            isSso: this.form.isSso,
            emergencyContact: {
              fullName: this.form.emergencyContact.fullName,
              contactNumber: this.form.emergencyContact.contactNumber,
              relationshipId: this.form.emergencyContact.relationshipId
            },
            bankAccount: {
              bankId: this.form.bankAccount.bankId,
              accountName: this.form.bankAccount.accountName,
              accountNumber: this.form.bankAccount.accountNumber
            },
            genderId: this.form.genderId,
            maritalStatusId: this.form.maritalStatusId,
            nationalityId: this.form.nationalityId,
            image: this.file ? this.file : undefined,

            isExpat: this.form.isExpat
          }
        })
        await this.$store.dispatch('completed')
        await this.$router.push({name: 'edit_basic_detail', params: {id: res.data.addEmployee._id}})
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async updateEmployee() {
      try {
        await this.$store.dispatch('loading')
        await this.$apollo.mutate({
          mutation: UPDATE_EMPLOYEE,
          variables: {
            employeeId: this.$route.params.id,
            employeeCode: this.form.employeeCode,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            firstNameLao: this.form.firstNameLao,
            lastNameLao: this.form.lastNameLao,
            dateOfBirth: this.form.dateOfBirth,
            mobile: this.form.mobile,
            idCardOrPassport: this.form.idCardOrPassport,
            email: this.form.email,
            ssoId: this.form.ssoId,
            isSso: this.form.isSso,
            emergencyContact: {
              fullName: this.form.emergencyContact.fullName,
              contactNumber: this.form.emergencyContact.contactNumber,
              relationshipId: this.form.emergencyContact.relationshipId
            },
            bankAccount: {
              bankId: this.form.bankAccount.bankId,
              accountName: this.form.bankAccount.accountName,
              accountNumber: this.form.bankAccount.accountNumber
            },
            genderId: this.form.genderId,
            maritalStatusId: this.form.maritalStatusId,
            nationalityId: this.form.nationalityId,
            image: this.file ? this.file : undefined,

            isExpat: this.form.isExpat
          }
        })

        await this.$store.dispatch('completed')

      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
    async saveAndContinue() {
      const isValid = await this.$refs.refForm.validate()
      if(!isValid) return
      if(this.isEditMode)  {
        await this.updateEmployee()
        await this.$router.push({ name: 'hiring_detail', params: {id: this.$route.params.id} })
      }else {
        await this.addEmployee()
        await this.$router.push({ name: 'hiring_detail', params: {id: this.$route.params.id} })
      }
    },
    async saveOnly() {
      const isValid = await this.$refs.refForm.validate()
      if(!isValid) return
      if(this.isEditMode)  {
        await this.updateEmployee()
      }else {
        await this.addEmployee()
      }
    },
    async getEmployee(employeeId) {
      try {
        const res = await this.$apollo.query({
          query: GET_EMPLOYEE,
          variables: {
            employeeId
          }
        })
        return res.data.getEmployee
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
      if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
        await this.uploadImage(file)
      } else {
        alert('Not Image')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .photo {
    border: 1px solid $border-color;
    min-width: 150px;
    min-height: 150px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    margin-right: 10px;
  }
  .upload-label {
    margin-left: 10px;

    h3 {
      font-weight: 700;
    }

    p {
      font-size: 14px;
      margin-bottom: 10px;
    }

  }

  .input {
    display: none;
  }
}

.toggle {
  display: flex;
}

.sso-toggle {
  margin-left: 10px;
  display: flex;
  label {
    position: relative;
    display: flex;
    align-items: center;
    &::before {
      margin-right: 5px;
      cursor: pointer;
      content: '';
      display: block;
      width: 20px;
      height: 20px;
      border: 1px solid $border-color;
      background-color: $placeholder-color;
    }
  }

  input {
    display: none;
    cursor: pointer;
    position: relative;
    &:checked ~ label::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 17px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
      transform: rotate(45deg);
    }
    &:checked ~ label::before {
      background-color: $primary-color;
    }
  }
}
</style>