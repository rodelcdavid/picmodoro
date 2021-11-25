import { createSlice } from "@reduxjs/toolkit";

import { prevImg, prevName, prevGoalList } from "../utils/getLocalStorage";

const initialState = {
  goalName: prevName,
  goalImage: prevImg,
  //blockers
  //presetmin
  //israndom
  //isdone
  goalList: prevGoalList,
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
    addGoal: (state, { payload }) => {
      const newGoal = {
        id: payload.id,
        goalName: payload.goalName,
        goalImage: payload.goalImage,
        blockers: [{ clickable: false, reveal: false }],
        presetMin: 0.1,
        isRandom: false,
        isDone: false,
      };
      state.goalList.push(newGoal);
    },
    //deleteGoal: => receive goalid, filter goallist
    //updateGoalName: => receive goalid, update goalname of that goalid
    //updateGoalImage: => receive goalid, update goalname of that goalid
    //addblockers => receive goalid, add new blocker
    updateBlockers: (state, { payload }) => {
      const index = state.goalList.findIndex((goal) => goal.id === payload.id);

      state.goalList[index].blockers = payload.blockers;
    },
    //updateReveal => receive goalid, determine index of blocker(random or normal), update rev
    //updatePresetMin => receive goalid, update presetmin of that goalid
    updatePresetMin: (state, { payload }) => {
      const index = state.goalList.findIndex((goal) => goal.id === payload.id);
      state.goalList[index].presetMin = payload.presetMin;
    },
    //toggleIsRandom => receive goalid, update israndom of that goalid
    toggleIsRandom: (state, { payload }) => {
      const index = state.goalList.findIndex((goal) => goal.id === payload.id);
      state.goalList[index].isRandom = payload.isRandom;
    },
    //toggleisDone => receive goalid, update isDone of that goalid
  },
});

// Action creators are generated for each case reducer function
export const {
  updateGoalName,
  updateGoalImage,
  addGoal,
  updateBlockers,
  toggleIsRandom,
  updatePresetMin,
} = goalSlice.actions;

export default goalSlice.reducer;
