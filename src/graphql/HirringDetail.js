import gql from 'graphql-tag'

export const GET_HIRING_DETAIL = gql`

    query (
        $employeeId: ID!
    ) {
        getHiringDetail(
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

export const ADD_OR_UPDATE_HIRING_DETAIL = gql`

    mutation (
        $employeeId: ID!
        $provinceId: ID!
        $dateOfJoining: Date!

        $positionId: ID!
        $workingDay: Int!
        $currencyId: ID!
        $salary: Int!


        $isOpenContract: Boolean!
        $workPermit: WorkPermitInput!
        
        $contractEndDate: Date
        $probationEndDate: Date
    ) {
        addOrUpdateHiringDetail(
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