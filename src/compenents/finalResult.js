export default function FinalResult({ finalresult, totalquestion, dispatch }) {
  let percentageResult = (finalresult / totalquestion) * 100;
  percentageResult = percentageResult.toFixed(2);
  return (
    <div className="finalResult">
      <div className="final1">
        <h3>Your Result is</h3>
      </div>
      <div className="final2">
        <div className="final2h1">
          <h3>Points</h3>
          <h2>{finalresult} </h2>{" "}
        </div>
        <div className="final2h2">
          <h3>Percentage</h3>
          <h2>{percentageResult}%</h2>{" "}
        </div>
      </div>
      <button
        className="btn btn-reset"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart
      </button>
    </div>
  );
}
