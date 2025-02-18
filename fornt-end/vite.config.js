import { defineConfig } from 'vite'
import path from 'path'

// 导出vite配置
export default defineConfig({
  // 路径别名配置
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },

  server: {
    allowedHosts: ['howffypcibjc.sealoshzh.site']
  }
})
