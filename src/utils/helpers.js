export const getGridValues = (numPomodoro) => {
  const imgWidth = 350;
  const imgHeight = 300;
  let gridColumn, gridRow;

  for (let i = 10; i > 1; i--) {
    if (numPomodoro === 4) {
      gridColumn = 2;
      gridRow = 2;
      break;
    } else if (numPomodoro % i === 0 && numPomodoro >= i * 3) {
      gridColumn = numPomodoro / i;
      gridRow = i;
      break;
    } else {
      gridColumn = numPomodoro;
      gridRow = 1;
    }
  }

  let gridColumnSize = imgWidth / gridColumn;

  //for those that don't divide equally
  if ((imgWidth / gridColumn) % 10 !== 0) {
    // console.log((imgWidth / gridColumn) % 10);
    gridColumnSize += 0.04;
  }

  const gridRowSize = imgHeight / gridRow;

  return [
    imgWidth,
    imgHeight,
    gridColumnSize,
    gridRowSize,
    gridColumn,
    gridRow,
  ];
};
