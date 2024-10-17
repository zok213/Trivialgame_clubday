const fetchQuestions = async () => {
  const questionsPath = "/data/questions.json";
  const response = await fetch(questionsPath).catch((error) => {
    console.error("Error fetching questions: ", error);
  });
  if (!response) {
    return [];
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    console.error("Questions data is not an array: ", data);
    return [];
  }

  // Shuffle the questions
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }
  return data.slice(0, 10);
};

export default fetchQuestions;
