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

export const GET_CUSTOM_FORMULAS_BY_NAME = gql`

query(
  $name: String!
) {
  getCustomFormulasByName(name: $name)
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