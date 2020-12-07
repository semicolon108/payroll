import gql from 'graphql-tag'

export const GET_MONTHLY_PAYMENT_EMPLOYEES = gql`

    query (
        $monthlyPaymentId: ID!
    ) {
        getMonthlyPaymentEmployees (monthlyPaymentId: $monthlyPaymentId) {
            isApproved
            date
            employees {
                _id
                employee {
                    _id
                    employeeCode
                    fullName
                }
                earnDeduct {
                    _id
                    type
                    name
                    amount
                    subAmount
                    isAmount
                    chooseAmount
                }
                isApproved
            }
            totalDeductible
        }
    }

`

export const UPLOAD_DEDUCTIBLE = gql`


    mutation (
        $items: [UploadDeductibleInput!]!
    ) {
        uploadDeductable (
            info: $items
        ) {
            items {
                column
                employeeCode
                fullName
                type
                earnDeductName
                amount
            }
            total
            totalError
        }
    }
    

`

export const ADD_DEDUCTIBLE = gql`

    mutation (
        $items: [DeductibleInput!]!
        $monthlyPaymentId: ID!) {
        addDeductible(info: {
            items: $items
            monthlyPaymentId: $monthlyPaymentId
        })
    }



`

export const APPROVED_DEDUCTIBLE = gql`

    mutation (
        $monthlyPaymentId: ID!
    ) {
        approveDeductible (
            monthlyPaymentId: $monthlyPaymentId
        )
    }

`