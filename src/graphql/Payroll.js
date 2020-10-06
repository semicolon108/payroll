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

export const GET_PAYROLL_BY_EMPS = gql`

    query ($monthlyPaymentId: ID!) {
        getPayrollByEmps(monthlyPaymentId: $monthlyPaymentId) {
            employees {
                _id
                monthlyPaymentId
                employeeId
                employeeCode
                fullName
                earningAmount
                deductionAmount
                calcAmount
                basicSalary
                netSalary
                tax
                sso
                workingDay
                isExpat
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
        ) {
            _id
            monthlyPaymentId
            employeeId
            employeeCode
            fullName
            earningAmount
            deductionAmount
            calcAmount
            basicSalary
            netSalary
            tax
            sso
            workingDay
            isExpat
        }
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