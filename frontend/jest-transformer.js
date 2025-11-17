const { transformSync } = require('esbuild');

module.exports = {
  process(sourceText, sourcePath) {
    const { code, map } = transformSync(sourceText, {
      loader: 'jsx',
      format: 'cjs',
      target: 'es2018',
      sourcefile: sourcePath,
      sourcemap: true,
    });

    return { code, map };
  },
};
