import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/getstart',
    name: 'getstart',
    component: () => import(/* webpackChunkName: "getstart" */ '../views/GetStart.vue')
  },
  {
    path: '/department',
    name: 'department',
    component: () => import(/* webpackChunkName: "department" */ '../views/Department.vue')
  },
  {
    path: '/position',
    name: 'position',
    component: () => import(/* webpackChunkName: "position" */ '../views/Position.vue')
  },
  {
    path: '/employee',
    name: 'employee',
    component: () => import(/* webpackChunkName: "Employee" */ '../views/Employee.vue')
  },
  {
    path: '/document-template',
    name: 'document_template',
    component: () => import(/* webpackChunkName: "template" */ '../views/DocumentTemplate.vue')
  },
  {
    path: '/employee',
    name: 'add_employee',
    component: () => import(/* webpackChunkName: "add_employee" */ '../views/AddEmployee.vue'),
    children:[
      {
        path: 'edit_basic_detail/:id',
        name: 'edit_basic_detail',
        component: () => import(/* webpackChunkName: "basic_detail" */ '@coms/Employee/basic-detail.vue')
      },
      {
        path: 'add_basic_detail',
        name: 'basic_detail',
        component: () => import(/* webpackChunkName: "basic_detail" */ '@coms/Employee/basic-detail.vue')
      },
      {
        path: 'hiring_detail/:id',
        name: 'hiring_detail',
        component: () => import(/* webpackChunkName: "hiring_detail" */ '@coms/Employee/hiring-detail.vue')
      },
      {
        path: 'earning/:id',
        name: 'earning',
        component: () => import(/* webpackChunkName: "earning" */ '@coms/Employee/earning.vue')
      },
      {
        path: 'document/:id',
        name: 'document',
        component: () => import(/* webpackChunkName: "document" */ '@coms/Employee/document.vue')
      }
    ]
  },
  {
    path: '/payroll_list',
    name: 'payroll_list',
    component: () => import(/* webpackChunkName: "payroll" */ '../views/PayrollList.vue'),
  },

  {
    path: '/payroll-calculation',
    name: 'payroll_calculation',
    component: () => import(/* webpackChunkName: "calculate_earning_deduction" */ '../views/PayrollCalculation.vue'),
    children:[
      {
        path: 'calculate-earning-deduction/:id',
        name: 'calculate_earning_deduction',
        component: () => import(/* webpackChunkName: "calculate_earning_deduction" */ '../components/PayrollCalculation/Deductible/deductible-detail.vue')
      },
      {
        path: 'calculate-payroll/:id',
        name: 'calculate_payroll',
        component: () => import(/* webpackChunkName: "calculate_earning_deduction" */ '../components/PayrollCalculation/Payroll/payroll-detail.vue')
      },
      {
        path: 'calculate-overtime/:id',
        name: 'calculate_overtime',
        component: () => import(/* webpackChunkName: "calculate_overtime" */ '../components/PayrollCalculation/Overtime/overtime-detail.vue')
      },
    ]
  },

  {
    path: '/report',
    name: 'report',
    component: () => import('../views/Report.vue')
  },
  {
    path: '/company-setup',
    name: 'company_setup',
    component: () => import('../views/CompanySetup.vue'),
    children:[
      {
        path: 'company-info',
        name: 'company_info',
        component: () => import('@coms/CompanySetup/company-info.vue')
      },
      {
        path: 'company-work-location',
        name: 'company_work_location',
        component: () => import('@coms/CompanySetup/company-work-location.vue')
      },
      {
        path: 'company-work-group',
        name: 'company_work_group',
        component: () => import('@coms/CompanySetup/company-work-group.vue')
      },
      {
        path: 'company-overtime',
        name: 'company_overtime',
        component: () => import('@coms/CompanySetup/company-overtime.vue')
      },
      {
        path: 'company-deductible',
        name: 'company_deductible',
        component: () => import('@coms/CompanySetup/company-deductible.vue')
      },
      {
        path: 'company-tax',
        name: 'company_tax',
        component: () => import(/* webpackChunkName: "company_tax" */ '@coms/CompanySetup/company-tax.vue')
      },
      {
        path: 'company-sso',
        name: 'company_sso',
        component: () => import(/* webpackChunkName: "company_sso" */ '@coms/CompanySetup/company-sso.vue')
      },
      {
        path: 'company-currency',
        name: 'company_currency',
        component: () => import(/* webpackChunkName: "company_currency" */ '@coms/CompanySetup/company-currency.vue')
      },
      {
        path: 'company-payroll-rule',
        name: 'company_payroll-rule',
        component: () => import(/* webpackChunkName: "company_payroll-rule" */ '@coms/CompanySetup/company-payroll-rule.vue')
      },
      {
        path: 'company-expat',
        name: 'company_expat',
        component: () => import(/* webpackChunkName: "company_expat" */ '@coms/CompanySetup/company-expat.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
