// src/utils/timeOfDay.js
export function getTimeBasedSuggestions() {
  const hour = new Date().getHours();
  let timeOfDay = "";
  let suggestionType = "";

  if (hour >= 5 && hour < 11) {
    timeOfDay = "morning";
    suggestionType = "breakfast";
  } else if (hour >= 11 && hour < 16) {
    timeOfDay = "afternoon";
    suggestionType = "lunch";
  } else if (hour >= 16 && hour < 21) {
    timeOfDay = "evening";
    suggestionType = "dinner";
  } else {
    timeOfDay = "night";
    suggestionType = "late night";
  }

  return { timeOfDay, suggestionType };
}