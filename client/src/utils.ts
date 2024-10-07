export const camelCaseToWords = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add a space before each uppercase letter
    .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
    .trim(); // Remove any leading/trailing spaces
};
