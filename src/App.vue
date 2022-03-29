<template>
  <div id="app">
    <ReloadLoading v-show="isLoading" />
    <div v-show="!isLoading">
      <div v-if="$store.getters.getToken" class="content-container">
        <!-- <navigation /> -->

        <div class="main-content">
          <sidebar />
          <div class="content-area">
            <router-view />
          </div>
        </div>
      </div>
    </div>
    <DefaultLoading />
  </div>
</template>

<script>
import sidebar from "@coms/sidebar";
import { mapMutations, mapGetters, mapActions } from "vuex";
import DefaultLoading from "@/components/DefaultLoader/loading";
import ReloadLoading from "@/components/DefaultLoader/reload-loading";

export default {
  data: () => ({
    isLoading: true,
  }),
  components: {
    sidebar,
    // navigation,
    DefaultLoading,
    ReloadLoading,
  },
  computed: {
    ...mapGetters(["isAuth"]),
  },
  methods: {
    ...mapMutations(["SET_TOKEN"]),
    ...mapActions(["getMyCompany"]),
  },
  watch: {
    "$route.query.accessToken": {
      handler(val) {
        if (val) {
          this.SET_TOKEN(this.$route.query.accessToken);
          this.$router.push({ name: "dashboard" });
          window.location.reload();
        }

        setTimeout(() => {
          this.getMyCompany();
          this.isLoading = false;
        }, 1700);
      },
      immediate: true,
    },
  },
  //    created() {

  /// // alert(this.$route.query.accessToken)

  //     // if(this.$route.query.accessToken) {
  //     //   alert('hello')
  //     //   // this.SET_TOKEN(this.$route.query.accessToken)
  //     //   // this.$router.push({ name: 'getstart' })
  //     //   // this.$nextTick(() => {
  //     //   //   window.location.reload()
  //     //   // })
  //     //   //this.$router.push({ name: 'getstart' })
  //     // }
  //     setTimeout(() => {
  //       // this.getMyCompany()
  //       this.isLoading = false
  //     }, 1700)
  //   }
};
</script>

<style lang="scss">
html,
body {
  overflow: hidden;
}
#app {
  color: $font-color;
}
.content-container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  .main-content {
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    height: 100%;
    .content-area {
      width: 100%;
      background-color: #fff;
      overflow: hidden;
      .page-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        .page-content {
          padding: $page-padding;
          overflow-y: scroll;
          height: 100%;
        }
      }
    }
  }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $border-color;
  padding-left: $page-padding;
  padding-right: $page-padding;
  padding-top: 8px;
  padding-bottom: 8px;
  &.no-border {
    border: none;
  }
  &.no-padding {
    padding: 0 !important;
  }
  .header-start {
    display: flex;
    align-items: center;
    .header-title {
      display: flex;
      align-items: center;
      h3 {
        margin: 0;
      }
    }
    .button {
      margin-left: 10px;
    }
  }
  .header-end {
    // margin-left: auto;
    text-align: right;
    display: flex;
    .button {
      margin-left: 10px;
    }
    .button-group {
      display: flex;
      .button {
        margin-left: 10px;
      }
    }
  }
  &.bottom {
    align-items: flex-end;
    color: $font-color;
  }
  .page-title {
    color: $font-color;
    text-transform: uppercase;
    font-weight: 700;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
    @include lg-font;
  }
  span {
    cursor: pointer;
  }
}
</style>
