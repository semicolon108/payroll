import gql from 'graphql-tag'

export const GET_CUSTOM_FORMULAS = gql`

    {
    getCustomFormulas {
        name
        formulas
    }
    }


`