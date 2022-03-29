<template>
  <div class="container">
    <!-- <div class="tips">
            <span>Payslip is sending in background you can close this windows</span>
            <i class="fal fa-times-circle"></i>
        </div> -->
    <div class="page-header no-border no-padding margin-bottom-20">
      <div class="header-start">
        <div class="header-title">
          <h3>Payslip</h3>
        </div>
      </div>
      <div class="header-end">
        <!-- <div class="completed-count">
                    <h3>Sent completed</h3>
                    <ul>
                        <li>20</li>
                        <li>of</li>
                        <li>30</li>
                    </ul>
                </div> -->
        <button
          class="button primary"
          :class="{ 'bulk-sending': bulkSending }"
          @click="sendPayslipByEmps"
        >
          <span><i class="fal fa-paper-plane"></i></span>
          <span><i class="fas fa-plane"></i></span>
          <span>Send Bulk Payslip</span>
          <span>Sending</span>
        </button>
      </div>
    </div>

    <div class="box">
      <div class="table-container">
        <table class="table is-fullwidth" id="my-table">
          <thead>
            <tr>
              <th class="is-xxs">Employee ID</th>
              <th>Employee name</th>
              <th class="is-sm">Net pay</th>
              <!-- <th class="is-md">Email</th> -->
              <!-- <th class="is-xs">Contact number</th> -->
              <th class="is-xxs is-right">Status</th>
              <th class="is-sm is-right">Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in items" :key="i._id">
              <td>{{ i.employeeCode }}</td>
              <td>{{ i.fullName }}</td>
              <td>{{ i.finalNetPay | currency }}</td>
              <!-- <td>{{i.email}}</td> -->
              <!-- <td>{{i.mobile}}</td> -->
              <td class="is-right">
                {{
                  i.isPayslipSent
                    ? "Sent"
                    : i.isRequestSent
                    ? "Pending"
                    : "Unsend"
                }}
              </td>
              <td class="is-right">
                <ul class="option">
                  <li @click="downloadPayslip(i.employeeId)">Preview</li>
                  <!-- <li>|</li>
                                    <li :class="{'sending' : sending}">
                                        <span @click="sending = true">Send</span>
                                        <span></span>
                                    </li> -->
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <component :is="modal" @Close="CloseModal"></component>
  </div>
</template>

<script>
import { getPayrollByEmps } from "@/apis/payroll-api";
import confirm from "./Modal/confirm.vue";
import { mapGetters } from "vuex";
import { sendPayslipByEmps } from "@/apis/payroll-api";

//import moment from 'moment'
export default {
  components: {
    confirm,
  },
  data: () => ({
    sending: false,
    bulkSending: false,
    modal: "",
    payrollEmps: {},
    items: [],
    isLoading: true,
  }),
  created() {
    this.getPayrollByEmps();
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    async sendPayslipByEmps() {
      const isConfirmed = await this.$dialog.confirm();
      if (isConfirmed) {
        this.bulkSending = true;

        const mappedEmps = this.items.map((i) => i.employeeId);

        await this.$store.dispatch("loading");

        const form = {
          monthlyPaymentId: this.$route.params.id,
          employeeIds: mappedEmps,
        };

        await sendPayslipByEmps(form);

        this.getPayrollByEmps();

        await setTimeout(async () => {
          await this.$store.dispatch("stopLoading");

          this.bulkSending = false;
        }, 1800);
      }
    },
    async getPayrollByEmps() {
      this.payrollEmps = await getPayrollByEmps(this.$route.params.id);
      this.items = this.payrollEmps.employees;
      //.map(i => {
      // const filtered = i.customFormulas.filter(o => !o.isFinalNetPay)

      // const customFormula = {}
      // for(let n=0; n < filtered.length; n++) {
      //     customFormula[filtered[n].key] = parseInt(filtered[n].value, 10)
      // }
      //     return {
      //     ...i,
      //     ...customFormula,
      //     isActive: false,
      //     isEditMode: false,
      //     startWorkingDate: moment(i.startWorkingDate).locale('lo').format('DD-MM-YYYY')
      //     }
      // })

      setTimeout(() => {
        this.isLoading = false;
      }, 400);
    },
    async downloadPayslip(id) {
      try {
        await this.$store.dispatch("loading");
        this.$axios.defaults.headers["Authorization"] = this.getToken;
        const res = await this.$axios.post(
          `${this.$api}download-payslip/${this.$route.params.id}/${id}`,
          null,
          {
            responseType: "blob",
          }
        );
        const url = URL.createObjectURL(
          new Blob([res.data], {
            type: "application/pdf",
          })
        );
        const link = window.document.createElement("a"); // window was root
        link.href = url;
        link.setAttribute("download", `Payslip-Preview.pdf`);
        window.document.body.appendChild(link);
        link.click();
        await this.$store.dispatch("completed");
      } catch (e) {
        throw new Error(e);
      }
    },
    bulkSend() {
      this.modal = "confirm";
    },
    CloseModal() {
      this.modal = "";
      (this.bulkSending = true), (this.sending = true);
    },
  },
};
</script>

<style lang="scss" scoped>
.tips {
  position: absolute;
  width: 100%;
  background-color: $warning-color;
  z-index: 1;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  transition: all ease 0.2s;
  p {
    margin: 0;
    line-height: 1;
  }
  i {
    cursor: pointer;
    font-size: 20px;
    margin: 0;
  }
}

.header-end {
  display: flex;
  align-items: center;
  .completed-count {
    display: flex;
    h3 {
      margin: 0 10px 0 0;
      font-size: 16px;
      font-weight: 500;
    }
    ul {
      display: flex;
      align-items: center;
      margin: 0;
      li {
        font-size: 16px;
        list-style-type: none;
        margin: 0;
        line-height: 1;
        padding: 0 3px;
        &:nth-child(1) {
          font-weight: 700;
          cursor: pointer;
          color: $primary-color;
        }
        &:nth-child(3) {
          font-weight: 700;
          cursor: pointer;
        }
      }
    }
  } // completed count
  button.button {
    transition: ease 0.2s;
    overflow: hidden;
    span:nth-child(2),
    :nth-child(4) {
      display: none;
    }
    &.bulk-sending {
      background-color: $dark-primary-color;
      background-size: 400% 400%;
      border: 1px solid $dark-primary-color;
      transition: ease 0.1s;
      animation: gradient 0.1s ease infinite;
      span {
        text-align: center;
        i {
          text-align: center;
          margin-right: 15px;
        }
        &:nth-child(1) {
          display: none;
        }
        &:nth-child(2) {
          margin: 0;
          padding: 0;
          display: block;
          position: relative;
          right: -10px;
          animation: send-left 1s;
          &:after {
            animation: sends 0.5s infinite;
            content: "";
            display: block;
            width: 6px;
            height: 1px;
            position: absolute;
            bottom: 4px;
            left: -12px;
            box-shadow: 5px -2px 0 white, 3px -6px 0 white, 2px -10px 0 white,
              4px -14px 0 white;
          }
          @keyframes sends {
            10% {
              transform: translateX(2px);
              box-shadow: -2px -2px 0 white, -1px -6px 0 white,
                -2px -10px 0 white, -1px -14px 0 white;
            }
            50% {
              transform: translateX(-1px);
            }
            100% {
              transform: translateX(0);
            }
          }
        }
        &:nth-child(3) {
          display: none;
        }
        &:nth-child(4) {
          overflow: hidden;
          display: block;
          animation: send-right 1s;
        }
      }
    } // bulk sending
  }
}
.table-container {
  overflow: hidden;
}
ul.option {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  li {
    list-style-type: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    &:nth-child(1) {
      color: $sub-color;
    }
    &:nth-child(2) {
      margin: 0 10px;
    }
    &:nth-child(3) {
      color: $primary-color;
      position: relative;
    }
    &.sending {
      span:first-child {
        display: none;
      }
      span:last-child {
        animation: spinAround 0.5s infinite linear;
        border: 2px solid #dbdbdb;
        border-radius: 9999px;
        border-right-color: transparent;
        border-top-color: transparent;
        content: "";
        display: block;
        height: 1em;
        position: relative;
        width: 1em;
      }
    }
  }
}

@keyframes send-right {
  from {
    transform: translateX(30px);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes send-left {
  from {
    transform: translateX(-30px);
  }
  to {
    transform: translateX(0);
  }
}
</style>