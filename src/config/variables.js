
 const isProd = process.env.NODE_ENV === 'production' && true
//const isProd = true




export const loadingTimeout = 100

export const logoutURL =
  // 'http://auth.hr-sabai.com'
  isProd ? 'http://auth.hr-sabai.com' : 'http://localhost:3000'

export const baseURL =
  // 'https://hr-sabai.com'

  isProd ? 'https://hr-sabai.com' : 'http://localhost:4000'

