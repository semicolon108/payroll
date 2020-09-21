import gql from 'graphql-tag'

export const GET_DEPARTMENTS = gql`

    {
        getDepartments {
            _id
            name
            employeesCount
        }
    }

`

export const ADD_DEPRTMENT = gql`

    mutation (
        $name: String!
    ) {
        addDepartment(name: $name) {
            _id
            name
        }
    }

`

export const UPDATE_DEPARTMENT = gql`

    mutation (
        $departmentId: ID!
        $name: String!
    ) {
        updateDepartment(
            departmentId: $departmentId
            name: $name
        ) {
            _id
            name
        }
    }

`

export const DELETE_DEPARTMENT = gql`

    mutation(
        $departmentId: ID!
    ) {
        deleteDepartment(
            departmentId: $departmentId
        )
    }

`