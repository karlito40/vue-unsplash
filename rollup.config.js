import babel from 'rollup-plugin-babel';

const globals = {
  'vue': 'Vue',
};

export default {
  external: ['vue'],
  input: 'src/index.js',
  output: [
    {
      name: 'VueUnsplash',
      file: 'dist/index.umd.js',
      format: 'umd',
      globals
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
      globals
    },
    {
      name: 'VueUnsplash',
      file: 'dist/index.min.js',
      format: 'iife',
      globals
    },
  ],
  plugins: [
    babel({exclude: 'node_modules/**'})
  ]
};