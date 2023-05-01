const jwt = require("jsonwebtoken");
const { AdminLoginDb, addpackagedb, Updatepackagedb, Deletepackagedb, Viewmembersdb, Viewpackagedb, Deletememberdb, Viewbilldb } = require("../model/Admindb.js");
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

const Viewpackage= (req,res)=>{
    try{
Viewpackagedb((data,error)=>{
    if (error) throw error;
    res.status(200).json({data:data});
})
    }
    catch (exception){
        throw exception;
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

const Viewmembers = (req,res)=>{
    try{
Viewmembersdb((data,error)=>{
    if(error) throw error;

res.status(200).json({data:data});
})


    }
    catch(exception){
throw exception;
    }
}

const Deletemember = (req, res)=>{
    try{
        Deletememberdb(req.params.id, (success,error)=>{
            if (error) throw error;
            res.status(200).json({data:"member deleted"});
        })
    }
    catch(exception){
        throw exception;
    }
}


const Billcontroller=(req,res)=>{
Viewbilldb((success,error)=>{
    if(error) throw error;

    Viewmembersdb((data,error)=>{
        if(error) throw error;
        Viewpackagedb((package,error)=>{
            if (error) throw error;
    res.status(200).json({bill:success, member:data, package:package});

        })
    
     })
})
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
    Viewmembers,
    Deletemember,
    Billcontroller,
    Viewpackage,
 
}