import { Warning } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  dialogClasses,
  DialogContent,
  DialogContentText,
  type DialogProps,
} from "@mui/material";
import { type ReactNode } from "react";

export type ConfirmDialogProps = Pick<
  DialogProps,
  "maxWidth" | "fullWidth" | "component"
> & {
  cancelText?: string;
  confirmText?: string;
  title: ReactNode;
  message?: ReactNode;
  onAccept: () => void;
  onCancel: () => void;
  open: boolean;
};

export const ConfirmDialog = ({
  cancelText,
  confirmText,
  open,
  message,
  onAccept,
  onCancel,
  title,
  ...props
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => onCancel()}
      aria-labelledby="alert-dialog-text"
      sx={{
        [`& .${dialogClasses.paper}`]: {
          borderRadius: 2.5,
          paddingY: { xs: 2, sm: 3 },
          paddingX: { xs: 0, sm: 2 },
        },
      }}
      {...props}
    >
      <DialogContent>
        <DialogContentText
          variant="h5"
          id="alert-dialog-text"
          sx={{ mb: 2, display: "flex", columnGap: 1, alignItems: "center" }}
        >
          <Warning /> {title}
        </DialogContentText>
        <DialogContentText component="div">{message}</DialogContentText>
      </DialogContent>
      <DialogActions disableSpacing>
        <Button onClick={onCancel} autoFocus size="medium">
          {cancelText || "Cancel"}
        </Button>
        <Button
          variant="contained"
          onClick={onAccept}
          color="error"
          autoFocus
          size="medium"
          sx={{ ml: 1 }}
        >
          {confirmText || "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
