const pool = require("../model/database")

const user=(req,res)=>{
pool.getConnection(async(error,conn)=>{
    if(error) return console.log(error);
    await conn.query("SELECT COUNT(*) AS row_count FROM members",(error,result)=>{
        conn.release();
        if(error) return console.log(error);
        res.json({result})
    })
})
}

const khalti=(req,res)=>{
    pool.getConnection(async(error,conn)=>{
        if(error) return console.log(error);
        await conn.query("SELECT COUNT(*) AS online_count FROM billing WHERE medium = 'online'",(error,result)=>{
            conn.release();
            if(error) return console.log(error);
            res.json({result})
        })
    })
}

const cod=(req,res)=>{
    pool.getConnection(async(error,conn)=>{
        if(error) return console.log(error);
        await conn.query("SELECT COUNT(*) AS cod_count FROM billing WHERE medium = 'cod'",(error,result)=>{
            conn.release();
            if(error) return console.log(error);
            res.json({result})
        })
    })
}

const total=(req,res)=>{
    pool.getConnection(async(error,conn)=>{
        if(error) return console.log(error);
        await conn.query("SELECT COUNT(*) AS total FROM billing",(error,result)=>{
            conn.release();
            if(error) return console.log(error);
            res.json(result);
        })
    })
}

module.exports={ user, khalti, cod, total}