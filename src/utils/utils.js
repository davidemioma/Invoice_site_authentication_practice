export function formatDate(date) {
  const formatter = new Intl.DateTimeFormat(navigator.language || "eu", {
    month: "short",
    year: "numeric",
    day: "2-digit",
  });

  const dateObj = new Date(date);
  return formatter.format(dateObj);
}

export function formatEditDate(date) {
  const d = new Date(date);
  const dd = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
  const mm = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(d);
  const yyyy = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
  const newDate = `${yyyy}-${mm}-${dd}`;

  return newDate;
}

export function getDueDate(date, terms) {
  const futureTime = terms * 24 * 60 * 60 * 1000;

  const dateTime = new Date(date).getTime();

  const newDate = futureTime + dateTime;

  const dueDate = formatDate(newDate);

  return dueDate;
}

export const calcExpiringTime = (time) => {
  const currentTime = new Date().getTime();

  const expiringTime = new Date(time).getTime();

  const remainingTime = expiringTime - currentTime;

  return remainingTime;
};

export const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  const storedExpiringTime = localStorage.getItem("expiringTime");

  const remainingTime = calcExpiringTime(storedExpiringTime);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");

    localStorage.removeItem("expiringTime");

    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};
