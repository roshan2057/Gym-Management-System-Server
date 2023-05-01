const pool = require("./database")






const AdminLoginDb = (data, res) => {
    const username = data.username;
    const password = data.password;


    pool.getConnection(async (error, conn) => {
        if (error) throw error;
        await conn.query("SELECT * FROM admin WHERE username = ? AND password=?", [username, password], (error, result) => {
            if (error) {
                throw error;
            }
            else if (result.length > 0) {

                res(result);
            }
            else {
                res(false);
            }
        })
    })
}


const addpackagedb = (data,res)=>{
    try{
const pname= data.package_name;
const pprice= data.package_price;
pool.getConnection(async(error,conn)=>{
    if(error) throw error;
    await conn.query("INSERT INTO package (name,price) VALUES(?, ?)",[pname,pprice], (error,result)=>{
        conn.release();
        if(error) throw error;
        console.log("added")
        res(result);
    })
})
    }
    catch(exception){
throw exception;
    }
}

const Updatepackagedb = (id,data ,res)=>{
    try{
        const pid = id;
const pname = data.package_name;
const pprice = data.package_price;
pool.getConnection(async(error,conn)=>{
    if(error) throw error;
    await conn.query("UPDATE package SET name = ?,price = ? WHERE pac_id=?",[pname, pprice,id],(error,result)=>{
        conn.release();
        if(error) throw error;
        console.log("update")
        res(result);
    })
})
    }
    catch (exception){
        throw exception;
    }
}

const Deletepackagedb = (data, res)=>{
    try{
        const id = data;
        pool.getConnection(async(error,conn)=>{
            if(error) throw error;
            await conn.query("DELETE FROM package WHERE pac_id=?",[id],(error,result)=>{
                conn.release();
                if (error) throw error;
                console.log("deleted");
                res(result);
            })
        })
    }
    catch (exception){
        throw exception;
    }
}

const Viewpackagedb = (res)=>{
    try{
pool.getConnection(async(error,conn)=>{
    if(error) throw error;
    await conn.query("SELECT * FROM package",(error,result)=>{
        conn.release();
        if(error) throw error;
        res(result);
    })
})
    }
    catch (exception){
        throw exception;
    }
}

const Viewmembersdb = (res)=>{
    try{
pool.getConnection(async(error,conn)=>{
    if(error) throw error;
    await conn.query("SELECT * FROM members",(error,result)=>{
        conn.release();
        if(error) throw error;
        res (result);
    })
})
    }
    catch(exception){
        throw exception;
    }
}

const Deletememberdb= (data ,res)=>{
    try{
        const id = data;
pool.getConnection(async(error,conn)=>{
    if (error) throw error;
    await conn.query("DELETE FROM members WHERE id=?",[id],(error,result)=>{
        conn.release();
        if (error) throw error;
        console.log("member deleted");
        res(result);
        
})
})
    }
    catch (exception)
    {
        throw exception;
    }
}



const Viewbilldb = (res)=>{
    try{
pool.getConnection(async(error,conn)=>{
    if(error) throw error;
    await conn.query("SELECT * FROM billing",(error,result)=>{
        conn.release();
        if(error) throw error;
        res (result);
    })
})
    }
    catch(exception){
        throw exception;
    }
}


module.exports ={
    AdminLoginDb,
    addpackagedb,
    Updatepackagedb,
    Deletepackagedb,
    Viewmembersdb,
    Deletememberdb,
    Viewpackagedb,
    Viewbilldb,
}
