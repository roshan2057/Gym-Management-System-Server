const jwt = require('jsonwebtoken')

const Admin_auth = (req, res, next) => {
    const token = req.headers.auth;
    if (token) {
        jwt.verify(token, process.env.admin_key, (error, result) => {
            if (error) {
                return res.send("token invalid")
            }
            else {
                console.log('admin')
                next();
            }
        })
    }
    else {
        return res.send("no token")
    }
}

module.exports = Admin_auth;