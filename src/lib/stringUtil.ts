import { dayjs } from "./timeUtil";

export const toStringValue = (value: unknown): string => {
  switch (typeof value) {
    case "string":
      return value;
    case "object":
      if (value instanceof Date && dayjs(value).isValid()) {
        return dayjs(value).format("YYYY/MM/DD");
      }
      return "";
    default:
      return "";
  }
};
