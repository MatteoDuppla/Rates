module.exports = (sequelize, dataTypes) => {
    let alias = 'rates'; 
    let cols = {
        rate_id: {
            type: dataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        creation_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        user_id: {
            type: dataTypes.UUID,
            allowNull: false
        },
        type: {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        timestamps: false,
        tableName: "rates"
    }
    const User = sequelize.define(alias, cols, config);

    return User
}