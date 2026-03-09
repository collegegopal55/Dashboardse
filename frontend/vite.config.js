// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { resolve } from 'path'

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   base: './', // Important for relative paths
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//       },
//       output: {
//         assetFileNames: 'assets/[name].[hash][extname]',
//       },
//     },
//   },
//   publicDir: 'public',
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),
//     },
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // Important for relative paths
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to avoid CORS
      '/api': {
        target: 'https://pezzi.in',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/application/index.php'),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxying:', req.method, req.url);
          });
        },
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: 'assets/[name].[hash][extname]',
      },
    },
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})