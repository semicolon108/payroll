import gql from "graphql-tag";

export const GET_COMPANY = gql`

    {
        getCompany {
            _id
            name
        }
    }

`