export const isLoggedIn = () => {
  const token = localStorage.getItem("event-token");
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem("event-token");
};
