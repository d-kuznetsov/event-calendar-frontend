function register(userData: { name: string; email: string; password: string }) {
  console.log(userData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: userData.name,
        email: userData.email,
      });
    }, 1000);
  });
}

function login(credentials: { email: string; password: string }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: "test",
        email: credentials.email,
      });
    }, 1000);
  });
}

export default {
  register,
  login,
};
