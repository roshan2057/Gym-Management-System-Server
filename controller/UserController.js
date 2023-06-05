const jwt = require("jsonwebtoken");
const { RegisterDb, LoginDb, insert, select, Getmemberpackage, Getbmi, Getalldetails, Getbillpackage, Getmemberdata, Getpackage, Updatememberdb } = require("../model/Membersdb");
const private_key = "key";

const createtoken = (id) => {
    return jwt.sign({ id }, private_key, { expiresIn: 259200 });
}



const RegisterController = (req, res) => {
    try {

        RegisterDb(req.body.data, (success, error) => {
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
                res.status(404).json({ data: "User not Found!!" });

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
        Getbmi(id, (success, error) => {
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
        var member = '';

        const uid = req.data.id;
        Getbillpackage(uid, (success, error) => {
            if (error) { throw error; }
            else if (success) {
                const data = success;
               Getmemberdata(uid,(memdata,error)=>{
                if(error) throw error;
                member = memdata;
                 res.json({bill:data, user:member});      
               
               })

            }
            else { console.log("no data"); }
        })

    }
    catch (error) {
        throw error;
    }
}

const Profilecontroller =(req,res)=>{
    const uid=req.data.id;
    Getmemberdata(uid,(success,error)=>{
        if(error)throw error;
        res.status(200).json({data:success});
    })
}

const Updateprofile =(req,res)=>{
    const uid=req.data.id;
   Updatememberdb(uid, req.body,(success,error)=>{
    if(error)throw error;
        res.status(200).json({data:success});
   })
}

const Viewpackagecontroller = (req,res)=>{
    Getpackage((success,error)=>{
        if(error)throw error;
        res.status(200).json({package: success});
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
    DashboardController,
    FeeController,
    Profilecontroller,
    Updateprofile,
    private_key,
    Viewpackagecontroller,
}