import gql from 'graphql-tag'

export const GET_OT_BY_MONTH = gql`

    query(
        $monthlyPaymentId: ID
    ) {
        getOTByMonth(
            monthlyPaymentId: $monthlyPaymentId
        ) {
            fullName
            employeeCode
            salary
            OTHours {
                rate
                hours
                amount
            }
            total
        }
    }

`


export const UPLOAD_OT = gql`
    mutation (
        $info: UploadOTInput
    ) {
        uploadOT(info: $info)
    }
`

export const CLEAR_OT = gql`

mutation (
  $monthlyPaymentId: ID!
) {
  clearOT(monthlyPaymentId: $monthlyPaymentId)
}

`