import type { MockConfig } from 'vite-plugin-mock'
import type { LoginReq, LoginRes, User } from "@/api/user/type"
import type { ApiResult } from '@/api/ApiResult'

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

        if (username === 'admin' && password === '123456') {
          return result
        }

        result.code = 1
        result.message = '登录失败，账号密码错误'
        return result
      },
    },
    {
      url: '/dev-api/user/info',
      method: 'get',
      response: ({ query }: { query: { id: string } }) => {
        console.log("获取用户信息 id:", query.id)
        return {
          code: 0,
          message: 'ok',
          data: { username: "x", age: 20, address: "xxx" },
        } as ApiResult<User>
      },
    },
  ]
}
