

const isProd = process.env.NODE_ENV === 'production' && true

export const baseURL = isProd ? 'https://payroll.sabai.la' : 'http://localhost:4000'