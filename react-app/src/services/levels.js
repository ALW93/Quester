export const parseLevel = (exp) => {
  if (exp < 300) {
    return 1;
  } else if (exp < 900) {
    return 2;
  } else if (exp < 2700) {
    return 3;
  }
};
