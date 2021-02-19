module.exports = function(eleventyConfig) {

    // set options for markdown-it md parsing library
    const markdownIt = require('markdown-it')({
      html: true,
      breaks: false,
      linkify: true,
      typographer: true
    })

    eleventyConfig.setDataDeepMerge(true);
    // set above instance as md parsing library
    eleventyConfig.setLibrary("md", markdownIt);
        
    // set layouts directory (always within includes)
    eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
    eleventyConfig.addLayoutAlias('single', 'layouts/single.html');
    eleventyConfig.addLayoutAlias('splash', 'layouts/splash.html');

    eleventyConfig.addPassthroughCopy('src/assets');
    eleventyConfig.addPassthroughCopy({'src/icons/*': '/'});

    eleventyConfig.addWatchTarget("src/sass/");

    eleventyConfig.addFilter('thumbify', function (d) {
        let out = (d !== undefined) ? 
          `thumbs/${d.split('.')[0]}-sm.${d.split('.')[1]}` : '';
        return out;
    });
    // extend md parsing library to a template filter,
    // more or less reproducing Jekyll's markdownify
    eleventyConfig.addFilter("markdownify", d => markdownIt.render(d || ''));

    return {
      // set input and output paths
      dir: {
        input: "src",
        output: "dist"
      },
      
      // pathPrefix: "/hyper-local/"
    };
  };