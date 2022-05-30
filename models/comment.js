const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date_posted: {
            type: DataTypes.DATE,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "id"
            }
        },
        commenter_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize: sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }
);

module.exports = Comment;