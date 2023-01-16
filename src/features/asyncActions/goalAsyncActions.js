import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosJWT = axios.create();

const refreshToken = async () => {
  try {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

    const res = await axios.post("http://localhost:7000/refresh", {
      token: refreshToken,
    });

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
      const accessToken = JSON.parse(localStorage.getItem("accessToken"));
      const auth = JSON.parse(localStorage.getItem("auth"));

      const response = await axiosJWT.get(
        `http://localhost:7000/${auth.id}/${payload.id}`,
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
