//if screenstate is 1 do code below

import placeholder from "../assets/placeholder.jpg";

export const prevImg =
  JSON.parse(localStorage.getItem("imgFile")) || placeholder;
export const prevScreen = JSON.parse(localStorage.getItem("screenState")) || 0;
export const prevName = JSON.parse(localStorage.getItem("goalName")) || "";
