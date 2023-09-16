const DataTypes = require ('sequelize')
const db= require('./connect');
const Member = require('./Members');
const Package = require('./Package');

const Bill = db.define("bill",{
    bid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    user_id:DataTypes.INTEGER,
    package_id:DataTypes.INTEGER,
    medium:DataTypes.STRING,
    status:DataTypes.STRING,
    amount:DataTypes.INTEGER,
    renew_date:DataTypes.STRING,
    expire_date:DataTypes.STRING
})

Bill.belongsTo(Member,{foreignKey:'user_id'});
Bill.belongsTo(Package,{foreignKey:"package_id"});

module.exports=Bill;