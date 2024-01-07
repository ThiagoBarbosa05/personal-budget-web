import dayjs from "dayjs";

type FormatDateParams = {
  date: string | Date
}

export function formatDate({date}: FormatDateParams) {
  return dayjs(date).format("MMMM D, YYYY");
}
