export const getToken = () => {
    const tokenString = localStorage.getItem("token");
    const userToken = tokenString !== null ? JSON.parse(tokenString) : null;
    return userToken;
  };