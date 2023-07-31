const jwt = require("jsonwebtoken");
const { AdminLoginDb, addpackagedb, Updatepackagedb, Deletepackagedb, Viewmembersdb, Viewpackagedb, Deletememberdb, Viewbilldb, viewpackagedb, Checkbillingdb, Checkbilldb, Codlistdb, Onlinelistdb, Deletebmi, Userstatementdb, Acceptcoddb, Declinedb } = require("../model/Admindb.js");
const { default: axios } = require("axios");

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
                Deletebmi(uid, (success, error) => {
                    if (error) return console.log(error);
                    Deletememberdb(uid, (success, error) => {
                        if (error) return console.log(error);
                        else if (success) {
                            res.status(200).json({ data: "member deleted" });

                        }
                        else {
                            res.status(200).json({ data: "Already Deleted" });
                        }
                    })
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

const Codlist = (req, res) => {
    try {
        Codlistdb((success, error) => {
            if (error) return console.log(error);
            res.status(200).json({ success });
        })
    }
    catch (error) {
        return console.log(error)
    }
}


// const Onlinelist = (req, res) => {
//     try {
//         Onlinelistdb((success, error) => {
//             if (error) return console.log(error);
//             res.status(200).json({ success });
//         })
//     }
//     catch (error) {
//         return console.log(error)
//     }
// }



const Onlinelist = (req, res) => {
    try {
        axios.get(`https://khalti.com/api/v2/merchant-transaction/?page=${req.params.id}`,{
            headers:{
                'Authorization': process.env.khaltisecretkey
            }
        }).then(response=>{

            // Construct the data object to be sent as the response
            const responseData = {
                total_records:response.data.total_records,
                total_pages:response.data.total_pages,
                records: response.data.records,
                total_amount: response.data.total_amount
            };

        return res.json(responseData);
        }).catch(error=>{
            console.log(error)
        })
    }
    catch (error) {
        return console.log(error)
    }
}

const UserStatement =(req,res)=>{
try{
    Userstatementdb(req.params.id,(success, error)=>{
        if(error) return console.log(error);
        res.status(200).json({success});
    })
}
catch(e){
    return console.log(e);
}
}

const Acceptcod =(req,res)=>{
try{
    Acceptcoddb(req.params.id,(success,error)=>{
        if(error) return console.log(error);
        res.status(200).json({success});
    })
}
catch{

}
}

const Declinecod =(req,res)=>{
    try{
        Declinedb(req.params.id,(success,error)=>{
            if(error) return console.log(error);
            res.status(200).json({success});
        })
    }
    catch{
    
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
    Codlist,
    Onlinelist,
    UserStatement,
    Acceptcod,
    Declinecod,
    

}