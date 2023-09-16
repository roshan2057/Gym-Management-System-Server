const DataTypes = require('sequelize');
const db = require('./connect');
const Member = require('./Members');


const Bmi = db.define("bmi", {
    bmi_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    bmi: DataTypes.INTEGER,
});






// Relationship Between Order table and Product table .ie One to many
Bmi.belongsTo(Member, { foreignKey: 'user_id' });



module.exports = Bmi;