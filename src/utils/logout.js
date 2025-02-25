const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("deviceId");
  localStorage.removeItem("refreshToken");
};

export default logout;
