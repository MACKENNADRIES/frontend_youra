import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  build: {
    rollupOptions: {
      external: [
        '/assets/initiator.png',
        '/assets/sustainer.png',
        '/assets/visionary.png',
        '/assets/creator.png',
        '/assets/innovator.png',
        '/assets/accelerator.png',
        '/assets/transformer.png',
        '/assets/healer.png',
        '/assets/orchestrator.png',
        '/assets/harmoniser.png',
        '/assets/default-badge.png',
      ],
    },
  },
});
