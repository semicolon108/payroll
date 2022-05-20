<template>
  <!-- add class collapse  to collapse sidebar-->
  <div class="sidebar">
    <div class="sidebar-container">
      <div class="sidebar-items">
        <!-- <div class="sidebar-title">Organization</div> -->
        <router-link to="/company-setup" class="sidebar-item">
          <span><i class="fa-solid fa-building"></i></span>
          <a>Company</a>
        </router-link>
        <router-link to="/department" class="sidebar-item">
          <span><i class="fa-solid fa-layer-group"></i></span>
          <a>Department</a>
        </router-link>
        <router-link to="/position" class="sidebar-item">
          <span><i class="fa-solid fa-user"></i></span>
          <a>Position</a>
        </router-link>
        <router-link to="/employee" class="sidebar-item">
          <span><i class="fa-solid fa-users"></i></span>
          <a>Employee</a>
        </router-link>
      </div>

      <div class="sidebar-items">
        <!-- <div class="sidebar-title">Salary</div> -->
        <router-link to="/pension-fund" class="sidebar-item">
          <span><i class="fa-solid fa-piggy-bank"></i></span>
          <a>Pension Fund</a>
        </router-link>
        <router-link to="/payroll_list" class="sidebar-item">
          <span><i class="fa-solid fa-calculator-simple"></i></span>
          <a>Payroll</a>
        </router-link>
      </div>

      <div class="sidebar-items">
        <!-- <div class="sidebar-title">Template</div> -->
        <router-link to="/document-template" class="sidebar-item">
          <span><i class="fa-solid fa-envelope"></i></span>
          <a>Payslip</a>
        </router-link>
      </div>
    </div>
    <p class="logout-btn" @click="logout">
      <span><i class="fad fa-sign-out"></i></span>
      <a>Logout</a>
    </p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { logoutURL } from "@/config/variables";
export default {
  data: () => ({
    getStart: false,
  }),
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
  &.collapse {
    .sidebar-container {
      min-width: auto !important;
      .sidebar-items {
        .sidebar-item {
          span {
            margin: 0;
          }
          a {
            display: none;
          }
        }
      }
    }
    .logout-btn {
      justify-content: center;
      a {
        display: none;
      }
    }
  }
  .sidebar-container {
    width: 100%;
    padding: 30px;
    flex-grow: 1;
    min-width: 160px;
    @include widescreen {
      padding: 30px 20px;
      min-width: 250px;
    }
    .sidebar-items {
      margin-bottom: 20px;
      .sidebar-item {
        white-space: pre;
        display: flex;
        align-items: center;
        cursor: pointer;
        @include md-font;
        padding: 0 0 10px;
        color: rgba(#fff, 0.4);
        display: flex;
        position: relative;
        outline: none;
        @include widescreen {
          padding-top: 15px;
        }
        &.router-link-active {
          color: #fff;
          span {
            background-color: #fff;
          }
          a {
            color: #fff !important;
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
        a {
          color: rgba(#fff, 0.4) !important;
        }
      } // sidebar-item
    }
  } // Sidebar-container
  .logout-btn {
    cursor: pointer;
    padding: 10px 30px;
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
    a {
      color: rgba(#fff, 0.4);
    }
  }
}
</style>