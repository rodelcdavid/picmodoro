import { createSlice } from "@reduxjs/toolkit";

import { prevImg, prevName } from "../utils/getLocalStorage";

const initialState = {
  goalName: prevName,
  goalImage: prevImg,
  //blockers
  //presetmin
  //israndom
  //isdone
  goalList: [
    //example object, but this array should be empty
    {
      id: 1,
      goalName: "Eiffel Tower",
      goalImage: "https://source.unsplash.com/random/300x200",
      blockers: [{ clickable: false, reveal: false }],
      presetMin: 25,
      isRandom: false,
      isDone: false,
    },
  ],
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    updateGoalName: (state, { payload }) => {
      state.goalName = payload;
    },
    updateGoalImage: (state, { payload }) => {
      state.goalImage = payload;
    },
    //addGoal: => create goalid, receive goalname and goalimage, rest are default >> then push
    //deleteGoal: => receive goalid, filter goallist
    //updateGoalName: => receive goalid, update goalname of that goalid
    //updateGoalImage: => receive goalid, update goalname of that goalid
    //addblockers => receive goalid, add new blocker
    //updateReveal => receive goalid, determine index of blocker(random or normal), update rev
    //updatePresetMin => receive goalid, update presetmin of that goalid
    //toggleIsRandom => receive goalid, update israndom of that goalid
    //toggleisDone => receive goalid, update isDone of that goalid
  },
});

// Action creators are generated for each case reducer function
export const { updateGoalName, updateGoalImage } = goalSlice.actions;

export default goalSlice.reducer;
