<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>

    <ValidationObserver
      v-slot="{ handleSubmit }"
      class="modal-card slide-down"
      tag="div"
    >
      <header class="modal-card-head">
        <h3>Salary Adjustment</h3>
        <button
          class="modal-close is-large"
          @click="closeModal"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="" class="label">Wage Type</label>
          <div class="control">
            <div class="select">
              <ValidationProvider
                name="WageType"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="form.wageType" class="select">
                  <option value="Monthly">Monthly</option>
                  <option value="Daily">Daily</option>
                </select>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Type</label>
          <div class="control">
            <div class="select">
              <ValidationProvider
                name="Type"
                rules="required"
                v-slot="{ errors }"
              >
                <select v-model="form.type" class="select">
                  <option value="Increase">Increase</option>
                  <option value="Decrease">Decrease</option>
                  <option value="ChangeCurrency">Set new amount</option>
                </select>
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </div>

        <div v-if="form.type === 'ChangeCurrency'" class="field has-addons">
          <div class="control is-expanded">
            <ValidationProvider
              name="Salary"
              rules="required"
              v-slot="{ errors }"
              ><label for="" class="label">Salary Amount</label>
              <currency-input
                v-model="form.adjustmentAmount"
                class="input"
                :allow-negative="false"
                :value-range="{ min: 0 }"
                :distraction-free="false"
                :currency="{ prefix: '', suffix: '' }"
                :value-as-integer="true"
                :precision="0"
                :disabled="hasHiringDetail"
              />
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="field">
          <label for="" class="label">Reference Date</label>
          <div class="control">
            <ValidationProvider
              name="Reference Date"
              rules="isDateOrNull"
              v-slot="{ errors }"
            >
              <DatePicker v-model="form.refDate" />
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
        <div class="field" v-if="form.type !== 'ChangeCurrency'">
          <label class="label">Amount</label>
          <div class="control">
            <ValidationProvider
              name="Amount"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <currency-input
                v-model="form.adjustmentAmount"
                class="input"
                :allow-negative="false"
                :value-range="{ min: 0 }"
                :distraction-free="false"
                :currency="{ prefix: '', suffix: '' }"
                :value-as-integer="true"
                :precision="0"
              />
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>

        <div v-if="form.type === 'ChangeCurrency'" class="field">
          <label class="label"
            >Before / After Change Currency

            <span class="has-text-info"
              >(
              {{
                `${currencyName(oldCurrency)} to ${currencyName(
                  form.currencyId
                )}`
              }}
              )</span
            >
          </label>
          <div class="control columns" style="margin: 5px 0 5px">
            <input
              :value="beforeAdjustment | currency"
              type="text"
              class="input"
              disabled
            />
            <input
              :value="
                form.adjustmentAmount ? form.adjustmentAmount : 0 | currency
              "
              type="text"
              class="input"
              disabled
            />
          </div>
        </div>
        <div v-else class="field">
          <label class="label"
            >Before / After Adjustment

            <span class="has-text-info"
              >( {{ currencyName(oldCurrency) }} )</span
            >
          </label>
          <div class="control columns" style="margin: 5px 0 5px">
            <input
              :value="beforeAdjustment | currency"
              type="text"
              class="input"
              disabled
            />
            <input
              :value="afterAdjustment | currency"
              type="text"
              class="input"
              disabled
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Memo</label>
          <div class="control">
            <ValidationProvider name="Memo" v-slot="{ errors }">
              <input v-model="form.memo" type="text" class="input" />
              <p class="has-text-danger">{{ errors[0] }}</p>
            </ValidationProvider>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button @click="handleSubmit(adjustSalary)" class="button primary">
          Save
        </button>
      </footer>
    </ValidationObserver>
  </div>
</template>

<script>
import DatePicker from "@/utils/DatePicker";
import { adjustSalary, getHirringDetail } from "@/apis/hirring-detail-api";
import { getCompanyCurrencies } from "@/apis/company-currency-api";
import { getReuse } from "@/apis/reuse-api";

export default {
  props: ["isEditMode"],
  components: { DatePicker },
  data: () => ({
    hiringDetail: {},
    form: {
      type: "Increase",
      wageType: "Monthly",
    },
    beforeAdjustment: null,
    currencies: [],
    companyCurrency: null,
    oldCurrency: "",
  }),
  computed: {
    afterAdjustment() {
      let calc = 0;
      if (this.form.type === "Increase")
        calc =
          parseInt(this.beforeAdjustment, 10) +
          parseInt(this.form.adjustmentAmount, 10);
      else
        calc =
          parseInt(this.beforeAdjustment, 10) -
          parseInt(this.form.adjustmentAmount, 10);
      return calc ? calc : "";
    },
    comCurrencies() {
      if (!this.companyCurrency) return;
      const comCur = this.companyCurrency.currencies.map((i) => ({
        _id: i.currencyId._id,
        name: i.currencyId.name,
      }));
      const filter = comCur.filter((i) => i._id !== this.oldCurrency);
      filter.unshift(this.currencies[0]);
      return filter;
    },
    currencyName() {
      return (currencyId) => {
        if (!currencyId) return;
        const obj = this.currencies.find((i) => i._id === currencyId);
        return obj ? obj.name.split("|").pop() : "";
      };
    },
  },
  watch: {
    comCurrencies: {
      handler(currencies) {
        this.form.currencyId = currencies[0]._id;
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    closeModal() {
      this.$emit("CloseModal");
    },
    async getHiringDetail() {
      const data = await getHirringDetail(this.$route.params.id);
      this.hiringDetail = {
        ...data,
        workPermit: {
          startDate: data.workPermit.startDate,
          endDate: data.workPermit.endDate,
          daysOfNotify: data.workPermit.daysOfNotify,
        },
      };
      this.form.wageType = data.wageType;
      this.beforeAdjustment = this.hiringDetail.salary;
      this.oldCurrency = this.hiringDetail.currencyId;
    },
    async adjustSalary() {
      this.form.employeeId = this.$route.params.id;
      this.form.adjustmentAmount = parseInt(this.form.adjustmentAmount, 10);
      await adjustSalary(this.form);
      this.$emit("AdjustSalary");
    },
    async getCompanyCurrencies() {
      this.companyCurrency = await getCompanyCurrencies();
    },
    async getCurrencies() {
      this.currencies = await getReuse("Currency");
    },
  },
  created() {
    this.getHiringDetail();
    this.getCompanyCurrencies();
    this.getCurrencies();
  },
};
</script>

<style lang="scss" scoped>
</style>