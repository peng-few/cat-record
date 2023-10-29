const domain = process.env.NODE_ENV === "production" ? process.env.BASE_DOMAIN : process.env.VERCEL_URL
export const Host = 'https://' + process.env.BASE_DOMAIN