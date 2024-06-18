import { useEffect, useReducer } from "react";
import Header from "./compenents/header";
import MainBox from "./compenents/main";
import Loading from "./compenents/loading";
import Quiz from "./compenents/quizs";
import Errormsg from "./compenents/Error";
import FinalResult from "./compenents/finalResult";
let initialalstate = {
  question: [],
  status: "loading",
  questionNo: 0,
  errorMsg: "",
  clicked: null,
  result: 0,
  remaningSec: null,
};
function App() {
  let reducer = (state, action) => {
    switch (action.type) {
      case "questionfiller":
        return {
          ...state,
          question: action.payload,
          status: "ready",
          remaningSec: state.question.length * 30,
        };
      case "nextQuestion":
        return {
          ...state,
          questionNo: state.questionNo + 1,
          clicked: null,
          status:
            state.questionNo === state.question.length - 1
              ? "finish"
              : "active",
        };
      case "showquiz":
        return {
          ...state,
          status: "active",
          remaningSec: state.question.length * 30,
        };
      case "errorPick":
        return {
          ...state,
          errorw: action.payload,
        };
      case "showerror":
        return {
          ...state,
          status: "error",
        };
      case "click":
        let question = state.question.at(state.questionNo);

        return {
          ...state,
          clicked: action.payload,
          result:
            action.payload === question.correctOption
              ? state.result + question.points
              : state.result,
        };
      case "addPoints": {
        return {
          ...state,
          result: state.result + action.payload,
        };
      }
      case "showfinalResult": {
        return {
          ...state,
          status: "finish",
        };
      }
      case "reset":
        return {
          ...initialalstate,
          status: "active",
          question: state.question,
        };
      case "timer":
        return {
          ...state,
          remaningSec: state.remaningSec - 1,
          status: state.remaningSec === 0 ? "finish" : state.status,
        };
      default:
        throw new Error("Unknow Error");
    }
  };
  let [state, dispatch] = useReducer(reducer, initialalstate);
  let { question, status, questionNo, errorw, clicked, result, remaningSec } =
    state;
  let total = question.map((pointcount) => pointcount.points);
  let totalpoint = total.reduce((acc, current) => acc + current, 0);
  let statusupdate = () => {
    console.log("click");
    if (status === "ready") {
      console.log("working");
      dispatch({ type: "showquiz" });
    }

    if (errorw) {
      dispatch({ type: "showerror" });
    }
  };

  useEffect(function () {
    async function quizfun() {
      try {
        let quiz = await fetch("http://localhost:8000/questions");
        console.log(quiz);
        if (quiz.ok) {
          let questionfuller = await quiz.json();
          if (questionfuller.length >= 1) {
            dispatch({ type: "questionfiller", payload: questionfuller });
          }
        } else throw new Error("No Data for quiz  Avaiablable please wait");
      } catch (err) {
        if (err) {
          console.log(err.message);
          dispatch({ type: "errorPick", payload: err.message });
        }
      }
    }
    quizfun();
  }, []);
  return (
    <>
      <Header />
      <MainBox />
      {status === "error" ? (
        <Errormsg errorw={errorw} />
      ) : status === "active" ? (
        <Quiz
          questionpro={question}
          dispatch={dispatch}
          status={status}
          questionNo={questionNo}
          clicked={clicked}
          result={result}
          totalquestion={totalpoint}
          remaningSec={remaningSec}
        />
      ) : status === "finish" ? (
        <FinalResult
          finalresult={result}
          totalquestion={totalpoint}
          dispatch={dispatch}
        />
      ) : (
        <Loading statusupdate={statusupdate} />
      )}
      <MainBox />
    </>
  );
}

export default App;
