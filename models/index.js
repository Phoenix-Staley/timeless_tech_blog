const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Post.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(Comment, {
    foreignKey: "commenter_id",
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: "commenter_id"
});

Comment.belongsTo(Post, {
    foreignKey: "post_id"
});

module.exports = { User, Post, Comment };