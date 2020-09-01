import gql from 'graphql-tag'

export const GET_HIRRING_DETAIL = gql`

    query (
        $employeeId: ID!
    ) {
        getHirringDetail(
            employeeId: $employeeId
        ) {
            _id
            employeeId {
                _id
                firstName
            }
            provinceId {
                _id
                name
            }
            dateOfJoining
            probationEndDate
            positionId {
                _id
                name
            }
            workingDay
            salary
            contactTypeId {
                _id
                name
            }
            contactNumber
            startDate
            endDate
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
        $salary: Int!
        $contactTypeId: ID!
        $contactNumber: String!
        $startDate: Date!
        $endDate: Date!
    ) {
        addOrUpdateHirringDetail(
            info: {
                employeeId: $employeeId
                provinceId: $provinceId
                dateOfJoining: $dateOfJoining
                probationEndDate: $probationEndDate
                positionId: $positionId
                workingDay: $workingDay
                salary: $salary
                contactTypeId: $contactTypeId
                contactNumber: $contactNumber
                startDate: $startDate
                endDate: $endDate
            }
        ) {
            _id
            employeeId {
                _id
                firstName
            }
            provinceId {
                _id
                name
            }
            dateOfJoining
            probationEndDate
            positionId {
                _id
                name
            }
            contactTypeId {
                _id
                name
            }
            workingDay
            salary
            contactNumber
            startDate
            endDate
        }
    }

`