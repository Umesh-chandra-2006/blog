import { create } from "zustand";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const useAuth = create((set) => ({
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isAuthReady: false,
  loggedIn: false,

  login: async (userObj) => {
    set({ loading: true, error: null });
    try {
      let response = await axios.post(API_ENDPOINTS.LOGIN, userObj, {
        withCredentials: true,
      });

      let res = await response.data;

      set({
        isAuthenticated: true,
        loggedIn: true,
        loading: false,
        error: null,
        currentUser: res.payload,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to Login. Please try again.",
        loading: false,
        isAuthenticated: false,
        loggedIn: false,
        currentUser: null,
      });
      console.error("Error during Login: ", error);
    }
  },

  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axios.get(API_ENDPOINTS.LOGOUT, {
        withCredentials: true,
      });

      set({
        loading: false,
        isAuthenticated: false,
        loggedIn: false,
        currentUser: null,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to Logout. Please try again.",
        loading: false,
      });
      console.error("Error during Logout: ", error);
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true, error: null });
      let response = await axios.get(API_ENDPOINTS.CHECK_AUTH, {
        withCredentials: true,
      });

      let res = await response.data;

      set({
        isAuthenticated: true,
        loggedIn: true,
        loading: false,
        error: null,
        currentUser: res.payload,
        isAuthReady: true,
      });
    } catch (error) {
      set({
        error: null,
        loading: false,
        isAuthenticated: false,
        loggedIn: false,
        currentUser: null,
        isAuthReady: true,
      });
      // 401 is expected when user is not logged in, only log other errors
      if (error.response?.status !== 401) {
        console.error("Error during check-auth: ", error);
      }
    }
  },
}));
