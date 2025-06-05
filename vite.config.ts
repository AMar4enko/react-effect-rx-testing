import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@tests': path.resolve(__dirname, './tests'),
      },
    },
    test: {
      globals: true,
      environment: 'happy-dom',
    },
    build: {
      emptyOutDir: false,
      sourcemap: mode === 'development' ? 'hidden' : false,
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].[ext]`,
        },
      },
    },
    plugins: [react()],
  }
})
