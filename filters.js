module.exports = {
    nextLesson: function(lessons, currentLessonId) {
      const currentIndex = lessons.findIndex(lesson => lesson.id === currentLessonId);
      if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
        return lessons[currentIndex + 1].id;
      }
      return null; // No next lesson available
    }
  };
  