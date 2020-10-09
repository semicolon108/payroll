<template>
<div>
  <div class="bg"></div>
  <div class="loading"></div>
</div>
</template>

<script>
export default {
  created() {
    document.body.style.overflowY = 'hidden'
  },
  destroyed() {
    document.body.style.overflowY = 'auto'
  }
}
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  z-index: 9999;
  background-color: #000;
  opacity: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.loading {
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  /*  Putar loading  */
  transform: translate(-50%, -50%) rotate(75deg);
  width: 30px;
  height: 30px;
  /*   background: black; */
}

/* Membuat 2 elemen kemudian memberikan box shadow secara berlawanan sehingga seperti menampilkan 2 elemen berbeda */
.loading::before, .loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 15px;
  animation: loading 1.5s infinite linear;
}

.loading::before {
  box-shadow: 30px 30px #e77f67, -30px -30px #778beb;
}

.loading::after {
  box-shadow: 30px 30px #f8a5c2, -30px -30px #f5cd79;
  transform: translate(-50%, -50%) rotate(90deg);
}

@keyframes loading {
  50% {
    height: 90px;
  }
}

</style>