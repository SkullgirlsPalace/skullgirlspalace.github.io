import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.js'],
      exclude: [
        'src/data/movesimages.js', // 2287 lines - tested via getMoveData
        'src/data/newContent.js',  // Static data
      ],
      lines: 35,
      functions: 20,
      branches: 15,
      statements: 35
    }
  }
});
