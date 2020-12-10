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
              
                earningAmount
                deductionAmount
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
                totalOTAmount
                taxForEachScale
                totalDueAsTax
                totalBeforeTax
                totalAfterTax
                ssoPaidByCom
                ssoPaidByEmp

                totalAfterSSO
                deductibleBeforeSSO
              
                netSalary
              
            }
            date
            isApproved
            isRequestSent
            isRequestApproved
            isPayslipSent
            isCalculated
            totalSalary

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

export const SEND_PAYSLIP = gql`

    mutation (
        $monthlyPaymentId: ID!
    ) {
        sendPayslip(
            monthlyPaymentId: $monthlyPaymentId
        )
    }

`