
const isProd = process.env.NODE_ENV === 'production' && true

export const loadingTimeout = 600

export const logoutURL = isProd ? 'https://auth-payroll.sabai.la' : 'http://localhost:3000'

export const baseURL = isProd ? 'https://payroll.sabai.la' : 'http://localhost:4000'