import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Patient,
  updatableFields,
  useEditPatientMutation,
  useGetPatientByIdQuery,
} from "../../apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { ArrowBack } from "@mui/icons-material";
import { PatientEditSection } from "./PatientEditSection";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { pick } from "lodash";
import { AppColor } from "../../constants";

export const PatientEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editPatientMutation] = useEditPatientMutation();

  const { isLoading, data } = useGetPatientByIdQuery(id ? id : skipToken);
  const [formData, setFormData] = useState<Partial<Patient> | undefined>(
    undefined
  );

  const handleChange = (event: BaseSyntheticEvent) => {
    const { name, value } = event.target;

    const newFormData = {
      ...formData,
      [name]: value,
    };

    console.log({
      newFormData,
      formData,
    });
    setFormData(newFormData);
  };

  const handleDateOfBirthChange = (date: Dayjs | null) => {
    if (date) {
      console.log(formData);
      setFormData({
        ...formData,
        dateOfBirth: date.toISOString(),
      });
    }
  };

  useEffect(() => {
    if (data) {
      setFormData(pick(data, updatableFields));
    }
  }, [data]);

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
            <IconButton onClick={() => navigate(`/patients/${data.id}`)}>
              <ArrowBack fontSize="large" />
            </IconButton>
            <Typography variant="h5">Edit Patient Profile</Typography>
          </Stack>
          <Divider />
          <form
            onChange={handleChange}
            onSubmit={async (value) => {
              value.preventDefault();

              // TODO: Success/Error toast
              try {
                await editPatientMutation({
                  id: data.id,
                  ...formData,
                }).unwrap();
                navigate(`/patients/${data.id}`);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Box
              sx={{
                margin: "24px",
                width: "350px",
              }}
            >
              <PatientEditSection title="Personal Information">
                <TextField
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  defaultValue={data.firstName}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Middle Name"
                  name="middleName"
                  defaultValue={data.middleName}
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  name="lastName"
                  defaultValue={data.lastName}
                  required
                />
                <DatePicker
                  label="Date of Birth"
                  name="dateOfBirth"
                  defaultValue={dayjs(data.dateOfBirth)}
                  onChange={handleDateOfBirthChange}
                />
              </PatientEditSection>
              {/* {data.addresses.map((address) => {
                return (
                  <PatientEditSection title={`${address.type} Address`}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      name="firstName"
                      defaultValue={data.firstName}
                      required
                    />
                    <TextField
                      variant="outlined"
                      label="Middle Name"
                      name="middleName"
                      defaultValue={data.middleName}
                    />
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      name="lastName"
                      defaultValue={data.lastName}
                      required
                    />
                    <DatePicker
                      label="Date of Birth"
                      value={dateOfBirth}
                      onChange={(date) => setDateOfBirth(date)}
                    />
                  </PatientEditSection>
                );
              })} */}
              <Stack spacing={2} sx={{ maxWidth: 100 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: AppColor.Primary }}
                >
                  Save
                </Button>
              </Stack>
            </Box>
          </form>
        </>
      ) : null}
    </Paper>
  );
};
