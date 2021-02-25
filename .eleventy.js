const fs = require('fs-extra');
const sass = require('sass');
const MarkdownIt = require('markdown-it');
const settings = require('./settings.json');

module.exports = function(eleventyConfig) {

  /* * * settings * * */
  let md = new MarkdownIt({
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  });

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.setLibrary('md', md);
  eleventyConfig.addWatchTarget('src/_sass/');

  /* * * layout aliases * * */
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
  eleventyConfig.addLayoutAlias('single', 'layouts/single.html');
  eleventyConfig.addLayoutAlias('splash', 'layouts/splash.html');

  /* * * passthrough paths * * */
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy( {'src/icons/*': '/'} );
  eleventyConfig.addPassthroughCopy( {
    'node_modules/viewerjs/dist/*min.js': '/assets/js/'
  } );
  eleventyConfig.addPassthroughCopy( {
    'node_modules/viewerjs/dist/*min.css': '/assets/css/'
  } );

  /* * * filters * * */
  eleventyConfig.addFilter('thumbify', (d) => {
    let out = (d !== undefined) 
      ? `thumbs/${d.split('.')[0]}-sm.${d.split('.')[1]}` 
      : '';
    return out;
  });
  // [h/t @edjw](https://edjohnsonwilliams.co.uk/2019/05/04/replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy/)
  eleventyConfig.addFilter('markdownify', d => md.render(d || '') );

  eleventyConfig.on('beforeBuild', () => {
    // Compile Sass
    let result = sass.renderSync({
      file: 'src/_sass/main.scss',
      sourceMap: false,
      outputStyle: 'expanded',
    });
    console.log('SCSS compiled 💪');
    fs.outputFile('dist/assets/css/main.css', result.css)
  });

  /* * * return build * * */
  return {
    // set input and output paths
    
    dir: {
    input: settings.build.inputDirectory,
    output: settings.build.outputDirectory
  },

    pathPrefix: settings.build.pathPrefix
  };
};