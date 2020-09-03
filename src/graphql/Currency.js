import gql from 'graphql-tag'

export const GET_CURRENCY = gql`

    {
        getCurrencies {
            _id
            name
        }
    }
    
    
`