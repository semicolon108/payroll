<template>
  <div>
    <div class="page-header">
      <h3 class="page-title">Company Setup</h3>
    </div>
    <div class="columns">
      <div class="column is-3">
        <div class="navigation-tab">
          <router-link class="navigation-item" :to="{name:'company_info'}">Company Information</router-link>
          <router-link class="navigation-item" :to="{name:'company_workday'}">Work Day</router-link>
          <!--            <router-link class="navigation-item" :to="{name:'company_overtime'}">Overtime</router-link>-->
          <router-link class="navigation-item" :to="{name:'company_deductible'}">Earning / Deduction</router-link>
          <router-link class="navigation-item" :to="{name:'company_sso'}">SSO</router-link>
          <router-link class="navigation-item" :to="{name:'company_tax'}">TAX</router-link>
          <router-link class="navigation-item" :to="{name:'company_currency'}">Currency</router-link>
          <router-link class="navigation-item" :to="{name:'company_payroll-rule'}">Payroll Rule</router-link>
          <router-link class="navigation-item" :to="{name:'company_expat'}">Expat Manager</router-link>
        </div>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.navigation-tab {
  display: block;
  margin-bottom: 20px;

  .navigation-item {
    display: block;
    color: $font-color;
    padding: 10px 20px;
    border: 1px solid $border-color;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 5px;
    }

    &:last-child {
      border-right: 1px solid $border-color;
    }

    &.router-link-exact-active {
      background-color: $primary-color;
      color: #fff;
      border-color: $primary-color;;
    }
  }
}
</style>