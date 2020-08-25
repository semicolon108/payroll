import gql from "graphql-tag"

export const GET_DOCUMENTS = gql`

    query (
        $employeeId: ID!
    ) {
        getDocuments(
            employeeId: $employeeId
        ) {
            _id
            name
            fileId {
                _id
                name
                src
                size
            }
            createdAt
        }
    }
    
`

export const ADD_DOCUMENT = gql`

    mutation (
        $name: String!
        $fileInput: AddFileInput!
        $employeeId: ID!
    ) {
        addDocument(
            info: {
                name: $name
                fileInput: $fileInput
                employeeId: $employeeId
            }
        ) {
            _id
            name
            fileId {
                _id
                name
                src
                size
            }
        }
    }

`

export const DELETE_DOCUMENT = gql`

    mutation(
        $documentId: ID!
    ) {
        deleteDocument(
            documentId: $documentId
        )
    }

`