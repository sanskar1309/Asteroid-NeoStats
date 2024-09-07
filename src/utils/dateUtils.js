// Formats a Date object into YYYY-MM-DD format
export const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

// Converts a date string (YYYY-MM-DD) into a Date object
export const parseDate = (dateString) => {
  return new Date(dateString);
};

// Calculates the number of days between two dates
export const getDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
