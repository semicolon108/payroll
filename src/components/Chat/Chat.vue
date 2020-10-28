<template>
  <div>
    <div
        v-if="isOpen"
        class="chat">
      <div class="window-heading">
      </div>
      <div class="chat-display">
        <div class="chat-box">
          <div class="chat-box-header"></div>
          <div class="chat-box-body">
            <div class="message-container">
              <div class="bubble-container">
                <div class="bubble-wrapper">
                  <p v-for="(i, idx) in messages" :key="idx"
                     class="bubble"
                    :class="[{ 'bubble-self': i.isSelf }, {'bubble-counterpath': !i.isSelf}]"
                  >
                    <small class="bubble-timestamp">26:30</small>
                    <span class="bubble-text">{{ i.message }}</span>
                  </p>
<!--                  <p class="bubble bubble-self">-->
<!--                    <small class="bubble-timestamp">26:30</small>-->
<!--                    <span class="bubble-text">Sup Man</span>-->
<!--                  </p>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <input type="text" class="input">
      <div class="window-footer">
      </div>
    </div>
    <a class="toggle-chat" @click="isOpen = !isOpen">Open</a>
  </div>
</template>

<script>
export default {
  data: () => ({
    isOpen: true,
    messages: [
      { message: 'hello', isSelf: false },
      { message: 'Noooo', isSelf: true },
      { message: 'hello', isSelf: false },
      { message: 'Noooo', isSelf: true },
      { message: 'hello', isSelf: false },
      { message: 'Noooo', isSelf: true },
      { message: 'hello', isSelf: false },
      { message: 'Noooo', isSelf: true },
      { message: 'hello', isSelf: false },
      { message: 'Noooo', isSelf: true },
      { message: 'hello', isSelf: false },
      { message: 'Noooo', isSelf: true },
    ]
  })
}
</script>

<style lang="scss" scoped>

.toggle-chat {
  z-index: 9999999;
  background-color: #fff;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 2rem 2rem;
  border-radius: 50%;
  padding: 20px;
  border: 1px solid rgb(143, 222, 162);
}
.chat {
  z-index: 9999999;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 360px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.2);
  border-radius: 9px;
  overflow: hidden;
  overscroll-behavior-y: contain;
  margin: 2rem 2rem;
  .window-heading {
    background-color: rgb(143, 222, 162);
    color: #fff;
    padding-left: 15px;
    padding-right: 15px;
    height: 55px;
    display: flex;
    align-items: center;
  }
  .chat-display {
    height: 100%;
  }
  .window-footer {
    background-color: rgb(143, 222, 162);
    color: hsla(0, 0%, 100%, 0.67);
    padding: 3px 10px;
    font-size: 12px;
    line-height: 14px;
    display: flex;
    justify-content: space-between;
  }
}

.chat-box {
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  // height: calc(100vh - 64px);
  // .chat-box-header {
  //   display: grid;
  //   grid-auto-flow: row;
  //   align-content: center;
  //   justify-content: center;
  //   min-height: 64px;
  //   padding: 0 1rem;
  //   line-height: 1;
  //   text-align: center;
  //   background-color: white;
  //   border-bottom: 1px solid #e6e8ea;
  // }
  .chat-box-body {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    .message-container {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
    }
  }
}





//.h-calc {
//  height: calc(100vh - 174px);
//}

.bubble-container {
  display: grid;
  grid-gap: 12px;
  padding: 24px 12px 12px;
  overflow: auto;
  height: calc(100vh - 115px);
}
.bubble-container .bubble-wrapper:last-child {
  margin-bottom: 38px;
}
.bubble-container .bubble-wrapper .bubble {
  line-height: 1.25;
}
.bubble-container .bubble-wrapper .bubble .bubble-timestamp {
  grid-column: 2;
  margin-bottom: 0.25rem;
  padding-left: 0.75rem;
  color: #788591;
}
.bubble-container .bubble-wrapper .bubble .bubble-timestamp:not(:only-child):first-child {
  margin-right: 0.25rem;
}
.bubble-container .bubble-wrapper .bubble .bubble-text {
  grid-column: 2;
  max-width: 20rem;
  padding: 8px 16px;
  word-break: break-word;
  white-space: pre-wrap;
}
.bubble-container .bubble-wrapper .bubble .bubble-text:before {
  content: "";
  display: block;
  width: 0.875rem;
  height: 0.875rem;
  position: absolute;
  top: 0;
}
.bubble-container .bubble-wrapper .bubble .bubble-quotation {
  grid-column: 2;
  max-width: 20rem;
  min-width: 16rem;
  word-break: break-word;
  white-space: pre-wrap;
}
.bubble-container .bubble-wrapper .bubble-counterpath {
  display: grid;
  align-items: start;
  justify-items: start;
  justify-content: start;
  grid-template-columns: max-content 1fr;
}
.bubble-container .bubble-wrapper .bubble-counterpath .bubble-text {
  position: relative;
  margin-left: 0.625rem;
  color: rgba(41, 43, 50, 0.98);
  background-color: #e6e8ea;
  border-radius: 0.625rem;
}
.bubble-container .bubble-wrapper .bubble-counterpath .bubble-text:before {
  left: -0.5rem;
  border-right: 0.5rem solid #e6e8ea;
  border-bottom-right-radius: 100%;
  transform: rotate(90deg);
}
.bubble-container .bubble-wrapper .bubble-self {
  display: grid;
  justify-items: end;
  justify-self: end;
  grid-template-columns: 1fr max-content;
  grid-template-rows: max-content max-content;
}
.bubble-container .bubble-wrapper .bubble-self .bubble-text {
  position: relative;
  margin-right: 0.625rem;
  color: white;
  background-color: #326fe2;
  border-radius: 0.625rem;
}
.bubble-container .bubble-wrapper .bubble-self .bubble-text:before {
  right: -0.5rem;
  border-left: 0.5rem solid #326fe2;
  border-bottom-left-radius: 100%;
  transform: rotate(270deg);
}
</style>