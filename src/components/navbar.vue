<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
         data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <button class="button get-start" @click="$router.push({name:'getstart'})">Get Start</button>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item"><i class="fas fa-bell"></i></div>
        <div class="navbar-item" 
          v-click-outside="()=>{ ddActive = false }"
          @click="ddActive = !ddActive">
          <div class="user-img"></div>
          <div class="dd-list" :class="{'active' : ddActive}">
            <div class="dd-item" @click="$router.push({name:'company_info'})"><i class="fas fa-user"></i>Company Setup
            </div>
            <div class="dd-item" @click="$router.push({name:'document_template'})"><i class="far fa-file-word"></i>
              Payslip Template
            </div>
            <hr>
            <div @click="logout" class="dd-item"><i class="fas fa-sign-out-alt"></i>Logout</div>
          </div>
        </div>
      </div>
    </div>

  </nav>
</template>

<script>
import {mapMutations} from 'vuex'
import {logoutURL} from "@/config/variables";
import vClickOutside from 'v-click-outside'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  data: () => ({
    ddActive: false
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
.navbar {
  color: $font-color;
  padding: 0 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $border-color;

  .navbar-start {
    .navbar-item {
      padding-left: 0;
      font-size: 24px;
      color: $font-color;

      .get-start {
        font-weight: 700;
        border-radius: $radius;
        border-color: $primary-color;
        color: $primary-color;
        font-size: 14px;
        text-transform: uppercase;

        &:hover {
          box-shadow: none;
        }

        &:focus {
          box-shadow: none;
        }
      }
    }
  }

  .navbar-item {
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;

    i {
      transition: all ease-in-out .3s;

      &:hover {
        color: $primary-color;
      }
    }

    .dd-list {
      position: absolute;
      display: none;
      box-sizing: border-box;
      width: 230px;
      right: 0;
      z-index: 1;
      top: 56px;
      background-color: #fff;
      padding: 20px;
      border: 1px solid $border-color;
      box-shadow: 0 5px 10px 0 rgba(149, 149, 149, 0.5);

      &.active {
        display: block;
      }

      &::before {
        content: '';
        background-color: #fff;
        border: 1px solid $border-color;
        position: absolute;
        border-right: none;
        border-bottom: none;
        z-index: 0;
        top: -6px;
        right: 25px;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
      }

      .dd-item {
        padding: 10px 0;
        font-size: 16px;
        transition: all ease-in-out .1s;

        &:hover {
          color: $primary-color;
        }

        i {
          margin-right: 10px;
        }
      }

      hr {
        margin: 10px 0;
        height: 1px;
        background-color: $border-color;
      }
    }
  }
}

.user-img {
  background-image: url('https://www.odeliver.net/images/members/default.png');
  width: 40px;
  height: 40px;
  background-position: center;
  background-size: cover;
  border-radius: 100%;
  border: 1px solid $border-color;
}
</style>