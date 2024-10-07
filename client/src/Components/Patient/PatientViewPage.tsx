import {
  Box,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useGetPatientByIdQuery } from "../../apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { ArrowBack } from "@mui/icons-material";
import { KeyValue } from "../KeyValue";
import { format } from "date-fns";
import { PatientViewSection } from "./PatientViewSection";
import { PatientStatusChip } from "./PatientStatusChip";
import { capitalize, isEmpty } from "lodash";

export const PatientViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useGetPatientByIdQuery(id ? id : skipToken);

  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
        // TODO: make a better skeleton or a loading circle bar
        <Skeleton />
      ) : // TODO: show empty list if no patients
      data ? (
        <>
          <Stack
            flexDirection="row"
            sx={{ alignItems: "center" }}
            columnGap={1}
          >
            <IconButton onClick={() => navigate("/patients")}>
              <ArrowBack fontSize="large" />
            </IconButton>
            <Typography variant="h5">Patient Profile</Typography>
          </Stack>
          <Divider />
          <Box
            sx={{
              margin: "24px",
            }}
          >
            <Stack flexDirection="row" alignItems="center" columnGap={0.5}>
              <Typography variant="h6">Status:</Typography>
              <PatientStatusChip status={data.status} />
            </Stack>
            <PatientViewSection title="Personal Information">
              <KeyValue value={data.firstName} name="First Name" />
              <KeyValue value={data.middleName || "-"} name="Middle Name" />
              <KeyValue value={data.lastName} name="Last Name" />
              <KeyValue
                value={format(data.dateOfBirth, "PPP")}
                name="Date of Birth"
              />
            </PatientViewSection>
            {data.addresses.map((address) => {
              return (
                <PatientViewSection
                  key={address.id}
                  title={`${address.type} Address`}
                >
                  <KeyValue
                    value={`${address.line1} ${address.line2}`}
                    name="Address"
                  />
                  <KeyValue value={address.city} name="City" />
                  <KeyValue value={address.area} name="Area" />
                  <KeyValue value={address.country} name="Country" />
                  <KeyValue value={address.postalCode} name="postalCode" />
                </PatientViewSection>
              );
            })}
            {!isEmpty(data.metadata) ? (
              <PatientViewSection title="Additional Information">
                {Object.keys(data.metadata).map((key) => {
                  return (
                    <KeyValue
                      key={key}
                      value={data.metadata[key]}
                      name={capitalize(key)}
                    />
                  );
                })}
              </PatientViewSection>
            ) : null}
          </Box>
        </>
      ) : null}
    </Paper>
  );
};
