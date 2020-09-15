<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Expat Manager</h3>
    </div>
    <div class="field">
      <label for="" class="label">Does your company hire Expat?</label>
      <div class="control switch">
          <input type="radio" name="expat" id="expat-no" checked>  
          <label for="expat-no">No</label>

          <input type="radio" name="expat" id="expat-yes">
          <label for="expat-yes">Yes</label>
      </div>
    </div>

    <h3 class="title">Work permit notification</h3>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">Email to get notification</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">The notice period (Day)</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
    </div>


    <button class="button">Save</button>
  </div>
</template>

<script>

export default {
  data: () => ({

  }),
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
    margin-bottom: 5px;
  }
}
.title{
    font-size: 18px;
    font-weight: 700;
    color: $font-color;
    margin-bottom: 15px;
    margin-top: 30px;
}
.input, .textarea{
  @include input;
}

.button{
  border-radius: 0;
  background-color: $primary-color;
  border-color: $primary-color;
  color: #fff;
}

.switch{
    display: flex;
    align-items: center;
    width: 50%;
    label{
        width: 50%;
        height: 36px;
        background-color: $light-grey-color;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    input{
        display: none;
        &:checked + label{
            background-color: $sub-color;
            color: #fff;
        }
    }
}
</style>