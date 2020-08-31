import gql from "graphql-tag";

export const ADD_OR_UPDATE_ACTUAL_WORKING_DAY = gql`

    mutation(
        $monthlyPaymentId: ID!
        $employeeId: ID!
        $workingDay: Int!

    ) {
        addOrUpdateActualWorkingDay(
            info: {
                monthlyPaymentId: $monthlyPaymentId
                employeeId: $employeeId
                workingDay: $workingDay
            }
        ) {
            workingDay
        }
    }

`