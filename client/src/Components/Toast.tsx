import {
  Alert,
  AlertTitle,
  Slide,
  Snackbar,
  type SlideProps,
} from "@mui/material";
import { closeToast, selectLatestToast } from "../Common/toastSlice";
import { AppDispatch } from "../Common/store";
import { useDispatch, useSelector } from "react-redux";

const SlideTransition = (props: SlideProps) => (
  <Slide {...props} direction="left" />
);

export const Toasts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useSelector(selectLatestToast);

  const onClose = () => {
    dispatch(closeToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={toast.open}
      onClose={onClose}
      autoHideDuration={toast.severity === "success" ? 5000 : null}
      TransitionComponent={SlideTransition}
      sx={{
        "&.MuiSnackbar-root": { top: "80px", right: "20px" },
      }}
    >
      <Alert severity={toast.severity}>
        {toast.title ? <AlertTitle>{toast.title}</AlertTitle> : null}
        {toast.description}
      </Alert>
    </Snackbar>
  );
};
