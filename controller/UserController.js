const jwt = require("jsonwebtoken");
const { RegisterDb, LoginDb, insert, select, Getdata, Getbilldata } = require("../model/Membersdb")
const private_key = "key";

const createtoken = (id) => {
    return jwt.sign({ id }, private_key, { expiresIn: 259200 });
}



const RegisterController = (req, res) => {
    try {
        RegisterDb(req.body, (success, error) => {
            if (error) throw error;
            console.log(success.insertId);
            res.status(200).json({ data: "Data Inserted Successfully", id: success.insertId });
        })
    }
    catch (error) {
        throw error;
    }
}

const LoginController = (req, res) => {
    try {
        LoginDb(req.body, (success, error) => {
            if (error) throw error;
            else if (success) {
                const token = createtoken(success[0].id)
                console.log(success[0].id);
                res.status(200).json({ token: token, id: success[0].id });


            }
            else {
                console.log("no data found");
                res.status(404).json({ data: "user not exits" });

            }

        })
    }
    catch (error) {
        throw error
    }
}

const DashboardController = (req, res) => {
    try {
        const id = req.data.id;
        Getdata(id, (success, error) => {
            if (error) throw error;
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
        throw error
    }

}

const FeeController = (req, res) => {
    try {
        const uid = req.data.id;
        Getbilldata(uid, (success, error) => {
            if (error) { throw error; }
            else if (success) {
                const bill = success;
                const package = {
                    name: 'roshan',
                    class: 'bca',
                    id: '5'
                }
                let combine = {bill,package}
                console.log(combine);
                const pid = success[0].package_id;
               
            

            }
            else { console.log("no data"); }
        })

    }
    catch (error) {
        throw error;
    }
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
    DashboardController,
    FeeController,
    private_key
}