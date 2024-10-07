/* eslint-disable no-restricted-imports */
import { AlertProps } from "@mui/material";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ReactNode } from "react";
import { AppState } from "./store";

export type Toast = {
  open: boolean;
  severity: AlertProps["severity"];
  title?: string;
  description?: ReactNode;
};

export interface ToastState {
  toast: Toast;
}

const initialState: ToastState = {
  toast: {
    open: false,
    severity: "info",
    title: undefined,
    description: undefined,
  },
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    openToast(
      state,
      action: PayloadAction<Pick<Toast, "severity" | "title" | "description">>
    ): void {
      state.toast = { open: true, ...action.payload };
    },
    closeToast(state): void {
      state.toast.open = false;
    },
  },
});

export const { openToast, closeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
export const selectLatestToast = (state: AppState) => state.toast.toast;
