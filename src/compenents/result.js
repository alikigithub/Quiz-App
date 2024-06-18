export default function Results({
  totalquestion,
  questionNo,
  result,
  totalpoint,
}) {
  return (
    <div>
      <progress
        value={questionNo + 1}
        max={totalquestion.length}
        className="progressbar"
      ></progress>
      <div className="resultsData">
        <p>
          Questions {questionNo + 1} / {totalquestion.length}
        </p>
        <p>
          {" "}
          {result} / {totalpoint} points
        </p>
      </div>
    </div>
  );
}
