export const parseLevel = (exp) => {
  if (exp < 300) {
    return 1;
  } else if (exp < 900) {
    return 2;
  } else if (exp < 2700) {
    return 3;
  }
};

export const parseStatLevel = (points) => {
  if (points < 50) return "⭐";
  if (points < 120) return "⭐⭐";
  if (points < 250) return "⭐⭐⭐";
  if (points < 500) return "⭐⭐⭐⭐";
  if (points < 1000) return "⭐⭐⭐⭐⭐";
};

export const parseDifficulty = (num) => {
  if (num === 1) return "⭐";
  if (num === 2) return "⭐⭐";
  if (num === 3) return "⭐⭐⭐";
  if (num === 4) return "⭐⭐⭐⭐";
  if (num === 5) return "⭐⭐⭐⭐⭐";
};
