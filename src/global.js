export default {
  server: process.env.NODE_ENV === 'production'
  ? './repository/'
  : 'http://localhost:8000',
  orders: process.env.NODE_ENV === 'production'
  ? './orders/'
  : 'http://localhost:8000'
}