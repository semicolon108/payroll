<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-items">
        <div class="sidebar-title">Organization</div>
        <router-link to="/company-setup" class="sidebar-item">Company</router-link>
        <router-link to="/department" class="sidebar-item">Department</router-link>
        <router-link to="/position" class="sidebar-item">Position</router-link>
        <router-link to="/employee" class="sidebar-item">Employee</router-link>
      </div>

      <div class="sidebar-items">
        <div class="sidebar-title">Salary</div>
        <router-link to="/payroll_list" class="sidebar-item">Payroll</router-link>
      </div>

      <div class="sidebar-items">
        <div class="sidebar-title">Template</div>
        <router-link to="/document-template" class="sidebar-item">Payslip</router-link>
      </div>
    </div>
    <p class="logout-btn" @click="logout">
      <i class="fad fa-sign-out"></i>Logout
    </p>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import {logoutURL} from "@/config/variables";
export default {
  data: () => ({
    getStart: false,
  }),
  methods: {
    ...mapMutations(['DESTROY_TOKEN']),
    logout() {
      this.DESTROY_TOKEN()
      window.location.href = logoutURL
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  top: 0;
  bottom: 0;
  font-family: $font;
  background-color: $dark-primary-color;
  display: flex;
  flex-direction: column;
  .sidebar-container {
    width: 100%;
    padding: 20px;
    flex-grow: 1;
    min-width: 160px;
    .sidebar-items {
      margin-bottom: 30px;
      .sidebar-title {
        color: $warning-color;
        @include font-size($md-font);
        display: flex;
        span:first-child{
          width: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        i{
          margin-right: 10px;
        }
      }
      .sidebar-item {
        white-space: pre;
        display: block;
        cursor: pointer;
        @include font-size($md-font);
        padding: 10px 0 0;
        color: rgba(#fff, 0.4);
        &.router-link-active {
          color: #fff;
        }
      }
    }
  } // Sidebar-container
  .logout-btn{
    cursor: pointer;
    padding: 10px 20px;
    color: $dark-grey-color;
    display: flex;
    align-items: center;
    transition: all ease .3s;
    &:hover{
      color: #fff;
    }
    i{
      margin-right: 10px;
    }
  }
}
</style>