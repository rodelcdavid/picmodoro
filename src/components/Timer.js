import CountdownTimer from "./CountdownTimer";

function Timer() {
  return (
    <>
      <h3>How many minutes each Pomodoro?</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button style={{ width: "30px", padding: "5px" }}>-</button>
        <h2 style={{ margin: "0 5px" }}>25:00</h2>
        <button style={{ width: "30px", padding: "5px" }}>+</button>
      </div>
      <button>Start timer!</button>
      <CountdownTimer />
    </>
  );
}

export default Timer;
