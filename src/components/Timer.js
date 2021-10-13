import CountdownTimer from "./CountdownTimer";

function Timer({ onReveal }) {
  return (
    <>
      <h3>How many minutes each Pomodoro?</h3>

      <CountdownTimer onReveal={onReveal} />
    </>
  );
}

export default Timer;
