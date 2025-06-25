import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
// 自動引入套件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/variable.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: 'nwp',
      fileName: "index",
      formats: ['es', 'cjs'],
    },
    target: 'modules',
    // 打包文件目錄
    outDir: 'es',
    // 壓縮
    minify: true,
    //css 分离
    //cssCodeSplit: true,
    rollupOptions: {
      // 忽略打包 vue & element-plus
      external: ['vue', 'element-plus','vue-router'],
      input: ['index.js'],
      output: [
        {
          format: 'es',
          // 直接打包成 .js 
          entryFileNames: '[name].js',
          // 打包目錄跟原本的目錄對應
          preserveModules: true,
          exports: 'named',
          // 打包根目錄
          dir: resolve(__dirname, './ui/es'),
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          // 打包目錄跟原本的目錄對應
          preserveModules: true,
          exports: 'named',
          // 打包根目錄
          dir: resolve(__dirname, './ui/lib'),
        },
      ],
    }
  }
})
