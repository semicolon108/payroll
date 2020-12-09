import gql from 'graphql-tag'

export const GET_WORKING_DAY_GROUPS = gql`

{
  getWorkingDayGroups {
    _id
    name
    workingDay
    OTBase
    employeesCount
  }
}

`

export const ADD_WORKING_DAY_GROUP = gql`

    mutation (
    $name: String!
        $workingDay: Int!
    $OTBase: Int!
    ) {
    addWorkingDayGroup(
        workingDay: $workingDay
        name: $name
        OTBase: $OTBase
    )
    }

`

export const UPDATE_WORKING_DAY_GROUP = gql`

    mutation (
    $workingDayGroupId: ID!
        $name: String!
    $workingDay: Int!
    $OTBase: Int!
    ) {
    updateWorkingDayGroup(
        workingDayGroupId: $workingDayGroupId
        workingDay: $workingDay
        name: $name
        OTBase: $OTBase
    )
    }

`

export const DELETE_WORKING_DAY_GROUP = gql`

mutation (
  $workingDayGroupId: ID
) {
  deleteWorkingDayGroup(
    workingDayGroupId: $workingDayGroupId
  )
}

`