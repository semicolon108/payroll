<template>
    <div class="box">
        <div class="box-header">
            <h3 class="box-title">Company Policy</h3>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">From</label>
            </div>
            <div class="field-body">
                <div class="field">
                <p class="control is-expanded has-icons-left">
                        <input class="input" type="text" placeholder="Name">
                        <span class="icon is-small is-left">
                        <i class="fas fa-user"></i>
                        </span>
                    </p>
                    </div>
                    <div class="field">
                    <p class="control is-expanded has-icons-left has-icons-right">
                        <input class="input is-success" type="email" placeholder="Email" value="alex@smith.com">
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                        <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                        </span>
                    </p>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label">
                    <label class="label">Already a member?</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                    <div class="control">
                        <label class="radio">
                        <input type="radio" name="member">
                        Yes
                        </label>
                        <label class="radio">
                        <input type="radio" name="member">
                        No
                        </label>
                    </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Subject</label>
            </div>
            <div class="field-body">
                <div class="field">
                <div class="control">
                    <input class="input is-danger" type="text" placeholder="e.g. Partnership opportunity">
                </div>
                <p class="help is-danger">
                    This field is required
                </p>
                </div>
            </div>
        </div>
        <!-- <div class="columns is-multiline">
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Currency</label>
                    <div class="control">
                        <input type="text" class="input" disabled placeholder="LAK">
                    </div>
                </div>
            </div>
            <div class="column is-4">
                <div class="field">
                    <label for="" class="label">Working Day</label>
                    <div class="control">
                        <input type="text" class="input">
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">SSO</label>
                    <div class="control switch">
                        <input type="radio" name="sso" id="employee" checked>  
                        <label for="employee">Employee pay 5.5%</label>

                        <input type="radio" name="sso" id="employer">
                        <label for="employer">Employer pay 11.5%</label>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">TAX</label>
                    <div class="control switch">
                        <input type="radio" name="tax" id="employeetax" checked>  
                        <label for="employeetax">Employee pay</label>

                        <input type="radio" name="tax" id="employertax">
                        <label for="employertax">Employer pay</label>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <div class="field">
                    <label for="" class="label">Does your company hire Expat?</label>
                    <div class="control switch">
                        <input type="radio" name="expat" id="expat-no" checked>  
                        <label for="expat-no">No</label>

                        <input type="radio" name="expat" id="expat-yes">
                        <label for="expat-yes">Yes</label>
                    </div>
                </div>
            </div>
        </div> -->
        <button class="button">Save</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.input{
    @include input;
}
label{
    font-weight: normal;
    span{
        display: block;
    }
}
.box-header{
    display: flex;
    color: $font-color;
    margin-bottom: 20px;
    align-items: center;
    .box-title{
        font-size: 18px;
        font-weight: 700;
        color: $font-color;
    }
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