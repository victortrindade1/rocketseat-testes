module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "docker",
  database: "testes",
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
