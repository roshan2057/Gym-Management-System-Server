const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { RegisterDb, LoginDb, insert, select, Getbmi, Getbillpackage, Getmemberdata, Getpackage, Updatememberdb, Getstatement, CheckpwdDb, ChangepwdDb, Insertbmi, Getbmidb, Updatebmidb } = require("../model/Membersdb");



const createtoken = (id) => {
    return jwt.sign({ id }, process.env.private_key, { expiresIn: 259200 });
}



const RegisterController = async (req, res) => {
    try {
        const password = req.body.data.password;
        const hash = await bcrypt.hash(password, 10);
        const data = {
            name: req.body.data.name,
            phone: req.body.data.phone,
            password: hash,
            address: req.body.data.address,
            gender: req.body.data.gender,
            email: req.body.data.email
        }
        const bmi = {
            height: req.body.data.height,
            weight: req.body.data.weight,
            bmi: req.body.data.bmi
        }

        RegisterDb(data, (success, error) => {
            if (error) return console.log(error);
            const id = success.insertId;
            Insertbmi(success.insertId, bmi, (success, error) => {
                if (error) return console.log(error);
                console.log(id);

                res.status(200).json({ data: "Data Inserted Successfully", id: id });
            })

        })
    }
    catch (error) {
        return console.log(error)
    }
}

const LoginController = (req, res) => {
    const password = req.body.password;
    try {
        LoginDb(req.body, async (success, error) => {
            if (error) return console.log(error);
            else if (success) {
                // return console.log(success);
                const hashed = success[0].password;
                const ismatched = await bcrypt.compare(password, hashed);
                if (ismatched) {
                    const token = createtoken(success[0].id)
                    console.log(success[0].id);
                    res.status(200).json({ token: token, id: success[0].id, user: "user" });
                }
                else {
                    res.status(404).json({ data: "Password incorrect" });
                }
            }
            else {
                console.log("no data found");
                res.status(404).json({ data: "User not Found!!" });
            }
        })
    }
    catch (error) {
        return console.log(error)
    }
}

const ChangepwdController = async (req, res) => {
    const password = req.body.password;
    const newpassword = await bcrypt.hash(req.body.newpassword, 10);
    const uid = req.data.id;
    // return console.log(password, newpassword , uid)
    CheckpwdDb(uid, async (success, error) => {
        if (error) return console.log(error);
        else if (success) {
            const hashed = success[0].password;
            const ismatched = await bcrypt.compare(password, hashed);
            if (ismatched) {
                const data = {
                    id: uid,
                    password: newpassword
                }
                ChangepwdDb(data, (success, error) => {
                    if (error) return console.log(error);
                    res.status(200).json({ data: "Updated sucessfully" });

                })

            }
            else {

                res.status(404).json({ data: "Password incorrect" });
            }
        }
        else {
            console.log("no data found");
            res.status(404).json({ data: "User not Found!!" });
        }
    })
}

const Bmicontroller = (req, res) => {
    try {
        const id = req.data.id;
        Getbmi(id, (success, error) => {
            if (error) return console.log(error);
            else if (success) {
                // console.log(success);
                res.json(success)
            }
            else {
                console.log("no data)");
            }
        })
    }
    catch (error) {
        return console.log(error)
    }

}

const FeeController = (req, res) => {
    try {
        var member = '';

        const uid = req.data.id;
        Getbillpackage(uid, (success, error) => {
            if (error) { return console.log(error); }
            else if (success) {
                const data = success;
                Getmemberdata(uid, (memdata, error) => {
                    if (error) return console.log(error);
                    member = memdata;
                    res.json({ bill: data, user: member });

                })

            }
            else { console.log("no data"); }
        })

    }
    catch (error) {
        return console.log(error);
    }
}

const Profilecontroller = (req, res) => {
    const uid = req.data.id;
    Getmemberdata(uid, (success, error) => {
        if (error) return console.log(error);
        console.log(success)
        res.status(200).json({ data: success });
    })
}

const Updatebmicontroller = (req, res) => {
    const data = {
        id: req.data.id,
        height: req.body.height,
        weight: req.body.weight,
        bmi: req.body.bmi,
    }
    Updatebmidb(data, (success, error) => {
        if (error) return console.log(error);
        res.status(200).json({ data: "update successfully" });
    })
}
const Statementcontroller = (req, res) => {
    const uid = req.data.id;
    Getstatement(uid, (success, error) => {
        if (error) return console.log(error);
        else if (success) {
            console.log("date")
            res.status(200).json({ statement: success });
        }
        else {
            res.status(200).json({ statement: [] });
        }
    })
}



const Updateprofile = (req, res) => {
    const uid = req.data.id;
    Updatememberdb(uid, req.body, (success, error) => {
        if (error) return console.log(error);
        res.status(200).json({ data: success });
    })
}

const Viewpackagecontroller = (req, res) => {
    Getpackage((success, error) => {
        if (error) return console.log(error);
        res.status(200).json({ package: success });
    })
}


const conr = (req, res) => {
    if (req.body.name === "") {
        return res.status(401).send('enter name');
    }
    insert(req.body, (succ, err) => {
        if (succ) {

            console.log(succ[0].insertId);
            const token = { token: createtoken(succ.insertId) }
            return res.json(token);

        } else {
            console.error(err);

            return res.send("error");
        }
    });

}



const check = (req, res) => {
    select(req.body, (succ, err) => {
        if (succ === "true") {
            console.log(succ[0].id);
            const data = {
                id: succ[0].id,
                username: succ[0].username
            }
            return res.json(data)

        }
        else if (succ === "false") {
            res.json("data not found")

            console.log("data not found");
        }

        else {
            console.error(err);

            return res.send("error");
        }
    });
}





module.exports = {
    RegisterController,
    LoginController,
    Bmicontroller,
    Updatebmicontroller,
    FeeController,
    Profilecontroller,
    Updateprofile,
    Statementcontroller,
    ChangepwdController,
    Viewpackagecontroller,
}