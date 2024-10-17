import { useNavigate } from "react-router-dom";

function IntroPage() {
  const navigate = useNavigate();
  return (
    <div className="intro">
      <div className="intro-inner">
        <h1 className="intro-title">Quiz</h1>
        <p className="intro-desc">
          {`The test contains 10 questions and there is no time limit.`}
        </p>

        <button
          className="intro-button"
          onClick={() => {
            navigate("/game");
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default IntroPage;
