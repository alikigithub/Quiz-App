import { useEffect } from "react";

export default function Timer({ remaningSec, dispatch }) {
  let mint = Math.floor(remaningSec / 60);
  let secd = remaningSec % 60;
  useEffect(
    function () {
      let interset = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return function () {
        clearInterval(interset);
      };
    },
    [dispatch]
  );
  return (
    <button className=" btn btn-timer">
      {mint < 10 && "0"}
      {mint}:{secd < 10 && "0"}
      {secd}
    </button>
  );
}
