const DataTypes = require('sequelize')
const db = require('./connect')

const Member = db.define("member", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING(10),
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
});



module.exports = Member;




