const { Book, User } = require("../models");

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find({});
    },
    users: async () => {
      return await User.find({});
    },
  },
};

module.exports = resolvers;