export const getAvatar = async (id) => {
  const response = await fetch(`/api/users/${id}/avatar`);
  const data = response.json();
  return data;
};
