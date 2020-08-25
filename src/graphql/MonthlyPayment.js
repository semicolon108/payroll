import gql from 'graphql-tag'

export const GET_MONTHLY_PAYMENTS = gql`

    {
      getMonthlyPayments {
        _id
        paymentDate
        isApproved
      }
    }

`