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
    console.log(err);
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
        `http://localhost:7000/${payload.id}/goal-list`,
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

// export const addGoalAsync = createAsyncThunk(
//   "goals/addGoalAsync",
//   async (payload) => {
//     try {
//       const response = await fetch("http://localhost:7000/goals", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ownerId: payload.ownerId,
//           id: payload.id,
//           goalName: payload.goalName,
//           goalImage: payload.goalImage,
//         }),
//       });
//       if (response.ok) {
//         const goal = await response.json();

//         return { goal };
//       }
//       // else{
//       //   //userauthenticated = false
//       // }
//     } catch {
//       // console.log("There was a problem connecting to the server");
//       return; //return status rejected
//     }
//   }
// );

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
        `http://localhost:7000/${auth.id}/${payload.id}`,
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

//params: userid, goalid
export const deleteGoalAsync = createAsyncThunk(
  "goals/deleteGoalAsync",
  async (payload) => {
    try {
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      const response = await axiosJWT.delete(
        `http://localhost:7000/${auth.id}/${payload.id}`,
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

//savesettings => receive goalid, update all settings to database
// export const saveSettingsAsync = createAsyncThunk(
//   "goals/saveSettingsAsync",
//   async (payload) => {
//     try {
//       const response = await fetch("http://localhost:7000/goals", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           currentGoal: payload.currentGoal,
//         }),
//       });
//       if (response.ok) {
//         const goalToUpdate = await response.json();

//         return { goalToUpdate };
//       }
//       // else{
//       //   //userauthenticated = false
//       // }
//     } catch {
//       return; //return status rejected
//     }
//   }
// );

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
        `http://localhost:7000/${auth.id}/${payload.id}`,
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
      // state.addStatus = "pending";

      console.log("saving...");
    },
    [saveSettingsAsync.rejected]: (state, { payload }) => {
      state.error = "Invalid token";
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
