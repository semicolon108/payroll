import gql from 'graphql-tag'

export const GET_CUSTOM_FORMULAS = gql`

    {
        getCustomFormulas {
          _id
            name
            formulas
            isFinalNetPay
            round
            sortByFormula
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
  $info: AddCustomFormulaInput!
 
) {
  addCustomFormula(
    info: $info
  )
}


`




export const DELETE_CUSTOM_FORMULA = gql`

mutation (
  $customFormulaId: ID!
 
) {
  deleteCustomFormula(
    customFormulaId: $customFormulaId
  )
}


`