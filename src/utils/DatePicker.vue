<template>
  <div class="date-container">
    <div class="date-item">
      <input v-model="date.day" type="text" class="input" placeholder="Date">
    </div>
    <div class="date-item">
      <input v-model="date.month" type="text" class="input" placeholder="Month">
    </div>
    <div class="date-item">
      <input v-model="date.year" type="text" class="input" placeholder="Year">
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: ['value', 'defaultValue'],
  data: () => ({
    date: {
      day: '',
      month: '',
      year: ''
    },
    fortmatDate: '',

    isCreated: false
  }),
  watch: {
    defaultValue: {
      handler(value) {
        if(this.isCreated) return
        if (value) {
          this.isCreated = true
          const oriDate = moment(value).locale('lo').format('YYYY/MM/DD')
          this.date.year = oriDate.split('/')[0]
          this.date.month = oriDate.split('/')[1]
          this.date.day = oriDate.split('/')[2]
        }
      },
    },
    date: {
      handler(value) {
        if(value.year === '' && value.month === '' && value.day === '') {
          this.$emit('input', '')
        }
       else if (value.year && value.month && value.day) {
          const oriDate = `${value.year}/${value.month}/${value.day}`
          const date = moment(oriDate).toDate()
          this.$emit('input', date)
        }
      },
      deep: true
    },
   }

}
</script>

<style scoped lang="scss">
.date-container {
  display: flex;
  margin: 0 -5px;

  .date-item {
    margin: 0 5px;
    flex-grow: 1;
  }
}
</style>