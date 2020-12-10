<template>
  <div id="app" >
    <ReloadLoading v-show="isLoading"/>
    <div v-show="!isLoading">
    <div v-if="$store.getters.getToken" class="content-container">
      <sidebar />
      <div class="main-content">
        <navigation />
        <div class="content-area">
            <router-view/>
        </div>
      </div>
    </div>
    </div>
    <DefaultLoading/>
  </div>
</template>
<script>


import sidebar from "@coms/sidebar";
import navigation from "@coms/navbar";
import {mapMutations, mapGetters, mapActions} from 'vuex'
import DefaultLoading from '@/components/DefaultLoader/loading'
import ReloadLoading from '@/components/DefaultLoader/reload-loading'

export default {
  data: () => ({
    isLoading: true
  }),
  components:{
    sidebar,
    navigation,
    DefaultLoading,
    ReloadLoading
  },
  computed: {
    ...mapGetters(['isAuth'])
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    ...mapActions(['getMyCompany'])
  },
  created() {

    // axios.get('http://192.169.9192')
    //     .then(() => alert('axios'))
    //     .catch((err) => alert(err))

    if(this.$route.query.accessToken) {
      this.SET_TOKEN(this.$route.query.accessToken)
      this.$router.push({ name: 'getstart' })
    } else if(!this.isAuth) {
    // window.location.href = 'http://localhost:3000'
    }
    this.getMyCompany()
    setTimeout(() => {
      this.isLoading = false
    }, 1700)
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
