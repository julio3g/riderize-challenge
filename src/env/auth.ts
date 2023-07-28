export const auth = {
  secretJwt: process.env.SECRET_TOKEN || 'default',
  expiresToken: '6h',
}
