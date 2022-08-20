const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { pairedShortcode } = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");

module.exports = function(config) {
  config.addPlugin(syntaxHighlight);
  config.addPassthroughCopy("./src/css");

  // Creating collections for navigation
  config.addCollection('ingredients', collection => {
    return collection
      .getFilteredByGlob('./src/ingredients/*.md')
      .sort((a, b) => a.data.title.toLowerCase().localeCompare(b.data.title.toLowerCase()))
      .sort((a, b) => Number(b.data.overview) - Number(a.data.overview))
  });
  config.addCollection('recipes', collection => {
    return collection
      .getFilteredByGlob('./src/recipes/*.md')
      .sort((a, b) => a.data.title.toLowerCase().localeCompare(b.data.title.toLowerCase()))
      .sort((a, b) => Number(b.data.overview) - Number(a.data.overview))
  });
  config.addCollection('gettingStarted', collection => {
    return collection
      .getFilteredByGlob('./src/getting-started/*.md')
      .sort((a, b) => a.data.title.toLowerCase().localeCompare(b.data.title.toLowerCase()))
      .sort((a, b) => Number(b.data.overview) - Number(a.data.overview))
  });

  // Creating collections for overview pages
  config.addCollection('overviewIngredients', collection => {
    return collection
      .getFilteredByGlob('./src/ingredients/*.md')
      .filter(el => el.data.overview === false)
      .sort((a, b) => a.data.title.toLowerCase().localeCompare(b.data.title.toLowerCase()))
  });
  config.addCollection('overviewRecipes', collection => {
    return collection
      .getFilteredByGlob('./src/recipes/*.md')
      .filter(el => el.data.overview === false)
      .sort((a, b) => a.data.title.toLowerCase().localeCompare(b.data.title.toLowerCase()))
  });

  // Add code preview/markup example using a shortcode
  config.addPairedShortcode('example', (content, lang = 'html') => {
    return `<div class="my-4 border border-solid border-slate-200 rounded"><div class="p-4 border-b border-b-solid border-b-slate-200">${content}</div><div class="">${pairedShortcode(content, lang)}</div></div>`
  });

  // Post dates
  config.addFilter('toISOString', dateString => new Date(dateString).toISOString());
  config.addFilter("asPostDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist',
    }
  };
};