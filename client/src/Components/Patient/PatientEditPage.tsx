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
  AddressType,
  Patient,
  updatableFields,
  useEditPatientMutation,
  useGetPatientByIdQuery,
} from "../../Common/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { Add, ArrowBack, Clear } from "@mui/icons-material";
import { PatientEditSection } from "./PatientEditSection";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { pick } from "lodash";
import { AppColor } from "../../Common/constants";

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

  const removeSecondaryAddress = (index: number) => {
    if (formData?.addresses) {
      const newAddresses = formData.addresses.filter((_, i) => i !== index);

      setFormData({
        ...formData,
        addresses: newAddresses,
      });
    }
  };

  const addSecondaryAddress = () => {
    console.log("add secondary address");
    if (formData?.addresses) {
      const newAddresses = formData.addresses.slice();
      newAddresses.push({
        // empty address
        type: AddressType.Secondary,
        line1: "",
        line2: "",
        city: "",
        area: "",
        country: "",
        postalCode: "",
      });

      console.log(newAddresses);

      setFormData({
        ...formData,
        addresses: newAddresses,
      });
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        id: data.id,
        ...pick(data, updatableFields),
      });
    }
  }, [data]);

  function addAdditionalInfo(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Paper sx={{ margin: "2rem 1rem" }}>
      {isLoading ? (
        // TODO: make a better skeleton or a loading circle bar
        <Skeleton />
      ) : formData ? (
        <>
          <Stack
            flexDirection="row"
            sx={{ alignItems: "center" }}
            columnGap={1}
          >
            <IconButton onClick={() => navigate(`/patients/${formData.id}`)}>
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
                  id: formData.id,
                  ...formData,
                }).unwrap();
                navigate(`/patients/${formData.id}`);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            <Box
              sx={{
                margin: "24px",
                width: "500px",
              }}
            >
              <PatientEditSection title="Personal Information">
                <TextField
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  defaultValue={formData.firstName}
                  required
                />
                <TextField
                  variant="outlined"
                  label="Middle Name"
                  name="middleName"
                  defaultValue={formData.middleName}
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  name="lastName"
                  defaultValue={formData.lastName}
                  required
                />
                <DatePicker
                  label="Date of Birth"
                  name="dateOfBirth"
                  defaultValue={dayjs(formData.dateOfBirth)}
                  onChange={handleDateOfBirthChange}
                />
              </PatientEditSection>

              <Stack>
                {formData.addresses?.map((address, index) => {
                  return (
                    <PatientEditSection
                      title={
                        <Stack
                          flexDirection={"row"}
                          sx={{
                            alignItems: "start",
                            justifyContent: "space-between",
                          }}
                          columnGap={2}
                        >
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", paddingBottom: "2rem" }}
                          >
                            {address.type} Address
                          </Typography>
                          {address.type === AddressType.Secondary ? (
                            <Button
                              onClick={() => removeSecondaryAddress(index)}
                              startIcon={<Clear />}
                            >
                              Remove
                            </Button>
                          ) : null}
                        </Stack>
                      }
                      key={`address-${index}`}
                    >
                      <TextField
                        variant="outlined"
                        value={address.line1}
                        label="Address Line 1"
                        required
                      />
                      <TextField
                        variant="outlined"
                        value={address.line2}
                        label="Address Line 2"
                      />
                      <TextField
                        variant="outlined"
                        value={address.city}
                        label="City"
                        required
                      />
                      <TextField
                        variant="outlined"
                        value={address.area}
                        label="Area"
                        required
                      />
                      <TextField
                        variant="outlined"
                        value={address.country}
                        label="Country"
                        required
                      />
                      <TextField
                        variant="outlined"
                        value={address.postalCode}
                        label="Postal Code"
                        required
                      />
                    </PatientEditSection>
                  );
                })}
                <Button
                  startIcon={<Add />}
                  onClick={() => addSecondaryAddress()}
                >
                  Add Secondary Address
                </Button>
              </Stack>

              <Stack>
                {formData.metadata && formData.metadata?.length > 0 ? (
                  <PatientEditSection title="Additional Information">
                    {formData.metadata.map(({ key, value }, index) => {
                      return (
                        <Stack flexDirection="row" gap={1} key={key}>
                          <TextField
                            variant="outlined"
                            label="key"
                            defaultValue={key}
                            required
                          />
                          <TextField
                            key={key}
                            variant="outlined"
                            label="value"
                            defaultValue={value}
                            required
                          />
                          <Button
                            onClick={() => removeSecondaryAddress(index)}
                            startIcon={<Clear />}
                          >
                            Remove
                          </Button>
                        </Stack>
                      );
                    })}
                  </PatientEditSection>
                ) : null}
                <Button startIcon={<Add />} onClick={() => addAdditionalInfo()}>
                  Add Additional Information
                </Button>
              </Stack>

              <Stack
                spacing={2}
                sx={{ maxWidth: "100%" }}
                flexDirection="row-reverse"
              >
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ width: "100px", backgroundColor: AppColor.Primary }}
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
