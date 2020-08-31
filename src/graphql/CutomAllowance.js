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
        $type: String!
        $name: String!
        $isBeforeTax: Boolean!
        $amount: Int!
    ) {
        addOrUpdateCustomAllowance(
            info: {
                employeeId: $employeeId
                type: $type
                name: $name
                isBeforeTax: $isBeforeTax
                amount: $amount
            }
        )
    }


`
