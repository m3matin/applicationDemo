import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (e) {
    console.error("Could not save state to localStorage", e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state from localStorage", e);
    return undefined;
  }
};

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveToLocalStorage({
    auth: store.getState().auth,
  });
});

export default store;
