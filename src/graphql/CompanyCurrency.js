import gql from 'graphql-tag'

export const GET_COMPANY_CURRENCIES = gql`

    {
        getCompanyCurrencies {
            _id
            isMulti
            currencies {
                currencyId {
                    _id
                    name
                }
                amount
            }
        }
    }

`

export const ADD_OR_UPDATE_COMPANY_CURRENCY = gql`

    mutation (
        $info: AddOrUpdateCompanyCurrencyInput!
    ) {
        addOrUpdateCompanyCurrency(
            info: $info
        )
    }

`