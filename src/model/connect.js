const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config()


const db = new Sequelize(
    process.env.database_name, 
    process.env.user, 
    process.env.password, 
    {
    host: process.env.host,
    dialect: 'mysql',
    pool: { max: 10, min: 0, idel: 10000 }
});

db.authenticate().then(()=>{
    console.log("Data base connected sucessfully")
}).catch(()=>{
    console.log("Error in connecting database")
})

db.sync().then(() => {
    console.log('tables sync sucessfully');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });


module.exports= db