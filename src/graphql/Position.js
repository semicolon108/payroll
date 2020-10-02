import gql from 'graphql-tag'

export const GET_POSITIONS = gql`

    {
        getPositions {
            _id
            name
            departmentId {
                _id
                name
            }
            employeesCount
        }
    }

`

export const ADD_POSITION = gql`

    mutation (
        $departmentId: ID!
        $name: String!
    ) {
        addPosition(
            departmentId: $departmentId
            name: $name
        ) {
            _id
            name
            departmentId {
                _id
                name
            }
        }
    }

`

export const UPDATE_POSITION = gql`

    mutation(
        $positionId: ID!
        $name: String!
        $departmentId: ID!
    ) {
        updatePosition(
            positionId: $positionId
            name: $name
            departmentId: $departmentId
        ) {
            _id
            name
            departmentId {
                _id
                name
            }
        }
    }

`

export const DELETE_POSITION = gql`

    mutation (
        $positionId: ID!
    ) {
        deletePosition(
            positionId: $positionId
        )
    }

`