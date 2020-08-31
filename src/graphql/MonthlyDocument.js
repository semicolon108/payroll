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

export const ADD_MONTHLY_DOCUMENT = gql`

    mutation(
        $monthlyPaymentId: ID!
        $name: String!
        $fileInput: AddFileInput!
    ) {
        addMonthlyDocument(
            info: {
                monthlyPaymentId: $monthlyPaymentId
                name: $name
                fileInput: $fileInput
            }
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

export const DELETE_MONTHLY_DOCUMENT = gql`

    mutation(
        $monthlyDocumentId: ID!
    ) {
        deleteMonthlyDocument(
            monthlyDocumentId: $monthlyDocumentId
        )
    }

`

