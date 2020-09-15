<template>
    <div>
        <div class="page-header">
            <h3 class="page-title">Overtime Calculation</h3>
            <button class="button"><i class="fas fa-plus"></i></button>
        </div>
        
        <div class="box current">
            <h3 class="box-title">Current Overtime Calculation</h3>
            <div class="summary-container">
                <div class="summary-items">
                    <div class="summary-item">
                        <span>Total Employees</span>
                        <h3>30</h3>
                    </div>
                    <div class="summary-item">
                        <span>150%</span>
                        <h3>3,000,000</h3>
                    </div>
                    <div class="summary-item">
                        <span>200%</span>
                        <h3>3,000,000</h3>
                    </div>
                    <div class="summary-item">
                        <span>250%</span>
                        <h3>3,000,000</h3>
                    </div>
                    <div class="summary-item">
                        <span>300%</span>
                        <h3>3,000,000</h3>
                    </div>
                    <div class="summary-item">
                        <span>Status</span>
                        <h3>Pending</h3>
                    </div>
                </div>
                <div class="summary-option">
                    <span>Calculate</span>
                </div>
            </div>
        </div> <!-- Current Box -->

        
        <div class="box">
            <h3 class="box-title">Previous Overtime</h3>
            <table class="table is-fullwidth" id="my-table">
                <thead>
                    <tr>
                        <th>Payment date</th>
                        <th class="is-right">No. of employee</th>
                        <th class="is-right">150%</th>
                        <th class="is-right">200%</th>
                        <th class="is-right">250%</th>
                        <th class="is-right">300%</th>
                        <th class="is-right">Option</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sep 30, 2020</td>
                        <td class="is-right">30</td>
                        <td class="is-right">3,000,000</td>
                        <td class="is-right">3,000,000</td>
                        <td class="is-right">3,000,000</td>
                        <td class="is-right">3,000,000</td>
                        <td class="is-right">
                            <div class="option is-primary">
                                <i class="fas fa-expand"></i>
                                <router-link to="overtime-detail">
                                    <span>Check</span>
                                </router-link>
                            </div>
                        </td>
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
.box{
    &.current{
        padding: 0;
        box-shadow: none;
        border: none;
        .box-title{
            font-weight: normal;
            font-size: 14px;
            margin: 0px;
            background-color: $primary-color;
            color: #fff;
            display: inline-block;
            padding: 5px 10px;
            border-radius: 3px 3px 0 0;
        }
        .summary-container{
            display: flex;
            .summary-option{
                background-color: $primary-color;
                color: #fff;
                padding: 10px;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            .summary-items{
                border: 1px solid $primary-color;
                padding: 10px;
                flex-grow: 1;
                display: flex;
                color: $font-color;
                .summary-item{
                    flex-grow: 1;
                span{
                    font-size: 14px;
                    color: $font-grey-color;
                }
                h3{
                    font-size: 18px;
                    font-weight: 700;
                    color: $primary-color;;
                }
            }
        }
        }
    }
    .box-title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
        color: $font-color;
    }
}


.option {
  color: $primary-color;
  white-space: pre;
  display: inline-block;
  cursor: pointer;
  border: none;

  &.is-primary {
    padding: 5px 15px;
    background-color: $primary-color;
    color: #fff;
  }

  a {
    color: #fff;
  }

  span {
    margin-left: 5px;
  }
}
</style>