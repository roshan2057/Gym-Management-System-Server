const pool = require("./database")


// UPDATE date
// SET rem_day = DATEDIFF(expdate, redate);





const AdminLoginDb = (data, res) => {
    const username = data.username;
    const password = data.password;



    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT * FROM admin WHERE username = ? AND password=?", [username, password], (error, result) => {
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




const addpackagedb = (data, res) => {
    try {
        const pname = data.name;
        const noofmonth = data.noofmth;
        const status = data.status;
        const pprice = data.price;
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("INSERT INTO package (name,num_months,status,price) VALUES(?,?,?,?)", [pname, noofmonth, status, pprice], (error, result) => {
                conn.release();
                if (error) return console.log(error);
                console.log("added")
                res(result);
            })
        })
    }
    catch (exception) {
        throw exception;
    }
}

const Updatepackagedb = (id, data, res) => {
    try {
        const pname = data.name;
        const month = data.noofmonth;
        const pprice = data.price;
        const status = data.status;
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("UPDATE package SET name = ?, num_months = ?, price = ?, status=? WHERE pac_id=?", [pname, month, pprice, status, id], (error, result) => {
                conn.release();
                if (error) return console.log(error);
                console.log("update")
                res(result);
            })
        })
    }
    catch (exception) {
        throw exception;
    }
}

const Checkbilldb = (id, res) => {
    pool.getConnection(async (error, conn) => {
        if (error) return console.log(error);
        await conn.query("SELECT * FROM billing WHERE user_id =? limit 1", [id], (error, result) => {
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

const Deletepackagedb = (data, res) => {
    try {
        const id = data;
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("DELETE FROM package WHERE pac_id=?", [id], (error, result) => {
                conn.release();
                if (error) return console.log(error);
                console.log("deleted");
                res(result);
            })
        })
    }
    catch (exception) {
        throw exception;
    }
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

const Viewmembersdb = (res) => {
    try {
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("SELECT * FROM members", (error, result) => {
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

const Deletememberdb = (data, res) => {
    try {
        const id = data;
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("DELETE FROM members WHERE id=?", [id], (error, result) => {
                conn.release();
                if (error) {
                    return console.log(error);
                }
                else if (result.affectedRows > 0) {
                    console.log("Deleted")
                    res(result);
                }
                else {
                    res(false);
                }

            })
        })
    }
    catch (exception) {
        throw exception;
    }
}



const Viewbilldb = (res) => {
    try {
        pool.getConnection(async (error, conn) => {
            if (error) return console.log(error);
            await conn.query("SELECT * FROM billing", (error, result) => {
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


module.exports = {
    AdminLoginDb,
    addpackagedb,
    Updatepackagedb,
    Deletepackagedb,
    Viewmembersdb,
    Checkbilldb,
    Deletememberdb,
    Viewpackagedb,
    Viewbilldb,
}
