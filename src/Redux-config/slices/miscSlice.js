import { createSlice } from "@reduxjs/toolkit";
import { t } from "i18next";

const initialState = {
  userType: "",
  registerType: "",
  registerData: {
    userVerifyType: "email",
  },
  DynamicRoutes: [],
  userData: {},
  formTable: {
    tableData: [],
    tableId: "",
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setRegisterType: (state, action) => {
      state.registerType = action.payload;
    },
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    setFormTable: (state, action) => {
      state.formTable = action.payload;
    },
    setDynamicRoutes: (state, action) => {
      state.DynamicRoutes = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearMisc: (state) => {
      state.userType = "";
      state.registerType = "";
      state.registerData = {};
      state.formTable = {};
      state.userData = {};
    },
  },
});

export const {
  setUserType,
  clearMisc,
  setRegisterType,
  setRegisterData,
  setDynamicRoutes,
  registerData,
  setUserData,
  userData,
  setFormTable,
  formTable,
} = miscSlice.actions;
export default miscSlice.reducer;
