<template>
  <div class="page-container">
    <div class="page-content-has-navigation">
      <div class="navigation-container">
        <div class="navigation-header">
          <h3>Company</h3>
        </div>
        <div class="navigation-tab">
          <router-link class="navigation-item" :to="{ name: 'company_info' }"
            >Company Information</router-link
          >
          <router-link
            class="navigation-item"
            :to="{ name: 'company_work_location' }"
            >Work Location</router-link
          >
          <router-link
            class="navigation-item"
            :to="{ name: 'company_work_group' }"
            >Work Group</router-link
          >
          <!-- <router-link
            class="navigation-item"
            :to="{ name: 'company_deductible' }"
            >Earning / Deduction</router-link
          > -->
          <!-- <router-link class="navigation-item" :to="{ name: 'company_sso' }"
            >SSO</router-link
          >
          <router-link class="navigation-item" :to="{ name: 'company_tax' }"
            >TAX</router-link
            eieieiei
          > -->
          <router-link class="navigation-item" :to="{name:'company_currency'}">Currency</router-link>
          <!-- <router-link class="navigation-item" :to="{name:'company_payroll-rule'}">Payroll Rule</router-link> -->
          <router-link class="navigation-item" :to="{ name: 'company_expat' }"
            >Expat Manager</router-link
          >
          <router-link
            class="navigation-item"
            :to="{ name: 'company_earning_deduction' }"
            >Earning / Deduction</router-link
          >
          <router-link class="navigation-item" :to="{ name: 'customfield' }"
            >Custom Field</router-link
          >
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navigation-container {
  border-right: 1px solid $border-color;
  overflow-y: auto;
  min-width: 230px;
  @include widescreen {
    min-width: 230px;
  }
  .navigation-header {
    padding: 10px 20px;
    background-color: $light-grey-color;
    pointer-events: none;
    @include widescreen {
      padding: 10px 20px;
    }
    h3 {
      @include md-font;
      font-weight: 700;
      color: $dark-grey-color;
      pointer-events: none;
    }
  }
  .navigation-tab {
    display: block;
    .navigation-item {
      display: block;
      color: $font-color;
      padding: 10px 20px;
      border-bottom: 1px solid $border-color;
      @include md-font;
      &:first-child {
        border-top: 1px solid $border-color;
      }
      cursor: pointer;
      background-color: #fff;
      white-space: pre;
      @include widescreen {
        padding: 10px 20px;
      }
      &:focus {
        outline: none;
      }
      &.router-link-exact-active {
        background-color: $primary-color;
        color: #fff;
        border-color: $primary-color;
      }
    }
  }
}
.page-content-has-navigation {
  display: flex;
  overflow: hidden;
  height: 100%;
}
</style>