export const getHost = () => {
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin
  } else {
    return 'https://' + process.env.BASE_DOMAIN
  }
}