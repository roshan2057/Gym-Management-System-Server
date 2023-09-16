const DataTypes = require('sequelize')
const db =require('./connect')

const Package = db.define("package",{
    pac_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:DataTypes.STRING,
    num_months:DataTypes.INTEGER,
    price:DataTypes.INTEGER,
    status:DataTypes.STRING,
});

module.exports= Package;