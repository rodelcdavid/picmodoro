import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { prevImg, prevName, prevGoalList } from "../utils/getLocalStorage";

export const getGoalListAsync = createAsyncThunk(
  "goals/getGoalListAsync",
  async () => {
    const response = await fetch("http://localhost:7000/goals");
    if (response.ok) {
      const goalList = await response.json();

      return { goalList };
    }
  }
);

export const addGoalAsync = createAsyncThunk(
  "goals/addGoalAsync",
  async (payload) => {
    const response = await fetch("http://localhost:7000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: payload.id,
        goalName: payload.goalName,
        goalImage: payload.goalImage,
      }),
    });
    if (response.ok) {
      const goal = await response.json();

      return { goal };
    }
  }
);

const initialState = {
  // goalName: prevName,
  // goalImage: prevImg,
  //blockers
  //presetmin
  //israndom
  //isdone
  // goalList: prevGoalList,
  goalList: [],
};

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    // updateGoalName: (state, { payload }) => {
    //   state.goalName = payload;
    // },
    // updateGoalImage: (state, { payload }) => {
    //   state.goalImage = payload;
    // },
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
      console.log(newGoal.id);
      state.goalList.push(newGoal);
    },
    //deleteGoal: => receive goalid, filter goallist
    deleteGoal: (state, { payload }) => {
      // const index = state.goalList.findIndex((goal) => goal.id === payload.id);
      state.goalList = state.goalList.filter((goal) => goal.id !== payload.id);
    },
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
  extraReducers: {
    [getGoalListAsync.fulfilled]: (state, { payload }) => {
      state.goalList = payload.goalList;
    },
    [getGoalListAsync.pending]: (state, { payload }) => {
      console.log("fetching...");
    },
    [addGoalAsync.fulfilled]: (state, { payload }) => {
      state.goalList.push(payload.goal);
    },
    [addGoalAsync.pending]: (state, { payload }) => {
      console.log("adding...");
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  // updateGoalName,
  // updateGoalImage,
  addGoal,
  updateBlockers,
  toggleIsRandom,
  updatePresetMin,
  deleteGoal,
} = goalSlice.actions;

export default goalSlice.reducer;