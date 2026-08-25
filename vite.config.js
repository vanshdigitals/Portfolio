import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore cloud-sync temp files (Google Drive .~tmp, OneDrive ~$, etc.)
      // These lock and unlock rapidly during sync and crash Vite's FSWatcher.
      ignored: [
        '**/*.~tmp',
        '**/*.tmp',
        '**/~$*',
        '**/.~*',
      ],
    },
  },
})
