const filters = require("./filters.js");

module.exports = function(eleventyConfig) {

  eleventyConfig.setTemplateFormats([
		"js",
		"css",
    "md",
    "html",
    "njk",
	]);
  // Passthrough copy for static files
  eleventyConfig.addPassthroughCopy("src/json-editor");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");


  // Add custom filter for next lesson
  eleventyConfig.addNunjucksFilter("nextLesson", function(currentLessonId) {
    const lessons = require("./src/_data/lessons.json").lessons;
    return filters.nextLesson(lessons, currentLessonId);
  });

  // Add custom collection for lessons
  eleventyConfig.addCollection("lessons", function(collectionApi) {
    return require("./src/_data/lessons.json").lessons.map(lesson => ({
      ...lesson,
      url: `lessons/${lesson.id}.html`
    }));
  });

  // Add custom collection for quizzes
  eleventyConfig.addCollection("quizzes", function(collectionApi) {
    const quizzes = require("./src/_data/quizzes.json").quizzes;
    return Object.keys(quizzes).map(quizId => ({
      id: quizId,
      questions: quizzes[quizId],
      url: `quizzes/${quizId}.html`
    }));
  });

  eleventyConfig.on('afterBuild', () => {
    console.log('Files in json-editor directory should be copied to _site/json-editor');
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
