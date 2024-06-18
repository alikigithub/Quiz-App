import Results from "./result";
import Timer from "./timer";

export default function Quiz({
  questionpro,
  questionNo,
  status,
  clicked,
  result,
  totalquestion,
  dispatch,
  remaningSec,
}) {
  console.log(questionpro.length);
  console.log(questionNo);
  return status === "active" ? (
    <div className="quiz">
      <div className="results">
        <Results
          totalquestion={questionpro}
          questionNo={questionNo}
          result={result}
          totalpoint={totalquestion}
        />
      </div>
      <div className="quizdata">
        <h4>{questionpro[questionNo].question}</h4>
        <div>
          {questionpro[questionNo].options.map((option, index) => (
            <button
              className={`btn quizoption ${
                clicked !== null && index === clicked ? "litabMove" : " "
              } ${
                clicked !== null &&
                index === questionpro[questionNo].correctOption
                  ? "correct"
                  : "wrong"
              }`}
              style={{ cursor: clicked !== null ? "not-allowed" : "pointer" }}
              onClick={() => {
                console.log("clicking");
                dispatch({ type: "click", payload: index });
              }}
              disabled={clicked !== null}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className={`btn ${clicked === null ? "hide" : "btn-next"} `}
          onClick={() =>
            questionNo.length !== questionpro.length - 1
              ? dispatch({ type: "nextQuestion" })
              : dispatch({ type: "showfinalResult" })
          }
        >
          {questionNo < questionpro.length - 1 ? "Next" : "finish"}
        </button>
        <Timer remaningSec={remaningSec} dispatch={dispatch} />
      </div>
    </div>
  ) : (
    <></>
  );
}
