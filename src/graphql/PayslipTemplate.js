import gql from 'graphql-tag'

export const GET_PAYSLIP_TEMPLATE = gql`

{
  getPayslipTemplate {
    _id
    payslip {
      link
      src
      size
    }
    isDefault
  }
}

`

export const ADD_OR_UPDATE_PAYSLIP_TEMPLATE = gql`

mutation (
  $fileInput: AddFileInput
  $isDefault: Boolean!
) {
  addOrUpdatePayslipTemplate(fileInput: $fileInput isDefault: $isDefault)
}

`