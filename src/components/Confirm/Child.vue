<template>
  <div>
    <div class="dialog-bg"
         v-if="item.isShow"></div>
    <transition name="bounce">
      <div v-if="item.isShow && item.type === 'Alert'" class="flex-container">
        <div class="dialog">
          <h2 class="dialog-header">{{item.title}}</h2>
          <div class="dialog-content">
            <p>{{item.msg}}</p>
          </div>
          <div class="dialog-button">
            <a @click="confirm">{{ item.okBtn }}</a>
          </div>
        </div>
      </div>
      <div v-else-if="item.isShow && item.type === 'Confirm'" class="flex-container">
        <div class="dialog">
          <h2 class="dialog-header">{{item.title}}</h2>
          <div class="dialog-content">
            <p>{{item.msg}}</p>
          </div>
          <div class="dialog-button">
            <a @click="confirm">{{ item.confrimBtn }}</a>
            <a @click="cancel" class="cancel">{{ item.cancelBtn }}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    confirm() {
      this.$emit('onBtnClick', true)
    },
    cancel() {
      this.$emit('onBtnClick', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-bg {
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  opacity: 30%;

}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.flex-container {
  z-index: 999;
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;

  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-content: stretch;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.dialog {
  -webkit-order: 0;
  -ms-flex-order: 0;
  order: 0;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;

  border-radius: 10px;

  width: 250px;

  //background: rgba(220, 220, 220, 0.85);
  background: #fff;
}

.dialog-header {
  text-align: center;
  padding: 10px;
  font-size: 16px;
  font-family: "Open Sans", sans-serif;
  font-weight: 700;
  border-bottom: rgb(180,180,180) solid 1px;
}

.dialog-content {
  padding: 10px 12px;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 13px;
}

.dialog-button a {
  display:block;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #2e7cf1;
  border-top: rgb(180,180,180) solid 1px;
}

.dialog-button a:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.dialog-button .cancel {
  font-weight: 700;
}

.dialog-button a:hover {
  background: #dedede;
}

p {
  line-height: 18px;
}
</style>