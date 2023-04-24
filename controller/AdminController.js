const jwt = require("jsonwebtoken");
const { AdminLoginDb, addpackagedb, Updatepackagedb, Deletepackagedb } = require("../model/Admindb.js");
const private_key = "key";

const createtoken = (id) => {
    return jwt.sign({ id }, private_key, { expiresIn: 259200 });
}



const LoginController = (req, res) => {
    try {
        AdminLoginDb(req.body, (success, error) => {
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

const Addpackage = (req,res)=>{
    try{
addpackagedb(req.body, (success, error)=>{
    if(error) throw error;
    res.status(200).json({data:"added", id: success.insertedId});
})
    }
    catch(exception){
throw exception;
    }
}

const Updatepackage = (req,res)=>{
    try{
Updatepackagedb(req.params.id,req.body, (success, error)=>{
    if(error) throw error;
    res.status(200).json({data:"updated"});
})
    }
    catch(exception){
throw exception;
    }
}


const Deletepackage = (req, res)=>{
    try{
Deletepackagedb(req.params.id, (success,error)=>{
    if(error) throw error;
    res.status(200).json({data:"deleted"});
})
    }
    catch (exception){
        throw exception;
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


module.exports = {
    LoginController,
    Addpackage,
    Updatepackage,
    Deletepackage,
 
}