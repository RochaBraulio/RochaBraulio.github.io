import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

export default defineConfig(({ mode }) => {
  console.log("Vite mode:", mode);

  return {
    base: "/", // Adjust base for production

    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    
    server: {
      host: '::',
      port: 8080,
    },

    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'), // Ensure it's pointing to the right entry file
      },
    },
  };
});
