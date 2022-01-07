<template>
  <div class="page-container no-padding">
    <!-- <div class="page-header border-bottom">
      <h3 class="page-title">Company Setup</h3>
    </div> -->


    <div class="page-content-has-navigation">
      <div class="navigation-container">
        <div class="navigation-tab">
          <router-link class="navigation-item" :to="{name:'company_info'}">Company Information</router-link>
          <router-link class="navigation-item" :to="{name:'company_work_location'}">Work Location</router-link>
          <router-link class="navigation-item" :to="{name:'company_work_group'}">Work Group</router-link>
          <router-link class="navigation-item" :to="{name:'company_deductible'}">Earning / Deduction</router-link>
          <router-link class="navigation-item" :to="{name:'company_sso'}">SSO</router-link>
          <router-link class="navigation-item" :to="{name:'company_tax'}">TAX</router-link>
          <!-- <router-link class="navigation-item" :to="{name:'company_currency'}">Currency</router-link> -->
          <!-- <router-link class="navigation-item" :to="{name:'company_payroll-rule'}">Payroll Rule</router-link> -->
          <router-link class="navigation-item" :to="{name:'company_expat'}">Expat Manager</router-link>
        </div>
      </div>
      <div class="page-content has-border">
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
  padding: 20px 0 0 20px;
  .navigation-item {
    display: block;
    color: $font-color;
    padding: 10px 20px;
    border: 1px solid $border-color;
    cursor: pointer;
    background-color: #fff;
    white-space: pre;
    @include font-size($md-font);
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

.page-content-has-navigation{
  display: flex;
  overflow: hidden;
  height: 100%;
  .page-content{
    width: 100%;
    height: 100%;
  }
}
</style>