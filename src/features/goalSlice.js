import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getGoalListAsync = createAsyncThunk(
  "goals/getGoalListAsync",
  async (payload) => {
    try {
      const response = await fetch(`http://localhost:7000/user/${payload.id}`);
      if (response.ok) {
        const goalList = await response.json();

        return { goalList };
      }
    } catch {
      // console.log("There was a problem connecting to the server.");
      return; // return status rejected
    }
  }
);

export const addGoalAsync = createAsyncThunk(
  "goals/addGoalAsync",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ownerId: payload.ownerId,
          id: payload.id,
          goalName: payload.goalName,
          goalImage: payload.goalImage,
        }),
      });
      if (response.ok) {
        const goal = await response.json();

        return { goal };
      }
    } catch {
      // console.log("There was a problem connecting to the server");
      return; //return status rejected
    }
  }
);

export const deleteGoalAsync = createAsyncThunk(
  "goals/deleteGoalAsync",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/goals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: payload.id,
        }),
      });
      if (response.ok) {
        const goalToDelete = await response.json();

        return { goalToDelete };
      }
    } catch {
      return; //return status rejected
    }
  }
);

//savesettings => receive goalid, update all settings to database
export const saveSettingsAsync = createAsyncThunk(
  "goals/saveSettingsAsync",
  async (payload) => {
    try {
      const response = await fetch("http://localhost:7000/goals", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentGoal: payload.currentGoal,
        }),
      });
      if (response.ok) {
        const goalToUpdate = await response.json();

        return { goalToUpdate };
      }
    } catch {
      return; //return status rejected
    }
  }
);

export const getCurrentGoalAsync = createAsyncThunk(
  "goals/getCurrentGoalAsync",
  async (payload) => {
    try {
      console.log("fetching", payload.id);
      const response = await fetch(`http://localhost:7000/${payload.id}`);
      console.log("response", response);
      if (response.ok) {
        const currentGoal = await response.json();
        return { currentGoal };
      } else {
        const currentGoal = {};
        return { currentGoal };
      }
    } catch {
      // console.log("There was a problem connecting to the server");
      return; //return status rejected
    }
  }
);

const initialState = {
  goalList: [],
  currentGoal: {},
  currentGoalStatus: "pending",
  fetchStatus: "",
  addStatus: "",
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
      // const index = state.goalList.findIndex((goal) => goal.id === payload.id);

      // state.goalList[index].blockers = payload.blockers;
      state.currentGoal.blockers = payload.blockers;
    },
    //updateReveal => receive goalid, determine index of blocker(random or normal), update rev
    //updatePresetMin => receive goalid, update presetmin of that goalid
    updatePresetMin: (state, { payload }) => {
      // const index = state.goalList.findIndex((goal) => goal.id === payload.id);
      // console.log("presetmin", state.goalList[index]);
      // state.goalList[index].preset_min = payload.presetMin;
      state.currentGoal.preset_min = payload.presetMin;
    },
    //toggleIsRandom => receive goalid, update israndom of that goalid
    toggleIsRandom: (state, { payload }) => {
      // const index = state.goalList.findIndex((goal) => goal.id === payload.id);
      // state.goalList[index].is_random = payload.isRandom;
      state.currentGoal.is_random = payload.isRandom;
    },
    resetCurrentGoal: (state, { payload }) => {
      state.currentGoal = {};
    },
    resetCurrentGoalStatus: (state, { payload }) => {
      state.currentGoalStatus = "pending";
    },
    //toggleisDone => receive goalid, update isDone of that goalid
  },
  extraReducers: {
    [getGoalListAsync.fulfilled]: (state, { payload }) => {
      state.goalList = payload.goalList;
      state.fetchStatus = "fulfilled";
      console.log("fulfilled");
    },
    [getGoalListAsync.pending]: (state, { payload }) => {
      state.fetchStatus = "pending";
      console.log("pending");
    },
    [addGoalAsync.fulfilled]: (state, { payload }) => {
      state.goalList.unshift(payload.goal);
      state.addStatus = "fulfilled";
    },
    [addGoalAsync.pending]: (state, { payload }) => {
      state.addStatus = "pending";
    },
    [deleteGoalAsync.fulfilled]: (state, { payload }) => {
      state.goalList = state.goalList.filter(
        (goal) => goal.id !== payload.goalToDelete.id
      );
    },

    [deleteGoalAsync.pending]: (state, { payload }) => {
      console.log("deleting...");
    },
    [saveSettingsAsync.pending]: (state, { payload }) => {
      // state.addStatus = "pending";

      console.log("saving...");
    },
    [saveSettingsAsync.fulfilled]: (state, { payload }) => {
      const index = state.goalList.findIndex(
        (goal) => goal.id === payload.goalToUpdate.id
      );
      state.goalList[index] = payload.goalToUpdate;
    },
    [getCurrentGoalAsync.pending]: (state, { payload }) => {
      // state.addStatus = "pending";
      state.currentGoalStatus = "pending";
      console.log("getting current goal...");
    },
    [getCurrentGoalAsync.fulfilled]: (state, { payload }) => {
      if (Object.keys(payload.currentGoal).length) {
        state.currentGoal = payload.currentGoal;
        state.currentGoalStatus = "fulfilled";
      } else {
        state.currentGoalStatus = "rejected";
      }

      // console.log("get fulfilled");
    },
    [getCurrentGoalAsync.rejected]: (state, { payload }) => {
      // state.currentGoal = payload.currentGoal;
      console.log("calling rejected reducer");
      state.currentGoal = {};
      state.currentGoalStatus = "rejected";
      // console.log("get fulfilled");
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
  resetCurrentGoal,
  resetCurrentGoalStatus,
} = goalSlice.actions;

export default goalSlice.reducer;
