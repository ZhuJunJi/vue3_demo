import type { MockConfig } from 'vite-plugin-mock'
import type { LoginReq, LoginRes } from "@/api/user/type"
import type { ApiResult } from '@/types'

export default (config?: MockConfig) => {

  interface User {
    id: number,
    username: string,
    password?: string,
  }

  const users: Array<User> = [
    { id: 1, username: 'admin', password: '123456' },
    { id: 2, username: 'x', password: '123456' },
    { id: 3, username: 'Vue3', password: '123456' },
  ]

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
    {
      url: '/dev-api/user/login',
      method: 'post',
      response: ({ body }: { body: LoginReq }) => {
        const { username, password } = body

        const result: ApiResult<LoginRes> = {
          code: 0,
          message: 'ok',
          data: { token: "token 123456" },
        }

        for (const user of users) {
          if (user.username === username && user.password === password) {
            return result
          }
        }

        result.code = 1
        result.message = '登录失败，账号密码错误'
        return result
      },
    },
    {
      url: '/dev-api/user/info',
      method: 'get',
      response: () => {
        return {
          code: 0,
          message: 'ok',
          data: { id: 1, username: "Vue3" },
        } as ApiResult<User>
      },
    },
  ]
}
