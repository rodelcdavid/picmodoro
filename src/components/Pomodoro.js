function Pomodoro({ goalImg, defaultImg, setGoalImg, setScreenState }) {
  return (
    <>
      <h1>Pomodoro Screen</h1>
      <div className="img-holder">
        {console.log(goalImg)}
        <img src={goalImg} alt="" id="img" className="img" />
      </div>
      <button
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
        }}
      >
        Reset
      </button>
    </>
  );
}

export default Pomodoro;
