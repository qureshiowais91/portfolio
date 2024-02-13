// authUtils.js

export const getJWTToken = () => {
    return  JSON.parse(localStorage["authStore"])["state"]["user"];
  };
  