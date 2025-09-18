const app = require("./app");
const db = require("./models");
const PORT = process.env.PORT || 3000;

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Base de datos sincronizada correctamente.");

    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(
      "Error al sincronizar la base de datos o al iniciar el servidor:",
      err
    );
    process.exit(1); 
  });
