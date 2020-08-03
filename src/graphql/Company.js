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
                industry
            }
            contactPerson {
                name
                email
                mobile
            }
            financialInfo {
                bankId {
                    _id
                    name
                }
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
            expatManager {
                notificationEmail
                noticePeriodDay
            }
            isHiringExpat
            private {
                sso
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
                industry
            }
            contactPerson {
                name
                email
                mobile
            }
            financialInfo {
                bankId {
                    _id
                    name
                }
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
            isHiringExpat
            private {
                sso
            }
        }
    }

`