module.exports = (sequelize, dataTypes) => {
    let alias = 'users'; 
    let cols = {
        user_id: {
            type: dataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        user_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        mail: {
            type: dataTypes.STRING,
            allowNull: false
        },
        pass: {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        tableName: "users"
    }
    const User = sequelize.define(alias, cols, config);

    return User
}