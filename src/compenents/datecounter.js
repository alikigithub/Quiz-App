import { useReducer } from "react";

export default function DateCounter() {
  let reducerfun = (state, dispatch) => {
    console.log(state, dispatch);
    switch (dispatch.type) {
      case "dec":
        return { ...state, count: state.count - state.step };
      case "inc":
        return { ...state, count: state.count + state.step };
      case "written":
        return { ...state, count: dispatch.payload };
      case "step":
        return { ...state, step: dispatch.payload };
      default:
        throw new Error("unknow action");
    }
  };
  let initialstate = { count: 0, step: 1 };
  let [state, dispatchred] = useReducer(reducerfun, initialstate);
  let { count, step } = state;
  // let [check, setcheck] = useState(0);
  let gettingrange = (e) => {
    dispatchred({ type: "step", payload: Number(e.target.value) });
  };
  let dateCurrent = new Date();

  dateCurrent.setDate(dateCurrent.getDate() + count);
  console.log(dateCurrent);

  let decrement = () => {
    dispatchred({ type: "dec" });
  };
  let increment = () => {
    dispatchred({ type: "inc" });
  };
  let inputtvalue = (e) => {
    dispatchred({ type: "written", payload: Number(e.target.value) });
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={10}
        value={step}
        onChange={(e) => gettingrange(e)}
      />
      <span>{step}</span>
      <div>
        <button onClick={decrement}>-</button>
        <input type="number" value={count} onChange={(e) => inputtvalue(e)} />
        <button onClick={increment}>+</button>
      </div>
      <p>
        {dateCurrent.toLocaleDateString("en-pk", { weekday: "short" })}{" "}
        {dateCurrent.toLocaleDateString("en-pk", { month: "short" })}{" "}
        {dateCurrent.getDate()} {dateCurrent.getFullYear()}
      </p>
    </div>
  );
}
// npm i json-server
