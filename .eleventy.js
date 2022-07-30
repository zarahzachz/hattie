
module.exports = function(config) {
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