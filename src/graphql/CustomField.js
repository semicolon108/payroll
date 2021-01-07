import gql from 'graphql-tag'

export const GET_CUSTOM_FIELDS = gql`

    {
        getCustomFields {
            _id
            fields
        }
    }        

`



export const ADD_CUSTOM_FIELD = gql`

    mutation (
        $fields: [String!]!
        ) {
        addCustomField(
            fields: $fields
        )
    }

`