import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//id params, token headers
//endpoint should be /dashboard/:ownerId
import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosJWT = axios.create();

// const auth = JSON.parse(localStorage.getItem("auth"));

const refreshToken = async () => {
  try {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    const res = await axios.post("http://localhost:7000/refresh", {
      token: refreshToken,
    }); //get refreshtoken from localstorage

    if (res.status === 200) {
      //update user with tokens
      localStorage.accessToken = JSON.stringify(res.data.accessToken);
      localStorage.refreshToken = JSON.stringify(res.data.refreshToken);

      return res.data;
    }
  } catch (err) {
    // when refresh token is invalid, status is 401 => axios error

    // if (err.response.status === 401) {
    //   return err;
    // }
    console.log("refreshToken error", err);
  }
};

axiosJWT.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    let currentDate = new Date();
    const decodedToken = jwt_decode(accessToken); //get accesstoken from localstorage

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const data = await refreshToken();

      if (data) {
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
    }
    console.log(config);
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
        `http://localhost:7000/user/${payload.id}`,
        {
          headers: { authorization: "Bearer " + accessToken },
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
      // else{
      //   //userauthenticated = false
      // }
    } catch {
      // console.log("There was a problem connecting to the server");
      return; //return status rejected
    }
  }
);

//params: userid, goalid
export const deleteGoalAsync = createAsyncThunk(
  "goals/deleteGoalAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      // const response = await fetch(`http://localhost:7000/user/${payload.id}`);
      const response = await axiosJWT.delete(
        `http://localhost:7000/${auth.id}/${payload.id}`,
        {
          headers: { authorization: "Bearer " + accessToken },
        }
      );
      console.log(response);
      if (response.status === 200) {
        // const goalList = await response.json();
        const goalToDelete = response.data;
        const isUserValid = true;
        return { isUserValid, goalToDelete };
      }
    } catch (err) {
      console.log(err.response);
      if (err.response?.status === 401) {
        // if (err.response.status === 401) {
        console.log("Invalid token");
        const isUserValid = false;
        return { isUserValid };
        //set userauthenticated = false
      } else if (err.request) {
        console.log("There was a problem connecting to the server.");
      } else {
        console.log("Error");
      }

      // return; // return status rejected
    }

    // try {
    //   const response = await fetch("http://localhost:7000/goals", {
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: payload.id,
    //     }),
    //   });
    //   if (response.ok) {
    //     const goalToDelete = await response.json();

    //     return { goalToDelete };
    //   }
    //   // else{
    //   //   //userauthenticated = false
    //   // }
    // } catch {
    //   return; //return status rejected
    // }
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
      // else{
      //   //userauthenticated = false
      // }
    } catch {
      return; //return status rejected
    }
  }
);

export const getCurrentGoalAsync = createAsyncThunk(
  "goals/getCurrentGoalAsync",
  async (payload) => {
    try {
      const response = await fetch(`http://localhost:7000/${payload.id}`);

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
  goalList: {
    data: [],
    status: "",
  },
  // goalList: [],
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
    //updateGoalName: => receive goalid, update goalname of that goalid
    //updateGoalImage: => receive goalid, update goalname of that goalid
    //addblockers => receive goalid, add new blocker
    updateBlockers: (state, { payload }) => {
      state.currentGoal.blockers = payload.blockers;
    },
    updatePresetMin: (state, { payload }) => {
      state.currentGoal.preset_min = payload.presetMin;
    },
    toggleIsRandom: (state, { payload }) => {
      state.currentGoal.is_random = payload.isRandom;
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
    //toggleisDone => receive goalid, update isDone of that goalid
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
    [deleteGoalAsync.fulfilled]: (state, { payload }) => {
      if (payload.isUserValid) {
        state.goalList.data = state.goalList.data.filter(
          (goal) => goal.id !== payload.goalToDelete.id
        );
      } else {
        state.error = "Invalid token";
      }
    },

    [deleteGoalAsync.pending]: (state, { payload }) => {
      console.log("deleting...");
    },
    [deleteGoalAsync.rejected]: (state, { payload }) => {
      console.log("delete rejected...");
    },
    [saveSettingsAsync.pending]: (state, { payload }) => {
      // state.addStatus = "pending";

      console.log("saving...");
    },
    [saveSettingsAsync.fulfilled]: (state, { payload }) => {
      const index = state.goalList.data.findIndex(
        (goal) => goal.id === payload.goalToUpdate.id
      );
      state.goalList.data[index] = payload.goalToUpdate;
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
  updateError,
} = goalSlice.actions;

export default goalSlice.reducer;
