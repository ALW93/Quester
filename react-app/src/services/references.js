export const parseCheckDate = (arr) => {
  return arr.map((c) => {
    return DateTime.fromHTTP(`${c.date}`).toLocaleString({
      weekday: "long",
      month: "2-digit",
      day: "2-digit",
    });
  });
};
