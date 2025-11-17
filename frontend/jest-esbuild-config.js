const { createTransformer } = require('esbuild-jest');

module.exports = createTransformer({
  loader: 'jsx',
  target: 'es2018',
  format: 'cjs',
});
