import Question from "./question";

interface QuestionCorrectionProps {
    data: any[];
}

function QuestionCorrection({ data }: Readonly<QuestionCorrectionProps>) {
    return (
        <div className="correction">
          {data.map((question) => {
            return (
              <Question
                key={question.id}
                id={question.id}
                hasButton={false}
                markSelection={question.selection}
                showAnswer={true}
                data={question}
                onQuestionButtonClick={() => {}}
              />
            );
          })}
        </div>
      );
}

export default QuestionCorrection;