import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'build',
  clean: false,
  sourcemap: false,
  minify: false,
  treeshake: true
})