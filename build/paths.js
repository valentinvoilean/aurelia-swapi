var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/';
var assetsRoot = 'assets/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  scss: appRoot + assetsRoot + 'styles/*.scss',
  output: outputRoot,
  stylesOutput: assetsRoot + 'css/',
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
