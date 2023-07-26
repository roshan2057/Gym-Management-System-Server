const pool = require("./database")



const RegisterDb = (data, res) => {
    try {
        const name = data.name;
        const phone = data.phone;
        const password = data.password;
        const address = data.address;
        const gender = data.gender;
        const email = data.email;

        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("INSERT INTO members (name, phone, password, address, email, gender) VALUES(?, ?, ?, ?, ?, ?)", [name, phone, password, address, email, gender], (error, result) => {
                conn.release();
                if (error) return console.log(error);
                res(result);
            });
        })
    }
    catch (error) {
        console.log(error)
    }
}

const Insertbmi = (id, data, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("INSERT INTO bmi (user_id, height, weight, bmi) VALUES(?, ?, ?, ?)", [id, data.height, data.weight, data.bmi], (error, result) => {
            conn.release();
            if (error) return console.log(error);
            res(result);
        });
    })
}


const CheckpwdDb = (id, res) => {

    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT password from members WHERE id =?", [id], (error, result) => {
            conn.release();
            if (error) return console.log(error);

            res(result);
        })
    })
}

const ChangepwdDb = (data, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);

        await conn.query("UPDATE members SET password=? WHERE id=?", [data.password, data.id], (error, result) => {
            conn.release();
            if (error) return console.log(error);
            else if (result.affectedRows > 0) {
                res(result);
            }
            else {
                res("cant update");
            }
        })
    })
}


const LoginDb = (data, res) => {
    try {
        const phone = data.phone;
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("SELECT id, password FROM members WHERE phone = ? ", [phone], (error, result) => {
                if (error) {
                    return console.log(error);
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
    catch (error) {
        console.log(error)
    }
}





const Getbmi = (id, res) => {
    const mid = id;

    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT * FROM bmi WHERE user_id =?", [mid], (error, result) => {
            if (error) {
                return console.log(error);
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



const Getbillpackage = (id, res) => {
    const mid = id;

    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT b.bid, b.user_id, b.package_id, b.renew_date, b.expire_date, b.status, p.pac_id, p.name, p.price FROM billing b JOIN package p ON b.package_id = p.pac_id WHERE b.user_id =? ORDER BY b.bid DESC LIMIT 1", [mid], (error, result) => {
            if (error) {
                return console.log(error);
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




const Getmemberdata = (id, res) => {
    const uid = id;
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT p.name, p.phone, p.email, p.address, b.height, b.weight, b.bmi FROM members p JOIN bmi b ON p.id = b.user_id WHERE p.id=? limit 1", [uid], (error, result) => {
            if (error) return console.log(error);
            else if (result.length > 0) res(result);
            else res(false);
        })
    })
}

const Updatememberdb = (id, data, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("UPDATE members SET name =?, phone=?, email=?, address=? WHERE id=? limit 1", [data.name, data.phone, data.email, data.address, id], (error, result) => {
            if (error) return console.log(error);
            res(result);
        })
    })
}

const Updatebmidb = (data, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("UPDATE bmi SET height=?, weight=?, bmi=? WHERE user_id=? limit 1", [data.height, data.weight, data.bmi, data.id], (error, result) => {
            if (error) return console.log(error);
            res(result);
        })
    })
}

const Getnoofmonths = (id, res) => {
    const uid = id.packid;
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT num_months,price FROM package WHERE pac_id=? limit 1", [uid], (error, result) => {
            if (error) return console.log(error);
            else if (result.length > 0) res(result);
            else res(false);
        })
    })
}



const Getpackage = (res) => {
    const status = 1;
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT * FROM package WHERE status=?", [status], (error, result) => {
            if (error) return console.log(error);
            else if (result.length > 0) res(result);
            else res(false);
        })
    })
}

const Getstatement = (id, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        // await conn.query("SELECT * FROM billing WHERE user_id =? ORDER BY renew_date DESC",[id],(error, result)=>{
        await conn.query("SELECT b.renew_date, b.medium, b.amount, p.name FROM billing b JOIN package p ON b.package_id = p.pac_id WHERE b.user_id=? ORDER BY b.renew_date DESC", [id], (error, result) => {
            if (error) return console.log(error);
            else if (result.length > 0) res(result);
            else res(false);
        })
    })
}


const Khlatiinsertdb = (data, expire, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("INSERT INTO billing (user_id, package_id, medium, renew_date, expire_date, amount) VALUES (?,?,?,?,?,?)", [data.uid, data.packid, data.medium, data.renew_date, expire, data.amount], (error, result) => {
            if (error) return console.log(error);
            // console.log(result);
            res(result);
        })
    })
}


const Viewpackagedb = (res) => {
    try {
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("SELECT * FROM package", (error, result) => {
                conn.release();
                if (error) return console.log(error);
                res(result);
            })
        })
    }
    catch (exception) {
        throw exception;
    }
}


const Getexpdate = (id, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT expire_date FROM billing WHERE user_id=? ORDER BY bid DESC LIMIT 1", [id], (error, result) => {
            conn.release();
            if (error) {
                return console.log(error)
            }
            else if (result.length > 0) {
                res(result)
            }
            else {
                res("false")
            };

        })
    })
}




const Updatestatusdb = (id, res) => {
    try {
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("UPDATE billing SET status ='Success' WHERE bid=?", [id], (error, result) => {
                conn.release();
                if (error) return console.log(error);
                res(result);
            })
        })
    }
    catch (exception) {
        throw exception;
    }
}



const insert = (data, res) => {
    const username = data.username;
    const password = data.password;

    pool.getConnection(async (err, conn) => {
        if (err) throw err;
        await conn.query("INSERT INTO admin (username, password) VALUES ('" + username + "', '" + password + "')", (error, results, fields) => {

            conn.release();

            if (error) return console.log(error);

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
      conn.release();
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


const Codinsertdb = (data, expire, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) throw error;
        await conn.query("INSERT INTO billing (user_id, package_id, medium, renew_date, expire_date, amount) VALUES (?,?,?,?,?,?)", [data.uid, data.packid, data.medium, data.renew_date, expire, data.amount], (error, result) => {
           conn.release();
            if (error) throw error;
            // console.log(result);
            res(result);
        })
    })
}

const Checkemail =(email, res)=>{
    pool.getConnection(async(error,conn)=>{
        await conn.query("SELECT * FROM members where email=?",[email],(error,result)=>{
            conn.release();
            if(error) return console.log(error);
           return res(result)

        })
    })
}

module.exports = {
    RegisterDb,
    Insertbmi,
    LoginDb,
    Getbmi,
    Getmemberdata,
    Getpackage,
    Getbillpackage,
    Getnoofmonths,
    Khlatiinsertdb,
    Viewpackagedb,
    Getexpdate,
    Updatestatusdb,
    Updatememberdb,
    Updatebmidb,
    Getstatement,
    CheckpwdDb,
    ChangepwdDb,
    Codinsertdb,
    Checkemail,
    insert,
    select
}