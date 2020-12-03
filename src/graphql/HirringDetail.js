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
            salaryGrade

            workPermit {
                startDate
                endDate
                daysOfNotify
            }
            isOpenContract
            contractEndDate
            resignationDate
            isResigned
            salaryHistories {
                type
                refDate
                adjustmentAmount
                beforeAdjustment
                afterAdjustment
                memo
            }
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
        $salaryGrade: String


        $isOpenContract: Boolean!
        $workPermit: WorkPermitInput!

        $contractEndDate: Date
        $probationEndDate: Date
        $resignationDate:  Date
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
                salaryGrade: $salaryGrade

                workPermit: $workPermit
                contractEndDate: $contractEndDate
                isOpenContract: $isOpenContract
                resignationDate: $resignationDate
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
            salaryGrade


            workPermit {
                startDate
                endDate
                daysOfNotify
            }
            isOpenContract
            contractEndDate
            resignationDate
            salaryHistories {
                type
                refDate
                adjustmentAmount
                beforeAdjustment
                afterAdjustment
                memo
            }

        }
    }

`


export const ADJUST_SALARY = gql`

    mutation (
        $info: AdjustSalaryInput
    ) {
        adjustSalary(info: $info)
    }
    
`