import gql from 'graphql-tag'

export const GET_REUSES = gql`
    
    query (
        $type: String!
    ) {
        getReuses(
            type: $type
        ) {
            _id
            name
        }
    }
    
`