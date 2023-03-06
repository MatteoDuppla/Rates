module.exports = (sequelize, dataTypes) => {
    let alias = 'logs'; 
    let cols = {
        log_id: {
            type: dataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        activity: {
            type: dataTypes.STRING,
            allowNull: false
        },
        log_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: dataTypes.UUID,
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        tableName: "logs"
    }
    const User = sequelize.define(alias, cols, config);

    return User
}