import type { MockMethod } from 'vite-plugin-mock'
interface Query {
  id:number
}
export default [
  {
    url: '/api/getRoleById',
    method: 'get',
    response: ({ query }: { query: Query }) => {
      console.log('id>>>>>>>>', query.id)
      return {
        code: 0,
        message: 'ok',
        data: {
          roleName: 'admin',
          roleValue: 'admin',
        },
      }
    },
  },
  {
    url: '/api/testRestful/:id',
    method: 'get',
    response: ({ query }: { query: Query }) => {
      console.log('id>>>>>>>>', query.id)
      return {
        code: 0,
        message: 'ok',
        data: {
          roleName: 'admin',
          roleValue: 'admin',
        },
      }
    },
  },
] as MockMethod[]
