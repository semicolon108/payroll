<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Overtime Setting</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sunt quo illum in repellendus alias corporis error facere nostrum quae aliquid illo blanditiis nihil consectetur expedita, amet officia optio eveniet?</p>
    </div>
    <div class="field">
      <label for="" class="label">Does your company provide Overtime?</label>
      <div class="control switch">
        <input type="radio" name="ot" id="ot-no" checked>
        <label for="ot-no">No</label>
        <input type="radio" name="ot" id="ot-yes">
        <label for="ot-yes">Yes</label>
      </div>
    </div>

    <div class="columns">
        <div class="column is-6-desktop">
            <div class="field">
                <label class="label">Work Hours / Day</label>
                <div class="control">
                    <input type="text" class="input">
                </div>
            </div>
        </div>
    </div>

    

    <button class="button">Save</button>
  </div>
</template>

<script>


export default {
  
}
</script>

<style lang="scss" scoped>
.box-header{
  color: $font-color;
  margin-bottom: 20px;
  .box-title{
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 5px;;
  }
}

.input, .textarea{
  @include input;
}
label{
  font-weight: 700;
  p{
    font-weight: normal;
  }
}
.button{
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch {
  display: flex;
  align-items: center;
  width: 50%;

  label {
    width: 50%;
    height: 36px;
    background-color: $light-grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  input {
    display: none;

    &:checked + label {
      background-color: $sub-color;
      color: #fff;
    }
  }
}
</style>