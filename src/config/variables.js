
 const isProd = process.env.NODE_ENV === 'production' && true
//const isProd = true




export const loadingTimeout = 100

export const logoutURL =
  // 'http://auth.hr-sabai.com'
  isProd ? 'http://payroll-auth.hr-sabai.com' : 'http://localhost:3000'

export const baseURL =
  // 'https://hr-sabai.com'

  isProd ? 'https://payroll-server.hr-sabai.com' : 'http://localhost:4000'

