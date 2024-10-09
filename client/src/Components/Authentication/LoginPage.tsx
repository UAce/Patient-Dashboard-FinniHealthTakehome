import { useEffect, useState } from "react";
import { auth } from "./FirebaseApp";
import "firebase/auth";
import { Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import * as firebaseui from "firebaseui";
import { AppColor } from "../../Common/constants";
import { EmailAuthProvider, GithubAuthProvider } from "firebase/auth";

export const LoginPage = () => {
  const [isLoginFormLoading, setIsLoginFormLoading] = useState(true);

  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ?? new firebaseui.auth.AuthUI(auth);

    ui.start("#firebaseui-auth-container", {
      signInSuccessUrl: "/patients",
      signInOptions: [
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          buttonColor: AppColor.Primary,
          fullLabel: "Continue with Email",
        },
        {
          provider: GithubAuthProvider.PROVIDER_ID,
          fullLabel: "Continue with GitHub",
        },
        // Add other providers as needed
      ],
      // This sets the sign-in flow to use a popup
      // N.B. GitHub login doesn't work without this
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          return true;
        },
        uiShown: function () {
          setIsLoginFormLoading(false);
        },
      },
    });

    return () => {
      ui.reset();
    };
  }, []);

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: AppColor.Secondary,
      }}
    >
      <Paper
        sx={{
          padding: "4rem 2rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: "2rem", fontWeight: "bold", color: AppColor.Primary }}
        >
          Welcome to Finni Health
        </Typography>

        {isLoginFormLoading ? (
          <Stack flexDirection="row" sx={{ justifyContent: "center" }}>
            <CircularProgress />
          </Stack>
        ) : null}

        <Box
          id="firebaseui-auth-container"
          sx={{
            "& .firebaseui-container": {
              boxShadow: "none",
            },
            "& .mdl-button--primary.mdl-button--primary": {
              color: AppColor.Primary,
            },
            "& .mdl-button--raised.mdl-button--colored": {
              backgroundColor: AppColor.Primary,
            },
            ".firebaseui-textfield.mdl-textfield .firebaseui-label::after": {
              backgroundColor: AppColor.Primary,
            },
            "& .firebaseui-link": {
              color: AppColor.Primary,
            },
          }}
        ></Box>
      </Paper>
    </Stack>
  );
};
