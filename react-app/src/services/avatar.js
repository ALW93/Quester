// GET specific user avatar
export const getAvatar = async (id) => {
  const response = await fetch(`/api/users/${id}/avatar`);
  const data = await response.json();
  return data;
};

// POST new avatar for new user
export const createAvatar = async (id, data) => {
  const response = await fetch(`/api/users/${id}/avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};
