<template>
  <div>
    <Child :item="item" @onBtnClick="onBtnClick"/>
  </div>
</template>

<script>

export default {
  data: () => ({
    item: {
      type: '',
      isShow: false,
      resolve: null,
      title: '',
      msg: '',
      confrimBtn: 'Confirm',
      cancelBtn: 'Cancel',
      okBtn: 'OK'
    }
  }),
  methods: {
    openModal() {
      if (!this.$parent) {
        this.$mount()
        document.body.appendChild(this.$el)
      }
      return new Promise((resolve) => {
        this.item.resolve = resolve
        this.item.isShow = true
      })
    },
    alert(msg) {
      this.item.type = 'Alert'
      this.item.title = 'Alert Dialog'
      this.item.msg = msg ? msg : 'Congraduations'
       return this.openModal()
    },
    confirm(msg) {
      this.item.type = 'Confirm'
      this.item.title = 'Confirm Dialog'
      this.item.msg = msg ? msg : 'Are you sure?'
      return this.openModal()
    },
    onBtnClick(val) {
      this.item.resolve(val)
      this.item.isShow = false
    }
  }
}
</script>
