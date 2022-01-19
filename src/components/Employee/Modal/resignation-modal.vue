<template>
  <div class="modal is-active">
    <div class="modal-background" @click="closeModal"></div>

      <ValidationObserver v-slot="{ handleSubmit }" class="modal-card slide-down" tag="div">
        <header class="modal-card-head">
          <h3>Set Resignation Date</h3>
          <button class="modal-close is-large" @click="closeModal" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="" class="label">Date</label>
            <div class="control">
              <ValidationProvider name="Resignation Date" rules="isDateOrNull" v-slot="{ errors }">
                <DatePicker v-model="hiringDetail.resignationDate" :default-value="defaultDate" />
<!--                <input v-model="name" type="text" class="input">-->
                <p class="has-text-danger">{{ errors[0] }}</p>
              </ValidationProvider>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="handleSubmit(addOrUpdateHirringDetail)" class="button primary">Save</button>
        </footer>
      </ValidationObserver>

  </div>
</template>

<script>
import DatePicker from "@/utils/DatePicker";
import {addOrUpdateHirringDetail, getHirringDetail} from "@/apis/hirring-detail-api";
import moment from 'moment'
export default {
  props: ['isEditMode'],
  components: {DatePicker},
  data: () => ({
    hiringDetail: {},
    defaultDate: null
  }),
  methods: {
    closeModal() {
      this.$emit('CloseModal')
    },
    async getHiringDetail() {
      const data = await getHirringDetail(this.$route.params.id)
      this.hiringDetail = {
        ...data,
        workPermit: {
          startDate: data.workPermit.startDate,
          endDate: data.workPermit.endDate,
          daysOfNotify: data.workPermit.daysOfNotify
        },
      }
      this.defaultDate = this.hiringDetail.resignationDate ? moment(this.hiringDetail.resignationDate).locale('lo') : null
    },
    async addOrUpdateHirringDetail() {
      try {

        await this.$store.dispatch('loading')
        await addOrUpdateHirringDetail(this.hiringDetail)
        await this.$store.dispatch('completed')
        this.closeModal()
      } catch (err) {
        await this.$store.dispatch('error')
        throw new Error(err)
      }
    },
  },
  created() {
    this.getHiringDetail()
  }
}
</script>

<style lang="scss" scoped>
</style>