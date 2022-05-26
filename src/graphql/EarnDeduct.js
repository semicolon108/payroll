import gql from 'graphql-tag'

export const GET_EARN_DEDUCTS = gql`

    {
        getEarnDeducts {
            _id
            name
            type
            isBeforeSso
            isBeforeTax
            groups {
                _id
                name
            }
        }
    }

`

export const ADD_EARN_DEDUCT = gql`

    mutation(
        $name: String!
        $type: String!
        $isBeforeTax: Boolean!
        $isBeforeSso: Boolean
        $earnDeductGroupIds: [ID]!
    ) {
        addEarnDeduct(info: {
            name: $name
            type: $type
            isBeforeTax: $isBeforeTax
            isBeforeSso: $isBeforeSso
            earnDeductGroupIds: $earnDeductGroupIds
        }) {
            _id
            name
            type
            isBeforeTax
            isBeforeSso
            groups {
                _id
                name
            }
        }
    }

`

export const UPDATE_EARN_DEDUCT = gql`

    mutation (
        $earnDeductId: ID!
        $name: String!
        $type: String!
        $isBeforeTax: Boolean!
        $isBeforeSso: Boolean
        $earnDeductGroupIds: [ID]!
    ) {
        updateEarnDeduct(
            info: {
                earnDeductId: $earnDeductId
                name: $name
                type: $type
                isBeforeTax: $isBeforeTax
                isBeforeSso: $isBeforeSso
                earnDeductGroupIds: $earnDeductGroupIds
            }
        ) {
            _id
            name
            type
            isBeforeTax
            isBeforeSso
            groups {
                _id
                name
            }
        }
    }

`

export const DELETE_EARN_DEDUCT = gql`

    mutation(
        $earnDeductId: ID!
    ) {
        deleteEarnDeduct(
            earnDeductId: $earnDeductId
        )
    }

`

