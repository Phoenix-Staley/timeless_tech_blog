// const connection = require("../config/connection");
// const { User, Post } = require("../models");

// const userData = require("./user_data.json");
// const postData = require("./posts.json");

// const seed_database = async () => {
//     await connection.sync({ force: true });

//     await User.bulkCreate(userData, {
//         individualHooks: true
//     });

//     process.exit(0);
// };

// seed_database();

const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const userData = require("./user_data.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
