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
            mailer {
                name
                email
            }
        }
    }

`


export const UPDATE_COMPANY = gql`

    mutation (
        $info: CompanyInput!
    ) {
        updateCompany(
            info: $info
        ) {
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
            mailer {
                name
                email
            }
        }
    }

`