require('../bootstrap');

module.exports = {
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE,
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
