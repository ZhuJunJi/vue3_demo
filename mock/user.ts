import type { MockConfig } from 'vite-plugin-mock'

export default (config?: MockConfig) => {

  return [
    {
      url: '/dev-api/createUser',
      method: 'post',
      response: ({ body, query }: any) => {
        console.log('body>>>>>>>>', body)
        console.log('query>>>>>>>>', query)
        console.log('config.ent>>>>>>>>', config?.env)

        return {
          code: 0,
          message: 'ok',
          data: { a: 21, 'import.meta.url': import.meta.url },
        }
      },
    },
  ]
}
