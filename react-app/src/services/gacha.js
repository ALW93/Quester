const gacha = (type, difficulty) => {
  let output = { exp: 0, currency: 0, health: 0 };
  const multi = gachaMultiplier();
  console.log("multi", multi);
  if (type === "complete_task") {
    output.exp = Math.round(difficulty * 10 * (multi / 1.5 || 1));
    output.currency = difficulty * (multi || 1);
    output.health = difficulty;
  }
  if (type === "expire_task") {
    output.health = -Math.round((multi || 1) * 2);
  }
  if (type === "restore_task") {
    output.currency = -difficulty * 10;
    output.health = Math.round(difficulty * 1.5);
  }
  if (type === "check_streak") {
    return;
  }
  if (type === "lose_streak") {
    return;
  }
  if (type === "complete_check") {
    return;
  }
  return output;
};

const gachaMultiplier = () => {
  const roll = Math.floor(Math.random() * 100);
  if (roll < 40) {
    return;
  }
  if (roll < 70) {
    return 2;
  }
  if (roll < 90) {
    return 3;
  }
  if (roll <= 100) {
    return 4;
  }
};

console.log(gacha("restore_task", 5));
// habit_checker, complete_check
