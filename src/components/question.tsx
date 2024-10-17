import { useEffect, useState } from "react";
import gsap from "gsap";

interface QuestionProps {
  id: number;
  data: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };
  hasButton?: boolean;
  onQuestionButtonClick: (selectedValue: any, currentQuestion: any) => void;
  showAnswer?: boolean;
  markSelection?: number | null;
}

const Question = ({
  id,
  data,
  hasButton = true,
  onQuestionButtonClick,
  showAnswer = false,
  markSelection = null,
}: QuestionProps) => {
  const [answer, setAnswer] = useState<string | null>(null);
  const parseValue = (value: string | null) => (value ? parseInt(value.split("-")[1]) : null);
  const handleButtonClick = () => {
    onQuestionButtonClick(parseValue(answer), data.options.indexOf(data.answer));
    setAnswer(null);
  }

  useEffect(() => {
    gsap.fromTo(
      ".question-text",
      {
        x: 40,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
      }
    );
    gsap.fromTo(
      "li",
      {
        opacity: 0,
        x: 40,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      }
    );
  }, [data]);

  return (
    <div className="question">
      <div className="question-inner">
        <h2 className="question-text">{data.question}</h2>
        <ul className="question-answers">
          {data.options.map((text, index) => {
            const value = `q${data.id}-${index}`;
            return (
              <li
                key={value}
                className={
                  data.options[index] === data.answer && showAnswer
                    ? "is-true"
                    : ""
                }
                data-selected={markSelection === index ? true : null}
              >
                <input
                  type="radio"
                  name={`q_${data.id}`}
                  value={value}
                  id={value}
                  onChange={(e) => {
                    setAnswer(e.target.value)}
                  }
                  checked={
                    !showAnswer ? answer === value : markSelection === index
                  }
                />
                <label className="question-answer" htmlFor={value}>
                  {text}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      {hasButton && (
        <button
          className="question-button"
          onClick={handleButtonClick}
        >
          {id == 9 ? "Finish" : "Next"}
        </button>
      )}
    </div>
  );
};

export default Question;
