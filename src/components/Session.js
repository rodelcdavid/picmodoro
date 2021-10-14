import React from "react";

export default function Session({
  numPomodoro,
  setNumPomodoro,
  reveal,
  isDone,
  setIsDone,
  isActive,
}) {
  const onPlus = () => {
    const tempNum = numPomodoro + 1;
    setNumPomodoro(tempNum);
    const tempReveal = [...reveal];
    // const tempReveal = reveal;

    const totalReveal = tempReveal.filter((x) => x === true).length;
    console.log("plusreveal", totalReveal, tempNum);
    if (totalReveal >= tempNum) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  };

  const onMinus = () => {
    if (numPomodoro === 1) {
      return;
    } else {
      const tempNum = numPomodoro - 1;
      setNumPomodoro(tempNum);
      const tempReveal = [...reveal];

      const totalReveal = tempReveal.filter((x) => x === true).length;
      console.log("plusreveal", totalReveal, tempNum);
      if (totalReveal >= tempNum) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    }
  };
  return (
    <div>
      <h3>How many Pomodoro sessions to finish this goal?</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          disabled={isDone || numPomodoro === 1 || isActive ? true : false}
          onClick={onMinus}
          style={{ width: "30px", padding: "5px" }}
        >
          -
        </button>
        <p style={{ margin: "0 5px" }}>{numPomodoro}</p>
        <button
          disabled={isActive ? true : false}
          onClick={onPlus}
          style={{ width: "30px", padding: "5px" }}
        >
          +
        </button>
      </div>
    </div>
  );
}
