import gql from 'graphql-tag'

export const GET_WORKING_LOCATIONS = gql`

{
  getWorkingLocations {
    _id
    name
    provinceId {
      _id
      name
    }
    employeesCount
  }
}

`

export const ADD_WORKING_LOCATION = gql`


mutation(
  $name: String!
  $provinceId: ID!
) {
  addWorkingLocation(
    name: $name
    provinceId: $provinceId
  )
}


`

export const UPDATE_WORKING_LOCATION = gql`

mutation(
  $workingLocationId: ID!
  $name: String!
  $provinceId: ID!
) {
  updateWorkingLocation(
    workingLocationId: $workingLocationId
    name: $name
    provinceId: $provinceId
  )
}

`

export const DELETE_WORKING_LOCATION = gql`

    mutation(
    $workingLocationId: ID!
    ) {
    deleteWorkingLocation(
        workingLocationId: $workingLocationId
    )
    }

`



