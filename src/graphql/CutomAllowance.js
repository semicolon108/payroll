import gql from 'graphql-tag'

export const GET_CUSTOM_ALLOWANCE = gql`

    query (
        $employeeId: ID!
    ) {
        getCustomAllowance(
            employeeId: $employeeId
        ) {
            _id
            customAllowances {
                type
                name
                isBeforeTax
                amount
            }
        }
    }

`

export const ADD_OR_UPDATE_CUSTOM_ALLOWANCE = gql`

    mutation(
        $employeeId: ID!
        $items: [CustomAlloItemsInput!]!
    ) {
        addOrUpdateCustomAllowance(
            info: {
                employeeId: $employeeId
                items: $items
            }
        ) {
            _id
            customAllowances {
                type
                name
                isBeforeTax
                amount
            }
        }
    }



`
