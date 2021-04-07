import gql from 'graphql-tag'




export const GET_PAYROLL_BY_MONTHS = gql`

    {
        getPayrollByMonths {
            monthlyPaymentId
            isApproved
            paymentDate
            totalSalary
            totalTax
            totalSso
            employeeCount
            workGroupId {
                _id
                name
                employeesCount
            }
        }
    }


`

export const GET_TOTAL_PAYROLL = gql`

query (
  $monthlyPaymentId: ID!
) {
  getTotalPayroll(
    
    monthlyPaymentId: $monthlyPaymentId
  ) {
    totalDeductible
    totalPayroll
    totalOT
    paymentDate
  }
}

`


export const GET_PAYROLL_BY_EMPS = gql`

query ($monthlyPaymentId: ID!) {
        getPayrollByEmps(monthlyPaymentId: $monthlyPaymentId) {
            hasExpat
            employees {
                employeeId
                employeeCode
              
                fullName
                fullNameLao
              
                position
                department
              
                earningBeforeTax
                earningAfterTax
                deductionBeforeTax
                deductionAfterTax
                calcDeductible
                deductibleBeforeTax
                deductibleAfterTax
              
              
                basicSalary              
                salaryGrade
                startWorkingDate
                defaultWorkingDay
                actualWorkingDay
                thisMonthSalary
                isExpat

                OTHours
                OTAmount
                earnings
                deductions


                totalOTAmount
                totalDueAsTax
              
                ssoPaidByCom
                ssoPaidByEmp
                calcSso
                tax
                customFormulas {
                    key
                    value
                   # isFinalNetPay
                }
                customFields {
                    key
                    value
         
                }
              finalNetPay

              isRequestSent
              isPayslipSent
            }
            date
            isApproved
            isRequestSent
            isRequestApproved
            isPayslipSent
          
            isCalculated
            

        }
    }




`

export const CALC_PAYROLL = gql`

mutation (
        $monthlyPaymentId: ID!
    ) {
        calcPayroll (
            monthlyPaymentId: $monthlyPaymentId
        )
    }

`

export const SEND_REQUEST_CALC = gql`

    mutation (
        $monthlyPaymentId: ID!
    ) {
        sendRequestCalc(
            monthlyPaymentId: $monthlyPaymentId
        )
    }

`


export const SEND_PAYSLIP_BY_EMPS = gql`

  mutation (
    $monthlyPaymentId: ID!
    $employeeIds: [ID!]!
  ) {
    sendPayslipByEmps(
      monthlyPaymentId: $monthlyPaymentId
      employeeIds: $employeeIds
    )
  }

`

export const SEND_PAYSLIP = gql`

    mutation (
        $monthlyPaymentId: ID!
    ) {
        sendPayslip(
            monthlyPaymentId: $monthlyPaymentId
        )
    }

`


export const ADD_PAYROLL = gql`

mutation (
  $workGroupId: ID!
) {
  addPayroll(
    workGroupId: $workGroupId
  )
}

`


export const DELETE_PAYROLL = gql`

mutation (
  $monthlyPaymentId: ID!
) {
  deletePayroll(
    monthlyPaymentId: $monthlyPaymentId
  )
}

`