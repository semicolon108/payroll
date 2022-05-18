<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-items">
        <!-- <div class="sidebar-title">Organization</div> -->
        <router-link to="/company-setup/company-info" class="sidebar-item"
          ><span><i class="fa-solid fa-building"></i></span>
          Company</router-link
        >
        <router-link to="/department" class="sidebar-item"
          ><span><i class="fa-solid fa-layer-group"></i></span>
          Department</router-link
        >
        <router-link to="/position" class="sidebar-item"
          ><span><i class="fa-solid fa-user"></i></span> Position</router-link
        >
        <router-link to="/employee" class="sidebar-item"
          ><span><i class="fa-solid fa-users"></i></span> Employee</router-link
        >
      </div>
      

<!-- <p v-show="getCompany !== null">eiei</p> -->

      <div class="sidebar-items">
        <!-- <div class="sidebar-title">Salary</div> -->
        <router-link
        v-if="getCompany.private && getCompany.private.isPensionFund"
         to="/pension-fund" class="sidebar-item"
          ><span><i class="fa-solid fa-piggy-bank"></i></span>Pension
          Fund</router-link
        >
        <router-link to="/payroll_list" class="sidebar-item"
          ><span><i class="fa-solid fa-calculator-simple"></i></span>
          Payroll</router-link
        >
      </div>

      <div class="sidebar-items">
        <!-- <div class="sidebar-title">Template</div> -->
        <router-link to="/document-template" class="sidebar-item"
          ><span><i class="fa-solid fa-envelope"></i></span>
          Payslip</router-link
        >
      </div>
    </div>
    <p class="logout-btn" @click="logout">
      <i class="fad fa-sign-out"></i>Logout
    </p>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { logoutURL } from "@/config/variables";
export default {
  data: () => ({
    getStart: false,
  }),
  computed: {
      ...mapGetters(["getCompany", 'isAuth']),
  },
  methods: {
    ...mapMutations(["DESTROY_TOKEN"]),
    logout() {
      this.DESTROY_TOKEN();
      window.location.href = logoutURL;
    },
  },
};
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
    padding: 30px;
    flex-grow: 1;
    min-width: 160px;
    @include widescreen {
      padding: 30px 20px;
    }
    .sidebar-items {
      margin-bottom: 20px;
      // .sidebar-title {
      //   color: $warning-color;
      //   @include md-font;
      //   display: flex;
      //   span:first-child {
      //     width: 30px;
      //     display: flex;
      //     align-items: center;
      //     justify-content: center;
      //   }
      //   i {
      //     margin-right: 10px;
      //   }
      // }
      a.sidebar-item {
        white-space: pre;
        display: flex;
        align-items: center;
        cursor: pointer;
        @include md-font;
        padding: 10px 0 0;
        color: rgba(#fff, 0.4);
        display: flex;
        position: relative;
        &.router-link-active {
          color: #fff;
          span {
            background-color: #fff;
          }
        }
        span {
          background-color: rgba(#fff, 0.4);
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          margin-right: 10px;
          i {
            text-align: left;
            @include xsm-font;
            color: $dark-primary-color;
          }
        }
      }
    }
  } // Sidebar-container
  .logout-btn {
    cursor: pointer;
    padding: 10px 20px;
    color: $dark-grey-color;
    display: flex;
    align-items: center;
    transition: all ease 0.3s;
    &:hover {
      color: #fff;
    }
    i {
      margin-right: 10px;
    }
  }
}
</style>