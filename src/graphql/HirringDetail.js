import gql from 'graphql-tag'

export const GET_HIRRING_DETAIL = gql`

    query (
        $employeeId: ID!
    ) {
        getHirringDetail(
            employeeId: $employeeId
        ) {
            _id

            employeeId
            provinceId
            dateOfJoining
            probationEndDate
            positionId
            workingDay
            currencyId
            salary

            workPermit {
                startDate
                endDate
                daysOfNotify
            }
            isOpenContract
            contractEndDate
        }
    }


`

export const ADD_OR_UPDATE_HIRRING_DETAIL = gql`

    mutation (
        $employeeId: ID!
        $provinceId: ID!
        $dateOfJoining: Date!
        $probationEndDate: Date!
        $positionId: ID!
        $workingDay: Int!
        $currencyId: ID!
        $salary: Int!


        $isOpenContract: Boolean!
        $workPermit: WorkPermitInput!
        $contractEndDate: Date
    ) {
        addOrUpdateHirringDetail(
            info: {
                employeeId: $employeeId

                provinceId: $provinceId
                dateOfJoining: $dateOfJoining
                probationEndDate: $probationEndDate
                positionId: $positionId
                workingDay: $workingDay
                currencyId: $currencyId
                salary: $salary

                workPermit: $workPermit
                contractEndDate: $contractEndDate
                isOpenContract: $isOpenContract
            }
        ) {
            _id

            employeeId
            provinceId
            dateOfJoining
            probationEndDate
            positionId
            workingDay
            currencyId
            salary

            workPermit {
                startDate
                endDate
                daysOfNotify
            }
            isOpenContract
            contractEndDate
        }
    }

`