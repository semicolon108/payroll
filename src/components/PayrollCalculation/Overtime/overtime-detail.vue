<template>
  <div>
    <div class="page-header">
      <div class="header-start">
        <div class="header-title">
          <h3>Overtime</h3>
        </div>
        <div class="button-group">
          <button @click="isUploadModal = true" class="button primary">Upload</button>
          <button @click="clearOT" class="button grey">Clear Data</button>
        </div>
      </div>
    </div>

    <div class="box">
      <div class="box-header">
        <div class="box-header-start">
          <input type="text" class="input" placeholder="Search employee">
        </div>
        <div class="box-header-end">
          <button
              class="button"
              :class="{'primary' : showAmount }"
              @click="showAmount = !showAmount">
            Show Amount (LAK)
          </button>
        </div>
      </div> <!-- Box Header -->


      <table v-if="!isLoading" class="table is-fullwidth" id="my-table">
        <thead>
        <tr>
          <th class="is-xxs">
            <span>ID</span>
          </th>
          <th>
            <span>Employee Name</span>
          </th>
          <th class="is-right">
            <span>Basic Salary</span>
          </th>
          <th class="is-xs is-right" v-for="i in rates" :key="i">
            <p>OT Rate {{ i }}</p>
          </th>
          <th class="is-sm is-right">
            <p>Total</p>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(i, idx) in emps" :key="idx">
          <td>{{ i.employeeCode }}</td>
          <td>
            {{ i.fullName }}
          </td>
          <td class="is-right">
            <p>{{ i.salary | currency }}</p>
          </td>
          <td class="is-right" v-for="(o, idx) in rates" :key="idx">

            <span>{{ getByRate(i.OTHours, o, 'hours') }}</span>
            
            <p v-if="showAmount">{{ getByRate(i.OTHours, o, 'amount') | currency }}</p>
          </td>
          <td class="is-right total">
            <p>{{i.total | currency}}</p>
          </td>
        </tr>
        </tbody>
      </table>
               <div v-else>
            <Loading v-for="n in 7" :key="n" style=" height: 60px" class="mb-3"  />
           </div>
    </div>
  <Upload v-if="isUploadModal" @CloseModal="isUploadModal = false"

  @UploadOT="isUploadModal = false; getOTByMonth()"
  />
  </div>
</template>

<script>
import Upload from './Modal/upload'
import {getOTByMonth, clearOT} from "@/apis/ot-api";
 import Loading from '@/components/Loading/SkeletonLoading'

export default {
  components: {
    Upload,
    Loading
  },
  data: () => ({
    showAmount: false,
    isUploadModal: false,
    emps: [],
    rates: [
        1.5,
        2.0,
        2.5,
        3.0,
        3.5
    ],
    isLoading: true
  }),
  computed: {
    getByRate() {
      return (OTHours, rate, type) => {
        const chosen = OTHours.find(i => i.rate === rate)
        return chosen ? chosen[type] : ''
      }
    }
  },
  methods: {
    async getOTByMonth() {
      this.emps = await getOTByMonth(this.$route.params.id)
        setTimeout(() => {
              this.isLoading = false
            }, 400)
    },
    async clearOT() {
      const isConfirmed = await this.$dialog.confirm('Sure ?')
      if(!isConfirmed) return
        
     try {
       this.$store.dispatch('loading')
        await clearOT(this.$route.params.id)
         this.$store.dispatch('completed')
        this.$router.push({...this.$route, query: { resetTotal: true }})
        this.getOTByMonth()
     } catch(e) {
        this.$store.dispatch('error')
       throw new Error(e)
     }
    },
    async downloadOTTemplate() {
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
  },
  created() {
    this.getOTByMonth()
  }
}
</script>
<style lang="scss" scoped>

.input {
  @include input;
}

.box-header {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;

  .box-header-end {
    .button {
      margin-left: 10px;

      &:focus {
        box-shadow: none;
      }

      i {
        margin-right: 5px;
      }
    }
  }
}

.total {
  font-weight: 700;
}
</style>