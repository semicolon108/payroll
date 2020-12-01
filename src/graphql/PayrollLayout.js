import gql from 'graphql-tag'

export const GET_PAYROLL_LAYOUTS = gql`

    {
        getPayrollLayouts {
            _id
            name
            layouts
        }
    }

`


export const GET_DEFAULT_LAYOUT = gql`

    {
        getDefaultLayout {
            _id
            name
            layouts
            isDefault
        }
    }

`


export const ADD_PAYROLL_LAYOUT= gql`

    mutation (
        $name: String
        $layouts: [String]
    ) {
        addPayrollLayout(layouts: $layouts name: $name)
    }
    
`


export const UPDATE_PAYROLL_LAYOUT = gql`

    mutation (
        $payrollLayoutId: ID
        $name: String
        $layouts: [String]
    ) {
        updatePayrollLayout(payrollLayoutId: $payrollLayoutId layouts: $layouts name: $name)
    }

`

export const SET_DEFAULT_LAYOUT = gql`

    mutation (
        $payrollLayoutId: ID
    ) {
        setDefaultLayout(payrollLayoutId: $payrollLayoutId)
    }

`


export const DELETE_PAYROLL_LAYOUT = gql`

    mutation (
        $payrollLayoutId: ID
    ) {
        deletePayrollLayout(payrollLayoutId: $payrollLayoutId)
    }

`