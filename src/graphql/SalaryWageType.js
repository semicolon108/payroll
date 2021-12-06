import gql from 'graphql-tag'

export const GET_EMPS_BY_WAGE_TYPE = gql`
    
    query (
  $wageType: String!
  $monthlyPaymentId: ID!
) {
  getEmpsByWageType(wageType: $wageType monthlyPaymentId: $monthlyPaymentId) {
    employeeId
                employeeCode
              
                wageType
                mobile
                fullName
                fullNameLao
              
                position
                department
    
               defaultWorkingDay
                actualWorkingDay
    
                 basicSalary    
              thisMonthSalary
              
                earningBeforeTax
                earningAfterTax
                deductionBeforeTax
                deductionAfterTax
                calcDeductible
                deductibleBeforeTax
                deductibleAfterTax
              
              
                     
                salaryGrade
                startWorkingDate
             
                thisMonthSalary
                isExpat

           
                totalOTAmount
                totalDueAsTax
              
                ssoPaidByCom
                ssoPaidByEmp
                calcSso
                tax
  }
  
}
    
`