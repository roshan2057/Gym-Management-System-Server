const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Checkemail, ChangepwdDb } = require("../model/Membersdb");
const { forgetmail } = require("./MailContorller");


const createtoken = (id, email, key) => {
    return jwt.sign({ id: id, email: email }, key, { expiresIn: 259200 });
}

const forgetpassword = (req, res) => {
    const { email } = req.body;
    Checkemail(email, (success, error) => {
        if (error) return console.log(error);
        if (success.length !== 0) {
            const key = success[0].password;
            const token = createtoken(success[0].id, success[0].email, key);
            const email = success[0].email
            const name = success[0].name;

            forgetmail(email, name, token)
                .then(response => {
                    res.json("Check your email");
                    return;

                })
                .catch(error => {
                    res.json({ error })
                    return;

                });

        }
        else {
            return res.json("email not found");

        }
    })
};

const Resetpassword=async(req,res)=>{
   const {newpass, cpass, token, email} = req.body.data;
   const newpassword = await bcrypt.hash(newpass, 10);


   Checkemail(email,(success, error)=>{
    if (error) return console.log(error);
    if (success.length !== 0) {
        const key = success[0].password;
        jwt.verify(token,key,(error,result)=>{
            if(error) return res.send("invalid token")

            const data = {
                id: success[0].id,
                password: newpassword
            }
            ChangepwdDb(data, (success, error) => {
                if (error) return console.log(error);
                return res.status(200).json({ data: "Updated sucessfully" });

            })
            
        })
    }
    else {
        return res.json("email not found");

    }
   })

}


module.exports = {
    forgetpassword,
    Resetpassword,
}