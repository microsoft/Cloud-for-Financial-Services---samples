import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        coverage:{
            reporter:['text', 'json', 'html']
        }
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name: '@fsi/appointment-starter-kit',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@fluentui/react'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    '@fluentui/react': '@fluentui/react',
                },
            },
        },
    },
});