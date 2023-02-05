import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/picmodoroApi";

export const signInAsync = createAsyncThunk(
  "auth/signInAsync",
  async (payload) => {
    try {
      const res = await fetch(`${api}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      if (res.ok) {
        const { user, accessToken, refreshToken } = await res.json();
        return { user, accessToken, refreshToken };
      } else if (res.status === 400) {
        return Promise.reject();
      }
    } catch {
      alert("There was a problem connecting to the server.");
      return;
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (payload) => {
    try {
      const res = await fetch(`${api}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
        }),
      });

      if (res.ok) {
        const { user, refreshToken, accessToken } = await res.json();
        return { user, refreshToken, accessToken };
      }
    } catch {
      alert("There was a problem connecting to the server.");
      return;
    }
  }
);

export const logoutAsync = createAsyncThunk(
  "auth/logoutAsync",
  async (payload) => {
    try {
      const response = await fetch(`${api}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: payload.refreshToken,
        }),
      });

      if (response.ok) {
        return Promise.resolve();
      }
    } catch {
      alert("There was a problem connecting to the server.");
      return;
    }
  }
);
