import gql from 'graphql-tag'

export const GET_PAYROLL_BY_MONTHS = gql`

    {
        getPayrollByMonths {
            monthlyPaymentId
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