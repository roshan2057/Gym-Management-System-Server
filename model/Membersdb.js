const pool = require("./database")



const RegisterDb = (data, res) => {
    const name = data.name;
    const phone = data.phone;
    const password = data.password;
    const address = data.address;

    pool.getConnection(async (error, conn) => {
        if (error) throw error;
        await conn.query("INSERT INTO members (name, phone, password, address) VALUES(?, ?, ?, ?)", [name, phone, password, address], (error, result) => {
            conn.release();
            if (error) throw error;
            console.log(result)
            res(result);
        });
    })
}


const LoginDb = (data, res) => {
    const phone = data.phone;
    const password = data.password;


    pool.getConnection(async (error, conn) => {
        if (error) throw error;
        await conn.query("SELECT * FROM members WHERE phone = ? AND password=?", [phone, password], (error, result) => {
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




const Getdata = (id, res) => {
    const mid = id;

    pool.getConnection(async (error, conn) => {
        if (error) throw error;
        await conn.query("SELECT * FROM members WHERE id =? limit 1", [mid], (error, result) => {
            if (error) {
                throw error;
            }
            else if (result.length > 0) {
                res (result);
            }
            else {
                res (false);
            }
        })
    })
}


const Getbilldata =(id,res)=>{
    const uid = id;
    pool.getConnection(async(error,conn)=>{
        if (error) throw error;
        await conn.query("SELECT * FROM billing WHERE user_id=? limit 1",[uid],(error,result)=>{
            if (error) throw error;
            else if (result.length>0)  res (result);
            else res (false);
        })
    })
}





const insert = (data, res) => {
    const username = data.username;
    const password = data.password;

    pool.getConnection(async (err, conn) => {
        if (err) throw err;
        await conn.query("INSERT INTO admin (username, password) VALUES ('" + username + "', '" + password + "')", (error, results, fields) => {

            conn.release();

            if (error) throw error;

            console.log(results);
            res(results);

        });
    })

}



const select = async (data, res) => {
    const username = data.username;
    const password = data.password;
    console.log(username, password)
    await con.query("SELECT * FROM admin WHERE username = ? AND password = ?", [username, password], (err, results) => {
        if (err) {
            throw err;
        }
        else if (results.length > 0) {
            console.log("data: " + results.length);
            console.log(results)
            res(results);
        }
        else {
            res("false");
        }

    });
}

module.exports = {
    RegisterDb,
    LoginDb,
    Getdata,
    Getbilldata,
    insert,
    select
}