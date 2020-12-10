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
      dateOfJoining
      probationEndDate
      positionId
      workingDayGroupId
      workingLocationId
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
      beforeCurrency
      afterCurrency
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
        $dateOfJoining: Date!
        $workingDayGroupId: ID!
        $workingLocationId: ID!
        $currencyId: ID!
        $salary: Int!
        $salaryGrade: String
        $positionId: ID!


        $isOpenContract: Boolean!
        $workPermit: WorkPermitInput!
        
        $contractEndDate: Date
        $probationEndDate: Date
  $resignationDate:  Date
    ) {
        addOrUpdateHiringDetail(
            info: {
                employeeId: $employeeId
              positionId: $positionId

                dateOfJoining: $dateOfJoining
                probationEndDate: $probationEndDate
                workingDayGroupId: $workingDayGroupId
              workingLocationId: $workingLocationId
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
            dateOfJoining
            probationEndDate
            positionId
            workingDayGroupId
          workingLocationId
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