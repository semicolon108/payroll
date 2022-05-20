<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card slide-down">
      <header class="modal-card-head">
        <h3>Adjustment Histories</h3>
        <button class="modal-close is-large" @click="closeModal"></button>
      </header>

      <div class="modal-card-body">
        <ul class="header">
          <li>
            <span>Date</span>
            <span>Document</span>
            <span>Salary (LAK)</span>
          </li>
        </ul>
        <ul class="detail">
          <li v-for="(i, index) in 3" :key="index">
            <span>30 / May / 2022</span>
            <span><i class="fa-light fa-file-pdf"></i></span>
            <span>14,000,000</span>
          </li>
        </ul>
      </div>

      <!-- <section class="modal-card-body">
        <table class="table is-fullwidth" id="my-table">
          <thead>
            <tr>
              <th v-for="(i, idx) in headers" :key="idx">{{ i.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(i, idx) in salaryHistories" :key="idx">
              <td
                v-for="(h, idx) in headers"
                :key="idx"
                :class="{
                  'has-text-info':
                    i.type !== 'Increase' && i.type !== 'Decrease',
                }"
              >
                {{ i[h.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </section> -->
    </div>
  </div>
</template>

<script>
import { getHirringDetail } from "@/apis/hirring-detail-api";
import { getReuse } from "@/apis/reuse-api";
import moment from "moment";

export default {
  data: () => ({
    hiringDetail: {},
    form: {
      type: "Increase",
    },

    headers: [
      {
        key: "type",
        name: "Type",
      },
      {
        key: "refDate",
        name: "Reference Date",
      },
      {
        key: "adjustmentAmount",
        name: "Amount",
      },
      {
        key: "beforeAdjustment",
        name: "Before Adjustment",
      },
      {
        key: "afterAdjustment",
        name: "After Adjustment",
      },
      {
        key: "memo",
        name: "Memo",
      },
    ],
    salaryHistories: [],
    currencies: [],
  }),
  methods: {
    closeModal() {
      this.$emit("CloseModal");
    },
    currencyName(currencyId) {
      if (!currencyId) return;
      const obj = this.currencies.find((i) => i._id === currencyId);
      return obj ? obj.name.split("|").pop() : "";
    },

    async getHiringDetail() {
      const data = await getHirringDetail(this.$route.params.id);
      this.salaryHistories = data.salaryHistories;
      this.hiringDetail = {
        ...data,
        workPermit: {
          startDate: data.workPermit.startDate,
          endDate: data.workPermit.endDate,
          daysOfNotify: data.workPermit.daysOfNotify,
        },
      };
      this.salaryHistories = this.salaryHistories.map((i) => ({
        ...i,
        adjustmentAmount: new Intl.NumberFormat().format(i.adjustmentAmount),
        refDate: i.refDate
          ? moment(i.refDate).locale("lo").format("DD-MM-YYYY")
          : "---",
        beforeAdjustment: new Intl.NumberFormat().format(i.beforeAdjustment),
        afterAdjustment: new Intl.NumberFormat().format(i.afterAdjustment),
        type: i.type === "ChangeCurrency" ? `Set new amount` : i.type,
      }));
    },
    async getCurrencies() {
      this.currencies = await getReuse("Currency");
    },
  },
  async created() {
    await this.getCurrencies();
    this.getHiringDetail();
  },
};
</script>

<style lang="scss" scoped>
ul {
  li {
    display: flex;
    span {
      &:first-child {
        width: 30%;
      }
      &:nth-child(2) {
        width: 30%;
        text-align: center;
        i {
          cursor: pointer;
        }
      }
      &:last-child {
        margin-left: auto;
        text-align: right;
        flex-grow: 1;
      }
    }
  } // li
  &.header {
    padding-bottom: 5px;
    border-bottom: 1px solid $border-color;
    @include md-font;
  }
  &.detail {
    @include md-font;
    li {
      padding: 10px 0;
      &:not(:last-child) {
        border-bottom: 1px solid $border-color;
      }
    }
  }
}
</style>