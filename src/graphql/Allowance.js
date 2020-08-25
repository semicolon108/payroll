import gql from "graphql-tag"

export const GET_ALLOWANCE = gql`

    query(
        $employeeId: ID!
    ) {
        getAllowance(
            employeeId: $employeeId
        ) {
            _id
            earnDeductGroupId {
                _id
                name
            }
            allowances {
                earnDeductId {
                    _id
                    name
                    groups {
                        _id
                        name
                    }
                }
                amount
            }
        }
    }
    
`

export const ADD_OR_UPDATE_ALLOWANCE = gql`

    mutation (
        $employeeId: ID!
        $earnDeductGroupId: ID!
        $allowances: [AllowanceInput]!
    ) {
        addOrUpdateAllowance(
            info: {
                employeeId: $employeeId
                earnDeductGroupId: $earnDeductGroupId
                allowances: $allowances
            }
        ) {
            _id
            earnDeductGroupId {
                _id
                name
            }
            allowances {
                earnDeductId {
                    _id
                    name
                }
                amount
            }
        }
    }

`