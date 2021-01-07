import gql from 'graphql-tag'

export const GET_CUSTOM_FORMULAS = gql`

    {
    getCustomFormulas {
        name
        formulas
        isFinalNetPay
        round
    }
    }

`

export const ADD_CUSTOM_FORMULA = gql`

mutation (
  $name: String!
  $formulas: [String!]!
) {
  addCustomFormula(
    name: $name
    formulas: $formulas
  )
}

`