import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'

function getHtmlEntries() {
  const htmlFiles = globSync('src/**/*.html')
  const entries = {}

  for (const file of htmlFiles) {
    // 使用正则表达式更精确地提取文件名
    const relativePath = file.replace(/^src\//, '').replace(/\.html$/, '')
    const entryName = relativePath.replace(/[\\/]/g, '-')
    
    entries[entryName] = resolve(process.cwd(), file)
  }

  return entries
}

export default defineConfig({
  root: 'src',
  publicDir: '../public', // 修正路径，通常public放在项目根目录
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    emptyOutDir: true, // 构建前清空输出目录
    rollupOptions: {
      input: getHtmlEntries(),
      output: {
        // 优化资源命名
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    },
    minify: 'terser', // 启用压缩
    sourcemap: process.env.NODE_ENV === 'development' // 开发环境才生成sourcemap
  },
  server: {
    port: 3000,
    open: true,
    host: true, // 允许局域网访问
    cors: true
  },
  preview: {
    port: 3001, // 预览服务器端口
    open: true
  },
  envPrefix: 'APP_', // 环境变量前缀
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src')
    }
  }
})
