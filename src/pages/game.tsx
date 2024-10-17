import { useState, useEffect } from "react";
import fetchQuestions from "../utils/fetch-questions";
import Question from "../components/question";
import { useCounter } from "../utils/counter";
import QuestionCorrection from "../components/question-correction";
import Results from "../components/results";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  
  const questionNo = useCounter(0);
  const correctAnswers = useCounter(0);
  const wrongAnswers = useCounter(0);
  const emptyAnswers = useCounter(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    };
    loadQuestions();
  }, []);

  const handleNewQuestionClick = (
    selectedValue: number | null,
    currentAnswer: number
  ) => {
    if (selectedValue == null) {
      emptyAnswers.add();
    } else if (selectedValue !== currentAnswer) {
      wrongAnswers.add();
    } else {
      correctAnswers.add();
    }

    questionNo.add();
  };

  const indicatorBg = (index: number) => {
    if (questionNo.value > index) {
      return "#fff";
    } else if (questionNo.value === index) {
      return "#29b5d5";
    } else {
      return "rgba(255,255,255,.2)";
    }
  };

  const handleRestartClick = () => {
    questionNo.reset();
    correctAnswers.reset();
    wrongAnswers.reset();
    emptyAnswers.reset();
    navigate('/')
  }

  return (
    <div className="game" data-game-started={true}>
      <div className="intro">
        <div className="intro-inner">
          <h1 className="intro-title">Quiz</h1>
          {
            <div className="indicator">
              {questions.map((question, index) => {
                return (
                  <span
                    key={question.id}
                    className="indicator-item"
                    style={{
                      backgroundColor: indicatorBg(index),
                    }}
                  />
                );
              })}
            </div>
          }
          {questionNo.value === 10 && (
            <>
              <Results
                wrong={wrongAnswers.value}
                correct={correctAnswers.value}
                empty={emptyAnswers.value}
              />
              <button
                className="restart-button"
                onClick={handleRestartClick}
              >
                Restart Quiz
              </button>
            </>
          )}
        </div>
      </div>
      {
        // Load questions
        questions.length != 0 ? (
          <div className="game-area">
            {questionNo.value != 10 ? (
              <Question
                id={questionNo.value}
                data={questions[questionNo.value]}
                onQuestionButtonClick={handleNewQuestionClick}
              />
            ) : (
              <QuestionCorrection data={questions} />
            )}
          </div>
        ) : (
          <div className="loading">Loading questions...</div>
        )
      }
    </div>
  );
}

export default Game;
