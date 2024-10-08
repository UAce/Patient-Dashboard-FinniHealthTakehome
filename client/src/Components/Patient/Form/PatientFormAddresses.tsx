import { Clear, Add } from "@mui/icons-material";
import { Stack, Typography, Button, TextField } from "@mui/material";
import { AddressType, Patient } from "../../../Common/apiSlice";
import { PatientFormSection } from "./PatientFormSection";
import { usePatientFormContext } from "./PatientFormContext";

export const PatientFormAddresses = () => {
  const { patientData, setPatientData } = usePatientFormContext();

  const addSecondaryAddress = () => {
    const oldAddresses = patientData?.addresses || [];

    setPatientData({
      ...patientData,
      addresses: [
        ...oldAddresses,
        {
          // empty address
          type: AddressType.Secondary,
          line1: "",
          line2: "",
          city: "",
          area: "",
          country: "",
          postalCode: "",
        },
      ],
    });
  };

  const removeSecondaryAddress = (index: number) => {
    if (patientData?.addresses) {
      const newAddresses = patientData.addresses.filter((_, i) => i !== index);

      setPatientData({
        ...patientData,
        addresses: newAddresses,
      });
    }
  };

  const handleAddressChange = <T extends keyof Patient["addresses"][number]>(
    index: number,
    field: T,
    value: Patient["addresses"][number][T]
  ) => {
    const newAddresses = patientData?.addresses?.map((address, i) => {
      if (i === index) {
        return { ...address, [field]: value };
      }
      return address;
    });
    setPatientData({ ...patientData, addresses: newAddresses });
  };

  return patientData?.addresses ? (
    <Stack>
      {patientData.addresses.map((address, index) => {
        return (
          <PatientFormSection
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
              defaultValue={address.line1}
              label="Address Line 1"
              onChange={(e) =>
                handleAddressChange(index, "line1", e.target.value)
              }
              required
            />
            <TextField
              variant="outlined"
              defaultValue={address.line2}
              label="Address Line 2"
              onChange={(e) =>
                handleAddressChange(index, "line2", e.target.value)
              }
            />
            <TextField
              variant="outlined"
              defaultValue={address.city}
              label="City"
              onChange={(e) =>
                handleAddressChange(index, "city", e.target.value)
              }
              required
            />
            <TextField
              variant="outlined"
              defaultValue={address.area}
              label="Area"
              onChange={(e) =>
                handleAddressChange(index, "area", e.target.value)
              }
              required
            />
            <TextField
              variant="outlined"
              defaultValue={address.country}
              label="Country"
              onChange={(e) =>
                handleAddressChange(index, "country", e.target.value)
              }
              required
            />
            <TextField
              variant="outlined"
              defaultValue={address.postalCode}
              label="Postal Code"
              onChange={(e) =>
                handleAddressChange(index, "postalCode", e.target.value)
              }
              required
            />
          </PatientFormSection>
        );
      })}
      <Button startIcon={<Add />} onClick={() => addSecondaryAddress()}>
        Add Secondary Address
      </Button>
    </Stack>
  ) : null;
};
