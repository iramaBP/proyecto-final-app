/* TRAER EXPRESS */
const express = require("express");
/* TRAER MODELO USUARIO */
const User = require("../modelos/User");
/* TRAER BCRYPT */
const bcrypt = require("bcrypt");
/* TRAER EXPRESS ROUTER */
const loginRouter = express.Router();
/* TRAER TOKEN */
const jwt = require("jsonwebtoken");

/* RUTA LOGIN  */
loginRouter.post("/login", async (req, res) => {
  let { name, password } = req.body;

  if (!name || !password) {
    return res.json({
      auth: false,
      message: " Rellene los campos vacios ",
    });
  }
  let validPassword;
  let user;
  try {
    user = await User.findOne({ name: name });
  } catch (error) {
    return res.json({
      message: "Error de conexion con base de datos ",
    });
  }
  if (!user) {
    res.json({
      auth: false,
      message: "El usuario no existe",
    });
    return;
  }

  validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.json({
      message: "Error de contraseña",
    });
  }

  /* CREAR  EL TOKEN PARA CADA VEZ QUE ALGUIEN SE LOGUEA  Y LO MANDAMOS EN LA RES*/
  let token = jwt.sign(
    {
      id: user._id,
    },
    "secretword",
    { expiresIn: 7200 } /* Esta en segundos = 2hora */
  );

  res.json({
    auth: true,
    message: "Bienvenido",
    token: token,
  });
});
/* Secretword : Es un argumento que hay que pasarle a 
jsonwebtoken para que contruya nuestro token y va ser la misma para todos los token de nuestra APP*/

module.exports = loginRouter;
