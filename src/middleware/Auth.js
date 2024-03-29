const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const token = req.cookies.token;
  const token = req.headers.auth;
  if (token) {
    jwt.verify(token, process.env.private_key, (error, result) => {
      if (error) {
        return res.send("token invalid")
      }
      else {
        const data = jwt.decode(token)
        req.data = data;
        //   console.log("auth",result);
        next();
      }
    })
  }
  else {
    return res.send("no token")
  }
};




module.exports = auth
