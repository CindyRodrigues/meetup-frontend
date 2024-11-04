export const formatDateTime = (eventDate) => {
  const date = new Date(eventDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return { date: formattedDate.split(", ").join(" "), time: formattedTime };
};
