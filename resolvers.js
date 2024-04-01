import db from "./_db.js";

export const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    }
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    }
  },
  Mutation: {
    addGame(_, args) {
      const newGame = { 
        ...args.game, 
        id: Math.floor(Math.random() * 100).toString() 
      };
      db.games.push(newGame);
      return newGame;
    },
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return { ...game, ...args.edits };
        }
        return game
      })
      return db.games.find((game) => game.id === args.id)
    }
  }
}