import gql from 'graphql-tag'

export const GET_MONTHLY_DOCUMENTS = gql`

    query(
        $monthlyPaymentId: ID!
    ) {
        getMonthlyDocuments(
            monthlyPaymentId: $monthlyPaymentId
        ) {
            _id
            name
            monthlyPaymentId {
                _id
                isApproved
                paymentDate
            }
            fileId {
                _id
                name
                src
                size
            }
        }
    }

`