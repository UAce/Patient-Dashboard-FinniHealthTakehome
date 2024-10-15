export const camelCaseToWords = (str: string) => {
  return str
    .replace(/([A-Z])/g, " $1") // Add a space before each uppercase letter
    .replace(/^./, (match) => match.toUpperCase()) // Capitalize the first letter
    .trim(); // Remove any leading/trailing spaces
};

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string) => {
  const firstNameInitial = name.split(" ")[0]?.[0] || "Welcome";
  const lastNameInitial = name.split(" ")[1]?.[0] || "";

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstNameInitial}${lastNameInitial}`,
  };
};
