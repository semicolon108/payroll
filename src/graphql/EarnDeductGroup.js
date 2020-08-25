import gql from 'graphql-tag'

export const GET_EARN_DEDUCT_GROUPS = gql`

    {
        getEarnDeductGroups {
            _id
            name
            earnDeductsCount
            earnDeductIds {
                _id
                name
                groups {
                    _id
                    name
                }
            }
        }
    }

`

export const ADD_EARN_DEDUCT_GROUP = gql`

    mutation (
        $name: String!
        $earnDeductIds: [ID]!
    ) {
        addEarnDeductGroup(
            info: {
                name: $name
                earnDeductIds: $earnDeductIds
            }
        ) {
            _id
            name
            earnDeductsCount
        }
    }

`

export const UPDATE_EARN_DEDUCT_GROUP = gql`

    mutation(
        $earnDeductGroupId: ID!
        $name: String!
        $earnDeductIds: [ID]!
    ) {
        updateEarnDeductGroup(
            info: {
                earnDeductGroupId: $earnDeductGroupId
                name: $name
                earnDeductIds: $earnDeductIds
            }
        ) {
            _id
            name
            earnDeductsCount
            earnDeductIds {
                _id
                name
            }
        }
    }

`

export const DELETE_EARN_DEDUCT_GROUP = gql`

    mutation(
        $earnDeductGroupId: ID!
    ) {
        deleteEarnDeductGroup (earnDeductGroupId: $earnDeductGroupId)
    }

`