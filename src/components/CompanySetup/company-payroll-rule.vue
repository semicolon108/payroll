<template>
  <div class="box slide-up">
    <div class="box-header">
      <h3 class="box-title">Payroll Rule</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sunt quo illum in repellendus alias corporis error facere nostrum quae aliquid illo blanditiis nihil consectetur expedita, amet officia optio eveniet?</p>
    </div>
    <div class="field">
      <label for="" class="label">Does your company need an approval before Payroll Calculation?</label>
      <div class="control switch">
          <input type="radio" name="approved" id="need" checked>  
          <label for="need">No</label>
          <input type="radio" name="approved" id="unneed">
          <label for="unneed">Yes</label>
      </div>
    </div>

    <h3 class="title">Authority</h3>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">Authority Name</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">Authority Email</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
    </div>

    <h3 class="title">Payroll Manager</h3>
    <div class="columns">
        <div class="column">
            <div class="field">
                <label for="" class="label">Name</label>
                <div class="control">
                    <input type="text" class="input" disabled>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label for="" class="label">Email</label>
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
label{
  font-weight: normal;
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