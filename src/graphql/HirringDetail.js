import gql from 'graphql-tag'

export const GET_HIRRING_DETAIL = gql`

    query (
        $employeeId: ID!
    ) {
        getHirringDetail(
            employeeId: $employeeId
        ) {
            _id
            isExpat
            employeeId
            provinceId
            dateOfJoining
            probationEndDate
            positionId
            workingDay
            currencyId
            salary
            contactDetail {
                contactTypeId
                mobile
                startDate
                endDate
            }
            workPermit {
                startDate
                endDate
                daysOfNotify
            }
        }
    }


`

export const ADD_OR_UPDATE_HIRRING_DETAIL = gql`

    mutation (
        $isExpat: Boolean!
        $employeeId: ID!
        $provinceId: ID!
        $dateOfJoining: Date!
        $probationEndDate: Date!
        $positionId: ID!
        $workingDay: Int!
        $currencyId: ID!
        $salary: Int!
        $contactDetail: ContactDetailInput!
        $workPermit: WorkPermitInput!
    ) {
        addOrUpdateHirringDetail(
            info: {
                isExpat: $isExpat
                employeeId: $employeeId

                provinceId: $provinceId
                dateOfJoining: $dateOfJoining
                probationEndDate: $probationEndDate
                positionId: $positionId
                workingDay: $workingDay
                currencyId: $currencyId
                salary: $salary
                contactDetail: $contactDetail
                workPermit: $workPermit
            }
        ) {
            _id
            isExpat
            employeeId
            provinceId
            dateOfJoining
            probationEndDate
            positionId
            workingDay
            currencyId
            salary
            contactDetail {
                contactTypeId
                mobile
                startDate
                endDate
            }
            workPermit {
                startDate
                endDate
                daysOfNotify
            }
        }
    }

`