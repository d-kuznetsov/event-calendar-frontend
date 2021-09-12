import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 1000,
});

async function register(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await httpClient.post("/register", {
    ...userData,
  });
  return res.data;
}

async function login(credentials: { email: string; password: string }) {
  const res = await httpClient.post("/login", {
    ...credentials,
  });
  return res.data;
}

export default {
  register,
  login,
};
