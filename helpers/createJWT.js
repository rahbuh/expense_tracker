const jwt = require("jsonwebtoken");

const createJWT = async (id, name) => {
  const payload = {
    user: {
      id
    }
  };
  const token = jwt.sign(payload, process.env.JWTSECRET, { expiresIn: 900 });
  return token ? { username: name, token } : null;
};

module.exports = createJWT;
