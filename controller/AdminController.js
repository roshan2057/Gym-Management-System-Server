const jwt = require("jsonwebtoken");
const { AdminLoginDb, addpackagedb, Updatepackagedb, Deletepackagedb, Viewmembersdb, Viewpackagedb, Deletememberdb, Viewbilldb, viewpackagedb, Checkbillingdb, Checkbilldb } = require("../model/Admindb.js");

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.admin_key, { expiresIn: 259200 });
}



const LoginController = (req, res) => {
    try {
        AdminLoginDb(req.body, (success, error) => {
            if (error) return console.log(error);
            else if (success) {
                // const token = createtoken(success[0].username)
                const token = createtoken("admin")
                console.log(success[0].id);
                res.status(200).json({ token: token, id: success[0].id, user: "admin" });
            }
            else {
                console.log("no data found");
                res.status(404).json({ data: "user not exits" });

            }

        })
    }
    catch (error) {
        return console.log(error)
    }
}

const Viewpackage = (req, res) => {
    try {
        Viewpackagedb((data, error) => {
            if (error) return console.log(error);
            res.status(200).json({ package: data });
        })
    }
    catch (exception) {
        throw exception;
    }
}

const Addpackage = (req, res) => {
    try {
        addpackagedb(req.body, (success, error) => {
            if (error) return console.log(error);
            res.status(200).json({ data: "added", id: success.insertedId });
        })
    }
    catch (exception) {
        throw exception;
    }
}

const Updatepackage = (req, res) => {
    try {
        Updatepackagedb(req.params.id, req.body.data, (success, error) => {
            if (error) return console.log(error);
            res.status(200).json({ data: "updated" });
        })
    }
    catch (exception) {
        throw exception;
    }
}


const Deletepackage = (req, res) => {
    try {
        Deletepackagedb(req.params.id, (success, error) => {
            if (error) return console.log(error);
            res.status(200).json({ data: "deleted" });
        })
    }
    catch (exception) {
        throw exception;
    }
}

const Viewmembers = (req, res) => {
    try {
        Viewmembersdb((data, error) => {
            if (error) return console.log(error);

            res.status(200).json({ data: data });
        })


    }
    catch (exception) {
        throw exception;
    }
}



const Deletemember = (req, res) => {
    try {
        const uid = req.params.id;
        Checkbilldb(uid, (success, error) => {
            if (error) return console.log(error);
            else if (!success) {
                Deletememberdb(uid, (success, error) => {
                    if (error) return console.log(error);
                    else if (success) {
                        res.status(200).json({ data: "member deleted" });

                    }
                    else {
                        res.status(200).json({ data: "Already Deleted" });
                    }
                })
            }
            else {
                res.status(200).json({ data: "Cannot delete because it contain payment" });
            }
        })


    }
    catch (exception) {
        throw exception;
    }
}


const Billcontroller = (req, res) => {
    Viewbilldb((success, error) => {
        if (error) return console.log(error);

        Viewmembersdb((data, error) => {
            if (error) return console.log(error);
            Viewpackagedb((package, error) => {
                if (error) return console.log(error);
                res.status(200).json({ bill: success, member: data, package: package });

            })

        })
    })
}




const DashboardController = (req, res) => {
    try {
        const id = req.data.id;
        Getdata(id, (success, error) => {
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


module.exports = {
    LoginController,
    Addpackage,
    Updatepackage,
    Deletepackage,
    Viewmembers,
    Deletemember,
    Billcontroller,
    Viewpackage,

}