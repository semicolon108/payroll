<template>
  <div class="modal is-active">
    <div class="modal-background" @click="CloseAlert"></div>
    <div class="modal-content box slide-down">
      <div class="header">
        <i class="fas fa-exclamation-circle"></i>
        <div>
          <h3>Earning / Deduction need an approval</h3>
          <p>Please approve the earning / deduction list before continue the payroll</p>
        </div>
      </div>
      <button class="button"

              @click="$router.push({name:'deductable_detail', params: { id: monthlyPaymentId }})"
      >Check
      </button>

      <button class="modal-close is-large" @click="CloseAlert" aria-label="close"></button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['monthlyPaymentId'],
  data: () => ({
    alert: false,
  }),
  methods: {
    CloseAlert() {
      this.$emit('CloseAlert')
    },
  },
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
  }

  .button {
    margin-top: 10px;
    border-radius: $radius;
    border: none;
    background-color: $sub-color;
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