import {
  Box,
  Button,
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
import { ArrowBack, Edit } from "@mui/icons-material";
import { KeyValue } from "../KeyValue";
import { PatientViewSection } from "./PatientViewSection";
import { PatientStatusChip } from "./PatientStatusChip";
import { isEmpty } from "lodash";
import dayjs from "dayjs";
import { camelCaseToWords } from "../../utils";

export const PatientViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useGetPatientByIdQuery(id ? id : skipToken);

  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
        // TODO: make a better skeleton or a loading circle bar
        <Skeleton />
      ) : data ? (
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
              maxWidth: "900px",
            }}
          >
            <Stack flexDirection="row" sx={{ justifyContent: "space-between" }}>
              <Stack flexDirection="row" alignItems="center" columnGap={0.5}>
                <Typography variant="h6">Status:</Typography>
                <PatientStatusChip status={data.status} />
              </Stack>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => navigate(`/patients/${data.id}/edit`)}
                sx={{ borderColor: "grey.500", color: "grey.700" }}
              >
                Edit
              </Button>
            </Stack>
            <PatientViewSection title="Personal Information">
              <KeyValue value={data.firstName} name="First Name" />
              <KeyValue value={data.middleName || "-"} name="Middle Name" />
              <KeyValue value={data.lastName} name="Last Name" />
              <KeyValue
                value={dayjs(data.dateOfBirth).format("LL")}
                name="Date of Birth"
              />
            </PatientViewSection>
            {data.addresses.map((address, index) => {
              return (
                <PatientViewSection
                  key={`address-${index}`}
                  title={`${address.type} Address`}
                >
                  <KeyValue
                    value={`${address.line1} ${address.line2}`}
                    name="Address"
                  />
                  <KeyValue value={address.city} name="City" />
                  <KeyValue value={address.area} name="Area" />
                  <KeyValue value={address.country} name="Country" />
                  <KeyValue value={address.postalCode} name="Postal Code" />
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
                      name={camelCaseToWords(key)}
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
