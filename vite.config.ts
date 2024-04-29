import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {

  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        logger: true,
        enable: mode === 'development'
      }),
      VueSetupExtend(),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "@/styles/variable.scss";@import "@/styles/reset.scss";'
        }
      }
    },
    server: {
      host: "zhujunji.com",
      port: 80,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVER,
          // 是否代理跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
