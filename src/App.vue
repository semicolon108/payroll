<template>
  <div id="app">
    <div class="content-container">
      <sidebar />
      <div class="main-content">
        <navigation />
        <div class="content-area">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidebar from "@coms/sidebar";
import navigation from "@coms/navbar";
import {mapMutations, mapGetters, mapActions} from 'vuex'


export default {
  components:{
    sidebar,
    navigation
  },
  computed: {
    ...mapGetters(['isAuth'])
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    ...mapActions(['getMyCompany'])
  },
  created() {
    if(this.$route.query.accessToken) {
      this.SET_TOKEN(this.$route.query.accessToken)
      this.$router.push({ name: 'getstart' })
    } else if(!this.isAuth) {
     window.location.href = 'http://localhost:3000'
    }
    this.getMyCompany()
  }
}
</script>
<style lang="scss">
#app{
  color: $font-color;
}
.content-container{
  display: flex;
  height: 100vh;
  .main-content{
    margin-left: 220px;
    flex-grow: 1;
    .content-area{
      padding: 30px 40px;
      margin-bottom: 50px;
    }
  }
}


</style>
