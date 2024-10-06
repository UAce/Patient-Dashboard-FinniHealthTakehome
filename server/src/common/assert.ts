import { AnySchema } from "joi";

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

export function assertSchema<T>(
  schema: AnySchema,
  data: unknown
): asserts data is T {
  const { error } = schema.validate(data, { allowUnknown: true });
  if (error) {
    throw new Error(error.message);
  }
}
