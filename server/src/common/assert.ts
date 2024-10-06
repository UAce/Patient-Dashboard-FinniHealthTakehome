export const assertValue = <T>(
  value: T | undefined | null,
  message?: string
): T => {
  if (value === undefined) {
    throw new Error(message ?? "Required value is undefined");
  }

  if (value === null) {
    throw new Error(message ?? "Required value is null");
  }

  return value;
};
