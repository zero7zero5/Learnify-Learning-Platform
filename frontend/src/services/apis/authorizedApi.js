import axios from "axios";

function authorizedApi(token) {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000,
  });

  instance.interceptors.request.use(
    function (config) {
      config.headers["authorization"] = `JWT ${token}`;
      // console.log("Request Headers:", config.headers);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return instance;
}

export { authorizedApi };
