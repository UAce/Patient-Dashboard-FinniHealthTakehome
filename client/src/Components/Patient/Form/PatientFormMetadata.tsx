import { Clear, Add } from "@mui/icons-material";
import { Stack, TextField, Button } from "@mui/material";
import { PatientFormSection } from "./PatientFormSection";
import { usePatientFormContext } from "./PatientFormContext";

export const PatientFormMetadata = () => {
  const { patientData, setPatientData } = usePatientFormContext();

  const addAdditionalInfo = () => {
    if (patientData?.metadata) {
      setPatientData({
        ...patientData,
        metadata: [
          ...patientData.metadata,
          {
            // empty metadata
            key: "",
            value: "",
          },
        ],
      });
    }
  };

  const removeAdditionalInfo = (index: number) => {
    if (patientData?.metadata) {
      const newMetadata = patientData.metadata.filter((_, i) => i !== index);

      setPatientData({
        ...patientData,
        metadata: newMetadata,
      });
    }
  };

  const handleMetadataChange = (index: number, key: string, value: string) => {
    const newMetadata = patientData?.metadata?.map((data, i) => {
      if (i === index) {
        return { ...data, [key]: value };
      }
      return data;
    });
    setPatientData({ ...patientData, metadata: newMetadata });
  };

  return patientData?.metadata ? (
    <Stack>
      {patientData.metadata.length > 0 ? (
        <PatientFormSection title="Additional Information">
          {patientData.metadata.map(({ key, value }, index) => {
            return (
              <Stack flexDirection="row" gap={1} key={`metadata-${index}`}>
                <TextField
                  variant="outlined"
                  label="key"
                  defaultValue={key}
                  onChange={(e) => {
                    handleMetadataChange(index, "key", e.target.value);
                  }}
                  required
                />
                <TextField
                  variant="outlined"
                  label="value"
                  defaultValue={value}
                  onChange={(e) =>
                    handleMetadataChange(index, "value", e.target.value)
                  }
                  required
                />
                <Button
                  onClick={() => removeAdditionalInfo(index)}
                  startIcon={<Clear />}
                >
                  Remove
                </Button>
              </Stack>
            );
          })}
        </PatientFormSection>
      ) : null}
      <Button startIcon={<Add />} onClick={() => addAdditionalInfo()}>
        Add Additional Information
      </Button>
    </Stack>
  ) : null;
};
