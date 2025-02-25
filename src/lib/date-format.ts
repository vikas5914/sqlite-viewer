import { formatDistanceToNow, format } from "date-fns";

const isValidDate = (date: any) => {
  return date instanceof Date && !isNaN(date.getTime());
};

const formatDateRelative = (dateValue: string) => {
  const date = new Date(dateValue);
  if (!isValidDate(date)) return dateValue;

  return formatDistanceToNow(date, { addSuffix: true });
};

const formatDateFormatted = (dateValue: string) => {
  const date = new Date(dateValue);
  if (!isValidDate(date)) return dateValue;

  return format(date, "MMMM do, yyyy");
};

const formatTime = (dateValue: string) => {
  const date = new Date(dateValue);
  if (!isValidDate(date)) return dateValue;

  return format(date, "hh:mm a");
};

const formatDateShort = (dateValue: string) => {
  const date = new Date(dateValue);
  if (!isValidDate(date)) return dateValue;

  return format(date, "MM/dd/yyyy");
};

const formatDateLong = (dateValue: string) => {
  const date = new Date(dateValue);
  if (!isValidDate(date)) return dateValue;

  return format(date, "EEEE, MMMM do, yyyy");
};

export const dateFormats: Record<
  string,
  { label: string; func: (dateValue: string) => string }
> = {
  formatDateRelative: { label: "over 56 years ago", func: formatDateRelative },
  formatDateFormatted: {
    label: "January 9th, 1968",
    func: formatDateFormatted
  },
  formatTime: { label: "12:00 am", func: formatTime },
  formatDateShort: { label: "01/09/1968", func: formatDateShort },
  formatDateLong: { label: "Monday, January 9th, 1968", func: formatDateLong }
};
