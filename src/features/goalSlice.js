import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosJWT = axios.create();

const refreshToken = async () => {
  try {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    const res = await axios.post(
      "https://desolate-lake-70726.herokuapp.com/refresh",
      {
        token: refreshToken,
      }
    );

    if (res.status === 200) {
      //update user with tokens
      localStorage.accessToken = JSON.stringify(res.data.accessToken);
      localStorage.refreshToken = JSON.stringify(res.data.refreshToken);

      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

axiosJWT.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    let currentDate = new Date();
    const decodedToken = jwt_decode(accessToken);

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();

      if (data) {
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const getGoalListAsync = createAsyncThunk(
  "goals/getGoalListAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));

      const response = await axiosJWT.get(
        `https://desolate-lake-70726.herokuapp.com/${payload.id}/goal-list`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      const goalList = response.data;
      return { goalList };
    } catch (err) {
      if (err.response?.status === 401) {
        return Promise.reject(err);
      } else if (err.request) {
        console.log("There was a problem connecting to the server.");
      } else {
        console.log("Error", err);
      }
    }
  }
);

export const addGoalAsync = createAsyncThunk(
  "goals/addGoalAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      const data = {
        goalName: payload.goalName,
        goalImage: payload.goalImage,
      };

      const response = await axiosJWT.post(
        `https://desolate-lake-70726.herokuapp.com/${auth.id}/${payload.id}`,
        data,
        {
          headers: {
            authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const goal = response.data;
      return { goal };
    } catch (err) {
      if (err.response?.status === 401) {
        return Promise.reject(err);
      } else if (err.request) {
        console.log("There was a problem connecting to the server.");
      } else {
        console.log("Error");
      }
    }
  }
);

export const deleteGoalAsync = createAsyncThunk(
  "goals/deleteGoalAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      const response = await axiosJWT.delete(
        `https://desolate-lake-70726.herokuapp.com/${auth.id}/${payload.id}`,
        {
          headers: { authorization: "Bearer " + accessToken },
        }
      );
      const goalToDelete = response.data;
      return { goalToDelete };
    } catch (err) {
      if (err.response?.status === 401) {
        return Promise.reject(err);
      } else if (err.request) {
        console.log("There was a problem connecting to the server.");
      } else {
        console.log("Error");
      }
    }
  }
);

export const saveSettingsAsync = createAsyncThunk(
  "goals/saveSettingsAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      const data = {
        currentGoal: payload.currentGoal,
      };

      const response = await axiosJWT.patch(
        `https://desolate-lake-70726.herokuapp.com/${auth.id}/${payload.id}`,
        data,
        {
          headers: {
            authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      const goalToUpdate = response.data;
      return { goalToUpdate };
    } catch (err) {
      if (err.response?.status === 401) {
        return Promise.reject(err);
      } else if (err.request) {
        console.log("There was a problem connecting to the server.");
      } else {
        console.log("Error");
      }
    }
  }
);

export const getCurrentGoalAsync = createAsyncThunk(
  "goals/getCurrentGoalAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      const response = await axiosJWT.get(
        `https://desolate-lake-70726.herokuapp.com/${auth.id}/${payload.id}`,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      const currentGoal = response.data;
      return { currentGoal };
    } catch (err) {
      if (err.response.status === 404) {
        const currentGoal = {};
        return { currentGoal };
      }
      if (err.response?.status === 401) {
        return Promise.reject(err);
      } else if (err.request) {
        console.log("There was a problem connecting to the server.");
      } else {
        console.log("Error", err);
      }
    }
  }
);

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
  extraReducers: {
    [getGoalListAsync.fulfilled]: (state, { payload }) => {
      state.goalList.data = payload.goalList;
      state.goalList.status = "fulfilled";
    },
    [getGoalListAsync.pending]: (state, { payload }) => {
      state.goalList.status = "pending";
      state.fetchStatus = "pending";
    },
    [getGoalListAsync.rejected]: (state, { payload }) => {
      state.error = "Invalid token";
    },
    [addGoalAsync.fulfilled]: (state, { payload }) => {
      state.goalList.data.unshift(payload.goal);
      state.addStatus = "fulfilled";
    },
    [addGoalAsync.pending]: (state, { payload }) => {
      state.addStatus = "pending";
    },
    [addGoalAsync.rejected]: (state, { payload }) => {
      state.error = "Invalid token";
    },
    [deleteGoalAsync.fulfilled]: (state, { payload }) => {
      state.goalList.data = state.goalList.data.filter(
        (goal) => goal.id !== payload.goalToDelete.id
      );
    },
    [deleteGoalAsync.pending]: (state, { payload }) => {
      console.log("deleting...");
    },
    [deleteGoalAsync.rejected]: (state, { payload }) => {
      state.error = "Invalid token";
    },
    [saveSettingsAsync.fulfilled]: (state, { payload }) => {
      const index = state.goalList.data.findIndex(
        (goal) => goal.id === payload.goalToUpdate.id
      );
      state.goalList.data[index] = payload.goalToUpdate;
    },
    [saveSettingsAsync.pending]: (state, { payload }) => {
      console.log("saving...");
    },
    [saveSettingsAsync.rejected]: (state, { payload }) => {
      state.error = "Invalid token";
    },
    [getCurrentGoalAsync.pending]: (state, { payload }) => {
      state.currentGoalStatus = "pending";
      console.log("getting current goal...");
    },
    [getCurrentGoalAsync.fulfilled]: (state, { payload }) => {
      if (Object.keys(payload.currentGoal).length) {
        state.currentGoal = payload.currentGoal;
        state.currentGoalStatus = "fulfilled";
      } else {
        state.currentGoalStatus = "not found";
      }
    },
    [getCurrentGoalAsync.rejected]: (state, { payload }) => {
      state.currentGoalStatus = "rejected";
      state.error = "Invalid token";
    },
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
