import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
      proxy: {
        // Part search endpoints -> my.chip1.com
        '/api/transaction': {
          target: 'https://my.chip1.com',
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (_proxyReq, req) => {
              const targetUrl = `${options.target}${req.url}`;
              console.log(`[DEBUG] Proxying ${req.url} to ${targetUrl}`);
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log(`[DEBUG] Proxy response for ${req.url}:`, proxyRes.statusCode);
            });
            proxy.on('error', (err) => {
              console.error('[DEBUG] Proxy error:', err.message);
            });
          },
        },
        // Part details endpoints -> crm.chip1.com
        '/api/part': {
          target: 'https://crm.chip1.com',
          changeOrigin: true,
          secure: false,
          configure: (proxy, options) => {
            proxy.on('proxyReq', (_proxyReq, req) => {
              const targetUrl = `${options.target}${req.url}`;
              console.log(`[DEBUG] Proxying ${req.url} to ${targetUrl}`);
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log(`[DEBUG] Proxy response for ${req.url}:`, proxyRes.statusCode);
            });
            proxy.on('error', (err) => {
              console.error('[DEBUG] Proxy error:', err.message);
            });
          },
        }
      }
  }
})
