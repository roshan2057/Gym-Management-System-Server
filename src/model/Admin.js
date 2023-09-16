const DataTypes = require('sequelize')
const db =require('./connect')


const Admin = db.define('admin',{
username:DataTypes.STRING,
password:DataTypes.STRING,

})

module.exports= Admin;