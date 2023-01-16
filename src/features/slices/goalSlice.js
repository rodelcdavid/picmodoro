import { createSlice } from "@reduxjs/toolkit";
import {
  addGoalAsync,
  deleteGoalAsync,
  getCurrentGoalAsync,
  getGoalListAsync,
  saveSettingsAsync,
} from "../asyncActions/goalAsyncActions";

const initialState = {
  goalList: {
    data: [],
    status: "",
  },
  currentGoal: {},
  currentGoalStatus: "pending",
  fetchStatus: "",
  addStatus: "",
  error: "",
};

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    updateBlockers: (state, { payload }) => {
      state.currentGoal.blockers = payload.blockers;
    },
    updatePresetMin: (state, { payload }) => {
      state.currentGoal.preset_min = payload.presetMin;
    },
    toggleIsRandom: (state, { payload }) => {
      state.currentGoal.is_random = payload.isRandom;
    },
    updateIsDone: (state, { payload }) => {
      state.currentGoal.is_done = payload.isDone;
    },

    updateCurrentGoal: (state, { payload }) => {
      state.currentGoal = payload.currentGoal;
    },
    changeImageUrl: (state, { payload }) => {
      state.goalList.data = state.goalList.data.map((goal) => {
        if (goal.id === payload.id) {
          goal.image_url = payload.goalImage;
        }
        return goal;
      });
    },

    resetCurrentGoal: (state, { payload }) => {
      state.currentGoal = {};
    },
    resetCurrentGoalStatus: (state, { payload }) => {
      state.currentGoalStatus = "pending";
    },
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    // getGoalListAsync
    builder.addCase(getGoalListAsync.fulfilled, (state, { payload }) => {
      state.goalList.data = payload.goalList;
      state.goalList.status = "fulfilled";
    });
    builder.addCase(getGoalListAsync.pending, (state, { payload }) => {
      state.goalList.status = "pending";
      state.fetchStatus = "pending";
    });
    builder.addCase(getGoalListAsync.rejected, (state, { payload }) => {
      state.error = "Invalid token";
    });

    // addGoalAsync
    builder.addCase(addGoalAsync.fulfilled, (state, { payload }) => {
      state.goalList.data.unshift(payload.goal);
      state.addStatus = "fulfilled";
    });
    builder.addCase(addGoalAsync.pending, (state, { payload }) => {
      state.addStatus = "pending";
    });
    builder.addCase(addGoalAsync.rejected, (state, { payload }) => {
      state.error = "Invalid token";
    });

    //deleteGoalAsync
    builder.addCase(deleteGoalAsync.fulfilled, (state, { payload }) => {
      state.goalList.data = state.goalList.data.filter(
        (goal) => goal.id !== payload.goalToDelete.id
      );
    });
    builder.addCase(deleteGoalAsync.pending, (state, { payload }) => {
      console.log("deleting...");
    });
    builder.addCase(deleteGoalAsync.rejected, (state, { payload }) => {
      state.error = "Invalid token";
    });

    //saveSettingsAsync
    builder.addCase(saveSettingsAsync.fulfilled, (state, { payload }) => {
      const index = state.goalList.data.findIndex(
        (goal) => goal.id === payload.goalToUpdate.id
      );
      state.goalList.data[index] = payload.goalToUpdate;
    });
    builder.addCase(saveSettingsAsync.pending, (state, { payload }) => {
      console.log("saving...");
    });
    builder.addCase(saveSettingsAsync.rejected, (state, { payload }) => {
      state.error = "Invalid token";
    });

    //getCurrentGoalAsync
    builder.addCase(getCurrentGoalAsync.fulfilled, (state, { payload }) => {
      if (Object.keys(payload.currentGoal).length) {
        state.currentGoal = payload.currentGoal;
        state.currentGoalStatus = "fulfilled";
      } else {
        state.currentGoalStatus = "not found";
      }
    });
    builder.addCase(getCurrentGoalAsync.pending, (state, { payload }) => {
      state.currentGoalStatus = "pending";
      console.log("getting current goal...");
    });
    builder.addCase(getCurrentGoalAsync.rejected, (state, { payload }) => {
      state.currentGoalStatus = "rejected";
      state.error = "Invalid token";
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addGoal,
  updateBlockers,
  toggleIsRandom,
  updateIsDone,
  updatePresetMin,
  deleteGoal,
  updateCurrentGoal,
  changeImageUrl,
  resetCurrentGoal,
  resetCurrentGoalStatus,
  updateError,
} = goalSlice.actions;

export default goalSlice.reducer;
