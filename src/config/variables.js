

const isProd = process.env.NODE_ENV === 'production' ? true : false

export const baseURL = isProd ? 'https://108.laofix.com' : 'http://localhost:4000'