import gql from "graphql-tag";

export const GET_COMPANY = gql`

    {
        getCompany {
            _id
            isApprovedBeforeCalc
            isSsoPaidByCompany
            isTaxPaidByCompany
            workingDay
            basicInfo {
                name
                address
            }
            contactPerson {
                name
                email
                mobile
            }
            financialInfo {
                accountNumber
            }
            payrollRule {
                authorityName
                authorityEmail
                payrollManagerName
                payrollManagerEmail
            }

        }
    }

`