<template>
    <div id="checker">
        <div class="checker-header">
            <h3>Validate Uploaded Deductable Data</h3>
            <div class="button-group">
                <button class="button">Cancel</button>
                <button class="button is-sub">Re-Upload</button>
                <button class="button is-primary">Save</button>
            </div>
        </div>

        <div class="columns status-boxs">
            <div class="column is-3">
                <div class="box">
                    <span>Number Of Information</span>
                    <h3>5</h3>
                </div>
            </div>
            <div class="column is-3">
                <div class="box error">
                    <span>Number of Error Found</span>
                    <h3>4</h3>
                </div>
            </div>
        </div>

        <div class="box">
            <table class="table is-fullwidth" id="my-table">
                <thead>
                    <tr>
                        <th class="is-xxs">No</th>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Earning / Deuction Type</th>
                        <th class="is-sm is-right">Amount (LAK)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(i, idx) in 4" :key="idx">
                        <td>01</td>
                        <td>0014</td>
                        <td>Anousone LUANGKHOT</td>
                        <td>
                            <span class="error-item">Earning | Meal</span>
                        </td>
                        <td class="is-right">200,000</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
#checker{
    color: $font-color;
    background-color: #fff;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 220px;
    z-index: 999;
    padding: 40px;
    
}
.checker-header{
    display: flex;
    margin-bottom: 30px;
    .button-group{
        display: block;
        margin-left: auto;
        .button{
            margin-left: 10px;
            border-radius: 0;
            border: 1px solid $border-color;
            background-color: $light-grey-color;
            &.is-primary{
                background-color: $primary-color;
                border-color: $primary-color;
                color: #fff;
            }
            &.is-sub{
                background-color: $sub-color;
                border-color: $sub-color;
                color: #fff;
            }
        }
    }
    h3{
        font-size: 20px;
        color: $font-color;
        font-weight: 700;
    }
}

.status-boxs{
    color: $font-color;
    .box{
        h3{
            font-size: 30px;
            font-weight: bold;
            margin: 0;
            line-height: 1;
        }
        &.error{
            background-color: $alert-color;
            color: #fff;
        }
    }
}

.error-item{
    color: $alert-color;
}
</style>