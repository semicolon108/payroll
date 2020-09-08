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
    path: '/deductable',
    name: 'deductable',
    component: () => import(/* webpackChunkName: "deductable" */ '../views/Deductable.vue'),
    children:[
      {
        path: '',
        name: 'deductable_list',
        component: () => import(/* webpackChunkName: "template" */ '../components/Deductible/deductible-list.vue')
      },
      {
        path: 'detail/:id',
        name: 'deductable_detail',
        component: () => import(/* webpackChunkName: "template" */ '../components/Deductible/deductible-detail.vue')
      },
    ]
  },
  {
    path: '/template',
    name: 'template',
    component: () => import(/* webpackChunkName: "template" */ '../views/Template.vue')
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
        path: 'basic_detail',
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
    path: '/payroll',
    name: 'payroll',
    component: () => import(/* webpackChunkName: "payroll" */ '../views/Payroll.vue'),
    children:[
      {
        path: '',
        name: 'payrollList',
        component: () => import(/* webpackChunkName: "payrollList" */ '../components/Payroll/payroll-list.vue')
      },
      {
        path: '/payroll-calculation/:id',
        name: 'payrollCalculation',
        component: () => import(/* webpackChunkName: "payrollCalculation" */ '../components/Payroll/payroll-calculation.vue')
      },
    ]
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "report" */ '../views/Report.vue')
  },
  {
    path: '/company-setup',
    name: 'company_setup',
    component: () => import(/* webpackChunkName: "company_setup" */ '../views/CompanySetup.vue'),
    children:[
      {
        path: 'company-info',
        name: 'company_info',
        component: () => import(/* webpackChunkName: "company_info" */ '@coms/CompanySetup/company-info.vue')
      },
      {
        path: 'company-workday',
        name: 'company_workday',
        component: () => import(/* webpackChunkName: "company_workday" */ '@coms/CompanySetup/company-workday.vue')
      },
      {
        path: 'company-deductible',
        name: 'company_deductible',
        component: () => import(/* webpackChunkName: "company_deductible" */ '@coms/CompanySetup/company-deductible.vue')
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
