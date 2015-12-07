var appRoot = 'src/';
var outputRoot = 'dist/';
var exporSrvtRoot = 'export/';
var assetsRoot = 'assets/';

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.js',
  html: appRoot + '**/*.html',
  scss: appRoot + assetsRoot + 'styles/**/*.scss',
  fonts: appRoot + assetsRoot + 'fonts/*.*',
  images: appRoot + assetsRoot + 'images/*.*',
  output: outputRoot,
  stylesOutput: assetsRoot + 'css/',
  fontsOutput: assetsRoot + 'fonts/',
  imagesOutput: assetsRoot + 'images/',
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/*.js',
  e2eSpecsDist: 'test/e2e/dist/'
};
